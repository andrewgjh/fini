// Client facing scripts here
$(function(on) {
  $('.navbar-add-todo').on('click', onClickAddItem);
  $('.add-item-form').on('submit', addItem);
  $('.to-do-list-detail-expand').on('click', toggleCategory);
  $('.add-item-form').on('submit', $populateCounts);
  $('body').on('change', '.change-category', changeCategory);
  $('body').on('click', '.item-complete', toggleItemComplete);
});




