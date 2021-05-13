$(document).ready(function() {

$(".list-group-select").on("click", function() {
    $(".list-group-select").removeClass('active');
    $(this).addClass('active');

    $(".list-group-description").hide();
    $(this).next(".list-group-description").show();
});

new Chartist.Line('.ct-chart', {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [
    [12, 9, 7, 8, 5],
    [2, 1, 3.5, 7, 3],
    [1, 3, 4, 5, 6]
  ]
}, {
	height: 400,
  fullWidth: true,
  chartPadding: {
    right: 40
  }
});
	
});