//function loadpageGridProc_campaign_create(target, formId) {

//    var data = loadpageGrid_Generalized(column_Data_url_Campaign_insert, 'loginFormGrid');
//}

function loadpageGrid_Generalized(fetchURL, formId) {
    var returnValue;
    var formData = new FormData(document.getElementById(formId));

    $.ajax({
        type: "POST",
        url: fetchURL,
        async: false,
        data: formData,
        success: function (value) {

            input = JSON.parse(value);
            if (input == 1) {
                alert('Voice Sms Sent Successfully');
            }
            else alert('Please enter valid Sender Number OR valid CSV file to Import OR valid Prompt file ');

            returnValue = value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            genericError(jqXHR, textStatus, errorThrown);
        },
        processData: false,  // tell jQuery not to process the data
        contentType: false   // tell jQuery not to set contentType
    });
    return returnValue;
}


function loadpageGridProc_campaign_create(target, formId) {

    var campaignname = $("#Campaign").val();
    var NAME = $("#NAME").val();
    var STATUS = $("#status").val();
    var channels = $("#channels").val();
    var estbudget = $("#estbudget").val();
    var spent = $("#spent").val();
    var smsno = $("#smsno").val();

    var startdate = $("#datepicker").val();
    var enddate = $("#datepicker1").val();
//    alert (Date1);
    var starttime = $("#js-example-data-array").val();
    var endtime = $("#js-example-data-array1").val();
    //    alert(endtime);



    if (campaignname == '') {
        alert(" Please give input in Campaign Name");
        return;
    }
    if (NAME == '') {
        alert(" Please give input in  Name");
        return;
    }

    if (STATUS == '') {
        alert(" Please give input in  STATUS");
        return;
    }
    if (channels == '') {
        alert(" Please give input in  Channels");
        return;
    }
    if (estbudget == '') {
        alert(" Please give input in  Estimated budget");
        return;
    }
    if (spent == '') {
        alert(" Please give input in  Spent");
        return;
    }

    if (smsno == '') {
        alert(" Please give input in  Sms No");
        return;
    }
    if (startdate == '') {
        alert(" Please give input in  Start date");
        return;
    }
    if (enddate == '') {
        alert(" Please give input in  End date");
        return;
    }

    $.ajax({
        type: "POST",
        data: {
            'campaignname':campaignname,
            'NAME': NAME,
            'STATUS': STATUS,
            'channels': channels,
            'estbudget': estbudget,
            'spent': spent,
            'smsno':smsno,
            'starttime': starttime,
            'startdate': startdate,
            'endtime': endtime,
            'enddate': enddate
        },
        url: column_Data_url_Campaign_insert,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);

            if (input == 1) {
                alert('Campaign created Successfully');
            }
            else alert('Please enter valid Sender Number OR valid CSV file to Import OR valid Prompt file ');
           
        },
        error: function (input) {
            alert("error");
        }
    }
    );
}

function loadpageGridProc_group_create(target, formId) {

    var name = $("#name").val();

    var status = $("#status").val();
    var email = $("#email").val();
    var company = $("#company").val();
    var city = $("#city").val();
    var zipcode = $("#zipcode").val();

    var date = $("#datepicker").val();

    if (name == '') {
        alert(" Please give input in Name");
        return;
    }
    if (status == '') {
        alert(" Please give input in  status");
        return;
    }

    if (email == '') {
        alert(" Please give input in  email");
        return;
    }
    if (company == '') {
        alert(" Please give input in  company");
        return;
    }
    if (city == '') {
        alert(" Please give input in  city");
        return;
    }

    if (zipcode == '') {
        alert(" Please give input in  zipcode");
        return;
    }
    if (date == '') {
        alert(" Please give input in  date");
        return;
    }
   
    $.ajax({
        type: "POST",
        data: {

            'name': name,
            'status': status,
            'email': email,
            'company': company,
            'city': city,
            'zipcode': zipcode,
            'date': date

        },
        url: column_Data_url_group_insert,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);

            if (input == 1) {
                alert('Group created Successfully');
            }
            else alert('Please enter valid Sender Number OR valid CSV file to Import OR valid Prompt file ');

        },
        error: function (input) {
            alert("error");
        }
    }
    );
}

