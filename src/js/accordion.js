import $ from "jquery";

$(_ => {
	$(".accordion__item-top").click(function(){
		let $this = $(this);

		$this.closest('.accordion__item').toggleClass('js__open');
		$this.nextAll('.accordion__item-bot').slideToggle();

		console.log($this)

	});
});


// document.addEventListener("DOMContentLoaded", _ => {

// 	var accordionItem = document.querySelectorAll('.accordion__item');

// 	// var accordionBot = document.querySelectorAll('.accordion__item-bot');

// 	// for (let el of accordionBot){

// 	// 	var height = el.style.height = el.scrollHeight + 'px !important';
// 	// }


// 	var accordionTop = document.querySelectorAll('.accordion__item-top');

// 	for (let el of accordionTop){

// 		el.addEventListener('click', function(){
// 			el.closest('.accordion__item').classList.toggle('js__open');

// 		});

// 	}
// })
