<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/25/2016
 * Time: 5:26 PM
 */

include_once "lib/utils.php";
include_once "lib/config1.php";
include_once "lib/common.php";

$data = $_REQUEST;
$return_data='';
$name = $data['name'];
$NumberList_ID = $data['id'];

$cn = connectDB();

$query = "DELETE FROM numberlist WHERE NAME='$NumberList_ID' ";

$queryindex = "DELETE FROM numberlist_index WHERE ID='$NumberList_ID' AND Numberlist_Name='$name'";
//$result = Sql_exec($cn, $query);

if(Sql_exec($cn, $queryindex) && Sql_exec($cn, $query)){

    $msg="Secessfully Deleted";
    $return_data = array('status' => true, 'query' => $query, 'queryindex' => $queryindex, 'message' => $msg);
}
else
{
    $msg="Sorry Not deleted";
    $return_data = array('status' => false, 'query' => $query, 'queryindex' => $queryindex, 'message' => $msg);
}

ClosedDBConnection($cn);

echo json_encode($return_data);