function loadpageGrid_Rupon(fetchURL, formId) {
   
    var returnValue;
   var formData = new FormData(document.getElementById(formId));
   var chk = sessionStorage.getItem("test")
   formData.append('chkval', chk);
  
     $.ajax({
        type: "POST",
        url: fetchURL,
        async: false,
        data:  formData,
        success: function (value) {
		   $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');
            value = JSON.parse(value);
		    //==============================================================
            $('#gridTable').dataTable({
                "bFilter": true,
                "data": value,
                "columns": [
                    {"title": "MSISDN", "class": "center"}
		      	
                             ],

                "order": [[0, "desc"]],
                dom: 'T<"clear">lfrtip',
                tableTools: {
                    "sSwfPath": "img/datatable/swf/copy_csv_xls_pdf.swf",
                    "sRowSelect": "multi",
                    "aButtons": [
                        "csv",
                        {
                            "sExtends": "xls",
                            "sFileName": "*.xls"
                        }
                    ],
                    "filter": "applied"
                }
            });
                           
            returnValue = value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            genericError(jqXHR, textStatus, errorThrown);
        },
        processData: false,  // tell jQuery not to process the data
        contentType: false   // tell jQuery not to set contentType
    });
    return returnValue;
}

function loadLogin1(target, formId)
{
       postFormData('cmsLoginForm', login_check_url, function (data) {
        if (data.readyState == 4) {
            if (data.response != false) 
            {

                obj = JSON.parse(data.response);
              //  alert(obj.id+obj.name+obj.username+obj.password);
                if (obj.id != null)
                {
                    var auth_user = new Object();

                    auth_user.id = obj.id;
                    auth_user.name = obj.name;
                    auth_user.username = obj.username;
                    auth_user.password = obj.password;
                    auth_user.usertype = obj.usertype; // added by al amin
                    auth_user.hasCredit = obj.hasCredit; // added by al amin

                    var auth_session_data = JSON.stringify(auth_user);
                    //alert(auth_session_data);
                    setSession(auth_session_data, 'cms_auth');
                    setTimeout(function () {
                    redirect_to(cmsConfig.site_root);
                    }, 1000);
                }
                else
                {
                    destroySession('cms_auth');
                    alert('Username and password does not matched.');
                }
            } else {
                alert('Username and password does not matched.');
            }
        }
    });
}

//logout @jobaidur
function logout_user(key){
 destroySession(key);
 window.location.replace(cmsConfig.site_root);
}

function myFunction()
{
    /*var data_all = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'try001' },
    { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, 
    { id: 4, text: 'wontfix' }];
      */          
     //{"1":"try001","11103":"LF#4358\/2010","11122":"LF#4358\/2010","12343":"BG#20107159","12344":"BG#20101161"}
     //{"id":"12344","text":"BG#20101161"}
     //[{"id":"1","text":"try001"},{"id":"11103","text":"LF#4358\/2010"},{"id":"11122","text":"LF#4358\/2010"},
     //{"id":"12343","text":"BG#20107159"},{"id":"12344","text":"BG#20101161"}]
     $.ajax({
        type: "POST",        
        url: column_Data_url,
        async: true,
        datatype: 'json',
            success: function (input) {
                
                input = JSON.parse(input)
                alert(input);
                 $("#shortCode").select2({ data: input });
                //$("#getData").html(input);
            },
            error: function (input) {
                alert("error");
            }
        }
    );
              
    
}

