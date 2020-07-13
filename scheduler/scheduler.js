// for phone
var behavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
options = {
    onKeyPress: function (val, e, field, options) {
        field.mask(behavior.apply({}, arguments), options);
    }
};

$( document ).ready(function() {
    $("#logged").html("<strong>Logged</strong>: "+localStorage.getItem("user"));
    $("#logo").fadeIn();
    $("#zipcode").mask('00000-000');

    $("#primaryphone").mask(behavior, options);
    contactList();


});

function contactList(){
    $.ajax({
        type: "POST",
        url: 'http://localhost/projetoteste/api/contactlist.php',
        data: {
                user:$("#user").val(),
                pass:$("#pass").val(),
                action:""
              },
        success: listContact,
        dataType: 'json'
      });
}

function listContact(data){
    var table = "";
    var corTr = "#F0F0F0";
    for(i=0;i<data.length;i++){
        watsapp = "";
        if(i % 2 == 0){ corTr = "#F0F0F0" } else {corTr = "#FFF" };
        if(data[i].phones == null){
            data[i].phones = "";
        }
        if(data[i].adress == null){
            data[i].adress = "";
        }
        if(data[i].number == null){
            data[i].number = "";
        }
        if(data[i].neighborhood == null){
            data[i].neighborhood = "";
        }
        if(data[i].zipcode == null){
            data[i].zipcode = "";
        }
        if(data[i].watsapp == 1){
            watsapp = "<img src='image/watsappico.png'>"
        }

        table = table + "<tr height='40' >"+	// bgcolor='"+corTr+"'
                        "   <th class=\"contentTable\">"+ data[i].name +"</th>"+
                        "   <th class=\"contentTable\">"+ data[i].email +"</th>"+
                        "   <th class=\"contentTable\">"+ data[i].primaryphone +"</th>"+
                        "   <th class=\"contentTable\">"+ watsapp +"</th>"+
                        "   <th class=\"contentTable\">"+ data[i].phones +"</th>"+
                        "   <th class=\"contentTable\">"+ data[i].adress +"</th>"+
                        "   <th class=\"contentTable\">"+ data[i].number +"</th>"+
                        "   <th class=\"contentTable\">"+ data[i].neighborhood +"</th>"+
                        "   <th class=\"contentTable\">"+ data[i].zipcode +"</th>"+
                        "   <th class=\"contentTable\"><div class=\"btnEdit\" onclick=\"editContact("+data[i].id+");\">Edit</div>&nbsp;<div class=\"btnDelete\" onclick=\"deleteContact("+data[i].id+");\">Delete</div></th>"+
                        "</tr>";
    }
    $("#listContact").html(table);
    $('#tblContact').DataTable();
}

function insertContact(){
    var at = parseInt($("#email").val().indexOf("@")); // fint att in string 
    var watsapp = 0;
    if(!$("#name").val()){
        showPopAlert("Required Contact Name",1);
        return;
    }
    if((!$("#email").val()) || (at === -1)){
        showPopAlert("Required E-mail",1);
        return;
    }
    if(!$("#primaryphone").val()){
        showPopAlert("Required Primary Phone",1);
        return;
    }
    if($('input[name="watsapp"]:checked').val()){
		watsapp = 1;
	} else {
		watsapp = 0;
    }

    // Ninguem tem 20 telefones. forma prática de pegar os campos criados dinamicamente. futuramente pode ser automatizado
    var arrPhones = []
    for(i=0;i<20;i++){
        if($("#new_phone"+i+"").val()){
            arrPhones.push( $("#new_phone"+i+"").val() );
        }
    }

	var data = new Object();
		data.name = $("#name").val();
		data.email = $("#email").val();
		data.primaryphone = $("#primaryphone").val();
		data.watsapp = watsapp;
		data.adress = $("#adress").val();
		data.number = $("#number").val();
		data.neighborhood = $("#neighborhood").val();
		data.zipcode = $("#zipcode").val();
        data.phones = arrPhones.toString();

    $.ajax({
        type: "POST",
        url: 'http://localhost/projetoteste/api/contactinsert.php',
        data: data,
        success: inserContactReturn,
        dataType: 'json'
      });
}

function inserContactReturn(data){
    if(data.error == 1){
        showPopAlert(data.msg,1);
    } else {
        document.getElementById("form1").reset();  
        $('#new_phone2').remove();
        $('#image_2').remove();
        showPopAlert(data.msg,2);
        removePhone();	
        contactList();
    }
}

function deleteContact(id){
    $.ajax({
        type: "POST",
        url: 'http://localhost/projetoteste/api/contactdelete.php',
        data: { id: id },
        success: deleteSuccess,
        dataType: 'json'
    }); 
}

function deleteSuccess(data){
    if(data.error == 1){
        showPopAlert(data.msg,1);
    } else {
        showPopAlert(data.msg,2);
        contactList();
    }
}
var idToedit = 0
function editContact(id){
    $.ajax({
        type: "POST",
        url: 'http://localhost/projetoteste/api/contactlist.php',
        data: { 
                id: id,
                action:'edit' 
              },
        success: editCallBack,
        dataType: 'json'
    }); 
}

