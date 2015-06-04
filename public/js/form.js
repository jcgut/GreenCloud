 'use strict';
/* 
	Set the css of the icons on the login form.
*/	
	$(".user").focusin(function(){
	 	$(".inputUserIcon").css("color", "#1C610A");
	}).focusout(function(){
		$(".inputUserIcon").css("color", "white");
	});

	$(".pass").focusin(function(){
		$(".inputPassIcon").css("color", "#1C610A");
	}).focusout(function(){
		$(".inputPassIcon").css("color", "white");
	});