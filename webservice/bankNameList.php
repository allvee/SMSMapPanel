<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 6/13/2016
 * Time: 2:59 PM
 */

include_once "lib/utils.php";
include_once "lib/config1.php";
include_once "lib/common.php";
session_start();
$userID=$_SESSION["id"];
$userName=$_SESSION['username'];
$userType=$_SESSION['usertype'];
$CreatedBy=$_SESSION['username'];
$cn = connectDB();

    $query = "SELECT BankCode, BankName FROM banklist";

$result = Sql_exec($cn,$query);
$str=formatJSON($result);
echo($str);
?>