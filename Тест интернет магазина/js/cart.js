"use strict";
var cart = {}; //корзина
var cart1 = {};//количество товаров в корзине

$.getJSON('goods.json', function (data) {
var goods = data; //все товары в массиве
	
//проверяю, есть ли что-то в localStorage
checkCart();
checkCart1();
	
showMiniCart(); //визуализирую корзину
showCart();
showCartSumm();	
	
	
function showMiniCart() {
	if ($.isEmptyObject(cart1)) {
    var out = 'Your cart is empty';
	$('#my-cart').html(out);		
	}else {
		var out = '';
        for (var key in cart1) {
			out += '<div class = "mp2">'
            out += '<div class = "mp"><button class="delete" data-art = "'+key +'" data-prise = "'+goods[key].prise +'">x</button>';
			out += '<img src="'+goods[key].image+'">';
			out +='</div>';
			out += '<div class = "mp3">'
            out += goods[key].title;
			out +='</div>';
			out += '<div class = "mp1">';
			out += '<span>$ '+ goods[key].prise+ '</span>';
			out +='</div>';
			out += '<div class = "mp4">'
            out += '<button class="minus" data-art = "'+key +'" data-prise = "'+goods[key].prise +'">-</button>';
			out +='</div>';
			out += '<div class = "mp7">'
            out += cart1[key];
			out +='</div>';
			out += '<div class = "mp5">'
            out += '<button class="plus" data-art = "'+key +'" data-prise = "'+goods[key].prise +'">+</button>';
			out +='</div>';
			out += '<div class = "mp6">'
            out += '<span class = prisItem>$ '+ cart1[key]*goods[key].prise+'</span>' ;
			out +='</div>';
			out +='</div>';
            //out +='<br>';
			out +='<hr class="hr">';
			}
        $('#my-cart').html(out);
$('.plus').on('click', plusGoods);
$('.minus').on('click', minusGoods);
$('.delete').on('click', deleteGoods);
	}
}	
	
function plusGoods(){
var articul = $(this).attr('data-art');
var prise = $(this).attr('data-prise');
cart1[articul]++;
cart[articul]= cart[articul] + +(prise);
saveCart(); //сохраняю корзину в localStorage
showMiniCart();//визуализирую корзину
showCart();
showCartSumm();	
    }
	
function minusGoods(){
var articul = $(this).attr('data-art');
var prise = +($(this).attr('data-prise'));
if (cart1[articul]>1) {
	cart1[articul]--;
	cart[articul]= cart[articul] - prise;
}
    else {
        delete cart1[articul];
		cart[articul] = 0;
        }
saveCart();//сохраняю корзину в localStorage
showMiniCart();//визуализирую корзину
showCart();
showCartSumm();	
}

function deleteGoods(){
var articul = $(this).attr('data-art');
var prise = +($(this).attr('data-prise'));
delete cart1[articul];
cart[articul] = 0;
saveCart();//сохраняю корзину в localStorage
showMiniCart();
showCart();
showCartSumm();	
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

//сохраняю изменения в localStorage
function saveCart(){
    localStorage.setItem('cart1', JSON.stringify(cart1) );
	localStorage.setItem('cart', JSON.stringify(cart) );
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
