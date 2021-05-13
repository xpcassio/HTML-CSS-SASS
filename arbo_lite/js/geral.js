$(document).ready(function() {

	// LINKS DE ROLAGEM DE PAGINA
	$("a[href='#scrollTop']").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

	$(".links-menus").on("click", function() {
		$("html, body").animate({ scrollTop: $($(this).data('acc')).offset().top-30 }, "slow");
	});

	function _rolaMenu(adonde) {
		if (adonde === "h1-servicos")
			
		if (adonde === "h1-quemsomos")
			$("html, body").animate({ scrollTop: $("."+adonde).offset().top }, "slow");
		if (adonde === "h1-contato")
			$("html, body").animate({ scrollTop: $("."+adonde).offset().top }, "slow");
	};

	// READ MORE
	$(".btn-readMore").on("click", function() {
		var temp = $(this).html();
		
		console.log(temp);

		if (temp === "Fechar") {
			$(this).html("Leia Mais");
			//$(this).closest('.solucao-icon').find(".text-more").fadeOut('slow');
			$(this).closest('.solucao-icon').find(".text-more").animate({
				opacity: 0.15,
				height: "toggle"
			},"slow");
		}

		if (temp === "Leia Mais") {
			$(this).html("Fechar");
			//$(this).closest('.solucao-icon').find(".text-more").fadeIn('slow');
			$(this).closest('.solucao-icon').find(".text-more").animate({
				opacity: 1,
				height: "toggle"
			},"slow");
		}
	});

	// GOOGLE MAPS
	var styleArray = [
	{
		featureType: "all",
		stylers: [
			{ saturation: -80 }
		]
	},
	{
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [
			{hue: "#00ffee"},
			{saturation: 50}
		]
	},
	{
		featureType: "poi.business",
		elementType: "labels",
		stylers: [
			{visibility: "off"}
		]
	}
	];

	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -1.450824, lng: -48.496452},
		scrollwheel: false,
		styles: styleArray,
		zoom: 17
	});

	var image = 'img/map/pin.png';
	var beachMarker = new google.maps.Marker({
		position: {lat: -1.450824, lng: -48.496452},
		map: map,
		icon: image
	});

	// FORMULARIO
	$("form").submit(function( event ) {
		event.preventDefault();
	});

	_cleanForm();

	$("#formContato .form-control").on("focusout", function() {
		var tempName = $(this).attr('name'),
			tempIsTextarea = $(this).is('textarea');

		if (!tempIsTextarea)
			_retiraValidacaoInput("input[name="+tempName+"]");
		else
			_retiraValidacaoInput("textarea[name="+tempName+"]");
	});

	$(".btn-formulario").on("click", function() {
		_alertGeral("hide");

		if (_verificaFormulario()) {
			$.ajax({
				url: 'action/acaoForm_mensagem.php',
				type: 'POST',
				dataType: 'json',
				data: $("#formContato").serializeArray(),
				success: function(retorno) {
					if (!retorno.erro) {
						_alertGeral("success","Mensagem enviada com <strong>sucesso!</strong> Em ate 24h entraremos em contato via telefone e/ou email.");
					}
					else
						_alertGeral("danger","<strong>Atenção!</strong> Infelizmente não foi possivel enviar sua mensagem. Aguarde alguns minutos e tente novamente, ou entre em contato pelo telefone <a href='tel:9140068800'>(91) 4006-8800</a>.");
				}
			});
		}
		else {
			_alertGeral("danger","<strong>Atenção!</strong> Verifique os campos em vermelhos no formulario não podem estar em branco.");
		}
	});
});

function _alertGeral(tipo,msg) {
	$(".div_alert").find(".alert").removeClass('alert-success').removeClass('alert-danger');

	if (tipo === "hide") {
		$(".div_alert").hide();
		$(".div_alert").find(".alert").html("");
	}
	if (tipo === "success") {
		$(".div_alert").find(".alert").addClass('alert-success').html(msg);
		$(".div_alert").show();
	}
	if (tipo === "danger") {
		$(".div_alert").find(".alert").addClass('alert-danger').html(msg);
		$(".div_alert").show();
	}
};

function _cleanForm() {
	$("#formContato .form-control").each(function(index, el) {
		var tempName = el.name,
			tempIsTextarea = $(this).is('textarea');

		$(this).val("");

		if (!tempIsTextarea)
			_retiraValidacaoInput("input[name="+tempName+"]");
		else
			_retiraValidacaoInput("textarea[name="+tempName+"]");
	});
};

function _verificaFormulario() {
	var tempRetorno = true;

	$("#formContato .form-control").each(function(index, el) {
		var tempValor = $(this).val(),
			tempName = el.name,
			tempIsTextarea = $(this).is('textarea');

		if (!tempIsTextarea)
			_retiraValidacaoInput("input[name="+tempName+"]");
		else
			_retiraValidacaoInput("textarea[name="+tempName+"]");

		if (tempValor === "") {
			if (!tempIsTextarea)
				_colocaValidacaoInput("input[name="+tempName+"]");
			else
				_colocaValidacaoInput("textarea[name="+tempName+"]");

			tempRetorno = false;
		}
	});

	return tempRetorno;
};

function _colocaValidacaoInput(nomeInput) {
	$(nomeInput).closest('.form-group').addClass('has-error');
};

function _retiraValidacaoInput(nomeInput) {
	$(nomeInput).closest('.form-group').removeClass('has-error');
};