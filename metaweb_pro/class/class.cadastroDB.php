<?php
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.mysqliDB.php");

class cadastroDB {

function inserirCadastro($array) {
	$oMysqliDB = new mysqliDB();

	$sql = "insert into cadastros (nome,email,telefone,atuacao,atuacao_extra,site_adm,servicos) values (?,?,?,?,?,?,?)";

		$retorno = $oMysqliDB->insert($sql,$array);
		if($retorno)
			return $retorno;
		else
			return false;
}

}