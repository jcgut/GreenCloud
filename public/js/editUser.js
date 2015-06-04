 'use strict';
/* 
    Load the user's information to a form. 
*/
    $("button[data-target=#editUser]").click(function() {   
        var id = $(this).val();
         $('.formUpdate').attr('action', '/updateUser/'+id);

        $.get('/loadUser', {id: id}, function( data ) {
            $('#usernameUpdate').val(data.username);

            var val = [];
            for (var i = 0; i < data.domains.length; i++) {
                val.push(data.domains[i].domain + ',' + data.domains[i].name);
            }
            $('#selectDomainsUpdate').selectpicker('val', val);
            $('#selectDomainsUpdate').selectpicker('refresh');
            
        });
    });

    $('#buttonUpdate').click(function (){
        $('#selectDomainsUpdate').selectpicker('deselectAll');
        $('#selectDomainsUpdate').selectpicker('refresh');
    });


/*
    Delete users
*/
    $('.deleteUser').click(function() {
        var user = $(this).val();
        var splits = user.split(',');
        var answer = confirm("Are you sure you want to delete this " + splits[1] + "?")
        if (answer){
            var url = '/deleteUser/' + splits[0];
            $.get(url, function(data){
                location.reload();
            });
        }
    });