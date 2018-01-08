"use strict";
$(document).ready(function(){
	var $menu = $('#menu');
	$(window).scroll(function(){
		if ( $(this).scrollTop() > 101 && $menu.hasClass('normal') ){
			$menu.removeClass('normal').addClass('fix');
		}
		else if($(this).scrollTop() <= 101 && $menu.hasClass('fix')) {
			$menu.removeClass('fix').addClass('normal');
		}
	});
});