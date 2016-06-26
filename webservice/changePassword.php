<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 6/8/2016
 * Time: 4:27 PM
 */
include_once "lib/utils.php";
include_once "lib/common.php";
include_once "lib/config1.php";

session_start();
$userID=$_SESSION["id"];
$userName=$_SESSION['username'];
$userType=$_SESSION['usertype'];

$user_Name=$_REQUEST['user_Name'];
$old_password=$_REQUEST['old_user_password'];
$new_password=$_REQUEST['user_password'];

$cn=connectDB();

if($userName==$user_Name){

    $qry="UPDATE users SET  PASSWORD ='$new_password' WHERE username ='$userName'  AND PASSWORD ='$old_password'";

    if(Sql_exec($cn,  $qry)){
        $ret= "Password Change Successful";
        $return_data = array('status' => true, 'message' => $ret, 'qry'=>$qry);
    }
    else
        $return_data = array('status' => false, 'message' => 'Sorry! Account Creation Failed', 'qry'=>$qry);
}
else
    $return_data = array('status' => false, 'message' => 'Sorry! Entered User Name Does not Matched with Signed In User Name.');

ClosedDBConnection($cn);

echo json_encode($return_data);