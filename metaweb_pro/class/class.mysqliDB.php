<?php

class mysqliDB {

	private $dbHost;
	private $dbUser;
	private $dbKey;
	private $dbDatabase;
	private $dbErro;
	private $dbConn;

	function __construct() {
		/*$this->dbHost = "localhost";
		$this->dbUser = "root";
		$this->dbKey = "";
		$this->dbDatabase = "metaweb_pro";
		$this->dbErro = "";*/
		$this->dbHost = "mysql.db4.net2.com.br";
		$this->dbUser = "webconsultor";
		$this->dbKey = "cassio";
		$this->dbDatabase = "webconsultor";
		$this->dbErro = "";
	}

	/*
	PRIVATE FUNCTIONS
	=========================================================================
	*/
	private function _connect() {
		@$this->dbConn = new mysqli($this->dbHost,$this->dbUser,$this->dbKey,$this->dbDatabase);

		if(mysqli_connect_errno()) {
			if($this->dbErro === "debug")
				trigger_error(htmlentities(mysqli_connect_error()), E_USER_ERROR);
			else
				return mysqli_connect_error();
		}
		else
			return true;
	}

	private function _disconnect() {
		return $this->dbConn->close();
	}

	private function _define_params($stmt,$param) {
		$new_array = $this->_fix_array_param($param);

		$ref = new ReflectionClass('mysqli_stmt');
		$method = $ref->getMethod("bind_param");
		$method->invokeArgs($stmt,$new_array);
	}

	private function _fix_array_param($param) {
		$new_array = array();
		$temp_types = "";

		// checking the types
		foreach ($param as $key => &$value) {
			if (is_int($value))
				$temp_types.= "i";
			elseif (is_float($value))
				$temp_types.= "d";
			elseif (is_string($value) || is_bool($value))
				$temp_types.= "s";
			else
				$temp_types.= "b";
		}

		array_push($new_array, $temp_types);
		$result = array_merge($new_array,$param);

		return $result;
	}

	private function _get_warning($stmt) {
		$stmt->prepare("show warnings limit 1");
		$stmt->execute();

		$result = $stmt->get_result();
		$array = array();
		while ($row = $result->fetch_object()) {
		    array_push($array, $row);
		}
		$result->free();

		return $array[0];
	}

	/*
	PUBLIC FUNCTIONS
	=========================================================================
	*/
	function select($sql,$param = null) {
		// trying to connect
		$this->_connect();

		// create the stmt and check if there is a sql error
		$temp_stmt =  $this->dbConn->stmt_init();
		if(!$temp_stmt->prepare($sql)) {
			if($this->dbErro === "debug")
				trigger_error(htmlentities($this->dbConn->error), E_USER_ERROR);
			else
				return $this->dbConn->error;
		}

		if(substr_count($sql,"?") > 0 && count($param) == 0) {
			if($this->dbErro === "debug")
				trigger_error(htmlentities("The number of params do not match with your SQL."), E_USER_ERROR);
			else
				return "The number of params do not match with your SQL.";	
		}

		// if param exist call the bind functions
		if($param != null && is_array($param)) {
			$temp_count = substr_count($sql, "?");
			if($temp_count != count($param)) {
				if($this->dbErro === "debug")
					trigger_error(htmlentities("Check your SQL queue and the array param."), E_USER_ERROR);
				else
					return "Check your SQL queue and the array param";	
			}

			$this->_define_params($temp_stmt,$param);
		}

		// execute the statement
		$temp_stmt->execute();

		// check the result
		$result = $temp_stmt->get_result();
		$array = array();
		while ($row = $result->fetch_object()) {
		    array_push($array, $row);
		}
		$result->free();

		$temp_stmt->close();
		$this->_disconnect();

		if (count($array) <= 0)
			return false;
		else
			return $array;
	}

