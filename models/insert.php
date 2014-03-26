<?php
class DB
	public function _construct(){
		// Try creating a new PDO connection to DB
		try {
			$dsn="mysql:dbname=users;host:127.0.0.1";
			$db_user="root";
			$db_pass="root";

			$this->db=new PDO[$dsn,$db_user, $db_pass];
			} catch (PDOException $error){
				var_dump ($error);
				}
		
			
		}

?>

 