// Client facing scripts here
$(function(on) {
  $('.navbar-add-todo').on('click', onClickAddItem);
  $('.add-item-form').on('submit', addItem);
  $('.to-do-list-detail-expand').on('click', toggleCategory);
  $('.add-item-form').on('submit', $populateCounts);
});

document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  console.log(checkboxes);
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    checkbox.addEventListener('change', strikethrough);
  }
}

function strikethrough(event) {
  // isChecked is a boolean to see if the checkbox is checked.
  const isChecked = event.target.checked;

  console.log(isChecked);
  // event.target is the entire object.
  const checkedTag = event.target;
  // References the title of the to-do-item.
  const text = checkedTag.parentNode.children[0];
  if (isChecked) {
    text.classList.add('strikethrough');
  } else {
    text.classList.remove('strikethrough');
  }
}
//ml-5 mr-3 item-complete