function showAdditionalMenu(content_id)
{
      if (content_id == 81)
    {
        showPage(content_id);
        //fetchData("#serviceCheckBox",column_Data_url);
//        loadpageGridProc_group();
        loadpageGridProc_campaign();
       // loadpageGridProc_group();
      

    }
     else if (content_id == 85) {
         showPage(content_id);
         loadpageGridProc_number();
//        fetchDatarobi("#serviceCheckBox_robi", column_Data_url_robi);

    }


     else if (content_id == 87) {
        showPage(content_id);
          load_payments_list();
    }

    else if (content_id == 1011) {
        showPage(content_id);

    }
     else if (content_id == 88) { // accounts management(admin)
        showPage(content_id);
          load_accounts_list();

    }

    else if (content_id == 30) {
        showPage(content_id);
        //        fetchDatabl("#serviceCheckBox_bl", column_Data_url_bl);

    }

    else if (content_id == 95) {
        showPage(content_id);
        $("#datepicker").datepicker();
        $("#datepicker1").datepicker();
        myFunction();
        myFunction1();
        //        fetchDatarobi("#serviceCheckBox_robi", column_Data_url_robi);

    }

    else if (content_id == 86) {
        showPage(content_id);
        $("#datepicker").datepicker();
        $("#datepicker1").datepicker();
        fetchdropdown_grouplist();

    }

    else if (content_id == 96) {
         loadpageGridProc_group();
         showPage(content_id);
          fetchdropdown();
          fetchdropdown_numberList();
        $("#datepicker").datepicker();

    }
      else if (content_id == 100) {
          loadpageGridProc_group();
          showPage(content_id);
          fetchdropdown();
          fetchdropdown_numberList();
          $("#datepicker").datepicker();

      }

    else if (content_id == 89) {
        showPage(content_id);
        fetchdropdown();

    }
    else if (content_id == 90) {
        showPage(content_id);

    }

    else if (content_id == 97) {
        showPage(content_id);
        $("#datepicker").datepicker();

    }

    else if (content_id == 98) {
        showPage(content_id);
        $("#datepicker").datepicker();
        $("#datepicker1").datepicker();
//        myFunction();
//        myFunction1();

    }
      else if (content_id == 40) {
          showPage(content_id);

      }
      else if (content_id == 41) {
          showPage(content_id);

      }
      else if (content_id == 42) {
          showPage(content_id);

      }
      else if (content_id == 43) {
          showPage(content_id);

      }
      else if (content_id == 50) {
          showPage(content_id);
          $("#payment_date").datepicker();
         // $("#payment_date").datetimepicker();
          //$("#datetimepicker").datepicker();

        $('#datetimepicker').datetimepicker({
              format: 'dd/MM/yyyy hh:mm:ss',
              language: 'pt-BR'
          });


          fetchBankList();
          fetchUserList();

      }
}
function connectServer(fetchURL, dataInfo, asyncFlag) {

    var returnValue;
    if (asyncFlag == undefined) {
        asyncFlag = false;
    }

    $.ajax({
        type: 'POST',
        url: fetchURL,
        async: asyncFlag,
        data: {'info': dataInfo},
        success: function (value) {
            returnValue = value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            genericError(jqXHR, textStatus, errorThrown);
        }
    });
    return returnValue;
}


function loadpageGridProc_group(target, formId) {

    var fld1 = "0";
    var Date1 = "0";
    var Date2 = "0";

    $.ajax({
        type: "POST",
        data: {
            'fld1': fld1,
            'Date1': Date1,
            'Date2': Date2
        },
        url: grid_url_proc_group,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid1').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);
            //alert(input);
            //==============================================================
            var dTable = $('#gridTable').dataTable({
                "bFilter": false,
                "data": input,
                "paging": false,
                "ordering": false,
                "info": false,
                "columns": [
                    {"title": "Group ID", "class": "center"},
                    {"title": "Campaign Name", "class": "center"},
                    {"title": "Number List Name", "class": "center agent_width"},
                    {"title": "Message/Text", "class": "center"},
                    {"title": "DATE", "class": "center"},
                    {"title": "Status", "class": "center"},
                    {"title": "Action", "class": "center"}
                ],

                error: function (input) {
                    alert("error");
                }
            });

        }
    });
}


