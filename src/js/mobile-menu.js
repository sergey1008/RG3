import $ from "jquery";

$(_ => {

	$('.burger').click(function(){
		$('body').toggleClass("js__menu--open");
		$('body').removeClass("js__submenu--open");
	});

	$("body").click(function(e){
		if (!$(e.target).is($(".mobile-menu"))
			&& !$(".mobile-menu").has(e.target).length
			&& $("body").hasClass("js__menu--open")
			&& !$(e.target).is($(".burger"))
			&& !$(".burger").has(e.target).length){
				$("body").removeClass("js__menu--open")
		}
	});

	var menuClone = $('.head-menu__list').clone();
	var socClone = $('header .soc').clone();

	$('.mobile-menu').append(menuClone);
	$('.mobile-menu').append(socClone);

	// $('.head-menu__item').find('ul').closest('li').addClass('js__has-submenu');

	$('.submenu').each((i,el) => {
		let $this = $(el);

		$this.closest('li').addClass('js__has-submenu');
	})

	if($(window).width() <= 1200) {


        $('li.js__has-submenu').each(function(i,el){
            var $this = $(el),
            	setCloneLink = $this.find('.submenu').prev('a').clone();

            console.log(setCloneLink)

            $this.find('.submenu').prepend('<div class="js__link-parent"></div>');
            $this.find('.js__link-parent').prepend(setCloneLink);
            $this.find('.submenu').prepend('<div class="head-menu__link js__back">Назад</div>');

        })

        $('li.js__has-submenu > a').removeAttr('href');
        $('li.js__has-submenu > a').click(function(){
            var $this = $(this);
            $this.closest('.js__has-submenu').addClass('js__submenu--open');

	        })

	        $('.js__back').click(function(){
	            var $this = $(this);
	            $this.closest('.js__has-submenu').removeClass('js__submenu--open');
	        })

	    }


});