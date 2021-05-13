$(document).ready(function() {

$(".servico-btn").on("click", function() {
	var temp = $(this).attr('href');

	$(".servico-btn").removeClass('active');
	$(this).addClass('active');

	$('html,body').animate({scrollTop: $(temp).offset().top}, 'slow');
});

});