<?php
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.usuarioDB.php");
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.profissionalDB.php");

session_start();

$oUsuarioDB = new usuarioDB();
$oProfissionalDB = new profissionalDB();

$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : "";
$senha = (isset($_POST['senha'])) ? $_POST['senha'] : "";

$retorno = $oUsuarioDB->login(array($usuario,$senha));
$retorno1 = $oProfissionalDB->login(array($usuario,$senha));

// caso os dois retornos sejam false
if (!$retorno && !$retorno1) {
	echo json_encode(array("controle"=>false));
	exit();
}

// caso seja usuario
if ($retorno != false)
	$_SESSION['tipo'] = "usuario";

// caso seja profissional
if ($retorno1 != false)
	$_SESSION['tipo'] = "profissional";

$_SESSION['usuario'] = $usuario;
$_SESSION['senha'] = $senha;

echo json_encode(array("controle"=>true));