function editCallBack(data){
    if(data.error == 1){
        showPopAlert(data.msg,1);
    } else {
        for(i=0;i<20;i++){
            $('#new_phone'+i).remove();
            $('#image_'+i).remove();
            $('#total_chq').val(1);
        }
        $("#btnInsert").hide();
        $("#btnCancel").show();
        $("#btnSaveEdit").show();

        var checado = false;
        if(data[0].watsapp == 1){
            checado = true;
        } else {
            checado = false;
        }
        idToedit = data[0].id;
        $("#name").val(data[0].name);
		$("#email").val(data[0].email);
		$("#primaryphone").val(data[0].primaryphone);
		document.getElementById("watsapp").checked = checado;
		$("#adress").val(data[0].adress);
		$("#number").val(data[0].number);
		$("#neighborhood").val(data[0].neighborhood);
		$("#zipcode").val(data[0].zipcode);
        var arrPhones = data[0].phones.split(',');
        for(i=0;i<arrPhones.length;i++){
           addPhone(arrPhones[i]);
        }
    }
}  

function CancelEdit(){
    idToedit = 0;
    $("#btnInsert").show();
    $("#btnCancel").hide();
    $("#btnSaveEdit").hide();
    for(i=0;i<20;i++){
        $('#new_phone'+i).remove();
        $('#image_'+i).remove();
        $('#total_chq').val(1);
    }
    document.getElementById("form1").reset();
}


function saveEditContact(){
    var at = parseInt($("#email").val().indexOf("@")); // fint att in string 
    var watsapp = 0;
    if(!$("#name").val()){
        showPopAlert("Required Contact Name",1);
        return;
    }
    if((!$("#email").val()) || (at === -1)){
        showPopAlert("Required E-mail",1);
        return;
    }
    if(!$("#primaryphone").val()){
        showPopAlert("Required Primary Phone",1);
        return;
    }
    if($('input[name="watsapp"]:checked').val()){
		watsapp = 1;
	} else {
		watsapp = 0;
    }

    // Ninguem tem 20 telefones. forma prática de pegar os campos criados dinamicamente. futuramente pode ser automatizado
    var arrPhones = []
    for(i=0;i<20;i++){
        if($("#new_phone"+i+"").val()){
            arrPhones.push( $("#new_phone"+i+"").val() );
        }
    }

	var data = new Object();
		data.name = $("#name").val();
		data.email = $("#email").val();
		data.primaryphone = $("#primaryphone").val();
		data.watsapp = watsapp;
		data.adress = $("#adress").val();
		data.number = $("#number").val();
		data.neighborhood = $("#neighborhood").val();
		data.zipcode = $("#zipcode").val();
        data.phones = arrPhones.toString();
        data.id = idToedit;

    $.ajax({
        type: "POST",
        url: 'http://localhost/projetoteste/api/contactupdate.php',
        data: data,
        success: saveEditContactReturn,
        dataType: 'json'
      });
}

function saveEditContactReturn(data){
    if(data.error == 1){
        showPopAlert(data.msg,1);
    } else {
        showPopAlert(data.msg,2);
        contactList();
        CancelEdit();
    }
}



function addPhone(val){
    if(!val){
        val = "";
    }
    var new_chq_no = parseInt($('#total_chq').val())+1;
    var imgRemove = "<img  id='image_"+new_chq_no+"' src=\"scheduler/removephone.png\" onclick=\"removePhone()\" >";
    var new_input="<input type='text' id='new_phone"+new_chq_no+"' class='inputIndex' value='"+val+"' >"+imgRemove;   
    $('#new_chq').append(new_input);
    $('#total_chq').val(new_chq_no);
    $("#new_phone"+new_chq_no+"").mask(behavior, options);
}

function removePhone(){
    var last_chq_no = $('#total_chq').val();
    if(last_chq_no>1){
        $('#new_phone'+last_chq_no).remove();
        $('#image_'+last_chq_no).remove();
        $('#total_chq').val(last_chq_no-1);
    }
}

function showPopAlert(msg,action){
    $(".popAlert").slideDown(200);
    $("#msgPop").html(msg);  
    
    if(action == 1){
        $(".popAlert").css("background-color", "#FFCC66");
        $(".popAlert").css("color", "#000000");
        $("#imgpop").attr("src", "image/icoalertgd.png");
    } else {
        $(".popAlert").css("background-color", "#94C95F");
        $(".popAlert").css("color", "#FFFFFF");
        $("#imgpop").attr("src", "image/iconok.png");    
    }

    setTimeout(function(){ 
        $(".popAlert").slideUp(200);
        $("#msgPop").html("");    
    }, 3000);
}

function ExitApp(){
    localStorage.removeItem("user");
    $('#root').fadeIn(200).load('login/login.html');
}