function loadpageGridProc_campaign(target, formId) {


    var fld1 = "0";
  
    var Date1 ="0";
    var Date2 ="0";

    $.ajax({
        type: "POST",
        data: {
            'fld1': fld1,
            'Date1': Date1,
            'Date2': Date2
        },
        url: grid_url_proc_campaign,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);
            //alert(input);
            //==============================================================
            $('#gridTable').dataTable({
               // "bFilter": false,
                "data": input,
                //"bInfo": false,
               // "paging":   false,
               // "ordering": false,
               // "info":     false,
                "columns": [
                // { "title": "Id", "class": "center" },
                    {"title": "Campaign Name", "class": "center" },
                    { "title": "Name", "class": "center ratailer_width" },
                    { "title": "Status", "class": "center agent_width" },
                    { "title": "Channels", "class": "center" },
                    { "title": "Est. Budget", "class": "center" },
                    { "title": "Spent", "class": "center" },
                    { "title": "Sms no", "class": "center" },
                    { "title": "Start Date", "class": "center" },
                    { "title": "End Date", "class": "center" },
                     { "title": "Start Time", "class": "center" },
                    { "title": "End Time", "class": "center" },
                  //  { "title": "Id", "class": "center" },
                    { "title": "Action", "class": "center" }
                    ]
            });

        },
        error: function (input) {
            alert("error");
        }
    }
    );
}

function clicked(split, dataIndex) {
    //console.log(split)   ;
    var textid = "#comment_" + dataIndex;
    var comments = $(textid).val();
    var fld1 = split[2];
    var fld2 = split[5];
    var fld3 = comments;
   // alert(fld1);
   // alert(fld1);
    return;
    $.ajax({
        type: "POST",
        data: {
            'fld1': fld1,
            'fld2': fld2,
            'fld3': fld3

        },
        url: grid_Data_url,
        async: true,
        datatype: 'json',
        success: function (input) {
            var arrInput = input.split('|');
            split[3] = arrInput[1].toString().trim();
            split[5] = arrInput[0].toString().trim();

            var myJsonString = JSON.stringify(split);
            //console.log(myJsonString);
            //Status
            $('#status_' + dataIndex).html(arrInput[0]);
            //Button
            if (arrInput[0] == "Published")
                $('#btnDiv_' + dataIndex).html("<button ID='btn_" + dataIndex + "' onclick='clicked(" + myJsonString + "," + dataIndex + ");return false;' >Reject</button>");
            else
                $('#btnDiv_' + dataIndex).html("<button ID='btn_" + dataIndex + "' onclick='clicked(" + myJsonString + "," + dataIndex + ");return false;' >Publish</button>");
            //Publish Date
            $('#pub_' + dataIndex).html(arrInput[1]);

        },
        error: function (input) {
            alert("error");
        }
    }
    );
}

function myFunction() {
    /*var data_all = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'try001' },
    { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, 
    { id: 4, text: 'wontfix' }];
    */
    //{"1":"try001","11103":"LF#4358\/2010","11122":"LF#4358\/2010","12343":"BG#20107159","12344":"BG#20101161"}
    //{"id":"12344","text":"BG#20101161"}
    //[{"id":"1","text":"try001"},{"id":"11103","text":"LF#4358\/2010"},{"id":"11122","text":"LF#4358\/2010"},
    //{"id":"12343","text":"BG#20107159"},{"id":"12344","text":"BG#20101161"}]
    $.ajax({
        type: "POST",
        url: column_Data_url_startdate,
        async: true,
        datatype: 'json',
        success: function (input) {

            input = JSON.parse(input)
            //alert(input);
            $("#js-example-data-array").select2({ data: input });
            //$("#getData").html(input);
        },
        error: function (input) {
            alert("error");
        }
    }
    );
    //alert("hello");
    // array(array('dke'=>0,'inde'=>'y'),);


}

