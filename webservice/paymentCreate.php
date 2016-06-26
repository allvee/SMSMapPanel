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
$ret='';
$user_id =$_REQUEST['user_list'];
$date1 = $_REQUEST['payment_date'];
$date=date_create($date1);
$payment_date= date_format($date,"Y-m-d H:i:s");
$sms_rate=$_REQUEST['sms_rate'];
$sms_quantity =$_REQUEST['sms_quantity'];
$sms_price = $_REQUEST['sms_price'];
$payable_amount =$_REQUEST['h_payable_amount'];
$payment_method =$_REQUEST['payment_method']; //bank, ePGQ, WIC
$payment_type = $_REQUEST['payment_type'];  //check, money receipt
$cheque_or_moneyreceiptno=$_REQUEST['cheque_or_moneyreceiptno'];
$bank_name = $_REQUEST['bank_name'];
$account_number =$_REQUEST['account_number'];
$reference_id =$_REQUEST['reference_id'];
//$attached_file_name = $_REQUEST['payment_type'];

$userID=$_SESSION["id"];
$userName=$_SESSION['username'];
$userType=$_SESSION['usertype'];
$CreatedBy=$_SESSION['username'];
$cn=connectDB();

$qrycredit="SELECT hasCradit, account_balance FROM users WHERE id='$user_id'";
$result=Sql_exec($cn, $qrycredit);
$row = Sql_fetch_array($result);
$ex_credits = Sql_Result($row, "hasCradit");
$ex_account_balance = Sql_Result($row, "account_balance");
$total_Credits=(int)$ex_credits+ (int)$sms_quantity;
$total_account_balance= (float) $ex_account_balance+ (float)$payable_amount;
$qryupdate="UPDATE users SET `hasCradit` = '$total_Credits', `account_balance`='$total_account_balance'  WHERE id = '$user_id' ;";

/*
 $qrycredit2="SELECT hasCradit FROM users WHERE id='$userID'";
$result2=Sql_exec($cn, $qrycredit2);
$row2 = Sql_fetch_array($result2);
$ex_credits2 = Sql_Result($row2, "hasCradit");
$total_Credits2=(int)$ex_credits2 - (int)$payable_amount;
$qryupdate2="UPDATE users SET hasCradit = '$total_Credits2' WHERE id = '$userID' ;";
*/

if($payment_method=='BankPayment'){

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
              //  $path='C:/inetpub/wwwroot/SmsMapPanel/webservice/'.$output_dir.$_FILES["upload_file"]["name"];

                $qry="INSERT INTO sms_map.payment (ClientID, DATE, SMSQuantity, SMSPriceRate, SMSTotalAmount, paymenttype, chequeormoneyreceiptno, accountnumber, BankName, attatchment, STATUS, UserID, InvoiceID, TYPE) VALUES('$user_id', '$payment_date', '$sms_quantity','$sms_rate' ,'$payable_amount', '$payment_method', '$cheque_or_moneyreceiptno', '$account_number', '$bank_name', 'yes', 'Pending', '$user_id', '$reference_id', 'Jani Na')";

                if(Sql_exec($cn, $qry) ){
                    if(Sql_exec($cn, $qryupdate) ){ //&& Sql_exec($cn, $qryupdate2)
                        $ret= "File Upload/data Insert Successful";
                        $return_data = array('status' => true, 'message' => $ret, 'qry'=>$qry, 'qryupdate'=>$qryupdate);

                    }
                    else{
                        $return_data = array('status' => false, 'message' => 'failed', 'qry'=>$qry, 'qryupdate'=>$qryupdate);
                    }
                   }
                else
                {
                    $return_data = array('status' => false, 'message' => 'failed', 'qry'=>$qry, 'qryupdate'=>$qryupdate);
                }

            }
        }
        else {

            $ret= "Please Select Attach File to upload";
            $return_data = array('status' => false, 'message' => $ret);
        }
    }
}
else
   {

    $qry1="INSERT INTO sms_map.payment (ClientID, DATE, SMSQuantity, SMSPriceRate, SMSTotalAmount, paymenttype, chequeormoneyreceiptno, accountnumber, BankName, attatchment, STATUS, UserID, InvoiceID, TYPE) VALUES('$user_id', '$payment_date', '$sms_quantity','$sms_rate' ,'$payable_amount', '$payment_method', 'N/A', 'N/A', 'N/A', 'no', 'Pending', '$user_id', '$reference_id', 'Jani Na')";

       if(Sql_exec($cn, $qry1 )){

        if(Sql_exec($cn, $qryupdate) ){  //&& Sql_exec($cn, $qryupdate2)
               $ret= "Payment Creation Successful";
               $return_data = array('status' => true, 'message' => $ret, 'qry1'=>$qry1, 'qryupdate'=>$qryupdate);
           }
           else
           {
               $return_data = array('status' => false, 'message' => 'failed', 'qry1'=>$qry1,'qryupdate'=>$qryupdate);
           }
           }

    else
        $return_data = array('status' => false, 'message' => 'failed', 'qry1'=>$qry1,'qryupdate'=>$qryupdate);
}

ClosedDBConnection($cn);

echo json_encode($return_data);

