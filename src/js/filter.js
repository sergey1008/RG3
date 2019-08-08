import $ from "jquery"
import "jquery-ui/ui/widgets/slider.js"
import "./touch-for-ui-slider.js"

document.addEventListener("DOMContentLoaded", function(){
	/** Свернуть развернуть фильтр */
		$("body").on("click", ".filter__item-title", function(){
			const $this = $(this),
				$list = $this.next(".filter__item-content");

			if ($this.hasClass("js__opened")){
				$list.slideUp(300)
				$this.removeClass("js__opened")
			}else{
				// $(".filter__item-title.js__opened").removeClass("js__opened")
					// .next(".filter__item-content").slideUp(300)
				$list.slideDown(300)
				$this.addClass("js__opened")
			}
		})

	/** ul-slider Для цены в фильтре*/
		if ($(".price-filter").length){
			console.log(1);
		}

		$(".price-filter").each(function(){
			const $this = $(this),
				min = +$this.find(".price-min").val() || 0,
				max = +$this.find(".price-max").val() || 0,

				step = +$this.find(".price-step").val() || 0,

				curMin = +$this.find(".price-min-cur").val() || min,
				curMax = +$this.find(".price-max-cur").val() || max,

				$maxInput = $this.find(".price-max-cur"),
				$minInput = $this.find(".price-min-cur");


			$this.find(".price-filter__slider").slider({
				animate: "normal",
				min: min,
				max: max,
				values: [parseInt(curMin), parseInt(curMax)],
				range: true,
				step: step,
				slide: (e, ui) =>{
					$minInput.val(parseInt(ui.values[0])).trigger("change");
					$maxInput.val(parseInt(ui.values[1])).trigger("change");

					setMinHandle($this, parseInt(ui.values[0]))
					setMaxHandle($this, parseInt(ui.values[1]))
				}
			})

			setMinHandle($this, parseInt(curMin))
			setMaxHandle($this, parseInt(curMax))
		})

		$('.more-filter').click(function(){
			$(this).closest('.filter__item-content').find('.checkbox--hidden').slideToggle();
			$(this).closest('.filter__item-content').toggleClass('js__checkbox--open');
		})
})

const partNumber = number => number.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "),
	setMinHandle = ($uiSlider, count) => {
		$uiSlider.attr("data-count-min", partNumber(count))
	},
	setMaxHandle = ($uiSlider, count) => {
		$uiSlider.attr("data-count-max", partNumber(count))
	}