function myFunction1() {
    /*var data_all = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'try001' },
    { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, 
    { id: 4, text: 'wontfix' }];
    */
    //{"1":"try001","11103":"LF#4358\/2010","11122":"LF#4358\/2010","12343":"BG#20107159","12344":"BG#20101161"}
    //{"id":"12344","text":"BG#20101161"}
    //[{"id":"1","text":"try001"},{"id":"11103","text":"LF#4358\/2010"},{"id":"11122","text":"LF#4358\/2010"},
    //{"id":"12343","text":"BG#20107159"},{"id":"12344","text":"BG#20101161"}]
    $.ajax({
        type: "POST",
        url: column_Data_url_Enddate,
        async: true,
        datatype: 'json',
        success: function (input) {

            input = JSON.parse(input)
            //alert(input);
            $("#js-example-data-array1").select2({ data: input });
            //$("#getData").html(input);
        },
        error: function (input) {
            alert("error");
        }
    }
    );
    //alert("hello");
    // array(array('dke'=>0,'inde'=>'y'),);


}

function loadpageGridProc_number_pre(target, formId) {


    var fld1 = "0";

    var Date1 = "0";
    var Date2 = "0";

    $.ajax({
        type: "POST",
        data: {
            'fld1': fld1,
            'Date1': Date1,
            'Date2': Date2
        },
        url: numberList_url,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);
            //alert(input);
            //==============================================================
            $('#gridTable').dataTable({
                "bFilter": false,
                "data": input,
                "columns": [

                    { "title": "Name", "class": "center ratailer_width" },
                    { "title": "NumberCount", "class": "center agent_width" },
                    { "title": "Channels", "class": "center" },
                    { "title": "description", "class": "center" },
                    { "title": "createtime", "class": "center" },
                    { "title": "updatetime", "class": "center" },



                //                { "title": "ACTION", "class": "center ratailer_width",
                //                    "fnCreatedCell":
                //                               function (nTd, sData, oData, iRow, iCol) {
                //                                   var myJsonString = JSON.stringify(oData);
                //                                   $(nTd).html("<div id='btnDiv_" + iRow.toString() + "'><button class='editBut' ID='btn_" + iRow + "' onclick='clicked(" + myJsonString + "," + iRow + ");return false;' >Edit</button></div>");
                //                               }
                //                }
                ]
                // "order": [[0, "desc"]]

                //              
            });
            //====================================================


            //$("#grid").html(input);
        },
        error: function (input) {
            alert("error");
        }
    }
    );
}

function loadpageGridProc_campaign_update(target, formId) {
    //alert('hi');
    var id = $("#id").val();
    var campaignname = $("#Campaign").val();
    var NAME = $("#NAME").val();
    var STATUS = $("#status").val();
    var channels = $("#channels").val();
    var estbudget = $("#estbudget").val();
    var spent = $("#spent").val();
    var smsno = $("#smsno").val();

    var startdate = $("#datepicker").val();
    var enddate = $("#datepicker1").val();
    //    alert (Date1);
    var starttime = $("#js-example-data-array").val();
    var endtime = $("#js-example-data-array1").val();
    //    alert(endtime);

    if (campaignname == '') {
        alert(" Please give input in Campaign Name");
        return;
    }
    if (NAME == '') {
        alert(" Please give input in  Name");
        return;
    }

    if (STATUS == '') {
        alert(" Please give input in  STATUS");
        return;
    }
    if (channels == '') {
        alert(" Please give input in  Channels");
        return;
    }
    if (estbudget == '') {
        alert(" Please give input in  Estimated budget");
        return;
    }
    if (spent == '') {
        alert(" Please give input in  Spent");
        return;
    }

    if (smsno == '') {
        alert(" Please give input in  Sms No");
        return;
    }
    if (startdate == '') {
        alert(" Please give input in  Start date");
        return;
    }
    if (enddate == '') {
        alert(" Please give input in  End date");
        return;
    }



    $.ajax({
        type: "POST",
        data: {
            'id': id,
            'campaignname': campaignname,
            'NAME': NAME,
            'STATUS': STATUS,
            'channels': channels,
            'estbudget': estbudget,
            'spent': spent,
            'smsno': smsno,
            'starttime': starttime,
            'startdate': startdate,
            'endtime': endtime,
            'enddate': enddate
        },
        url: column_Data_url_Campaign_update,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);
            //            alert(input);

            if (input == 1) {
                alert('Campaign updated Successfully');
            }
            else alert('Please enter valid Sender Number OR valid CSV file to Import OR valid Prompt file ');

        },
        error: function (input) {
            alert("error");
        }
    }
    );
}

