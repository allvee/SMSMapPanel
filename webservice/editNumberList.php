<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/25/2016
 * Time: 6:30 PM
 */

include_once "lib/utils.php";
$dbtype     = 'mysql';
$Server     =  'localhost'; //'192.168.241.12'; //
$Database   = 'sms_map';
$UserID     = 'root';
$Password   = 'nopass';
include_once "lib/common.php";

$data = $_REQUEST;
//print_r($_REQUEST);
$return_data='';
$last_cname=$data['last_cname'];
$last_lname=$data['last_lname'];
//$campain_list_dropdown = $data['campain_list_dropdown'];
$campain_list_dropdown ='DummyData';
$list_name = $data['list_name'];

$cn=connectDB();
$query= "UPDATE numberlist SET `NAME` = '$list_name', `PID`='$list_name$campain_list_dropdown',`description` = '$campain_list_dropdown' , `createtime` = now() , `updatetime` = now() WHERE `PID`='$last_lname$last_cname'";

if(Sql_exec($cn,$query)){
    $ret= "Update Successful";
    $return_data = array('status' => true, 'message' => $ret, 'query'=>$query);
}
else {
    $ret= "Sorry not Updated";
    $return_data = array('status' => false, 'query'=>$query, 'message' => $ret);
}

ClosedDBConnection($cn);

echo json_encode($return_data);