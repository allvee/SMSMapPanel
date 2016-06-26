<?php




/*
 * Talemul Islam
 */
//$fld1=$_REQUEST["fld1"];
//$fld2=$_REQUEST["Date1"];
//$fld3=$_REQUEST["Date2"];



include_once "lib/config1.php";
 session_start();
$cn = connectDB();
 
//$query = "exec pSInsuranceInfo '" . $fld1 ."'";

if ($_SESSION[usertype] <> 'superUser')
//usertype
//createdby= '$_SESSION[id]
$query = "SELECT 		campaignname, 	NAME, 	STATUS, 	channels, 	estbudget, 	spent, 	smsno, 	startdate, 	enddate, 	starttime, 	endtime	 ,id 	FROM 	campaign  where createdby= '$_SESSION[id]' ";

else 
    $query = "SELECT 		campaignname, 	NAME, 	STATUS, 	channels, 	estbudget, 	spent, 	smsno, 	startdate, 	enddate, 	starttime, 	endtime	 ,id 	FROM 	campaign   ";


$result = Sql_exec($cn, $query);

$i = 0;
$data = "";

while ($row = Sql_fetch_array($result)) {
    $j = 0;
   // $autotime=Sql_Result($row, "Date");
    //$orginaltime=$autotime->format('dd-mmm-yyyy'); //Y-m-d H:i:s
//    echo $orginaltime;
  //  exit;
    

    $data[$i][$j] = Sql_Result($row, "campaignname");
	$j++;
	$data[$i][$j] = Sql_Result($row, "NAME");
    $j++;

    $data[$i][$j] = Sql_Result($row, "STATUS");
	$j++;
     $data[$i][$j] = Sql_Result($row, "channels");
	$j++;
     $data[$i][$j] = Sql_Result($row, "estbudget");
	$j++;
     $data[$i][$j] = Sql_Result($row, "spent");
	$j++;
     $data[$i][$j] = Sql_Result($row, "smsno");
	$j++;
     $data[$i][$j] = Sql_Result($row, "startdate");
	$j++;    
     $data[$i][$j] = Sql_Result($row, "enddate");
	$j++; 
     $data[$i][$j] = Sql_Result($row, "starttime");
	$j++; 
     $data[$i][$j] = Sql_Result($row, "endtime");
	$j++; 
    
  
    
       $data[$i][$j] = '<span onclick="edit_campaign_list(this,  \'' . Sql_Result($row, "id") .'\',\''.Sql_Result($row, "id") .'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/pen.png" ></span>'
        . '&nbsp&nbsp' . '<span onclick="delete_campaign_list(this, \'' . Sql_Result($row, "id") .'\', \''.Sql_Result($row, "id").'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/cancel.png" ></span>';

        $j++;
    
	$i++;
}
Sql_Free_Result($result);
ClosedDBConnection($cn);
echo json_encode($data);
?>    



 

  

