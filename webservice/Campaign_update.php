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
$id =	$_REQUEST["id"];

//echo $startdate1 =date($startdate);
 
//echo strtotime("12/31/2004");// $enddate1 =date($enddate); 
//echo "12/31/2004 - %V,%G,%Y = " . strftime("%V,%G,%Y",strtotime("12/31/2004")) . "\n";

//$now=date($startdate);
//     echo   $ymd = DateTime::createFromFormat('Y-m-d', $now)->format('Y-m-d');
$date=date_create($startdate);
$startdate= date_format($date,"Y-m-d H:i:s");


$date=date_create($enddate);
$enddate= date_format($date,"Y-m-d H:i:s");



//$campaignname=
//&NAME=
//&STATUS=
//&channels=
//&estbudget=
//&spent=
//&smsno=
//&startdate=
//&enddate=
//&starttime=
//&endtime=


 
    
//$fld1=$_REQUEST["fld1"];
//$fld2=$_REQUEST["Date1"];
//$fld3=$_REQUEST["Date2"];



include_once "lib/config1.php";
$cn = connectDB();
 
//$query = "exec pSInsuranceInfo '" . $fld1 ."'";

$query = " update `campaign` set campaignname='$campaignname',NAME='$NAME',STATUS='$STATUS',channels='$channels',estbudget='$estbudget',spent='$spent',smsno='$smsno',startdate='$startdate',enddate='$enddate',starttime='$starttime',endtime='$endtime' where   id=$id  ";


//$query = "insert into 	campaign (campaignname, 	NAME, 	STATUS, 	channels, 	estbudget, 	spent, 	smsno, 	startdate, 	enddate, 	starttime, 	endtime)
//                         VALUES  ('$campaignname','$NAME','$STATUS','$channels','$estbudget','$spent','$smsno','$startdate','$enddate','$starttime','$endtime')  ";

 $ret = Sql_exec($cn, $query);

echo json_encode($ret); 
?>