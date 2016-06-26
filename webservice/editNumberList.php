<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/25/2016
 * Time: 6:30 PM
 */

include_once "lib/utils.php";
include_once "lib/common.php";
include_once "lib/config1.php";
session_start();
$data = $_REQUEST;
$return_data='';

$last_cname='DummyData';
$NumberListID=$data['last_lname']; //found ID
//$campain_list_dropdown = $data['campain_list_dropdown'];
$campain_list_dropdown ='DummyData';
$list_name = $data['list_name'];
$userID=$_SESSION["id"];
$userName=$_SESSION['username'];
$userType=$_SESSION['usertype'];

$cn=connectDB();
$queryindex="UPDATE numberlist_index SET Numberlist_Name = '$list_name' WHERE id='$NumberListID'";
$query= "UPDATE numberlist SET  `updatetime` = now(),`UpdatedBy`='$userID' WHERE `NAME`='$NumberListID'";

if(Sql_exec($cn,$queryindex) && Sql_exec($cn,$query) ){
    $ret= "Update Successful";
    $return_data = array('status' => true, 'message' => $ret, 'query'=>$query, 'queryindex'=>$queryindex);
}
else {
    $ret= "Sorry not Updated";
    $return_data = array('status' => false, 'query'=>$query,  'queryindex'=>$queryindex, 'message' => $ret);
}

ClosedDBConnection($cn);

echo json_encode($return_data);