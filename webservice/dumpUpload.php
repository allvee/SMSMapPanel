<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/24/2016
 * Time: 4:22 PM
 */

include_once "lib/utils.php";
$dbtype     = 'mysql';
$Server     =  'localhost'; //'192.168.241.12'; //
$Database   = 'sms_map';
$UserID     = 'root';
$Password   = 'nopass';
include_once "lib/common.php";

$output_dir ="list_upload/";
$data = $_REQUEST;
$ret='';
//$campain_list_dropdown = $data['campain_list_dropdown'];
$campain_list_dropdown ='DummyData';
$list_name = $data['list_name'];

if(!$list_name==''){

    if (!is_dir($output_dir)){
        mkdir($output_dir, 0777);
    }
    else{
        if (isset($_FILES["upload_file"])) {

            //Filter the file types , if you want.
            if ($_FILES["upload_file"]["error"] > 0) {
                $ret= "Error: " . $_FILES["file"]["error"] . "<br>";
                $return_data = array('status' => false, 'message' => $ret);
            }
            else {
                //move the uploaded file to uploads folder;
                move_uploaded_file($_FILES["upload_file"]["tmp_name"], $output_dir . $_FILES["upload_file"]["name"]);
                $path='C:/inetpub/wwwroot/SmsMapPanel/webservice/'.$output_dir.$_FILES["upload_file"]["name"];
                $cn=connectDB();
                $import= "LOAD DATA LOCAL INFILE '$path' INTO TABLE numberlist (msisdn)
				SET `NAME` = '$list_name',`PID` = '$list_name$campain_list_dropdown', `description` = '$campain_list_dropdown' , `createtime` = now() , `updatetime` = now()";

                if(Sql_exec($cn,$import)){
                    $ret= "Import Successful";
                    $return_data = array('status' => true, 'message' => $ret, 'import'=>$import,'final'=>'yes');
                }
            }
        }
        else {

            $ret= "Please Select  File";
            $return_data = array('status' => false, 'message' => $ret);
        }
    }

}
else {
    $ret=" Please Insert List Name";
    $return_data = array('status' => false, 'message' => $ret);
}


ClosedDBConnection($cn);

echo json_encode($return_data);

