<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/25/2016
 * Time: 5:26 PM
 */

include_once "lib/utils.php";

$dbtype     = 'mysql';
$Server     =  'localhost'; //'192.168.241.12'; //
$Database   = 'sms_map';
$UserID     = 'root';
$Password   = 'nopass';
include_once "lib/common.php";

$data = $_REQUEST;
$return_data='';
$name = $data['name'];
$description = $data['description'];

$cn = connectDB();

$query = "DELETE FROM numberlist WHERE NAME='$name' AND description='$description'";

$result = Sql_exec($cn, $query);

if($result){

    $msg="Secessfully Deleted";
    $return_data = array('status' => true, 'query' => $query, 'message' => $msg);
}
else
{
    $msg="Sorry Not deleted";
    $return_data = array('status' => false, 'query' => $query, 'message' => $msg);
}
Sql_Free_Result($result);
ClosedDBConnection($cn);

echo json_encode($return_data);