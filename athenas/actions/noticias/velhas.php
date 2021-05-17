<?php
header('Content-type: text/html; charset=ISO-8859-1');
require_once($_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class.postsBD.php");
$oPostBD = new postsBD();

$tmp_id = $_POST['id'];
$tmp_data = $_POST['data'];

$retorno_posts = $oPostBD->select_after($tmp_id,$tmp_data);

if ($retorno_posts == false)
	exit("nada");

foreach ($retorno_posts as $key => $post) {
	$tmp_data = date_format(date_create($post->data), "d/m/Y");
	$tmp_img = ($post->imagem != "") ? "/admin/img/upload/".$post->imagem : "http://via.placeholder.com/350x250?text=Sem+imagem";
?>

<div class="col-xs-12 col-sm-8 col-sm-offset-2">
	<div class="card-news clearfix" data-url="/noticias/<?=utf8_decode($post->url)?>" data-idd=<?=$post->id?> data-quando="<?=$post->data?>">
		<div class="imagem" style="background-image: url(<?=$tmp_img?>);"></div>
		<div class="texto">
			<h4><?=utf8_decode($post->headline)?></h4>
			<p><?=utf8_decode($post->descricao)?></p>
			<span class="label label-default"><i class="fa fa-calendar" aria-hidden="true"></i> <?=$tmp_data?></span>
		</div>
	</div>
</div>

<? } ?>