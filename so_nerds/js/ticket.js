$(document).ready(function(){

/*  ATUALIZAÇÕES EM GERAL
    ================================================= */
	$("form").submit(function (e) {
        e.preventDefault(); // this will prevent from submitting the form.
    });

/*  ADICIONAR INTERAÇAO
    ================================================= */
    $(".btn-interacao").on("click", function() {
    	if ($("#div_add_int").is(":visible"))
    		$("#div_add_int").slideUp('slow', function() {
    			$(this).hide();
    		});
    	else
    		$("#div_add_int").slideDown('slow', function() {
    			$(this).show();
    		});
    });

/*  UPLOAD
    ================================================= */
    var controle_upload = false,
        controle_error = false,
        uniq = (new Date()).getTime(),
        uploader = new plupload.Uploader({
            runtimes : 'html5,html4',
            browse_button : 'pickfiles',
            container: document.getElementById('container_upload'),
            url : "actions/acaoForm_upload.php?id="+uniq,
            init: {
                FilesAdded: function(up, files) {
                    $("#filelist_upload").show();

                    plupload.each(files, function(file) {
                        $("#filelist_upload").find(".list-group").append('<li class="list-group-item li_upload_'+file.id+'"><i class="fa fa-lg fa-file-o" aria-hidden="true"></i>'+file.name+' ('+plupload.formatSize(file.size)+')<i class="fa fa-exclamation-triangle pull-right text-warning link_atencao link_atencao_'+file.id+'" data-toggle="tooltip" data-placement="left" title=""></i><i class="fa fa-check-circle pull-right text-success link_uploaded link_uploaded_'+file.id+'"></i><i class="fa fa-circle-o-notch fa-spin pull-right link_action link_action_'+file.id+'"></i><a href="javascript:;" class="link_upload pull-right link_upload_'+file.id+'"" data-idd="'+file.id+'"><i class="fa fa-times fa-lg"></i></a></li>');
                    });
                },
                FilesRemoved: function(up, files) {
                    plupload.each(files, function(file) {
                        $(".li_upload_"+file.id).remove();
                    });

                    if ($("#filelist_upload").find(".list-group-item").length == 0)
                        $("#filelist_upload").hide();
                },
                BeforeUpload: function(up, files) {
                    $(".link_upload").hide();
                },
                UploadProgress: function(up, file) {
                    $(".link_action_"+file.id).show();
                },
                FileUploaded: function(up, file, info) {
                    var response = jQuery.parseJSON(info.response);
                    if (response.result) {
                        $(".link_action_"+file.id).hide();
                        $(".link_uploaded_"+file.id).show();
                    }
                    else {
                        $(".link_action_"+file.id).hide();
                        $(".link_atencao_"+file.id).show();
                        controle_error = true;
                    }               
                },
                UploadComplete: function(up, files) {
                    if (controle_error)
                        alertPrincipal("warning","<strong>Não foi possivel fazer o upload de um ou mais arquivos</strong>. Verifique a lista acima onde <i class=\"fa fa-exclamation-triangle\"></i> significa que ocorreu um erro e <i class=\"fa fa-check-circle\"></i> significa que o arquivo foi enviado com sucesso. <strong>Verifique seus arquivos, atualize a pagina e tente novamente!</strong>");
                    else {
                        // CONSERTAR ISSO AQUI
                        $(".btn-responder").trigger("trg_salva",[temp_tipo_int,temp_btn_int]);
                    }

                    controle_upload = true;
                }
            }
        });

    uploader.init();

    $("#pickfiles").on("click", function() {
        // caso nao seja a primeira vez que esteja sendo executado o upload
        if (controle_upload) {
            controle_upload = false;
            controle_error = false;

            uploader.refresh();
            uploader.splice();
        }
    });

    $("body").on("click",".link_upload", function() {
        var temp_idd = $(this).data('idd');

        $.each(uploader.files, function(i, file) {
            if (file && file.id == temp_idd) {
                uploader.removeFile(file);
            }
        });

        if ($("#filelist_upload").find(".list-group-item").length == 0)
            $("#filelist_upload").hide();
    });

/*  SALVANDO TUDO
    ================================================= */
    var temp_tipo_int = "",
        temp_btn_int = "";

    $("#formInteracao textarea").on("focusout", function() {
        retiraErroInput("#formInteracao textarea[name="+$(this).attr('name')+"]");
    });

    $(".btn-responder").on("click", function() {
        var temp_upload = $("#filelist_upload").find(".list-group-item").length;

        if (temp_upload > 0 && verificaFormulario("#formInteracao")) {
            temp_tipo_int = "aberto";
            temp_btn_int = ".btn-responder";
            uploader.start();
        }
        else
            $(".btn-responder").trigger("trg_salva",["aberto",".btn-responder"]);
    });

    $(".btn-reabrir").on("click", function() {
        var temp_upload = $("#filelist_upload").find(".list-group-item").length;

        if (temp_upload > 0 && verificaFormulario("#formInteracao")) {
            temp_tipo_int = "aberto";
            temp_btn_int = ".btn-reabrir";
            uploader.start();
        }
        else
            $(".btn-responder").trigger("trg_salva",["aberto",".btn-reabrir"]);
    });

    $(".btn-finalizar").on("click", function() {
        var temp_upload = $("#filelist_upload").find(".list-group-item").length;

        if (temp_upload > 0 && verificaFormulario("#formInteracao")) {
            temp_tipo_int = "finalizado";
            temp_btn_int = ".btn-finalizar";
            uploader.start();
        }
        else
            $(".btn-responder").trigger("trg_salva",["finalizado",".btn-finalizar"]);
    });

    $(".btn-responder").on("trg_salva", function(event,tipo,btn) {
        var btn = $(btn);

        if (verificaFormulario("#formInteracao")) {
            btn.button('loading');

            $.ajax({
                url: "actions/acaoForm_ticket.php",
                data: {
                    idd:uniq,
                    status:tipo,
                    suporte_id:$("input[name=suporte_id]").val(),
                    tipo:$("input[name=tipo]").val(),
                    interacao:$("#formInteracao textarea[name=interacao]").val()
                },
                dataType: "json",
                type: "post",
                success: function(r) {
                    console.log(r);
                    if(r.controle) {
                        alertPrincipal("success","Interação salva com sucesso. Em 5 segundos sua pagina sera atualizada!");
                        setTimeout(function(){ location.reload(); }, 5000);
                    }
                    else {
                        alertPrincipal("warning","Erro ao salvar interação!");
                    }
                }
            }).always(function() {
                btn.button('reset');
            });
        }
    });

/*  DOWNLOAD
    ================================================= */
    $("body").on("click",".link-download",function() {
        var temp_caminho = $(this).data("caminho");

        download_jq('actions/forcaDownload.php','caminho='+temp_caminho);
    });

/*  LOGOUT
    ================================================= */
    $(".btn-logout").on('click', function() {
        $.ajax({
            url: "actions/acaoForm_logout.php",
            dataType: "json",
            type: "post",
            success: function(r) {
                window.location.replace("/");
            }
        });
    });

}); /* $(document).ready() */

