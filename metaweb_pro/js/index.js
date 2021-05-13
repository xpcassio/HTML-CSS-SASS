$(document).ready(function(){

/*  ATUALIZAÇÕES EM GERAL
    ================================================= */
	$("form").submit(function (e) {
        e.preventDefault(); // this will prevent from submitting the form.
    });

/*  AÇÕES
    ================================================= */
    $(".btn-inscrever").on('click', function() {
    	var temp = $(".div-cadastro").offset().top;
    	$('html,body').animate({scrollTop: temp-20}, 'slow');
    });

/*  FORMULARIO
    ================================================= */
    $("#form_cadastro input").on("focusout", function() {
		retiraErroInput("#form_cadastro input[name="+$(this).attr('name')+"]");
	});
	$("#form_cadastro select").on("focusout", function() {
		retiraErroInput("#form_cadastro select[name="+$(this).attr('name')+"]");
	});

    $("select[name=atuacao]").on('change', function() {
    	if ($(this).val() === "outro") {
    		$("input[name=atuacao_outro]").closest(".col-xs-12").show();
    	}
    	else {
    		$("input[name=atuacao_outro]").closest(".col-xs-12").hide();
    	}
    });

    $(".btn-cadastrar").on('click', function() {
    	var btn = $(this);

    	alertPrincipal("hide");

    	if (verificaFormulario("#form_cadastro")) {
    		btn.button('loading');

    		$.ajax({
                url: "/actions/acaoForm_cadastro.php",
                data: {nome:$("#form_cadastro input[name=nome]").val(),email:$("#form_cadastro input[name=email]").val(),telefone:$("#form_cadastro input[name=telefone]").val(),atuacao:$("#form_cadastro select[name=atuacao]").val(),atuacao_outro:$("#form_cadastro input[name=atuacao_outro]").val(),admin_sites:$("#form_cadastro select[name=admin_sites]").val(),admin_sites_extra:$("#form_cadastro select[name=admin_sites_extra]").val(),envioEmail:$("#form_cadastro input[name=envioEmail]").is(":checked")},
                dataType: "json",
                type: "post",
                success: function(r) {
                	if(r.controle)
                		alertPrincipal("success","Cadastro <strong>salvo</strong> com sucesso! Aguarde que lhe enviaremos um e-mail assim que tivermos novidades!");
                	else
                		alertPrincipal("danger","Não foi possivel concluir seu cadastro! Aguarde alguns minutos e tente novamente.");
                }
            }).always(function() {
	        	btn.button('reset');
	        });
    	}
    	else
    		alertPrincipal("warning","<strong>Atenção!</strong> O preenchimento dos campos em vermelho são obrigatorios!");
    });

}); /* $(document).ready() */

/* FUNÇÕES ================================================= */
function alertPrincipal(tipo,msg) {
	div_alert = $("#div_alertGeral");

	div_alert.find(".alert").removeClass('alert-danger').removeClass('alert-success').removeClass('alert-info').removeClass('alert-warning');

	if (tipo == "success")
		div_alert.find(".alert").html(msg).addClass('alert-success').delay(6000).fadeOut(400);

	if (tipo == "danger")
		div_alert.find(".alert").html(msg).addClass('alert-danger');

	if (tipo == "info")
		div_alert.find(".alert").html(msg).addClass('alert-info');

	if (tipo == "warning")
		div_alert.find(".alert").html(msg).addClass('alert-warning');

	if (tipo == "hide")
		div_alert.hide();
	else {
		div_alert.show();
		$('body').animate({scrollTop: div_alert.find(".alert").offset().top},'slow');
	}
};

function verificaFormulario(formulario) {
	temp = true;

	$.each($(formulario+" input,"+formulario+" textarea,"+formulario+" select"), function(index, val) {
		var attr = $(this).attr('required'),
			valor = $(this).val(),
			type = $(this).attr('type'),
			temp_input = $(this).is('input'),
			temp_select = $(this).is('select');

		if (type === "submit")
			return true;

		if (temp_input)
			retiraErroInput(formulario+" input[name="+val.name+"]");
		if (temp_select)
			retiraErroInput(formulario+" select[name="+val.name+"]");

		// verifica primeiro o checkbox
		if (type === "checkbox" && attr !== false && $(this).is(":checked") === false) {
			colocarErroInput(formulario+" input[name="+val.name+"]");
			temp = false;
		}
		// depois verifica o resto
		else {
			if (typeof attr !== typeof undefined && attr !== false && valor == "") {
				if (temp_input)
					colocarErroInput(formulario+" input[name="+val.name+"]");
				if (temp_select)
					colocarErroInput(formulario+" select[name="+val.name+"]");
				
				temp = false;
			}
		}
	});

	return temp;
};

function colocarErroInput(input) {	
    $(input).closest(".form-group").addClass('has-error');
};

function retiraErroInput(input) {
    $(input).closest(".form-group").removeClass('has-error');
};