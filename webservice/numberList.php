<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/25/2016
 * Time: 1:01 PM
 */
include_once "lib/utils.php";

$dbtype     = 'mysql';
$Server     =  'localhost'; //'192.168.241.12'; //
$Database   = 'sms_map';
$UserID     = 'root';
$Password   = 'nopass';
include_once "lib/common.php";

$cn = connectDB();

$query = "SELECT NAME, COUNT(*) AS NumberCount, description, createtime, updatetime FROM numberlist GROUP BY description, NAME ";

$result = Sql_exec($cn, $query);

$data = array();

$i=0;
while ($row = Sql_fetch_array($result)) {
    $j=0;
    $data[$i][$j++] = Sql_Result($row, "NAME");
    $data[$i][$j++] = Sql_Result($row, "NumberCount");
   // $data[$i][$j++] = Sql_Result($row, "description");
    $data[$i][$j++] = Sql_Result($row, "createtime");
    $data[$i][$j++] = Sql_Result($row, "updatetime");

    $data[$i][$j++] = '<span onclick="set_data_to_edit_number_list(this,  \'' . Sql_Result($row, "NAME") .'\',\''.Sql_Result($row, "description") .'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/pen.png" ></span>'
        . '&nbsp&nbsp' . '<span onclick="delete_number_list(this, \'' . Sql_Result($row, "NAME") .'\', \''.Sql_Result($row, "description").'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/cancel.png" ></span>';


    $i++;
}
Sql_Free_Result($result);

ClosedDBConnection($cn);
echo json_encode($data);