function loadpageGridProc_group_update(target, formId) {
 //   alert('hi');

    var id = $("#group_id").val();
    var campain_list = $("#campain_list_dropdown").val();
    var number_list = $("#number_list_dropdown").val();
    var Message = $("#Message").val();
    //var campaign_id=$("#campaign_id").val();
    var campaign_id= $("#campain_list_dropdown").find(':selected').attr('Campaign_id');
  //  var city = $("#city").val();
   // var zipcode = $("#zipcode").val();
//    var date = $("#datepicker").val();

alert("id"+id+"campaign_id:"+campaign_id);
    if (Message == '') {
        alert(" Please give input in  Message/Text");
        return;
    }

    $.ajax({
        type: "POST",
        data: {
            'id': id,
            'campain_list_dropdown': campain_list,
            'number_list_dropdown': number_list,
            'Message': Message,
            'campaign_id': campaign_id
           // 'zipcode': zipcode,
           // 'date': date

        },
        url: column_Data_url_group_update,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);
            //            alert(input);

            if (input == 1) {
                alert('Group updated Successfully');
                showAdditionalMenu('100');
            }
            else alert('Please enter valid Sender Number OR valid CSV file to Import OR valid Prompt file ');

        },
        error: function (input) {
            alert("error");
        }
    }
    );

}

function loadpageGridProc_campaign_delete(target, formId) {
    //alert('hi');
    var id = $("#id").val();

    //    alert(endtime);
    $.ajax({
        type: "POST",
        data: {
            'id': id
        },
        url: column_Data_url_Campaign_delete,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);
            //            alert(input);

            if (input == 1) {
                alert('Campaign deleted Successfully');
            }
            else alert('Please enter valid Sender Number OR valid CSV file to Import OR valid Prompt file ');

        },
        error: function (input) {
            alert("error");
        }
    }
    );
}

function loadpageGridProc_group_delete(target, formId) {
    //alert('hi');

    var id = $("#id").val();


    //    alert(endtime);
    $.ajax({
        type: "POST",
        data: {
            'id': id


        },
        url: column_Data_url_group_delete,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);
            //            alert(input);

            if (input == 1) {
                alert('Group deleted Successfully');
            }
            else alert('Please enter valid Sender Number OR valid CSV file to Import OR valid Prompt file ');

        },
        error: function (input) {
            alert("error");
        }
    }
    );
}

function loadpageGridProc_Manual_send (target, formId) {
    //   alert('hi');

    var Mobile = $("#Mobile").val();
   
    var Message = $("#Message").val();
   

//    alert("id" + id + "campaign_id:" + campaign_id);
    if (Message == '') {
        alert(" Please give input in  Message/Text");
        return;
    }

    if (Mobile == '') {
        alert(" Please give input in Mobile No ");
        return;
    }

    $.ajax({
        type: "POST",
        data: {
            'Message': Message,
            'Mobile': Mobile          

        },
        url: Manual_insert_sms,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);
            //            alert(input);

            if (input == 1) {
                alert('Sms Inserted Successfully');
               // showAdditionalMenu('1011');
            }
            else alert('Your credit limit is zero now .Please Contact with your Panel Administrator. ');

        },
        error: function (input) {
            alert("error");
        }
    }
    );

    var dataInfo = {};
    var response = connectServer(getCredit_url, dataInfo);
    response = JSON.parse(response);
   // alert(response);
    $('#has_credits').html(response+" Credits");
}


