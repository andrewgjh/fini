// Client facing scripts here
$(function(on) {
  $('.navbar-add-todo').on('click', onClickAddItem);
  $('.add-item-form').on('submit', addItem);
});
