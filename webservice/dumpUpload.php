<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 5/24/2016
 * Time: 4:22 PM
 */

include_once "lib/utils.php";
include_once "lib/common.php";
include_once "lib/config1.php";
session_start();
$output_dir ="list_upload/";
$data = $_REQUEST;
$ret='';
//$campain_list_dropdown = $data['campain_list_dropdown'];
$campain_list_dropdown ='DummyData';
$list_name = $data['list_name'];
$userID=$_SESSION["id"];
$userName=$_SESSION['username'];
$userType=$_SESSION['usertype'];
$CreatedBy=$_SESSION['username'];
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
                //$path='/var/www/html/SmsMapPanel/webservice/'.$output_dir.$_FILES["upload_file"]["name"];
                $cn=connectDB();

                $queryindex="INSERT INTO numberlist_index (Numberlist_Name, CreatedBy, CreateDate) VALUES('$list_name', '$userID', now())";
               if(Sql_exec($cn,$queryindex))
               {
                   $qryselect="SELECT 	MAX(ID) AS NumberListID FROM sms_map.numberlist_index WHERE Numberlist_Name='$list_name'";
                   $result=Sql_exec($cn,$qryselect);
                   $row = Sql_fetch_array($result);
                   $NumberListID = Sql_Result($row, "NumberListID");
                   $pid=$NumberListID.$campain_list_dropdown;
                   $import= "LOAD DATA LOCAL INFILE '$path' INTO TABLE numberlist (msisdn)
				                SET `NAME` = '$NumberListID',`PID` = '$pid', `description` = '$campain_list_dropdown' , `createtime` = now() , `updatetime` = now(),`CreatedBy`='$userID',`UpdatedBy`='$userID', `UserType`='$userType' ";

                   if(Sql_exec($cn,$import)){
                       $ret= "Import Successful";
                       $return_data = array('status' => true, 'message' => $ret, 'import'=>$import,'final'=>'yes');
                   }
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

