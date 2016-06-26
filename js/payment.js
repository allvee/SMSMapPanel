/**
 * Created by Al Amin on 6/12/2016.
 */

function DateTimePicker(input_id){

    input_id = '#'+input_id;
    $(input_id).datetimepicker(
        {  todayBtn: "linked",
            keyboardNavigation: true,
            autoclose: true,
            todayHighlight: true
        }
    );

}
//warning
function WarningMessage(type, title, message) {
    modal({
        type: type,   //'warning',
        title: title, //'Warning',
        text: message,  //'A simple warning message!',
        center: false,
    });
}


function customConfirm(params,callbackYes,callbackNo) {

    $("#dialog-confirm").attr("title","Confirmation");
    $("#dialog-confirm").html("Are you sure?");

    $("#dialog-confirm").dialog({
        //resizable: false,
       // height: 200,
        modal: true,
        buttons: {
            "Continue":function(){
                $(this).dialog("close");
                callbackYes(params);
            },
            Cancel:function() {
                $(this).dialog("close");
                callbackNo();
            }
        }
    });
}

function safe(){
   WarningMessage('primary', 'Safe', 'Not Deleted');
}
/*
function DateTimePicker(input_id) {
    input_id='#'+input_id;
    $(input_id).datepicker({
        format: "yyyy-mm-dd hh:m:ss",
        todayBtn: "linked",
        keyboardNavigation: true,
        autoclose: true,
        todayHighlight: true
    });
}*/

function new_payment(formID){
  //  alert("docUpload_url"+docUpload_url+"   <br>formID:"+formID);
    var payment_date = $("#payment_date").val();
    var user_Name = $("#user_list").val();
    var sms_rate = $("#sms_rate").val();
    var sms_quantity = $("#sms_quantity").val();
    var sms_price = $("#sms_price").val();
    var payable_amount = $("#payable_amount").val();
    var payment_method = $("#payment_method").val();
    var cheque_or_moneyreceiptno = $("#cheque_or_moneyreceiptno").val();
    var bank_name = $("#bank_name").val();
    var account_number = $("#account_number").val();
    var reference_id = $("#reference_id").val();

    if (payment_date == '') {

       // alert("Please give input in payment_date");
        WarningMessage('Warning', 'Warning', 'Please give input in Payment Date');
        return;
    }
    if (user_Name == '') {
        //alert("Please give input in Title Name");
        WarningMessage('Warning', 'Warning', 'Please give input in Title Name');
        return;
    }

    if (sms_rate == '') {
        //alert(" Please give input in sms_rate");
        WarningMessage('Warning', 'Warning', 'Please give input in SMS Rate');
        return;
    }
    if (sms_quantity == '') {
        //alert(" Please give input in  sms_quantity");
        WarningMessage('Warning', 'Warning', 'Please give input in  SMS Quantity');
        return;
    }
    if(payment_method =='BankPayment'){

        if (cheque_or_moneyreceiptno == '') {
            //alert(" Please give input in  sms_quantity");
            WarningMessage('Warning', 'Warning', 'Please Enter Money/Cheque Receipt NO');
            return;
        }
        if (account_number == '') {
            //alert(" Please give input in  sms_quantity");
            WarningMessage('Warning', 'Warning', 'Please Enter Bank Account Number');
            return;
        }
    }
    if (reference_id == '') {
        //alert(" Please give input in Reference ID");
        WarningMessage('Warning', 'Warning', 'Please give input in Reference ID');
        return;
    }

   // alert("age");
    var response = common_file_uploader(docUpload_url, formID);
   // alert("pore");
    response = JSON.parse(response);
    alert(response.status);

    if(response.status){
        WarningMessage('success', 'success', response.message);
    }
    else
        WarningMessage('error', 'Error', response.message);

    //alert(response.message);

}

function PaymentType(ddl1) {

    if (ddl1.options[ddl1.selectedIndex].value == "MoneyReceipt") {

        document.getElementById('Body_Label').innerHTML = "Money Receipt NO";

    }
    else {

        document.getElementById('Body_Label').innerHTML = "Cheque Receipt NO";
        //Check or
    }
}

function Paymentmethod(ddl) {


    if (ddl.options[ddl.selectedIndex].value == "ePGW" || ddl.options[ddl.selectedIndex].value == "WIC") {

/*        document.getElementById('<%=lblBankName.ClientID%>').innerHTML = "";
        document.getElementById('<%=Label3.ClientID%>').innerHTML = "";
        document.getElementById('<%=Label10.ClientID%>').innerHTML = "";
        document.getElementById('<%=Label11.ClientID%>').innerHTML = "";
        document.getElementById('<%=lblAccountNumber.ClientID%>').innerHTML = "";*/


        document.getElementById('payment_type_div').style.display = "none";
        document.getElementById('cheque_or_moneyreceipt_div').style.display = "none";
        document.getElementById('bank_name_div').style.display = "none";
        document.getElementById('account_number_div').style.display = "none";
        document.getElementById('attachment_div').style.display = "none";
      /*  document.getElementById('<%=btnPhotoOperator.ClientID%>').style.display = "none";
        document.getElementById('<%=txtAccountNumber.ClientID%>').style.display = "none";
        document.getElementById('imagecorp').style.display = "none";*/
    }
    else {
/*
        document.getElementById('<%=lblBankName.ClientID%>').innerHTML = "Bank Name";
        document.getElementById('<%=Label3.ClientID%>').innerHTML = "Type of Payment";
        document.getElementById('<%=Label10.ClientID%>').innerHTML = "Cheque Receipt NO:";
        document.getElementById('<%=Label11.ClientID%>').innerHTML = "Attachment:";
        document.getElementById('<%=lblAccountNumber.ClientID%>').innerHTML = "Accoun tNumber";

        document.getElementById('<%=txtpaymenttype.ClientID%>').style.display = "";
        document.getElementById('<%=txtBankName.ClientID%>').style.display = "";
        document.getElementById('<%=txtchequeormoneyreceiptno.ClientID%>').style.display = "";
        document.getElementById('<%=txtattatchment.ClientID%>').style.display = "";
        document.getElementById('<%=FilePhotoOperator.ClientID%>').style.display = "";
        document.getElementById('<%=btnPhotoOperator.ClientID%>').style.display = "";
        document.getElementById('<%=txtAccountNumber.ClientID%>').style.display = "";
*/

        document.getElementById('payment_type_div').style.display = "block";
        document.getElementById('cheque_or_moneyreceipt_div').style.display = "block";
        document.getElementById('bank_name_div').style.display = "block";
        document.getElementById('account_number_div').style.display = "block";
        document.getElementById('attachment_div').style.display = "block";
    }
}

