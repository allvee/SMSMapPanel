<?php
	include_once "config.php";
	session_start();
	//print_r($_SESSION);

	$query = "SELECT * FROM layout  WHERE usertype='$_SESSION[usertype]' LIMIT 0,1";

//echo $query;
$result = mysql_query($query) or die(mysql_error());

	$str=formatJSON($result);

echo($str);
?>