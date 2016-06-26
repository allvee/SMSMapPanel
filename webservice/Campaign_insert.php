<?php
//campaignname, 
//    NAME, 
//    STATUS, 
//    channels, 
//    estbudget, 
//    spent, 
//    smsno, 
//    startdate, 
//    enddate, 
//    starttime, 
//    endtime

 $campaignname =	$_REQUEST["campaignname"];
$NAME =	$_REQUEST["NAME"];
$STATUS =	$_REQUEST["STATUS"];
$channels =	$_REQUEST["channels"];
$estbudget =	$_REQUEST["estbudget"];
$spent =	$_REQUEST["spent"];
$smsno =	$_REQUEST["smsno"];
$startdate =	$_REQUEST["startdate"];
$enddate =	$_REQUEST["enddate"];
$starttime =	$_REQUEST["starttime"];
$endtime=	$_REQUEST["endtime"];

$date=date_create($startdate);
$startdate= date_format($date,"Y-m-d H:i:s");


$date=date_create($enddate);
$enddate= date_format($date,"Y-m-d H:i:s");

session_start();
$userName=$_SESSION['username'];
$userType=$_SESSION['usertype'];
$CreatedBy=$_SESSION['username'];
include_once "lib/config1.php";
  session_start();
$cn = connectDB();
 
//$query = "exec pSInsuranceInfo '" . $fld1 ."'";



$query = "insert into 	campaign (campaignname, 	NAME, 	STATUS, 	channels, 	estbudget, 	spent, 	smsno, 	startdate, 	enddate, 	starttime, 	endtime,createdby)
	                     VALUES  ('$campaignname','$NAME','$STATUS','$channels','$estbudget','$spent','$smsno','$startdate','$enddate','$starttime','$endtime','$_SESSION[id]')  ";

 $ret = Sql_exec($cn, $query);

echo json_encode($ret); 
?>