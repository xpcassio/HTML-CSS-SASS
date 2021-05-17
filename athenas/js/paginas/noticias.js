$(function() {

/* =============================================
   CLICANDO NAS NOTICIAS
   ============================================= */
$("body").on("click", ".card-news", function() {
	var tmp_url = $(this).data("url");
	window.location = tmp_url;
});

/* =============================================
   ABRINDO MAIS NOTICIAS NOVAS/ANTIGAS
   ============================================= */
$(".btn-antigos-galeria").on("click", function() {
	var tmp_id = $(".div-noticias").find('.card-news').last().data("idd"),
		tmp_data = $(".div-noticias").find('.card-news').last().data("quando");

	if ($(this).parent(".previous").hasClass('disabled')) 
		return true;

	$.ajax({
		url: '/actions/noticias/velhas.php',
		type: 'POST',
		dataType: 'html',
		data: {id:tmp_id,data:tmp_data},
		success: function(retorno) {
			$(".btn-novos-galeria").parent(".next").removeClass('disabled');

			if (retorno != "nada")
				$(".div-noticias").html(retorno);
			else
				$(".btn-antigos-galeria").parent(".previous").addClass('disabled');
		}
	});
});

$(".btn-novos-galeria").on("click", function() {
	var tmp_id = $(".div-noticias").find('.card-news').first().data("idd"),
		tmp_data = $(".div-noticias").find('.card-news').first().data("quando");

	if ($(this).parent(".next").hasClass('disabled')) 
		return true;

	$.ajax({
		url: '/actions/noticias/novas.php',
		type: 'POST',
		dataType: 'html',
		data: {id:tmp_id,data:tmp_data},
		success: function(retorno) {
			$(".btn-antigos-galeria").parent(".previous").removeClass('disabled');

			if (retorno != "nada")
				$(".div-noticias").html(retorno);
			else
				$(".btn-novos-galeria").parent(".next").addClass('disabled');
		}
	});
});

});