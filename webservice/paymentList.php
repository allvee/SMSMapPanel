<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 6/15/2016
 * Time: 10:50 AM
 */
include_once "lib/utils.php";
include_once "lib/common.php";
include_once "lib/config1.php";
session_start();
$userID=$_SESSION["id"];
$userName=$_SESSION['username'];
$userType=$_SESSION['usertype'];
$CreatedBy=$_SESSION['username'];
$cn = connectDB();
if($userType=='superUser'){
    $query = "SELECT payment.paymentID AS paymentID, payment.DATE AS DATE, payment.paymenttype AS paymenttype, payment.SMSQuantity AS SMSQuantity, payment.SMSPriceRate AS SMSPriceRate, payment.SMSTotalAmount AS SMSTotalAmount, users.username AS username, payment.InvoiceID AS InvoiceID  FROM payment INNER JOIN users ON payment.UserID=users.id";

    $result = Sql_exec($cn, $query);
//echo $query;
    $data = array();

    $i=0;
    while ($row = Sql_fetch_array($result)) {
        $j=0;
        $data[$i][$j++] = Sql_Result($row, "paymentID");
       // $data[$i][$j++] = Sql_Result($row, "ClientID");
        $data[$i][$j++] = Sql_Result($row, "DATE");
        $data[$i][$j++] = Sql_Result($row, "paymenttype");
        $data[$i][$j++] = Sql_Result($row, "SMSQuantity");
        $data[$i][$j++] = Sql_Result($row, "SMSPriceRate");
        $data[$i][$j++] = Sql_Result($row, "SMSTotalAmount");
/*
        $data[$i][$j++] = Sql_Result($row, "chequeormoneyreceiptno");
        $data[$i][$j++] = Sql_Result($row, "accountnumber");
        $data[$i][$j++] = Sql_Result($row, "BankName");
        $data[$i][$j++] = Sql_Result($row, "attatchment");
        $data[$i][$j++] = Sql_Result($row, "Status");

        $user_id = Sql_Result($row, "UserID");
        $query2 = "SELECT username FROM users WHERE id='$user_id'";
        $result = Sql_exec($cn, $query2);
*/
        $data[$i][$j++] = Sql_Result($row, "username");
        $data[$i][$j++] = Sql_Result($row, "InvoiceID");

        $i++;
    }

    Sql_Free_Result($result);
}


ClosedDBConnection($cn);
echo json_encode($data);