function post_upload(){
   // alert("sdfj");
    var dataInfo = {}
    var response = connectServer(docUpload_url, dataInfo);
    //alert("sdfdsadfhhasfihasuj");
    response = JSON.parse(response);
        alert(response.message);


}

function upload_files(){
    var x = document.getElementById("upload_file");
    //alert("dsdf");
    var txt = "";
    if ('files' in x) {

        var loadfile=x.files[0].name;
        var ext=loadfile.split(".");
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        }
        else if(ext[1]=='PDF'||ext[1]=='pdf'||ext[1]=='png'||ext[1]=='jpg' ) {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file Selected</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "<strong>File Name:</strong> " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "<strong>File Size:</strong> " + file.size + " Bytes <br>";
                }
            }
        }
        else {
            txt += "<strong style='color: red'>**File Format Not Supported </strong> ";
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead.
        }
    }
    document.getElementById("demo").innerHTML = txt;
}

function fetchBankList(){
    var content_service_type_list = $.ajax({
        url: bankNameList_url,
        async: false
    });
    if (content_service_type_list.readyState == 4 && content_service_type_list.status == 200) {

        var content_service_type_lists = JSON.parse(content_service_type_list.responseText);

        var content_service_type_list_options = '<select name="bank_name" >';
        var flag=0;
        $.each(content_service_type_lists,function(index,value){
            /*  if(flag==0){
             content_service_type_list_options += '<option  value="">Select One</option>';
             flag=1;
             }
             else*/
            content_service_type_list_options += '<option  value="'+value.BankCode+'">'+value.BankName+'</option>';

        });
        content_service_type_list_options += '</select>';
        $("#bank_name").html(content_service_type_list_options);

    }

}
function fetchUserList(){
    var content_service_type_list = $.ajax({
        url: userList_url,
        async: false
    });
    if (content_service_type_list.readyState == 4 && content_service_type_list.status == 200) {

        var content_service_type_lists = JSON.parse(content_service_type_list.responseText);

        var content_service_type_list_options = '<select name="user_list" >';
        var flag=0;
        $.each(content_service_type_lists,function(index,value){
            /*  if(flag==0){
             content_service_type_list_options += '<option  value="">Select One</option>';
             flag=1;
             }
             else*/
            content_service_type_list_options += '<option  value="'+value.id+'">'+value.username+'</option>';

        });
        content_service_type_list_options += '</select>';
        $("#user_list").html(content_service_type_list_options);

    }

}

function set_amount(){
    var per_sms_rate =  $("#sms_rate").val();
   var sms_quantity= $("#sms_quantity").val();
    var amt=per_sms_rate*sms_quantity;
   // alert(per_sms_rate+"*"+sms_quantity+"="+amnt);
    //amt = amt + (amt * 0.03) + (amt + (amt * 0.03)) * 0.15;
   $("#sms_price").val(amt);
    amt = amt + (amt * 0.03) + (amt + (amt * 0.03)) * 0.15 + (amt + (amt * 0.03) + (amt + (amt * 0.03)) * 0.15) * 0.01;
    $("#payable_amount").val(amt);
    $("#h_payable_amount").val(amt);

}

function load_payments_list(){
    var fld1 = "0";
    $.ajax({
            type: "POST",
            data: {
                'fld1': fld1
            },
            url: paymentList_url,
            async: true,
            datatype: 'json',
            success: function (input) {
                $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

                input = JSON.parse(input);
                $('#gridTable').dataTable({
                    "data": input,
                    "columns": [

                        { "title": "Transaction ID", "class": "center ratailer_width" },
                       // { "title": "Client ID", "class": "center agent_width" },
                        { "title": "Transaction Time", "class": "center" },
                        { "title": "Payment Method", "class": "center" },
                        { "title": "SMS Quantity", "class": "center" },
                        { "title": "SMS Price Rate", "class": "center" },
                        { "title": "Amount", "class": "center" },
                       /* { "title": "cheque or moneyreceiptno", "class": "center" },
                        { "title": "account number", "class": "center ratailer_width" },
                        { "title": "Bank Name", "class": "center agent_width" },
                        { "title": "attatchment", "class": "center" },
                        { "title": "Status", "class": "center" },*/
                        { "title": "User Name", "class": "center" },
                        { "title": "Invoice ID", "class": "center" },

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