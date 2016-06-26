/**
 * Created by Al Amin on 5/30/2016.
 */

function fetchdropdown_numberList(){
    var content_service_type_list = $.ajax({
        url: getNumberListName,
        async: false
    });
    if (content_service_type_list.readyState == 4 && content_service_type_list.status == 200) {

        var content_service_type_lists = JSON.parse(content_service_type_list.responseText);

        var content_service_type_list_options = '<select name="number_list_dropdown" >';
        $.each(content_service_type_lists,function(index,value){

            content_service_type_list_options += '<option value="'+value.NumberListName+'">'+value.NumberListName+'</option>';

        });
        content_service_type_list_options += '</select>';
        $("#number_list_dropdown").html(content_service_type_list_options);

    }

}

function campaign_group_log(target, formId) {

    var campain_list = $("#campain_list_dropdown").val();
   // var campaign_id = $("#"+campain_list).attr('Campaign_id');
    var campaign_id= $("#campain_list_dropdown").find(':selected').attr('Campaign_id');
    //alert("campaign_id"+campaign_id);
    var number_list = $("#number_list_dropdown").val();

    var Message = $("#Message").val();

    if (Message == '') {
        alert(" Please give input in  Message");
        return;
    }
    if (campain_list == '') {
        alert(" Please select Campaign List");
        return;
    }
//alert(campain_list+number_list+Message+campaign_id);
    $.ajax({
            type: "POST",
            data: {

                'campain_list_dropdown': campain_list,
                'number_list_dropdown': number_list,
                'Message': Message,
                'campaign_id': campaign_id
           //     'date': date

            },
            url: column_Data_url_group_insert,
            async: true,
            datatype: 'json',
            success: function (input) {
                $('#grid').html('<table class="table table-striped table-bordered table-hover responsive" id="gridTable"></table>');

                input = JSON.parse(input);
                          // alert(input);

                if (input == 1) {
                    alert('Group created Successfully');
                    var dataInfo = {};
                    var response = connectServer(getCredit_url, dataInfo);
                    response = JSON.parse(response);
                    // alert(response);
                    $('#has_credits').html(response+" Credits");
                    showAdditionalMenu('100');
                }
                else alert('Your credit limit is zero or less than the numberlist you imported now .Please Contact with your Panel Administrator. ');

            },
            error: function (input) {
                alert("error");
            }
        }
    );



}

