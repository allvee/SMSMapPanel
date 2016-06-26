/**
 * Created by Al Amin on 6/8/2016.
 */
function account_create(target, formId){

    var Business_Name = $("#Business_Name").val();
    var user_Name = $("#user_Name").val();
    var user_address = $("#user_address").val();
    var user_email = $("#user_email").val();
    var user_mobile_num = $("#user_mobile_num").val();
    var user_password = $("#user_password").val();
    var re_user_password = $("#re_user_password").val();
    var MaskingSender = $("#MaskingSender").val();


    if (Business_Name == '') {
        //alert(this, red,"sorry","Please give input in Business Name");
        WarningMessage('Warning', 'Warning', 'Please give input in Business Name');
    }
    else if (user_Name == '') {
       // alert(" Please give input in Representative Name");
        WarningMessage('Warning', 'Warning', 'Please give input in Representative Name / User Name');

    }
   else if (MaskingSender == '') {
        //alert(" Please Enter Masking Sender");
        WarningMessage('Warning', 'Warning', 'Please Enter Masking Sender');
    }
   else if (user_address == '') {
        //alert(" Please give input in Business Address");
        WarningMessage('Warning', 'Warning', 'Please give input in Business Address');
    }
    else if (user_email == '') {
       // alert(" Please give input in  Email");
        WarningMessage('Warning', 'Warning', 'Please give input in  Email');
    }
   else if (user_mobile_num == '') {
        //alert(" Please give input in  Mobile Number");
        WarningMessage('Warning', 'Warning', 'Please give input in  Mobile Number');
    }
   else if (user_password == '') {
       // alert(" Please give input in Password");
        WarningMessage('Warning', 'Warning', 'Please give input in Password');
    }
    else if (re_user_password == '') {
       // alert(" Please Retype Password");
        WarningMessage('Warning', 'Warning', 'Please Retype Password');
    }
    else {
        $.ajax({
            type: "POST",
            data: {
                'Business_Name':Business_Name,
                'user_Name': user_Name,
                'user_address': user_address,
                'user_email': user_email,
                'user_mobile_num': user_mobile_num,
                'user_password': user_password,
                'MaskingSender':MaskingSender
            },
            url: add_Account_url,
            async: true,
            datatype: 'json',
            success: function (input) {
                $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

                input = JSON.parse(input);
               // alert(input.message);
                if(input.message)
                     WarningMessage('success', 'Success', input.message);
                else
                    WarningMessage('error', 'Error', input.message);

                showAdditionalMenu('88');

             /*   if (input == 1) {
                    alert('Account created Successfully');
                }
                else alert('Please enter valid Input ');
*/
            },
            error: function (input) {
                alert("error Found");
            }
          }
      );
    }
}

function account_update(target, formId){

    var Business_Name = $("#Business_Name").val();
    var user_Name = $("#user_Name").val();
    var user_address = $("#user_address").val();
    var user_email = $("#user_email").val();
    var user_mobile_num = $("#user_mobile_num").val();
    var user_password = $("#user_password").val();
    var re_user_password = $("#re_user_password").val();
    var tochange_userID=$("#user_id").val();
    var MaskingSender = $("#MaskingSender").val();

    if (Business_Name == '') {
        //alert(this, red,"sorry","Please give input in Business Name");
        WarningMessage('Warning', 'Warning', 'Please give input in Business Name');
    }
    else if (user_Name == '') {
        // alert(" Please give input in Representative Name");
        WarningMessage('Warning', 'Warning', 'Please give input in Representative Name / User Name');

    }
    else if (MaskingSender == '') {
        //alert(" Please Enter Masking Sender");
        WarningMessage('Warning', 'Warning', 'Please Enter Masking Sender');
    }
    else if (user_address == '') {
        //alert(" Please give input in Business Address");
        WarningMessage('Warning', 'Warning', 'Please give input in Business Address');
    }
    else if (user_email == '') {
        // alert(" Please give input in  Email");
        WarningMessage('Warning', 'Warning', 'Please give input in  Email');
    }
    else if (user_mobile_num == '') {
        //alert(" Please give input in  Mobile Number");
        WarningMessage('Warning', 'Warning', 'Please give input in  Mobile Number');
    }
    else if (user_password == '') {
        // alert(" Please give input in Password");
        WarningMessage('Warning', 'Warning', 'Please give input in Password');
    }
    else if (re_user_password == '') {
        // alert(" Please Retype Password");
        WarningMessage('Warning', 'Warning', 'Please Retype Password');
    }

/*    if (Business_Name == '') {
        alert(" Please give input in Business Name");
        return;
    }
    if (user_Name == '') {
        alert(" Please give input in Representative Name");
        return;
    }

    if (user_address == '') {
        alert(" Please give input in Business Address");
        return;
    }
    if (user_email == '') {
        alert(" Please give input in  Email");
        return;
    }
    if (user_mobile_num == '') {
        alert(" Please give input in  Mobile Number");
        return;
    }
    if (user_password == '') {
        alert(" Please give input in Password");
        return;
    }

    if (re_user_password == '') {
        alert(" Please Retype Password");
        return;
    }*/
else {
        //alert(MaskingSender);
    $.ajax({
            type: "POST",
            data: {
                'Business_Name':Business_Name,
                'user_Name': user_Name,
                'user_address': user_address,
                'user_email': user_email,
                'user_mobile_num': user_mobile_num,
                'user_password': user_password,
                'tochange_userID':tochange_userID,
                'MaskingSender': MaskingSender
            },
            url: update_Account_url,
            async: true,
            datatype: 'json',
            success: function (input) {
                $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

                input = JSON.parse(input);

               //alert(input.message);
                if(input.message)
                    WarningMessage('success', 'Success', input.message);
                else
                    WarningMessage('error', 'Error', input.message);

                showAdditionalMenu('88');

            },
            error: function (input) {
                alert("error Found");
            }
        }
    );
}
}

