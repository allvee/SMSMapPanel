<?php

include_once "lib/config1.php";
 session_start();
$cn = connectDB();
 

if ($_SESSION[usertype] <> 'superUser')
   $query = "select  id ,campaign_name  FROM `group` where createdby= '$_SESSION[id]'  ";

else 
  $query = "select id ,campaign_name    FROM `group`  ";

$result = Sql_exec($cn, $query);

$i = 0; // 0
$list = array();
$data = array();

while ($row = Sql_fetch_array($result)) {
       
     //$data['id'] = $i ;
      $data['id'] =  Sql_Result($row, "id");
       //$data['text'] = Sql_Result($row, "campaign_name");
        $data['text'] = Sql_Result($row, "campaign_name");
        
	//$data[Sql_Result($row, "InsuranceID")] = Sql_Result($row, "AgreementNo");
        $list[] = $data;
        $i++;
	}

echo json_encode($list);
?>