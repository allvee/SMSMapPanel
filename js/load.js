$(document).ready(function(){
    
    //$('select').select2();           
    
    var cms_auth = checkSession('cms_auth');
   // alert("cms_auth:"+cms_auth);

    if (cms_auth != null)
    {
        //alert("in Config");
        // if type = super then 30 else something other
        var objJSON = eval("(function(){return " + cms_auth + ";})()");

        if(objJSON.usertype=='generalUser')
            cmsConfig.default_content_id = 30;
        else
            cmsConfig.default_content_id = 30;
    }
    else
    {
        cmsConfig.default_content_id = 82;
    }
    
    loadCms();
    
   
});