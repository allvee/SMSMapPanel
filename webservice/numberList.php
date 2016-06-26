<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/25/2016
 * Time: 1:01 PM
 */
include_once "lib/utils.php";
include_once "lib/common.php";
include_once "lib/config1.php";
session_start();
$userID=$_SESSION["id"];
$userName=$_SESSION['username'];
$userType=$_SESSION['usertype'];
$CreatedBy=$_SESSION['username'];
$cn = connectDB();
if($userType=='superUser')
   // $query = "SELECT NAME, COUNT(*) AS NumberCount, createtime, updatetime FROM numberlist   GROUP BY  NAME ";
    $query = "SELECT b.Numberlist_Name AS NAME, a.NumberCount, a.createtime, a.updatetime, b.id AS ID FROM
              (SELECT NAME, COUNT(*) AS NumberCount, description, createtime, updatetime
              FROM numberlist GROUP BY  NAME)
              a INNER JOIN  numberlist_index b ON b.id=a.name";
else
    $query = "SELECT b.Numberlist_Name AS NAME, a.NumberCount, a.createtime, a.updatetime, b.id AS ID FROM
              (SELECT NAME, COUNT(*) AS NumberCount, description, createtime, updatetime
              FROM numberlist
              WHERE `CreatedBy`='$userID' AND `UserType`='$userType' GROUP BY  NAME)
              a INNER JOIN  numberlist_index b ON b.id=a.name";

$result = Sql_exec($cn, $query);
//echo $query;
$data = array();

$i=0;
while ($row = Sql_fetch_array($result)) {
    $j=0;
    $data[$i][$j++] = Sql_Result($row, "NAME");
    $data[$i][$j++] = Sql_Result($row, "NumberCount");
    $data[$i][$j++] = Sql_Result($row, "createtime");
    $data[$i][$j++] = Sql_Result($row, "updatetime");

    $data[$i][$j++] = '<span onclick="set_data_to_edit_number_list(this,  \'' . Sql_Result($row, "ID") .'\',\''.Sql_Result($row, "NAME") .'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/pen.png" ></span>'
        . '&nbsp&nbsp' . '<span onclick="delete_number_list(this, \'' . Sql_Result($row, "ID") .'\', \''.Sql_Result($row, "NAME").'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/cancel.png" ></span>';


    $i++;
}
Sql_Free_Result($result);

ClosedDBConnection($cn);
echo json_encode($data);