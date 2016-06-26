<?php

$campain=	$_REQUEST["campain"];
$groupid =	$_REQUEST["groupid"];
$startdate=	$_REQUEST["startdate"];
$enddate=	$_REQUEST["enddate"];

$date=date_create($startdate);
$startdate= date_format($date,"Y-m-d H:i:s");


$date=date_create($enddate);
$enddate= date_format($date,"Y-m-d H:i:s");

include_once "lib/config1.php";
 session_start();
$cn = connectDB();
 

//if ($_SESSION[usertype] <> 'superUser')

 $query ="SELECT  a.operator,u.username,a.total_to_be_sent ,Total_Sent ,Total_PROCESSING,Total_FAILED ,Total_Que FROM 
 (SELECT CASE 
	WHEN s.dstMN LIKE '88017%' THEN 'GP' 
	WHEN s.dstMN LIKE '88018%' THEN 'ROBI'
	WHEN s.dstMN LIKE '88019%' THEN 'BL'
	WHEN s.dstMN LIKE '88016%' THEN 'AT'
	WHEN s.dstMN LIKE '88011%' THEN 'CC'
	WHEN s.dstMN LIKE '88015%' THEN 'TT' END AS operator
    ,s.userid 
    ,COUNT(*) AS total_to_be_sent
    ,SUM(CASE WHEN m.msgStatus='SENT' THEN 1 ELSE 0 END) AS  Total_Sent
    ,SUM(CASE WHEN m.msgStatus='PROCESSING' THEN 1 ELSE 0 END) AS  Total_PROCESSING
    ,SUM(CASE WHEN m.msgStatus='FAILED' THEN 1 ELSE 0 END) AS  Total_FAILED
    ,SUM(CASE WHEN m.msgStatus='QUE' THEN 1  ELSE 0 END) Total_Que
FROM  mohsin.smsoutbox m  INNER JOIN sms_map.smsoutbox_temp s ON  s.dstMN=m.dstMN AND s.srcMN=m.srcMN AND s.msg=m.msg  AND s.writeTime=m.writeTime
WHERE   groupid = $groupid  and  s.writetime between '$startdate' and '$enddate'  
GROUP BY operator , s.userid ,groupid)  a INNER JOIN sms_map.users u ON u.id=a.userid";

//IFNULL(s.userid ,'')<>''  AND

 

//$query = "SELECT 	COUNT(*) Total , '$campain' as campaign , msg , userid , msgStatus  FROM smsoutbox_temp  where userid= '$_SESSION[id]'  and groupid = $groupid  and writetime between '$startdate' and '$enddate'  GROUP BY groupid , msg , userid , msgStatus";

//else

   //$query = "SELECT COUNT(*) Total , '$campain' as campaign  , msg , userid , msgStatus  FROM smsoutbox_temp  where  groupid = $groupid   and writetime between '$startdate' and '$enddate'   GROUP BY groupid , msg , userid , msgStatus ";


$result = Sql_exec($cn, $query);

$i = 0;
$data = "";

while ($row = Sql_fetch_array($result)) {
    $j = 0;

    $data[$i][$j] = Sql_Result($row, "operator");
    $j++;
    $data[$i][$j] = Sql_Result($row, "username");
    $j++;
    $data[$i][$j] = Sql_Result($row, "total_to_be_sent");
    $j++;
    $data[$i][$j] = Sql_Result($row, "Total_Sent");
	$j++;    
     $data[$i][$j] = Sql_Result($row, "Total_PROCESSING");
    $j++;
     $data[$i][$j] = Sql_Result($row, "Total_FAILED");
    $j++;
     $data[$i][$j] = Sql_Result($row, "Total_Que");
    $j++;

    //   $data[$i][$j] = '<span onclick="edit_group_list(this,  \'' . Sql_Result($row, "id") .'\',\''.Sql_Result($row, "id") .'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/pen.png" ></span>'
    //    . '&nbsp&nbsp' . '<span onclick="delete_group_list(this, \'' . Sql_Result($row, "id") .'\', \''.Sql_Result($row, "id").'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/cancel.png" ></span>';

    //    $j++;
    
	$i++;
}
Sql_Free_Result($result);
ClosedDBConnection($cn);
echo json_encode($data);
?>    



 

  

