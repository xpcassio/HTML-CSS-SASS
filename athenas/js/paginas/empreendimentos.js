$(function() {


$("body").on("click", ".card-emp", function() {
	var tmp_url = $(this).data("url");
	window.location = tmp_url;
});


});