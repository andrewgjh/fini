const createSection = function (data){
  return $(`<section class="to-do-list to-do-list-${data.id} to-do-list-more mb-1 mt-1">
    <header class='to-do-list-title'>
      <h3>${data.name}</h3>
    </header>
    <summary class="to-do-list-detail to-do-list-detail-${data.id}">
      <label for="item-expand-${data.id}">
        <input type="checkbox" class="expand-checkbox" id="item-expand-${data.id}">
        <figure class="to-do-list-detail-expand" id="list-expand-${data.id}"><i id='${data.id}' class="fa-solid fa-chevron-down"></i></figure>
      </label>

      <p class="to-do-list-detail-count"></p>
    </summary>
  </section>`)
};

const newCategoryForm = function (){
  return $(`<form action="/categories/new"  class="add-category-form"><input class='add-category-input' type="text" placeholder="Enter new category"></form>`);
};
