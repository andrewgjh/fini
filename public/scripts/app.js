// Client facing scripts here
$(function(on) {
  $('.navbar-add-todo').on('click', onClickAddItem);
  $('.add-item-form').on('submit', addItem);
  $('.to-do-list-detail-expand').on('click', toggleCategory);
  $('body').on('click', '.to-do-details-detail-expand', toggleToDoListItem);
  $('.add-item-form').on('submit', $populateCounts);
  $('body').on('change', '.change-category', changeCategory);
  $('body').on('click', '.item-complete', toggleItemComplete);
  $('body').on('click', '.item-delete', deleteItemById);
});




