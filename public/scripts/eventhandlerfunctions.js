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
      })
    });
  } else {
    const miscList = $(`.to-do-${category}`);
    miscList.detach();
  }
}
