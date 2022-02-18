// Client facing scripts here
$(function(on) {
  $('.navbar-add-todo').on('click', onClickAddItem);
  $('.add-item-form').on('submit', addItem);
  $('body').on('click', '.to-do-list-detail-expand', toggleCategory);
  $('body').on('click', '.to-do-details-detail-expand', toggleToDoListItem);

  $('body').on('change', '.change-category', changeCategory);
  $('body').on('click', '.item-complete', toggleItemComplete);
  $('body').on('click', '.item-delete', deleteItemById);
  $('body').on('input', '.text-area-catch', postDescriptionHandler);
  $('.to-do-list-add-category').on('click', newCategoryName);
  $('body').on('submit', '.add-category-form', addCategory);
  getAllUserCategories();
});




