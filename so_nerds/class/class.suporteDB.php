<?php
require_once($_SERVER['DOCUMENT_ROOT']."/class/class.mysqliDB.php");

class suporteDB {

	function inserir($array) {
		$oMysqliDB = new mysqliDB();

		$sql = "insert into suporte (assunto,hardware,software,problema_hardware,problema_software,mensagem,anexos,status,usuarios_id) values (?,?,?,?,?,?,?,'aberto',?)";

		$retorno = $oMysqliDB->insert($sql,$array);
		if($retorno)
			return $retorno;
		else
			return false;
	}

	function getTicket($array) {
		$oMysqliDB = new mysqliDB();

		$sql = "select SU.*,US.nome ";
		$sql.= "from suporte SU inner join usuarios US ";
		$sql.= "on SU.usuarios_id = US.id ";
		$sql.= "where SU.id=?";
		$retorno = $oMysqliDB->select($sql,$array);

		if(is_array($retorno))
			return $retorno[0];
		else
			return false;
	}

	function mudaStatus($array) {
		$oMysqliDB = new mysqliDB();

		$sql = "update suporte set status = ? where id=?";

		$retorno = $oMysqliDB->update($sql,$array);
		if($retorno)
			return true;
		else
			return false;
	}

}

?>