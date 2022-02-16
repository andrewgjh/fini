const onClickAddItem = ()=>{
  const $compose = $('.add-item');
  const isHidden = $compose.css("display") === "none";
  if (isHidden){
    $compose.fadeIn();
  }
  else{
    $compose.fadeOut();
  }
}

const addItem = function (event) {
  const $inputToDo = $("#toDo").val()
  if ($inputToDo) {
    event.preventDefault();
    const $itemToDo = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: "/to-do-items",
      data: $itemToDo
    });
    $("form").get(0).reset();
  } else {
    event.preventDefault();
    alert('Cannot submit empty to do item.')
  }
};

const toggleItemComplete = function (event) {
  const postItemID = event.target.id.match(/\d+/)[0];
  const checked = event.target.checked;
  $.ajax({
      method: 'PUT',
      url: "/to-do-items",
      data: `postID=${postItemID}&bool=${checked}`
    })
    .then(() => {
      $populateCounts();
      $strikethrough(event.target, checked);
    });
}

const toggleCategory = function(event){
  const category = event.target.id.match(/\d+/)[0];
  const expanded = $(`#item-expand-${category}`).is(':checked');
  if (!expanded) {
    $.ajax({
      type: 'GET',
      url: `/to-do-items/${category}`,
    }).then((items) => {
      const sectionMisc = $(`.to-do-list-${category}`);
      const section = $('.to-do');
      items.forEach((item) => {
        const checkedBool = item.is_completed ? 'checked' : '';
        sectionMisc.append(`
        <ul class="to-do-${category}">
        <li class="to-do-list-items">
        <p>${item.title}</p>
        <div>
        <form>
        <input class='ml-5 mr-3 item-complete' ${checkedBool} id='checkbox-${item.id}' type="checkbox">
        </form>
        </div>
        </li>
        </ul>`);
        const checkID = document.getElementById(`checkbox-${item.id}`);
        console.log("checkID: ", checkID);
      // const checkTag = $(".to-do-list-items").find("input").html();
      // console.log("Checktag: ", checkTag);
      $strikethrough(checkID, item.is_completed);
      })
    });
  } else {
    const miscList = $(`.to-do-${category}`);
    miscList.detach();
  }
}

const $strikethrough = function (itemID, check) {
  // check is a boolean to see if the checkbox is checked.
  console.log("itemdID in strikethrough ", itemID);
  console.log("check in strikethrough ", check);
  // References the title of the to-do-item.
  const text = itemID.parentNode.parentNode.previousElementSibling;
  console.log(text);
  if (check) {
    text.classList.add('strikethrough');
  } else {
    text.classList.remove('strikethrough');
  }
}
