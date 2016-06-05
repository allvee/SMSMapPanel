<?php


$id =	$_REQUEST["id"];


include_once "lib/config1.php";
$cn = connectDB();
 


$query = " delete from `group`  where   id=$id  ";


 $ret = Sql_exec($cn, $query);

echo json_encode($ret); 
?>