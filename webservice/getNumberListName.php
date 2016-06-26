<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/30/2016
 * Time: 1:16 PM
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

//$query = "SELECT 	NAME FROM sms_map_panel.campaign LIMIT 0, 50";
if($userType=='superUser')
    $query = "SELECT  id as NumberlistID, Numberlist_Name AS NumberListName FROM numberlist_index ";
else
    $query = "SELECT id as NumberlistID, Numberlist_Name AS NumberListName FROM numberlist_index WHERE CreatedBy='$userID'";
//echo $query;
$result = Sql_exec($cn,$query);
$str=formatJSON($result);
echo($str);
?>