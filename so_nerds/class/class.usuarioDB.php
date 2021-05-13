<?php
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.mysqliDB.php");

class usuarioDB {

	function inserir($array) {
		$oMysqliDB = new mysqliDB();

		$sql = "insert into usuarios (nome,email,telefone,senha) values (?,?,?,?)";

		$retorno = $oMysqliDB->insert($sql,$array);
		if($retorno)
			return $retorno;
		else
			return false;
	}

	function login($array) {
		$oMysqliDB = new mysqliDB();

		$sql = "select * from usuarios where email=? and senha=?";

		$retorno = $oMysqliDB->select($sql,$array);
		if(is_array($retorno))
			return $retorno[0];
		else
			return false;
	}

}

?>