<?php
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.cadastroDB.php");

$oCadastroDB = new cadastroDB();

$nome = (isset($_POST['nome'])) ? $_POST['nome'] : "";
$email = (isset($_POST['email'])) ? $_POST['email'] : "";
$telefone = (isset($_POST['telefone'])) ? $_POST['telefone'] : "";
$atuacao = (isset($_POST['atuacao'])) ? $_POST['atuacao'] : "";
$atuacao_outro = (isset($_POST['atuacao_outro'])) ? $_POST['atuacao_outro'] : "";
$admin_sites = (isset($_POST['admin_sites'])) ? $_POST['admin_sites'] : "";
$admin_sites_extra = (isset($_POST['admin_sites_extra'])) ? $_POST['admin_sites_extra'] : "";
$envioEmail = (isset($_POST['envioEmail'])) ? $_POST['envioEmail'] : "";


$retorno = $oCadastroDB->inserirCadastro(array($nome,$email,$telefone,$atuacao,$atuacao_outro,$admin_sites,$admin_sites_extra));
if ($retorno != false)
	echo json_encode(array("controle"=>true));
else
	echo json_encode(array("controle"=>false));