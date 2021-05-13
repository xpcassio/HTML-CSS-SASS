<?php

$li_quem = (isset($temp_li_quem)) ? "active" : "";
$li_servico = (isset($temp_li_servico)) ? "active" : "";
$li_tec = (isset($temp_li_tec)) ? "active" : "";
$li_blog = (isset($temp_li_blog)) ? "active" : "";
$li_contato = (isset($temp_li_contato)) ? "active" : "";

?>

<nav class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="index.php">
				<img src="img/logo3.png" alt="logo">
			</a>
		</div>

		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav navbar-right">
				<li class="<?=$li_quem?>">
					<a href="quemsomos.php"><i class="fa fa-question-circle-o fa-lg" aria-hidden="true"></i> Quem Somos</a>
				</li>
				<li class="<?=$li_servico?>">
					<a href="servicos.php"><i class="fa fa-envira" aria-hidden="true"></i> Serviços</a>
				</li>
				<li class="<?=$li_tec?>">
					<a href="tecnologia.php"><i class="fa fa-gears" aria-hidden="true"></i> Tecnologia</a>
				</li>
				<li class="<?=$li_blog?>">
					<a href="blog.php"><i class="fa fa-commenting-o" aria-hidden="true"></i> Blog</a>
				</li>
				<li class="<?=$li_contato?>">
					<a href="contato.php"><i class="fa fa-envelope-o" aria-hidden="true"></i> Contato</a>
				</li>
			</ul>
		</div>
	</div>	
</nav>