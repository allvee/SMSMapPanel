<?php


$campain_list =	$_REQUEST["campain_list_dropdown"];
$campaign_id=$_REQUEST["campaign_id"];
$number_list =	$_REQUEST["number_list_dropdown"];
//$DATE =	$_REQUEST["date"];
$Message =	$_REQUEST["Message"];


include_once "lib/config1.php";
 session_start();
$cn = connectDB();
 
// find available credit
$qryselect="SELECT hasCradit FROM users WHERE id='$_SESSION[id]'";
                   $result=Sql_exec($cn,$qryselect);
                   $row = Sql_fetch_array($result);
                   $hasCradit = Sql_Result($row, "hasCradit");
                   
                   //echo $hasCradit; exit;
 
// find total to be insert                   
$qryselect="SELECT COUNT(*)  as totalSmscount FROM numberlist_index ni INNER JOIN numberlist nl ON nl.name=ni.id			
			 WHERE ni.Numberlist_Name='$number_list'  "  ;
          
             $result=Sql_exec($cn,$qryselect);
                   $row = Sql_fetch_array($result);
                   $totalSmscount = Sql_Result($row, "totalSmscount");
 

if ($hasCradit>=$totalSmscount){
$query = "insert into `group` ( campaign_name, campaign_ID, number_list_Name, date, message, status,createdby)
	                     VALUES  ('$campain_list', '$campaign_id', '$number_list', now(), '$Message','QUE','$_SESSION[id]' )";

 $ret = Sql_exec($cn, $query);
// update the credit
$qryupdate="update users set  hasCradit='$hasCradit' - '$totalSmscount'  WHERE id='$_SESSION[id]'";
                   $result=Sql_exec($cn,$qryupdate);
                   
ClosedDBConnection($cn);
                   
echo json_encode($ret); 
}


else {
 $ret=1;

ClosedDBConnection($cn);
echo json_encode(!$ret); 
}

?>