<?php
include_once "lib/utils.php";
include_once "lib/config1.php";
include_once "lib/common.php";
$cn = connectDB();
 
//$query = "select InsuranceID, AgreementNo from InsuranceInfo"; hour_
	
$query = "select DISTINCT(hour_) as CampaignName1 FROM hour_table";


$result = Sql_exec($cn,$query);
$str=formatJSON($result);
echo($str);
?>