/**
 * Created by Al Amin on 5/24/2016.
 */


function create_number_list(formID){

    var response = common_file_uploader(Dump_Upload_url, formID);
 
response = JSON.parse(response);
    if (response.status) {
        if(response.final=='yes'){
            alert(response.message);
            showAdditionalMenu('85');
        }
        else
        alert(response.message);
    }
    else
    alert(response.message);

}

function fetchdropdown_starttime(){
    var content_service_type_list = $.ajax({
        url: get_hour_list_startdate,
        async: false
    });
       if (content_service_type_list.readyState == 4 && content_service_type_list.status == 200) {

        var content_service_type_lists = JSON.parse(content_service_type_list.responseText);

        var content_service_type_list_options = '<select name="js-example-data-array" >';
        $.each(content_service_type_lists,function(index,value){

            content_service_type_list_options += '<option value="'+value.CampaignName1+'">'+value.CampaignName1+'</option>';

        });
        content_service_type_list_options += '</select>';
        $("#js-example-data-array").html(content_service_type_list_options);

//        alert(content_service_type_list_options);

    }

}

function fetchdropdown_endtime(){
    var content_service_type_list = $.ajax({
        url: get_hour_list_startdate,
        async: false
    });
       if (content_service_type_list.readyState == 4 && content_service_type_list.status == 200) {

        var content_service_type_lists = JSON.parse(content_service_type_list.responseText);

        var content_service_type_list_options = '<select name="js-example-data-array1" >';
        $.each(content_service_type_lists,function(index,value){

            content_service_type_list_options += '<option value="'+value.CampaignName1+'">'+value.CampaignName1+'</option>';

        });
        content_service_type_list_options += '</select>';
        $("#js-example-data-array1").html(content_service_type_list_options);

//        alert(content_service_type_list_options);

    }

}

function onchange(id){
    alert("hi");
    $('#Campaign_id').val(this.options[this.selectedIndex].getAttribute('Campaign_id'));
    alert(this.options[this.selectedIndex].getAttribute('Campaign_id'));

    //onchange="$('#Campaign_id').val(this.options[this.selectedIndex].getAttribute('Campaign_id'));  var campaign_id=$("#campaign_id").val(); alert(campaign_id);"+
       // "alert(this.options[this.selectedIndex].getAttribute('campaign_id'));";
}

function fetchdropdown(){
    var content_service_type_list = $.ajax({
        url: column_NameList_url,
        async: false
    });
       if (content_service_type_list.readyState == 4 && content_service_type_list.status == 200) {

        var content_service_type_lists = JSON.parse(content_service_type_list.responseText);

        var content_service_type_list_options = '<select name="campain_list_dropdown" >';
           var flag=0;
        $.each(content_service_type_lists,function(index,value){
          /*  if(flag==0){
                content_service_type_list_options += '<option  value="">Select One</option>';
                flag=1;
            }
            else*/
            content_service_type_list_options += '<option id= "'+value.CampaignName+'" Campaign_id="'+value.campaignID+'" value="'+value.CampaignName+'">'+value.CampaignName+'</option>';

        });
        content_service_type_list_options += '</select>';
        $("#campain_list_dropdown").html(content_service_type_list_options);

    }

}

function edit_number_list(formID){

    var response = connectServerWithForm(editNumberList_url, formID);
        response = JSON.parse(response);
    if (response.status) {
      alert(response.message);
      showAdditionalMenu('85');
    }
    else
        alert(response.message);
}

function loadpageGridProc_number(target, formId) {
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
            url: numberList_url,
            async: true,
            datatype: 'json',
            success: function (input) {
                $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

                input = JSON.parse(input);
                $('#gridTable').dataTable({
                    "data": input,
                    "columns": [

                        { "title": "Name", "class": "center ratailer_width" },
                        { "title": "NumberCount", "class": "center agent_width" },
                        //{ "title": "description", "class": "center" },
                        { "title": "createtime", "class": "center" },
                        { "title": "updatetime", "class": "center" },
                        { "title": "Action", "class": "center" },
                         ],
                    "order": [[0, "asc"]],

                });

            },
            error: function (input) {
                alert("error");
            }
        }
    );
}

