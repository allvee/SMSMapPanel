<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 6/8/2016
 * Time: 1:34 PM
 */

include_once "lib/utils.php";
include_once "lib/common.php";
include_once "lib/config1.php";

session_start();
$userID=$_SESSION["id"];
$userName=$_SESSION['username'];
$userType=$_SESSION['usertype'];

$Business_Name=$_REQUEST['Business_Name'];
$user_Name=$_REQUEST['user_Name'];
$user_address=$_REQUEST['user_address'];
$user_email=$_REQUEST['user_email'];
$user_mobile_num=$_REQUEST['user_mobile_num'];
$user_password=$_REQUEST['user_password'];
$MaskingSender=$_REQUEST['MaskingSender'];
$cn=connectDB();

    $qry="INSERT INTO users (name, address, email, phone, username, password, permissions, created, usertype, hasCradit, account_balance, MaskingSender) VALUES('$Business_Name', '$user_address','$user_email', '$user_mobile_num','$user_Name', '$user_password', 'Nai', now(), 'generalUser','0','0', '$MaskingSender')";

    if(Sql_exec($cn,  $qry)){

        $ret= "Account Creation Successful";
        $return_data = array('status' => true, 'message' => $ret, 'qry'=>$qry);

    }
    else
        $return_data = array('status' => false, 'message' => 'Sorry! Account Creation Failed');

ClosedDBConnection($cn);

echo json_encode($return_data);