/* FUNÇÕES ================================================= */
function alertPrincipal(tipo,msg) {
	div_alert = $("#div_alertGeral");

	div_alert.find(".alert").removeClass('alert-danger').removeClass('alert-success').removeClass('alert-info').removeClass('alert-warning');

	if (tipo == "success")
		div_alert.find(".alert").html(msg).addClass('alert-success');

	if (tipo == "danger")
		div_alert.find(".alert").html(msg).addClass('alert-danger');

	if (tipo == "info")
		div_alert.find(".alert").html(msg).addClass('alert-info');

	if (tipo == "warning")
		div_alert.find(".alert").html(msg).addClass('alert-warning');

	if (tipo == "hide")
		div_alert.hide();
	else
		div_alert.show();
};

function verificaFormulario(formulario) {
    temp = true;

    $.each($(formulario+" input,"+formulario+" textarea"), function(index, val) {
        var attr = $(this).attr('required'),
            valor = $(this).val(),
            type = $(this).attr('type'),
            temp_input = $(this).is('input'),
            temp_select = $(this).is('select'),
            temp_textarea = $(this).is('textarea');

        if (type === "submit")
            return true;

        if (temp_input)
            retiraErroInput(formulario+" input[name="+val.name+"]");
        if (temp_select)
            retiraErroInput(formulario+" select[name="+val.name+"]");
        if (temp_textarea)
            retiraErroInput(formulario+" textarea[name="+val.name+"]");

        // verifica primeiro o checkbox
        if (type === "checkbox" && typeof attr !== typeof undefined && $(this).is(":checked") === false) {
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
                if (temp_textarea)
                    colocarErroInput(formulario+" textarea[name="+val.name+"]");
                
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

function download_jq(url, data, method){
    //url and data options required
    if( url && data ){ 
        //data can be string of parameters or array/object
        data = typeof data == 'string' ? data : jQuery.param(data);
        //split params into form inputs
        var inputs = '';
        jQuery.each(data.split('&'), function(){ 
            var pair = this.split('=');
            inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
        });
        //send request
        jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
        .appendTo('body').submit().remove();
    };
};