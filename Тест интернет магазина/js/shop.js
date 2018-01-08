"use strict";
var cart = {}; //корзина
var cart1 = {};//количество товаров в корзине

//после загрузки DOM 
$('document').ready(function(){
	loadgoods();//загружаю товары из файла "goods.json"
	
	//проверяю, есть ли что-то в localStorage
	checkCart();
	checkCart1();
	showCart();//визуализирую количество товаров корзины
    showCartSumm();//визуализирую сумму корзины
});

//данные из файла "goods.json" считываю в переменную data; объявляю пустую строку, складываю туда нужные атрибуты из массива data[key], затем вывожу строку в #goods)
function loadgoods(){
	$.getJSON( "goods.json", function(data){
		var out = '';
		for (var key in data){
            out+='<div class="item">';
			out+='<a href="single%20page.html"><img class = "imgbig" src="'+data[key].image+'" alt = "" data-art = "'+ key+'" ></a>';
            out+='<p>'+data[key]['title']+'</p>';
            out+='<span>$  '+data[key]['prise']+'</span>';
            out+='<button class = "btn_add-to-cart"  data-art = "'+ key+'" data-prise = "'+data[key]['prise']+'" ><span class="lnr lnr-cart" style="font-size: 28px; color: #ffffff;"></span> Add to Cart</button>';
            out+='</div>';
        }
        $('#goods').html(out);
		
//если произошло событие - клик по кнопке, выполняю функцию добавления товара в корзину
		$('button.btn_add-to-cart').on('click', addToCart);
		
//если произошло событие - клик по картинке, выполняю функцию записи артикула товара в хранилище

	$('img.imgbig').on('click', showImg);
   

function showImg() {
	  var artic = $(this).attr('data-art');
	localStorage.setItem('img1', artic);
	}
		
    })
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

function checkCart(){
    //чтобы при обновлении страницы сохранялись ранее добавленные в корзину товары, проверяю наличие 'cart' в localStorage. Если что-то есть, считываю содержимое в массив cart
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function checkCart1(){
    //чтобы при обновлении страницы сохранялись ранее добавленные в корзину товары, проверяю наличие счетчика количества товара в localStorage. Если счетчик не пуст, считываю его значение в массив cart1;
    if ( localStorage.getItem('cart1') != null) {
     	cart1 = JSON.parse (localStorage.getItem('cart1'));
		}
	}

