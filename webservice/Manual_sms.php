<?php

$Message =	$_REQUEST["Message"];
$msisdn =	$_REQUEST["Mobile"];



include_once "lib/config1.php";
 session_start();
$cn = connectDB();

$qryselect="SELECT hasCradit,MaskingSender FROM users WHERE id='$_SESSION[id]'";
                   $result=Sql_exec($cn,$qryselect);
                   $row = Sql_fetch_array($result);
                   $hasCradit = Sql_Result($row, "hasCradit");
                   $MaskingSender = Sql_Result($row, "MaskingSender");
                   
                   //echo $hasCradit; exit;
 

if ($hasCradit>=1){
// including session
$query = "INSERT INTO smsoutbox_temp (srcMN, dstMN, msg, 	writeTime, 	sentTime, 	msgStatus, 	inserttime , userid)
                        VALUES  ('$MaskingSender', CONCAT ('880',SUBSTRING($msisdn,LENGTH($msisdn)-9,LENGTH($msisdn))), '$Message',NOW(),NOW(),'QUE',NOW(),'$_SESSION[id]' )";

 $ret = Sql_exec($cn, $query);
//echo $query;

$qryupdate="update users set  hasCradit='$hasCradit' -1  WHERE id='$_SESSION[id]'";
                   $result=Sql_exec($cn,$qryupdate);
                   
ClosedDBConnection($cn);
                   
echo json_encode($ret); 
}


else {
 $ret=1;
 //echo $ret=1;
ClosedDBConnection($cn);
echo json_encode(!$ret); 
}

?>