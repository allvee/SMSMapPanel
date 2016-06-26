<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 6/9/2016
 * Time: 1:45 PM
 */

include_once "lib/utils.php";
include_once "lib/config1.php";
include_once "lib/common.php";
session_start();
$userID=$_SESSION["id"];
$userType=$_SESSION['usertype'];
$data = $_REQUEST;
$return_data='';
//$log_username = $data['username'];
$account_ID = $data['id'];

$cn = connectDB();

$query = "DELETE FROM users WHERE id='$account_ID' ";

if($account_ID!='6')
{
    if(Sql_exec($cn, $query)){

        $msg="Deleted Account Successfully";
        $return_data = array('status' => true, 'query' => $query, 'message' => $msg,'userid'=>$account_ID);
    }
    else
    {
        $msg="Sorry Not deleted";
        $return_data = array('status' => false, 'query' => $query,  'message' => $msg,'userid'=>$account_ID);
    }
}
else
    $return_data = array('status' => false,  'message' => 'This is Super User. You can not delete this User.', 'userid'=>$account_ID);

ClosedDBConnection($cn);

echo json_encode($return_data);