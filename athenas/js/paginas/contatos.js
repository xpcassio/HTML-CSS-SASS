$(function() {

var tmp_width = $(window).width();
if (tmp_width >= 768)
	$(".div-contato").show();

$("body").on("click", ".a-contato", function() {
	var tmp_div = $(this).data("div");

	if ($(tmp_div).is(":visible"))
		$(tmp_div).hide();
	else
		$(tmp_div).show();
});

/*$(".select-contato a").on("click", function() {
	var tmp_tipo = $(this).data("tipo");

	$(".select-contato a").addClass('btn-default').removeClass('btn-athenas');
	$(this).addClass('btn-athenas');

	if(tmp_tipo == "tecnico") {
		$(".form-group-emp").show().val("nao");
		$(".form-group-ap").hide();
	}
	else {
		$(".form-group-emp").hide();
		$(".form-group-ap").hide();
	}

	$("input[name=tipo]").val(tmp_tipo);
});

*/

$("select[name=cliente]").on("change", function() {
	var tmp_val = $(this).val();

	if (tmp_val == "sim")
		$(".form-group-ap").show();
	else
		$(".form-group-ap").hide();
});

});