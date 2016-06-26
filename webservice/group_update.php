<?php
//campaignname, 
//    NAME, 
//    email, 
//    DATE, 
//    company, 
//    city, 
//    zipcode, 
//    startdate, 
//    enddate, 
//    starttime, 
//    endtime

$campain_list =	$_REQUEST["campain_list_dropdown"];
$number_list =	$_REQUEST["number_list_dropdown"];
$campaign_id=$_REQUEST["campaign_id"];
$Message =	$_REQUEST["Message"];
$id =	$_REQUEST["id"];

include_once "lib/config1.php";
 session_start();
$cn = connectDB();

$query = " update `group` set updatedby= '$_SESSION[id]',  campaign_name='$campain_list', campaign_id='$campaign_id', number_list_Name='$number_list',date=now(),message='$Message' where   id='$id' ";

//$query = "insert into 	`group` ( 	name, 	email, 	date, 	company, 	city, 	zipcode)
//                         VALUES  ( '$NAME','$email','$DATE','$company','$city','$zipcode' )  ";
//echo $query; exit;

 $ret = Sql_exec($cn, $query);

echo json_encode($ret); 
?>