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
$campaign_id=$_REQUEST["campaign_id"];
$number_list =	$_REQUEST["number_list_dropdown"];
//$DATE =	$_REQUEST["date"];
$Message =	$_REQUEST["Message"];
//$Status =	$_REQUEST["Status"];
//$zipcode =$_REQUEST["zipcode"];
//$date=date_create($DATE);
//$DATE= date_format($date,"Y-m-d H:i:s");

include_once "lib/config1.php";
$cn = connectDB();
 

$query = "insert into `group` ( campaign_name, campaign_ID, number_list_Name, date, message, status)
	                     VALUES  ('$campain_list', '$campaign_id', '$number_list', now(), '$Message','QUE')";

 $ret = Sql_exec($cn, $query);
//echo $query;
echo json_encode($ret); 
?>