<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 6/26/2016
 * Time: 10:43 AM
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
$query = "SELECT hasCradit FROM users WHERE id='$userID'";

$result = Sql_exec($cn, $query);
$row = Sql_fetch_array($result);
//print_r($row);
$credit = $row['hasCradit'];

ClosedDBConnection($cn);
echo json_encode($credit);