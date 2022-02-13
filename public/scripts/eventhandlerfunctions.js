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