	function insert($sql,$param = null) {
		// trying to connect
		$this->_connect();

		// create the stmt and check if there is a sql error
		$temp_stmt =  $this->dbConn->stmt_init();
		if(!$temp_stmt->prepare($sql)) {
			if($this->dbErro === "debug")
				trigger_error(htmlentities($this->dbConn->error), E_USER_ERROR);
			else
				return $this->dbConn->error;
		}

		if(substr_count($sql,"?") > 0 && count($param) == 0) {
			if($this->dbErro === "debug")
				trigger_error(htmlentities("The number of params do not match with your SQL."), E_USER_ERROR);
			else
				return "The number of params do not match with your SQL.";	
		}

		// if param exist call the bind functions
		if($param != null && is_array($param)) {
			$temp_count = substr_count($sql, "?");
			if($temp_count != count($param)) {
				if($this->dbErro === "debug")
					trigger_error(htmlentities("Check your SQL queue and the array param."), E_USER_ERROR);
				else
					return "Check your SQL queue and the array param.";	
			}

			$this->_define_params($temp_stmt,$param);
		}

		// execute the statement
		$temp_stmt->execute();

		$temp_row = $this->dbConn->affected_rows;
		$temp_id = $this->dbConn->insert_id;

		$temp_stmt->close();
		$this->_disconnect();

		if ($temp_row > 0)
			return $temp_id;
		else
			return false;
	}

	function update($sql,$param = null) {
		// trying to connect
		$this->_connect();

		// create the stmt and check if there is a sql error
		$temp_stmt =  $this->dbConn->stmt_init();
		if(!$temp_stmt->prepare($sql)) {
			if($this->dbErro === "debug")
				trigger_error(htmlentities($this->dbConn->error), E_USER_ERROR);
			else
				return $this->dbConn->error;
		}

		if(substr_count($sql,"?") > 0 && count($param) == 0) {
			if($this->dbErro === "debug")
				trigger_error(htmlentities("The number of params do not match with your SQL."), E_USER_ERROR);
			else
				return "The number of params do not match with your SQL.";	
		}

		// if param exist call the bind functions
		if($param != null && is_array($param)) {
			$temp_count = substr_count($sql, "?");
			if($temp_count != count($param)) {
				if($this->dbErro === "debug")
					trigger_error(htmlentities("Check your SQL queue and the array param."), E_USER_ERROR);
				else
					return "Check your SQL queue and the array param.";	
			}

			$this->_define_params($temp_stmt,$param);
		}

		// execute the statement
		$temp_stmt->execute();

		$temp_info = $this->dbConn->info;
		$temp_info = explode(" ", $temp_info);
		$temp_rows = $temp_info[2];
		$temp_changed = (int)$temp_info[5];
		$temp_warning = (int)$temp_info[8];


		// check if was warnings
		if($temp_warning > 0) {
			$return_warning = $this->_get_warning($temp_stmt);
			
			if($this->dbErro === "debug")
				trigger_error(htmlentities("Your SQL was saved. But returned some warning: ".$return_warning->Message), E_USER_ERROR);
			else
				return "Your SQL was saved. But returned some warning: ".$return_warning->Message;
		}

		$temp_stmt->close();
		$this->_disconnect();

		if ($temp_changed > 0)
			return true;
		else
			return false;
	}

	function delete($sql,$param = null) {
		// trying to connect
		$this->_connect();

		// create the stmt and check if there is a sql error
		$temp_stmt =  $this->dbConn->stmt_init();
		if(!$temp_stmt->prepare($sql)) {
			if($this->dbErro === "debug")
				trigger_error(htmlentities($this->dbConn->error), E_USER_ERROR);
			else
				return $this->dbConn->error;
		}

		if(substr_count($sql,"?") > 0 && count($param) == 0) {
			if($this->dbErro === "debug")
				trigger_error(htmlentities("The number of params do not match with your SQL."), E_USER_ERROR);
			else
				return "The number of params do not match with your SQL.";	
		}

		// if param exist call the bind functions
		if($param != null && is_array($param)) {
			$temp_count = substr_count($sql, "?");
			if($temp_count != count($param)) {
				if($this->dbErro === "debug")
					trigger_error(htmlentities("Check your SQL queue and the array param."), E_USER_ERROR);
				else
					return "Check your SQL queue and the array param.";	
			}

			$this->_define_params($temp_stmt,$param);
		}

		// execute the statement
		$temp_stmt->execute();

		$temp_row = $this->dbConn->affected_rows;

		$temp_stmt->close();
		$this->_disconnect();

		if ($temp_row > 0)
			return true;
		else 
			return false;
	}

}


?>