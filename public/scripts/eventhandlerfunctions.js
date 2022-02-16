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

const toggleCategory = function(event){

  const category = event.target.id.match(/\d+/)[0];
  const expanded = $(`#item-expand-${category}`).is(':checked');
  if (!expanded) {
    $.ajax({
      type: 'GET',
      url: `/to-do-items/${category}`,
    }).then((items) => {
      const sectionMisc = $(`.to-do-list-${category}`);
      items.forEach((item) => {
        sectionMisc.append(`
        <ul class="to-do-${category}">
        <li class="to-do-list-items">
        <p>${item.title}</p>
        <div>
            <i class="fa-solid fa-exclamation"></i>
            <i class="fa-solid fa-exclamation"></i>
            <i class="fa-solid fa-exclamation"></i>
            <i class="fa-solid fa-exclamation"></i>
            <i class="fa-solid fa-exclamation"></i>
            <input class='ml-5 mr-3 item-complete' id='checkbox-${item.id}' type="checkbox">
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
