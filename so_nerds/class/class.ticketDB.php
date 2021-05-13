<?php
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.mysqliDB.php");

class ticketDB {

	function inserir($array) {
		$oMysqliDB = new mysqliDB();

		$sql = "insert into interacoes (interacao,anexos,tipo,suporte_id) values (?,?,?,?)";

		$retorno = $oMysqliDB->insert($sql,$array);
		if($retorno)
			return $retorno;
		else
			return false;
	}

	function all($array) {
		$oMysqliDB = new mysqliDB();

		$sql = "select * from interacoes where suporte_id = ? order by id desc";
		$retorno = $oMysqliDB->select($sql,$array);
		if($retorno)
			return $retorno;
		else
			return false;
	}

}

?>