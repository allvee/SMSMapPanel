<?php
/**
 * Created by PhpStorm.
 * User: Al Amin
 * Date: 6/8/2016
 * Time: 4:54 PM
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
        $query = "SELECT id, NAME, address, email, phone, username, password, created, MaskingSender from users";

        $result = Sql_exec($cn, $query);
//echo $query;
        $data = array();

        $i=0;
        while ($row = Sql_fetch_array($result)) {
            $j=0;
            $data[$i][$j++] = Sql_Result($row, "id");
            $data[$i][$j++] = Sql_Result($row, "NAME");
            $data[$i][$j++] = Sql_Result($row, "address");
            $data[$i][$j++] = Sql_Result($row, "email");
            $data[$i][$j++] = Sql_Result($row, "phone");
            $data[$i][$j++] = Sql_Result($row, "username");
            $data[$i][$j++] = Sql_Result($row, "password");
            $data[$i][$j++] = Sql_Result($row, "MaskingSender");
            $data[$i][$j++] = Sql_Result($row, "created");
            $data[$i][$j++] = '<span onclick="set_data_to_edit_account(this,  \'' . Sql_Result($row, "id") .'\',\''.Sql_Result($row, "username") .'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/pen.png" ></span>'
                . '&nbsp&nbsp' . '<span onclick="confirmDelete(this, \'' . Sql_Result($row, "id") .'\', \''.Sql_Result($row, "username").'\'); return false;">&nbsp;<img style="position: relative; cursor: pointer; top: 4px" width="16" height="16" border="0" src="img/cancel.png" ></span>';


            $i++;
        }

        Sql_Free_Result($result);
    }


ClosedDBConnection($cn);
echo json_encode($data);


