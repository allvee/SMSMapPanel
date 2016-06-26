<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 6/9/2016
 * Time: 11:49 AM
 */

include_once "lib/utils.php";
include_once "lib/common.php";
include_once "lib/config1.php";
session_start();
$userID=$_SESSION["id"];
$userName=$_SESSION['username'];
$userType=$_SESSION['usertype'];
$CreatedBy=$_SESSION['username'];

$Business_Name=$_REQUEST['Business_Name'];
$user_Name=$_REQUEST['user_Name'];
$user_address=$_REQUEST['user_address'];
$user_email=$_REQUEST['user_email'];
$user_mobile_num=$_REQUEST['user_mobile_num'];
$user_password=$_REQUEST['user_password'];
$tochange_userID=$_REQUEST['tochange_userID'];
$MaskingSender=$_REQUEST['MaskingSender'];
$cn = connectDB();

$qry="UPDATE users SET  NAME = '$Business_Name', address = '$user_address' , email = '$user_email' , phone = '$user_mobile_num' , username = '$user_Name' , PASSWORD = '$user_password', MaskingSender='$MaskingSender'
WHERE id = '$tochange_userID' ";

if(Sql_exec($cn,  $qry)){

    $ret= "Account Update Successful";
    $return_data = array('status' => true, 'message' => $ret, 'qry'=>$qry);

}
else
    $return_data = array('status' => false, 'message' => 'Sorry! Account Update Failed');

ClosedDBConnection($cn);

echo json_encode($return_data);