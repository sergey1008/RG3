import $ from "jquery";
import Cookies from "js-cookie"
import "./filter.js"
import "./accordion.js"
import  is from "is_js"
import Swiper from "swiper/dist/js/swiper.js";
import "./stock-sliders.js";
import "selectize/dist/js/selectize.min.js";

import "./tabs.js";
// import "./accordion.js";
import "./mobile-menu.js";
import "./standart-page.js"
// import Sticky from "./x-widgets.js";


window.$ = $;
window.jQuery = $;
window.is = is;

// require("./countTo.js");
require("../css/jquery.fancybox.css");

;(function() {

  // проверяем поддержку
  if (!Element.prototype.matches) {

    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;

  }

})();

(function() {

  // проверяем поддержку
  if (!Element.prototype.closest) {

    // реализуем
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();

document.addEventListener("DOMContentLoaded", e => {


	$('.cart-in-stock__item-btn span').width(Math.max(...$('.cart-in-stock__item-btn span').map(function(){
		return $(this).width();
	})))

	if (is.ie())
		$('body').addClass('ie-fix');
	
		$("picture").each(function(){
			$(this).find("img").attr("src", $(this).find("source").attr("srcset"))
	})

	$(".head-contacts__item.ico-special, .header-special__link").click(function(){
		Cookies.set("special", 1);
		location.reload();
	});



	let swiperPartners = new Swiper(".slider .swiper-container", {
		slidesPerView: 4,
		a11y:{
			enabled: document.body.classList.contains("special__body")
		},
		loop: true,
		roundLengths: true,
		autoplay: false,
		spaceBetween: 40,
		navigation: {
	        nextEl: '.slider__nav .swiper-button-next',
	        prevEl: '.slider__nav .swiper-button-prev',
	    },
	    breakpoints: {
	    	1400: {
				spaceBetween: 20,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1000: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			660: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			
		}
	});


	let swiperStandartBanner = new Swiper(".standart-slider .swiper-container", {

		effect: "fade",
		a11y:{
			enabled: document.body.classList.contains("special__body")
		},
		slidesPerView: 1,
		loop: true,
		roundLengths: true,
		autoplay: true,
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
			clickable: true
		},
		navigation: {
	        nextEl: '.standart-slider .swiper-button-next',
	        prevEl: '.standart-slider .swiper-button-prev',
	      },

	});

	let swiperStandartTextSlider = new Swiper(".standart__text-slider  .swiper-container", {

		slidesPerView: 4,
		loop: true,
		roundLengths: true,
		autoplay: true,
		spaceBetween: 40,
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
			clickable: true
		},
		navigation: {
	        nextEl: '.standart__text-slider .swiper-button-next',
	        prevEl: '.standart__text-slider .swiper-button-prev',
	      },
	     breakpoints: {
			1000: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			660: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			
		}
	});

	let swiperCardtSlider = new Swiper(".card-product__slider .swiper-container", {

		effect: "fade",
		a11y:{
			enabled: document.body.classList.contains("special__body")
		},
		slidesPerView: 1,
		loop: true,
		roundLengths: true,
		autoplay: true,
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
			clickable: true,
			renderFraction: function (currentClass, totalClass) {
		    return '<span class="' + currentClass + ' "></span>' +
		        '<div> из </div>' +
		    '<span class=" ' + totalClass + '"></span>';
		  }
		},
		navigation: {
	        nextEl: '.slider__nav .swiper-button-next',
	        prevEl: '.slider__nav .swiper-button-prev',
	    },
	});





	$(window).on('scroll load', function(){
		if ($(".support-stat__item-num").length)
			if ($(".support-stat__item-num").offset().top + 50 <=
				$(window).scrollTop() + $(window).height()){
					$(".support-stat__item-num:not(.countered)").each((i, el) => {
						let $this = $(el),
							speed = 0;

						switch (i){
							case 0:
								speed = 4000;
							break;
							case 1:
								speed = 2000;
							break;

							default:
								speed = 3000;
						}

						$this.width($this.width())

						$this.countTo({
							speed: speed,
							onComplete(){
								$this.width("auto")
							}
						});

						$this.addClass("countered");
					});
			}

	})


	if($('body').hasClass('page-personal')){



		var list = document.querySelector('#filial__list');

		if(list){
			window.observer = new MutationObserver(function(mutations) {
			    mutations.forEach(function(mutation) {
			     let input = mutation.addedNodes[0].querySelector(".forms-input-cont--file:first-child:nth-last-child(2) .forms__input--file");

			     // console.log(mutation, input)

			     if (input)
			     	input.addEventListener("change", InputFileChange);
			    });
			});
			  
			observer.observe(list, {
			  	attributes: false, 
			  	childList: true, 
			  	characterData: false
			})
		  	
		}

		$("body").on("change", ".forms__input--file", function(e){

			var value = $(this)[0].files[0].name;
			// console.log(value);
			var inputHasFile = $(this).next('input[type="text"]').val(value);

			if(inputHasFile.length){
				$(this).nextAll('label').remove();
				// $(this).nextAll(".js__input-del").addClass('close-input');
			}

		});


	};


	$('.submenu').each((i,el) => {
		let $this = $(el);

		$this.closest('.head__menu-item').addClass('js__has-submenu');
	})


	$("body").on("click change", ".btn-clear", function(){
		$(this).prevAll('input[type="text"]').val("");
		
	});



	$("body").on("click", ".scroll-top", function(){
        var scrollTop = $(window).scrollTop();
        $("html, body").animate({"scrollTop": 0}, "slow")
    });

	if (!is.touchDevice())
		$('select:not(.no-selectize)').each(function(i,el){
			let $this = $(el);

			$this.selectize({
				create: true,
			});

		})


	$('.view-item').click(function(){
		let $this = $(this);

		if($this.hasClass('active'))
			return

		let id = $this.attr("data-id"),
			$parent = $this.closest(".catalog-cat2");

		Cookies.remove('view-list');
		Cookies.remove('view-plates');
		Cookies.set(""+id+"", 1, { expires: 1 });





		$parent.find(".view-item.active").removeClass("active");
		$parent.find(".catalog-cat2__list.js__view-list").removeClass("js__view-list");
		$parent.find(".catalog-cat2__list.js__view-plates").removeClass("js__view-plates");

		$this.addClass("active");
		$parent.find(".catalog-cat2__list").addClass("js__"+id+"");

	})



	if(Cookies.get('view-list')){
		$(".catalog-cat2__list").addClass("js__view-list");
		$('.view-item').removeClass('active');
		$('.view-list').addClass('active');
	} else {
		$(".catalog-cat2__list").addClass("js__view-plates");
	}



	require("./jquery.fancybox.js");

	$(".fancybox").fancybox({
		trapFocus: false,
		touch: false,
		buttons: ["fullscreen", "slideShow", "close"],
		image: {
			preload: true,
		},
		transitionEffect: "slide",
	});



});


$(window).on("load scroll resize touchmove", e => {

	if ($(window).scrollTop() > 800){
		$(".scroll-top").fadeIn(300);
		$(".scroll-top").css({
			'display': 'flex',
		})

	}else{
		$(".scroll-top").fadeOut(300);
		$(".scroll-top").removeClass('js__scrolled');
	};

	// var height = $('.catalog').offset().top;

	// $('.aside-cont').css({
	// 	'top' : height,
	// })
	// console.log(height);


	
});
