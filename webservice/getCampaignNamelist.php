<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/24/2016
 * Time: 2:33 PM
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
    $query = "select id as campaignID, campaignname as CampaignName FROM campaign";
else
    $query = "select id as campaignID, campaignname as CampaignName FROM campaign WHERE CreatedBy='$userID'";

$result = Sql_exec($cn,$query);
$str=formatJSON($result);
echo($str);
?>