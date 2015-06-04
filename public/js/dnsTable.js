 'use strict';
/* 
	Iniciate the comunication with the server socket
*/
    var socket = io.connect('http://localhost:3002');

    $('.btn-group.bootstrap-select.form-control').on('click', function (){
    	alert('click');
    })

/* 
	If a record is adding and the type is MX, it display the configuration form
*/
	$('#content').on('click', function(){
		IsMXconfig();
	});

	function IsMXconfig (){
		var selected = $('#type.selectpicker').find("option:selected").val();
		if(selected == 'MX'){
			$('#addMX').modal('show');
		} 
	}
/* 
	MX form configuration managment
*/
	var server,priority;
	$('#formMXSave').click( function() {
		server = $('#server').val();
		priority = $('#priority').val();
		$('#content').val(server);
		$('#addMX').modal('hide');
	});

	$('#formMXCancel').click( function() {
		$('#addMX').modal('hide');
		$('#server').val(server);
		$('#priority').val(priority);
	});

/* 
	Error notifications
*/  
	socket.on('errors', function (err) {
		var msg = "";
		for (var i = 0; i < err.length; i++) {
			msg += err[i].message + "\n";
		};
		$.notify(msg);
    });

/* 
	Notifications
*/  
	socket.on('notify', function (err) {
		var msg = "";
		for (var i = 0; i < err.length; i++) {
			msg += err[i].message + "\n";
		};
		//$.notify(msg);
		alertify.error(msg); 
    });

/* 
	Send the dns' id and the zone's id to the server, and DELETE the record.
*/
	$('.delete').click(function() {
		var dns = $(this).val();
		var splits = dns.split(','); 
		var answer = confirm("Are you sure you want to delete " + splits[1] + " " + splits[2] + "?")
		if (answer){
			var zoneId = $("#add").val();
			socket.emit('delete',{id: splits[0], zone:zoneId});
        	setTimeout(function(){location.reload()},1500);
		}
	});

/* 
	Send the record's data to the server, and ADD the record to cloudflare's database.
*/
	$('#add').click(function() {
		var type = $("#type").val();
		var name = $("#name").val();
		var content = $("#content").val();
		var ttl = parseInt($("#ttl").val());
		var zoneId = $("#add").val();
		var data = {
			zone:zoneId,
			data:{
				type: type,
				name: name,
				content: content,
				ttl: ttl
			}
		}
		var selected = $('#type.selectpicker').find("option:selected").val();
		if(selected == 'MX'){
			data.data.priority = priority;
		}
		socket.emit('add', data);
		setTimeout(function(){location.reload()},3000);

		server = priority = '';
	});

/* 
	Filters the DNS table and display the result
*/
	$('#searchInput').keyup(function () {
	    //split the current value of searchInput
	    var data = this.value.split(" ");
	    //create a jquery object of the rows
	    var jo = $("#fbody").find("tr");
	    if (this.value == "") {
	        jo.show();
	        return;
	    }
	    //hide all the rows
	    jo.hide();

	    //Recusively filter the jquery object to get results.
	    jo.filter(function (i, v) {
	        var $t = $(this);
	        for (var d = 0; d < data.length; ++d) {
	            if ($t.is(":contains('" + data[d] + "')")) {
	                return true;
	            }
	        }
	        return false;
	    })
	    //show the rows that match.
	    .show();
	}).focus(function () {
	    this.value = "";
	    $(this).css({
	        "color": "black"
	    });
	    $(this).unbind('focus');
	}).css({
	    "color": "#C0C0C0"
	});

/* 
	Get the actual information from a dns, to display it later
*/
 	$('.update').click( function (){
 		var id = $(this).val();
 		$('#UpdateDNS').val(id);
 		socket.emit('getDNS', id);
 	});

/* 
	Display the information of a dns.
*/
 	socket.on('dnsRecord', function (dnsRecord){
 		$('#dnsType').val(dnsRecord.type);
 		$('#dnsName').val(dnsRecord.name);
 		$('#dnsContent').val(dnsRecord.content);
 		$('#dnsTTL').val(dnsRecord.ttl);
 		$('#dnsTTL').selectpicker('refresh');
 		if("priority" in dnsRecord){
 			$('#dnsPriority').val(dnsRecord.priority);
 			$('#dnsPriority').show();
 			$('#labelPriority').show();
 		}
 		$('#update').modal('show');
 	})

 	$('#UpdateCancel').click(function () {
 		
 		$('#dnsPriority').hide();
 		$('#labelPriority').hide();
 	})

/* 
	Update a dns.
*/
	$('#UpdateDNS').click(function () {
 		$('#update').modal('hide');
 		$('#dnsPriority').hide();
 		$('#labelPriority').hide();
 		if($('#dnsType').val() == 'MX'){
 			socket.emit('update', {id: $(this).val(), name:$('#dnsName').val(), content:$('#dnsContent').val(), ttl:$('#dnsTTL').val(), priority:$('#dnsPriority').val()});
 		}
 		else{
 			socket.emit('update', {id: $(this).val(), name:$('#dnsName').val(), content:$('#dnsContent').val(), ttl:$('#dnsTTL').val()});
 		}
        setTimeout(function(){location.reload()},1500);
    });

/* 
	Update the status and the cloud image.
*/
	$('.check').click(function () {
        var check = $(this).find("input");
        var id = check.val();
        var status = check.is(':checked')
        if(status){
	        $(this).find("input").prop('checked', false);
        	$(this).find("div").addClass("imgCloud");
	        $(this).find("div").removeClass("imgCloudCheck");
	        status = false;
        } else {
        	$(this).find("input").prop('checked', true);
        	$(this).find("div").addClass("imgCloudCheck");
	        $(this).find("div").removeClass("imgCloud");
	        status = true;
        }
        socket.emit('update', {id: id, field: 'proxied', value: status});
    });

/* 
	Filters the Zones table and display the result
*/
	$('#searchZones').keyup(function () {
	    //split the current value of searchInput
	    var data = this.value.split(" ");
	    //create a jquery object of the rows
	    var jo = $("#tbody").find("tr");
	    if (this.value == "") {
	        jo.show();
	        return;
	    }
	    //hide all the rows
	    jo.hide();

	    //Recusively filter the jquery object to get results.
	    jo.filter(function (i, v) {
	        var $t = $(this);
	        for (var d = 0; d < data.length; ++d) {
	            if ($t.is(":contains('" + data[d] + "')")) {
	                return true;
	            }
	        }
	        return false;
	    })
	    //show the rows that match.
	    .show();
	}).focus(function () {
	    this.value = "";
	    $(this).css({
	        "color": "black"
	    });
	    $(this).unbind('focus');
	}).css({
	    "color": "#C0C0C0"
	});


/* 
	Get the MX form's values, send the content if they differ from the original, the record is updated and hide the form.
*/
	$('#updateMXSave').click( function() {
		var id = $('#dnsID').val();
		var newContent = $('#serverUpdate').val();
		var newPriority = $('#priorityUpdate').val();
		if(newContent != server || newPriority != priority){
			socket.emit('update', {id: id, field: 'content', value: newContent, priority: newPriority})
		}
		$('#addMX').modal('hide');
		server = priority = '';
	});
