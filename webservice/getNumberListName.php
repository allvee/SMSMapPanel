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

$cn = connectDB();

//$query = "SELECT 	NAME FROM sms_map_panel.campaign LIMIT 0, 50";
$query = "SELECT DISTINCT NAME AS NumberListName FROM numberlist";

$result = Sql_exec($cn,$query);
$str=formatJSON($result);
echo($str);
?>