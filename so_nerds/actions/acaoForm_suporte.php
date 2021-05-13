<?php
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.suporteDB.php");
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.usuarioDB.php");

session_start();

$oSuporteDB = new suporteDB();
$oUsuarioDB = new usuarioDB();

$idd = (isset($_POST['idd'])) ? $_POST['idd'] : "";
$assunto = (isset($_POST['assunto'])) ? $_POST['assunto'] : "";
$hardware = (isset($_POST['hardware'])) ? $_POST['hardware'] : "";
$software = (isset($_POST['software'])) ? $_POST['software'] : "";
$problema_hardware = (isset($_POST['problema_hardware'])) ? $_POST['problema_hardware'] : "";
$problema_hardware = (isset($_POST['problema_hardware'])) ? $_POST['problema_hardware'] : "";
$mensagem = (isset($_POST['mensagem'])) ? $_POST['mensagem'] : "";

// arrumando valores do hardware e software
$hardware = ($hardware) ? 1 : 0;
$software = ($software) ? 1 : 0;

// pegando o id do usuario
$usuario = (isset($_SESSION['usuario'])) ? $_SESSION['usuario'] : "";
$senha = (isset($_SESSION['senha'])) ? $_SESSION['senha'] : "";

$retorno_user = $oUsuarioDB->login(array($usuario,$senha));
$retorno_suporte = $oSuporteDB->inserir(array($assunto,$hardware,$software,$problema_hardware,$problema_hardware,$mensagem,$idd,$retorno_user->id));

if ($retorno_suporte != false)
	echo json_encode(array("controle"=>true,"idd"=>$retorno_suporte));
else
	echo json_encode(array("controle"=>false));