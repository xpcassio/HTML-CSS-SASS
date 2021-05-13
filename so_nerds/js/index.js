$(document).ready(function(){

/*  ATUALIZAÇÕES EM GERAL
    ================================================= */
	$("form").submit(function (e) {
        e.preventDefault(); // this will prevent from submitting the form.
    });

/*  LOGIN
    ================================================= */
    $("#formLogin input").on("focusout", function() {
		retiraErroInput("#formLogin input[name="+$(this).attr('name')+"]");
	});

	$(".btn-login").on('click', function() {
    	var btn = $(this);

    	if (verificaFormulario("#formLogin")) {
    		btn.button('loading');

    		$.ajax({
                url: "actions/acaoForm_login.php",
                data: {usuario:$("#formLogin input[name=usuario]").val(),senha:$("#formLogin input[name=senha]").val()},
                dataType: "json",
                type: "post",
                success: function(r) {
                	if (r.controle)
                		location.reload();
                	else {
                		$("#modalCadastro").find(".modal-title").html('<span class="text-danger"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Erro no Log in!</span>');
                		$("#modalCadastro").find(".text-modal").html('Verifique Usuario e senha...');
                		$("#modalCadastro").modal('show');
                	}
                }
            }).always(function() {
	        	btn.button('reset');
	        });
    	}
    });

/*  LOGOUT
    ================================================= */
    $(".btn-logout").on('click', function() {
    	$.ajax({
            url: "actions/acaoForm_logout.php",
            dataType: "json",
            type: "post",
            success: function(r) {
            	location.reload();
            }
        });
    });

/*  FORMULARIO
    ================================================= */
    $("#form_cadastro input").on("focusout", function() {
		retiraErroInput("#form_cadastro input[name="+$(this).attr('name')+"]");
	});

    $(".btn-cadastrar").on('click', function() {
    	var btn = $(this);

    	if (verificaFormulario("#form_cadastro")) {
    		btn.button('loading');

    		$.ajax({
                url: "actions/acaoForm_cadastro.php",
                data: {nome:$("#form_cadastro input[name=nome]").val(),email:$("#form_cadastro input[name=email]").val(),telefone:$("#form_cadastro input[name=telefone]").val(),senha:$("#form_cadastro input[name=senha]").val(),envioEmail:$("#form_cadastro input[name=envioEmail]").is(":checked")},
                dataType: "json",
                type: "post",
                success: function(r) {
                	if(r.controle) {
                		$("#modalCadastro").find(".modal-title").html('<span class="text-success"><i class="fa fa-check-circle" aria-hidden="true"></i> Cadastro salvo com sucesso!</span>');
                		$("#modalCadastro").modal('show');
                	}
                	else {
                		$("#modalCadastro").find(".modal-title").html('<span class="text-danger"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Erro ao salvar cadastro!</span>');
                		$("#modalCadastro").modal('show');
                	}
                }
            }).always(function() {
	        	btn.button('reset');
	        });
    	}
    });

}); /* $(document).ready() */

/* FUNÇÕES ================================================= */
function verificaFormulario(formulario) {
	temp = true;

	$.each($(formulario+" input"), function(index, val) {
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