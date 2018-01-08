"use strict";
var form = document.querySelector('#my_form');

var name = document.getElementById('name');

//отменяю автоматическую отправку формы на сервер 
form.addEventListener('submit', function (event) {
  event.preventDefault();
	console.log(form);
  	console.log('name:', name.value);
})