function set_data_to_edit_number_list(obj, name, description) {
    var data = [];
    var table = document.getElementById('gridTable');
    var index = obj.parentNode.parentNode.rowIndex;
    var i = 0;
    for (i = 0; i < 5; i++)
    data[i] = table.rows[index].cells[i].innerHTML;

    showAdditionalMenu('90');
    fetchdropdown();
    $('#last_cname').val(data[2]);
    $('#last_lname').val(data[0]);
    $("#campain_list_dropdown option[value='" + data[2] + "']").attr('selected', true);
    $('#list_name').val(data[0]);
   // $('#list_cbackname').html("Current: "+data[2]);
  //  $('#list_lbackname').html("Current: "+data[0]);

    console.log("1:",data[0],"    2:",data[1],"   3:", data[2],"      4:", data[3],"         5:" , data[4]);
}

function edit_group_list(obj, id, id) {
//alert(id);
    var data = [];
    var table = document.getElementById('gridTable');
    var index = obj.parentNode.parentNode.rowIndex;
    var i = 0;
    for (i = 0; i < 7; i++)
        data[i] = table.rows[index].cells[i].innerHTML;

    showAdditionalMenu('97');
    fetchdropdown();
    fetchdropdown_numberList();
    console.log(data[0],"    ",data[1],"        ", data[2],"          " , data[3],"          " , data[4],"          ", data[5],"          " ,id );
    $("#group_id").val(id);
    $("#campain_list_dropdown option[ value='" + data[1] + "']").attr('selected', true);
    $("#number_list_dropdown option[ value='" + data[2] + "']").attr('selected', true);
    var campaign_id= $("#campain_list_dropdown").find(':selected').attr('Campaign_id');
    alert("campaign_id: "+campaign_id);
    $("#Message").val( data[3]);
}

function edit_campaign_list(obj, id, id) {
//alert(id);
    var data = [];
    var table = document.getElementById('gridTable');
    var index = obj.parentNode.parentNode.rowIndex;
    var i = 0;
    for (i = 0; i < 12; i++)
    data[i] = table.rows[index].cells[i].innerHTML;
   // showUserMenu('edit_conference');
    showAdditionalMenu('98');
    fetchdropdown_starttime();
    fetchdropdown_endtime();
   // fetchdropdown();
    console.log(data[0],"    ",data[1],"        ", data[2],"          " , data[3],"          " , data[4],"          ", data[5],"          " ,data[6],"          " ,data[7],"          " ,data[8],"          " ,data[9],"          " ,data[10],"          " ,data[11],"          " ,id );
   
    $("#id").val(id);     
    $("#Campaign").val( data[0]);
    $("#NAME").val( data[1]);
    $("#status").val( data[2]);
    $("#channels").val( data[3]);
    $("#estbudget").val( data[4]);
    $("#spent").val( data[5]);
    $("#smsno").val( data[6]);
    $("#datepicker").val( data[7]);
    $("#datepicker1").val( data[8]);
    $("#js-example-data-array").val( data[9]);
    $("#js-example-data-array1").val( data[10]);

    
}

function delete_campaign_list(obj, id, id){

//    alert(id);
    var dataInfo = {}
    dataInfo['id']=id;
//    dataInfo['description']=description;
    var response = connectServer(column_Data_url_Campaign_delete, dataInfo);
//    alert(response);

    response = JSON.parse(response);
    //alert(response.status);
    if(response==1){
         alert('campaign Deleted Successfully');
        showAdditionalMenu('81');
    }
    //alert(response.message, response.query);
}


function delete_group_list(obj, id, id){

//    alert(id);
    var dataInfo = {}
    dataInfo['id']=id;
//    dataInfo['description']=description;
    var response = connectServer(column_Data_url_group_delete, dataInfo);
//    alert(response);

    response = JSON.parse(response);
    //alert(response.status);
    if(response==1){
         alert('Group Deleted Successfully');
        showAdditionalMenu('100');
    }
    //alert(response.message, response.query);
}

function delete_number_list(obj, name, description){

    var dataInfo = {}
    dataInfo['name']=name;
    dataInfo['description']=description;
    var response = connectServer(deletNumberList_url, dataInfo);

    response = JSON.parse(response);
    if(response.status){
        alert(response.message, response.query);
        showAdditionalMenu('85');
    }
//   
else
 alert(response.message, response.query);
}