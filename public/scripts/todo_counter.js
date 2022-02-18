$(() => {
  $getUser();
  $populateCounts();
  $('.add-item-form').on('submit', $populateCounts);
});

// Obtains all instances of a category bar from the page, counts attributed list items completed and total and applies the counter
const $populateCounts = () =>{
    // first GET to obtain each individual category id
    $.ajax({
    type: 'GET',
    url: `/db/c`,
  }).then((data) => {
    //obtains category id in array of objects form, iterates to create just an array
    const idArray = [];
    for (let element of data) {
      idArray.push(element.id);
    }
    return Promise.resolve(idArray)
    })
    .then((idArray) => {
      //obtains array of category id from previous promise, loops through
      for (let catID of idArray) {
        // second GET to obtain completed/total to-do items in each looped category
        $.ajax({
          type: 'GET',
          url: `/db/a/${catID}`,
        }).then((data) => {
          //places the obtained numbers into the html
        $("section.to-do-list-" + catID).find('.to-do-list-detail-count').html(`${data.completed} / ${data.total}`);
        });
      }
    })
  }



