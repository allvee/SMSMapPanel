<?php
include_once "lib/config1.php";
$cn = connectDB();
 
//$query = "select InsuranceID, AgreementNo from InsuranceInfo"; hour_
	
$query = "select DISTINCT(hour_) as AgreementNo FROM hour_table";

$result = Sql_exec($cn, $query);

$i = 0; // 0
$list = array();
$data = array();

while ($row = Sql_fetch_array($result)) {
       
	 $data['id'] = $i ;
       //$data['text'] = Sql_Result($row, "AgreementNo");
        $data['text'] = Sql_Result($row, "AgreementNo");
        
	//$data[Sql_Result($row, "InsuranceID")] = Sql_Result($row, "AgreementNo");
        $list[] = $data;
        $i++;
	}

echo json_encode($list);
?>