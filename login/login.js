/*$( document ).ready(function() {
    if (localStorage.user != undefined) {
        $(".divCenter_login").hide();
        $(".divCenter_list").fadeIn();    
        setTimeout(function(){ 
            $("#logged").html(localStorage.getItem("user"));
        }, 1000);
    }   
});*/

function Login(){
    if(!$("#user").val()){
        showAlert("Type user!");
        return;
    }
    if(!$("#pass").val()){
        showAlert("Type password!");
        return;
    }
    $.ajax({
        type: "POST",
        url: 'http://localhost/projetoteste/api/loginuser.php',
        data: {
                user:$("#user").val(),
                pass:$("#pass").val()
              },
        success: success,
        dataType: 'json'
      });
}

function success(data){
    if(data.error == 1){
        showAlert(data.msg);
    } else {
        localStorage.setItem("user",data.name);
        $('#root').fadeOut(0).fadeIn().load('scheduler/scheduler.html');
    }
}

function showAlert(val){
    $(".alert").slideDown(400);
    $("#msgAlert").html(val);    
    setTimeout(function(){ 
        $(".alert").slideUp(400);
    }, 3000);
}