function checkPass()
{
    //Store the password field objects into variables ...
    var pass1 =document.getElementById('user_password');
    var pass2 = document.getElementById('re_user_password');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
     //  $("#confirmMessage").val();
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field
    //and the confirmation field

    if(pass1.value == pass2.value){
        //The passwords match.
        //Set the color to the good color and inform
        //the user that they have entered the correct password
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Matched!"
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Matched!"
    }
}

function change_password(target, formId){

    var user_Name = $("#user_Name").val();
    var old_user_password = $("#old_user_password").val();
    var user_password = $("#user_password").val();
    var re_user_password = $("#re_user_password").val();

    if (user_Name == '') {
        //alert(" Please Enter User Name");
        WarningMessage('Warning', 'Warning', 'Please Enter User Name');
        return;
    }
    if (old_user_password == '') {
        //alert(" Please Enter Old Password");
        WarningMessage('Warning', 'Warning', 'Please Enter Old Password');
        return;
    }
    if (user_password == '') {
        //alert(" Please Enter New Password");
        WarningMessage('Warning', 'Warning', 'Please Enter New Password');
        return;
    }
    if (re_user_password == '') {

       // alert(" Please Confirm New Password");
        WarningMessage('Warning', 'Warning', 'Please Confirm New Password');
        return;
    }

   // alert(user_Name+"/"+old_user_password+"/"+user_password+"/"+re_user_password);

    $.ajax({
            type: "POST",
            data: {
                'user_Name': user_Name,
                'old_user_password':old_user_password,
                'user_password': user_password
            },
            url: change_Password_url,
            async: true,
            datatype: 'json',
            success: function (input) {
                $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

                input = JSON.parse(input);

                if(input.status)
                    WarningMessage('Warning', 'Warning', input.message);
                else
                    WarningMessage('error', 'Error', input.message);
                //alert(input.message);

            },
            error: function (input) {
                alert("error Found");
            }
        }
    );
}

function load_accounts_list(){
     var fld1 = "0";
    $.ajax({
            type: "POST",
            data: {
                'fld1': fld1
            },
            url: accounts_List_url,
            async: true,
            datatype: 'json',
            success: function (input) {
                $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

                input = JSON.parse(input);
                $('#gridTable').dataTable({
                    "data": input,
                    "columns": [

                        { "title": "Account ID", "class": "center ratailer_width" },
                        { "title": "Business Name", "class": "center agent_width" },
                        { "title": "Business Address", "class": "center" },
                        { "title": "Email", "class": "center" },
                        { "title": "Mobile Number", "class": "center" },
                        { "title": "Representative Name", "class": "center" },
                        { "title": "Password", "class": "center" },
                        { "title": "Masking", "class": "center" },
                        { "title": "Create Date", "class": "center" },
                        { "title": "Action", "class": "center" },
                    ],
                    "order": [[0, "asc"]],

                });

            },
            error: function (input) {
                alert("error at Forming Table");
            }
        }
    );
}

function set_data_to_edit_account(obj, id, username){

    var data = [];
    var table = document.getElementById('gridTable');
    var index = obj.parentNode.parentNode.rowIndex;
    var i = 0;
    for (i = 0; i < 8; i++)
        data[i] = table.rows[index].cells[i].innerHTML;

    console.log("1:",data[0],"  2:",data[1]," 3:", data[2],"  4:", data[3],"  5:" , data[4],"  6:" , data[5],"  7:" , data[6],"  8:" , data[7]);

    showAdditionalMenu('43');

    $("#user_id").val(data[0]);
    $("#Business_Name").val(data[1]);
    $("#user_Name").val(data[5]);
    $("#user_address").val(data[2]);
    $("#user_email").val(data[3]);
    $("#user_mobile_num").val(data[4]);
    $("#user_password").val(data[6]);
    $("#MaskingSender").val(data[7]);
}

function confirmDelete(obj, id, username) {

    customConfirm(id, delete_account,safe);

}

function delete_account(id){

    var dataInfo = {};
    dataInfo['id']=id;
    //dataInfo['username']=username;
   var response = connectServer(delete_Account_url, dataInfo);

    response = JSON.parse(response);
    if(response.status){
        //alert(response.message); //+ response.userid
        WarningMessage('success', 'Success', response.message);
        showAdditionalMenu('88');
    }
    else
       // alert(response.message);
        WarningMessage('error', 'Error', response.message);

}