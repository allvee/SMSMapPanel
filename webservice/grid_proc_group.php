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
 

if ($_SESSION[usertype] <> 'superUser')
 

$query = "SELECT 	campaign_name, 	number_list_Name, 	date, 	message, status, id	 FROM 	`group`   where createdby= '$_SESSION[id]'  ";

else
   $query = "SELECT 	campaign_name, 	number_list_Name, 	date, 	message, status, id	 FROM 	`group`     ";


$result = Sql_exec($cn, $query);

$i = 0;
$data = "";

while ($row = Sql_fetch_array($result)) {
    $j = 0;

    $data[$i][$j] = Sql_Result($row, "id");
    $j++;
    $data[$i][$j] = Sql_Result($row, "campaign_name");
    $j++;
    $data[$i][$j] = Sql_Result($row, "number_list_Name");
    $j++;
    $data[$i][$j] = Sql_Result($row, "message");
	$j++;
     $data[$i][$j] = Sql_Result($row, "date");
	$j++;
     $data[$i][$j] = Sql_Result($row, "status");
	$j++;

       $data[$i][$j] = '<span onclick="edit_group_list(this,  \'' . Sql_Result($row, "id") .'\',\''.Sql_Result($row, "id") .'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/pen.png" ></span>'
        . '&nbsp&nbsp' . '<span onclick="delete_group_list(this, \'' . Sql_Result($row, "id") .'\', \''.Sql_Result($row, "id").'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/cancel.png" ></span>';

        $j++;
    
	$i++;
}
Sql_Free_Result($result);
ClosedDBConnection($cn);
echo json_encode($data);
?>    



 

  

