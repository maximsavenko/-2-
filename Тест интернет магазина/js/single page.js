"use strict";
var cart = {}; //корзина
var cart1 = {};//количество товаров в корзине

$.getJSON('goods.json', function (data) {
var goods1 = data; //все товары в массиве
console.log(goods1);	
$('document').ready(function(){	
//проверяю, есть ли что-то в localStorage
checkCart();
checkCart1();
checkImg();	
//визуализирую корзину
showCart();
showCartSumm();	
click();//клик по кнопке
});	
function checkImg() {
    //проверяю наличие картинки в localStorage и вывожу на страницу;
    if (localStorage.getItem('img1') != null) {
    var img1 = localStorage.getItem('img1');
	var out3 = '';
    out3 += '<img src="'+ goods1[img1].image +'" alt=" ">';
  	$('#big_img').html(out3);
		
	var out4 = '';
	out4 += '<span class = "collect">'+ goods1[img1].collection +'</span>';
	out4 += '<div class = "stripe"></div>';
	out4 += '<p class = "nameGood">'+ goods1[img1].title +'</p><br>';
	out4 += '<span>'+ goods1[img1].description +'</span><br><br><br>';
	out4 += '<span style="color: #b9b9b9">MATERIAL</span><span style="color: #2f2f2f;"> '+ goods1[img1].material +'</span>';
	out4 += '<span style="color: #b9b9b9; margin-left:20px;">      DESIGNER </span><span style="color: #2f2f2f;">'+ goods1[img1].designer +'</span><br><br>';	
	out4 += '<p class = "spanGood">$ '+ goods1[img1].prise +'</p>';	
	$('#inform').html(out4);
		
	var out5 = '';	
	out5 += '<button class="add-cart" data-art = "'+ img1+'" data-prise = "'+goods1[img1].prise +'" ><span class="lnr lnr-cart" style="font-size: 25px; color: #ef5b70; padding-right: 13px;"></span>Add to Cart</button>';  	$('#inform1').html(out5);
		
    }
}

});	


function checkCart1() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart1') != null) {
  cart1 = JSON.parse(localStorage.getItem('cart1'));
    }
}

function checkCart(){
    //проверяю наличие 'cart' в localStorage. Если что-то есть, считываю содержимое в массив cart
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}


function showCart(){
    //считаю и вывожу количество товара в корзине
  var x = 0;
for (var key in cart1){
	x = x + cart1[key];
}
$('.count').html(x);
}

function showCartSumm(){
    //считаю и вывожу сумму товара в корзине
  var x1 = 0;
for (var key in cart){
	x1 = x1 + cart[key];
}
$('.summa').html('$ ' + x1);
}

//если произошло событие - клик по кнопке, выполняю функцию добавления товара в корзину
function click(){
		$('button.add-cart').on('click', addToCart);
    }



//добавляю товар в корзину
function addToCart() {
	
	//считываю артикул и стоимость товара
    var articul = $(this).attr('data-art');
	var prise = $(this).attr('data-prise');
		
	//формирую массив, содержащий артикул и количество товара в корзине
    if (cart1[articul]!=undefined) {
        cart1[articul]++;
		}
    else {
        cart1[articul] = 1;
		}
localStorage.setItem('cart1', JSON.stringify(cart1) );
			
	//формирую массив, содержащий артикул и сумму товара в корзине
    if (cart[articul]!=undefined) {
        cart[articul]=cart[articul]+ +(prise);
		}
    else {
        cart[articul] = +(prise);
		}
localStorage.setItem('cart', JSON.stringify(cart) );
	showCart();//вывожу количество товара в корзине
	showCartSumm();//вывожу сумму товара в корзине
  }
