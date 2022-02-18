const onClickAddItem = () => {
  const $compose = $('.add-item');
  const isHidden = $compose.css("display") === "none";
  if (isHidden) {
    $compose.fadeIn();
  } else {
    $compose.fadeOut();
  }
}

const addItem = function (event) {
  const $inputToDo = $("#toDo").val()
  if ($inputToDo) {
    event.preventDefault();
    const $loader = $('.sortingLoader');
    const $itemToDo = $(this).serialize();
    $loader.addClass('loader');
    postToDoItem($itemToDo)
      .then((data) => {
        $loader.removeClass('loader');
        const category = data.rows[0].category_id;
        if(!$(`#item-expand-${category}`).is(':checked')){
          $(`#${category}`).trigger('click');
          $(`#${category}`).trigger('click');
        }
        $("form").get(0).reset();
        $populateCounts();
      });


  } else {
    event.preventDefault();
    alert('Cannot submit empty to do item.')
  }
};

const toggleItemComplete = function (event) {
  const postItemID = event.target.id.match(/\d+/)[0];
  const checked = event.target.checked;
  completeItemBool(postItemID, checked)
    .then(() => {
      $populateCounts();
      strikethrough(event);
    });
}

const changeCategory = function (event) {
  const currentCategory = event.target[1].className.match(/\d+/)[0];
  const newCategory = event.target.value;
  const itemID = event.target.name.match(/\d+/)[0];
  moveCategory(itemID, newCategory)
    .then((data) => {
      const newCategory = data[0].category_id;
      $(`#${newCategory}`).trigger('click');
      $(`#${currentCategory}`).trigger('click');
      $populateCounts();
    });
}

const toggleCategory = function (event) {
  const category = event.target.id.match(/\d+/)[0];
  const expanded = $(`#item-expand-${category}`).is(':checked');
  if (!expanded) {
    getItems(category)
      .then((items) => {
        const sectionMisc = $(`.to-do-list-${category}`);
        const section = $('.to-do');
        items.forEach((item) => {
          const checkedBool = item.is_completed ? 'checked' : '';
          const strikeIt = item.is_completed ? 'strikethrough' : '';
          sectionMisc.append(`
        <ul class="to-do-${category} to-delete-${item.id}">
        <li class="to-do-details-items">
        <label for="sub-item-expand-${item.id}" class="to-do-details-detail">
        <input type="checkbox" class="sub-expand-checkbox" id="item-details-expand-${item.id}">
        <figure class="to-do-details-detail-expand mx-3" id="list-details-expand-${item.id}"><i id="item${item.id}" class="fa-solid fa-chevron-down"></i></figure>
        <p class='${strikeIt}'>${item.title}</p>
        </label>
        <div>
            <input class='ml-3 item-complete item-complete-input' ${checkedBool} id='checkbox-${item.id}' type="checkbox">
            <label class='item-complete-label' for="item-complete-input"></label>
            <i class="ml-3 fa-solid fa-trash-can item-delete" id="item-delete-${item.id}"></i>
        </div>
        </li>
        <section class="to-do-details-${item.id}" ></section>
        </ul>
        `);
          // const checkboxID = `checkbox-${item.id}`;
          // $(checkboxID).prop('checked', false);
        })
      });
  } else {
    const miscList = $(`.to-do-${category}`);
    miscList.detach();
  }
}

const toggleToDoListItem = function (event) {
  const item_id = event.target.id.slice(4);
  if ($(`#item-details-expand-${item_id}`).is(':checked')) {
    $(`#item-details-expand-${item_id}`).prop('checked', false);
  } else {
    $(`#item-details-expand-${item_id}`).prop('checked', true);
  }
  const expanded = $(`#item-details-expand-${item_id}`).is(':checked');
  if (expanded) {
    getItemDetails(item_id)
      .then((item) => {
        const sectionMisc = $(`.to-do-details-${item_id}`);
        const description = (item.content || "");
        const category = item.category_id;
        sectionMisc.append(`
        <div class="to-delete-details-${item_id} to-do-details mx-5">
        <span class="to-do-details-description">
          <label class='item-complete-label' for="textarea-item${item_id}">Description</label>
          <textarea id="textarea-item${item_id}" class="text-area-catch" placeholder="Enter a description">${description}</textarea>
        </span>
        <select class="change-category" name="change-id-${item_id}">
              <option value="">--Change Category--</option>
              <option class ='currenCategory-${category}' value="1">to Watch</option>
              <option class ='currenCategory-${category}' value="2">to Read</option>
              <option class ='currenCategory-${category}' value="3">to Buy</option>
              <option class ='currenCategory-${category}' value="4">to Eat</option>
              <option value="5">to Do</option>
            </select></div>
            `);
      });
  } else {
    const miscList = $(`.to-delete-details-${item_id}`);
    miscList.detach();
  }
}

const postDescriptionHandler = function (event) {
  const item_id = event.target.id.slice(13);
  const content = event.target.value;
  postDescription(content, item_id);
}


function strikethrough(event) {
  // isChecked is a boolean to see if the checkbox is checked.
  const isChecked = event.target.checked;

  // event.target is the entire object.
  const checkedTag = event.target

  // References the title of the to-do-item.
  const text = checkedTag.parentNode.previousElementSibling.lastElementChild;

  if (isChecked) {
    text.classList.add('strikethrough');
  } else {
    text.classList.remove('strikethrough');
  }
}

const deleteItemById = function (event) {
  const itemID = event.target.id.match(/\d+/)[0];
  deleteItem(itemID)
    .then(() => {
      $(`.to-delete-${itemID}`).fadeOut();
      $populateCounts();
    });
}
const $getUser = () => {
  getCurrentUser()
    .then((user) => {
      $('.user-photo').attr("src", user.photo_url || "https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg");
      $('.user-caption').html(user.first_name);
    })
};
