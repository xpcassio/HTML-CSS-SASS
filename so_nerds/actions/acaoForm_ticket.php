<?php
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.suporteDB.php");
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.ticketDB.php");

$oSuporteDB = new suporteDB();
$oTicketDB = new ticketDB();

$idd = (isset($_POST['idd'])) ? $_POST['idd'] : "";
$status = (isset($_POST['status'])) ? $_POST['status'] : "";
$suporte_id = (isset($_POST['suporte_id'])) ? $_POST['suporte_id'] : "";
$tipo = (isset($_POST['tipo'])) ? $_POST['tipo'] : "";
$interacao = (isset($_POST['interacao'])) ? $_POST['interacao'] : "";

// modificando o status do suporte
$retorno = $oSuporteDB->mudaStatus(array($status,$suporte_id));

// adicionando a interacao ao banco de dados
$retorno1 = $oTicketDB->inserir(array($interacao,$idd,$tipo,$suporte_id));

if ($retorno && $retorno1)
	echo json_encode(array("controle"=>true));
else
	echo json_encode(array("controle"=>false));