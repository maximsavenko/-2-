"use strict";
$(document).ready(function(){
	var $menucart = $('#purchase');
	$(window).scroll(function(){
		if ( $(this).scrollTop() > 101 && $menucart.hasClass('normal1') ){
			$menucart.removeClass('normal1').addClass('fix1');
		}
		else if($(this).scrollTop() <= 101 && $menucart.hasClass('fix1')) {
	$menucart.removeClass('fix1').addClass('normal1');
		}
	});
});