<?php
	include_once "lib/config1.php";
	session_start();
	$cn = connectDB();
	
	$query = "SELECT * FROM users WHERE username='{$_POST['username']}' AND password ='{$_POST['password']}' ";
	
        //$query = "SELECT * FROM users WHERE username='admin' AND password ='admin' limit 1";

	$result = Sql_exec($cn, $query);
	$i = 0;
	$data = "";

	while ($row = Sql_fetch_array($result)) {
		
		$data['id'] = Sql_Result($row, "id");
		$data['name'] = Sql_Result($row, "name");
		$data['username'] = Sql_Result($row, "username");
		$data['password'] = Sql_Result($row, "password");
		$data['usertype'] = Sql_Result($row, "usertype");
		$data['hasCredit'] = Sql_Result($row, "hasCradit");
		
	}
	$_SESSION["id"] =$data['id'];
	$_SESSION["name"] =$data['name'];
	$_SESSION["username"] =$data['username'];
	$_SESSION["password"] =$data['password'];
	$_SESSION["usertype"] =$data['usertype'];
	$_SESSION["hasCredit"] =$data['hasCredit'];
	//print_r($_SESSION);
	$login = json_encode($data);
	
	if ($login == '[]'){
		echo false;
	}else{
		echo $login;
	}
	die();
?>