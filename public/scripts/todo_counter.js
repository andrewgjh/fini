$(() => {
  $populateCounts();

});

const $populateCounts = () =>{
  // hard-coded for the default categories, but can be dynamically created if needed
  const idArray = ["to-do-list-1", "to-do-list-2", "to-do-list-3", "to-do-list-4", "to-do-list-5"];
  for (let idName of idArray) {
    const catID = idName.slice(-1);
    $.ajax({
      type: 'GET',
      url: `/db/a/${catID}`,
    }).then((data) => {
    $("section." + idName).find('p').html(`${data.completed} / ${data.total}`);
    });
  }
};
