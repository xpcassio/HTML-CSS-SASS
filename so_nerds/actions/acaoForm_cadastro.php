<?php
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.usuarioDB.php");
$oUsuarioDB = new usuarioDB();

$nome = (isset($_POST['nome'])) ? $_POST['nome'] : "";
$email = (isset($_POST['email'])) ? $_POST['email'] : "";
$telefone = (isset($_POST['telefone'])) ? $_POST['telefone'] : "";
$senha = (isset($_POST['senha'])) ? $_POST['senha'] : "";

$retorno = $oUsuarioDB->inserir(array($nome,$email,$telefone,$senha));

if ($retorno != false)
	echo json_encode(array("controle"=>true));
else
	echo json_encode(array("controle"=>false));

?>