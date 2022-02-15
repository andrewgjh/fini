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

const toggleCategory = function(){
  console.log('toggle');
}
