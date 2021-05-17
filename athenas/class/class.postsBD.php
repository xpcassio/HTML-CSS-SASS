<?php
require_once($_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR."admin".DIRECTORY_SEPARATOR."class".DIRECTORY_SEPARATOR."class.mysqliDB.php");

class postsBD {
	
	function select_limit($limit) {
		$oMysqli = new mysqliDB();

		$sql = "SELECT * FROM posts WHERE status != 0 ORDER BY data DESC LIMIT $limit";
		$vObjeto = $oMysqli->select($sql);

		if (is_array($vObjeto))
			return $vObjeto;
		else
			return false;
	}

	/*function select_one($id) {
		$oMysqli = new mysqliDB();

		$sql = "SELECT * FROM posts WHERE id = ?";
		$vObjeto = $oMysqli->select($sql,array($id));

		if (is_array($vObjeto))
			return $vObjeto[0];
		else
			return false;
	}*/

	function select_novos($id,$data) {
		$oMysqli = new mysqliDB();

		$sql = "SELECT * FROM posts WHERE data > ? AND id != ? ORDER BY data DESC LIMIT 10";
		$vObjeto = $oMysqli->select($sql,array($data,$id));

		if (is_array($vObjeto))
			return $vObjeto;
		else
			return false;
	}

	function select_after($id,$data) {
		$oMysqli = new mysqliDB();

		$sql = "SELECT * FROM posts WHERE data < ? AND id != ? ORDER BY data DESC LIMIT 10";
		$vObjeto = $oMysqli->select($sql,array($data,$id));

		if (is_array($vObjeto))
			return $vObjeto;
		else
			return false;
	}

	/*function select_last() {
		$oMysqli = new mysqliDB();

		$sql = "SELECT * FROM posts ORDER BY data DESC LIMIT 1";
		$vObjeto = $oMysqli->select($sql);

		if (is_array($vObjeto))
			return $vObjeto[0];
		else
			return false;
	}*/

}