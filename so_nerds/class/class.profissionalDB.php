<?php
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.mysqliDB.php");

class profissionalDB {

	function login($array) {
		$oMysqliDB = new mysqliDB();

		$sql = "select * from profissionais where email=? and senha=?";

		$retorno = $oMysqliDB->select($sql,$array);
		if(is_array($retorno))
			return $retorno[0];
		else
			return false;
	}

}

?>