// function group_dropdown() 
function myFunction3() {
    /*var data_all = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'try001' },
    { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, 
    { id: 4, text: 'wontfix' }];
    */
    //{"1":"try001","11103":"LF#4358\/2010","11122":"LF#4358\/2010","12343":"BG#20107159","12344":"BG#20101161"}
    //{"id":"12344","text":"BG#20101161"}
    //[{"id":"1","text":"try001"},{"id":"11103","text":"LF#4358\/2010"},{"id":"11122","text":"LF#4358\/2010"},
    //{"id":"12343","text":"BG#20107159"},{"id":"12344","text":"BG#20101161"}]
    $.ajax({
        type: "POST",
        url: column_Data_url_group_dropdown,
        async: true,
        datatype: 'json',
        success: function (input) {

            input = JSON.parse(input)
            //alert(input);
            $("#js-example-data-array").select2({ data: input });
            //$("#getData").html(input);
        },
        error: function (input) {
            alert("error");
        }
    }
    );
    //alert("hello");
    // array(array('dke'=>0,'inde'=>'y'),);


}


function loadpageGridProc_Report(target, formId) {

    var campain = $("#js-example-data-array").val();
    var id = $("#js-example-data-array").find(':selected').attr('id'); //
    //    alert(id);
    var startdate = $("#datepicker").val();
    var enddate = $("#datepicker1").val();

    if (startdate == '') {
        alert(" Please give input in  Start date");
        return;
    }
    if (enddate == '') {
        alert(" Please give input in  End date");
        return;
    }

    if (campain == '') {
        alert(" Please give input in  campaign");
        return;
    }

    // var campaign_id = $("#"+campain_list).attr('Campaign_id');
    // var campaign_id = $("#js-example-data-array3").find(':selected').attr('id');

    $.ajax({
        type: "POST",
        data: {
            'campain': campain,
            'groupid': id,
            'startdate': startdate,
            'enddate': enddate
        },
        url: column_Data_url_report_group,
        async: true,
        datatype: 'json',
        success: function (input) {
            $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

            input = JSON.parse(input);
            //alert(input);
            //==============================================================
            var dTable = $('#gridTable').dataTable({
                "bFilter": false,
                "data": input,
                "paging": false,
                "ordering": true,
                "info": false,
                "columns": [

                    { "title": "Total", "class": "center ratailer_width" },
                    { "title": "campaign", "class": "center agent_width" },
                    { "title": "msg", "class": "center" },
                    { "title": "msgStatus", "class": "center" }
//                    { "title": "createtime", "class": "center" },
//                    { "title": "updatetime", "class": "center" },



                //                { "title": "ACTION", "class": "center ratailer_width",
                //                    "fnCreatedCell":
                //                               function (nTd, sData, oData, iRow, iCol) {
                //                                   var myJsonString = JSON.stringify(oData);
                //                                   $(nTd).html("<div id='btnDiv_" + iRow.toString() + "'><button class='editBut' ID='btn_" + iRow + "' onclick='clicked(" + myJsonString + "," + iRow + ");return false;' >Edit</button></div>");
                //                               }
                //                }
                ]
                // "order": [[0, "desc"]]

                //              
            });
            //====================================================


            //$("#grid").html(input);
        },
        error: function (input) {
            alert("error");
        }
    }
    );
}


function fetchdropdown_grouplist() {
    var content_service_type_list = $.ajax({
        url: column_Data_url_group_dropdown,
        async: false
    });
    if (content_service_type_list.readyState == 4 && content_service_type_list.status == 200) {

        var content_service_type_lists = JSON.parse(content_service_type_list.responseText);

        var content_service_type_list_options = '<select name="js-example-data-array" >';
        var flag = 0;
        $.each(content_service_type_lists, function (index, value) {
            /*  if(flag==0){
            content_service_type_list_options += '<option  value="">Select One</option>';
            flag=1;
            }
            else*/
            content_service_type_list_options += '<option id= "' + value.id + '" Campaign_id="' + value.id + '" value="' + value.text + '">' + value.text + '</option>';


        });
        content_service_type_list_options += '</select>';
        $("#js-example-data-array").html(content_service_type_list_options);

    }

}