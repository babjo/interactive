$(function(){

	$('.a').each(function(index, e){
		$(e).click(function(){
			var img = $(e).children().eq(0);
			var title = $(e).children().eq(1);

			//$('.detail-page-layer').css('display','block');
			bindMoveEvent2(title, 10);
			bindMoveEvent(img, 40);
		});
	});

	function bindMoveEvent(e, topValue){
		$("body").css('overflow', 'hidden');

			var copy = copyToLayerAndShowLayer(e);
			var initLeft = parseInt(copy.css('left'), 10);
			var initTop = parseInt(copy.css('top'), 10);

			move(copy, topValue);

			$('.detail-page-layer').click(function(){
				copy.css({top:initTop+'px', left:initLeft+'px'});
				var layer = $(this);
				copy.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
					function(e) {
						layer.children().first().empty();
						layer.css('display', 'none');
						layer.click(null);
						$("body").css('overflow', 'auto');
					});
			});
	}

	function bindMoveEvent2(e, topValue){
		$("body").css('overflow', 'hidden');

			var copy = copyToLayerAndShowLayer(e);
			var fontSize = parseInt(copy.css('font-size'), 10);
			console.log(fontSize);
			var fontWeight = parseInt(copy.css('font-weight'), 10);
			console.log(fontWeight);
			var initLeft = parseInt(copy.css('left'), 10);
			var initTop = parseInt(copy.css('top'), 10);

			move2(copy, topValue, 20, 500);

			$('.detail-page-layer').click(function(){
				copy.css({top:initTop+'px', left:initLeft+'px'});
				var layer = $(this);
				copy.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
					function(e) {
						layer.children().first().empty();
						layer.css('display', 'none');
						layer.click(null);
						$("body").css('overflow', 'auto');
					});
			});
	}

	function move2(jqueryElement, topValue, fontSize, fontWeight){
		var offset = jqueryElement.offset();
		var windowWidth = $(window).width();
		var scrollTop = $("body").scrollTop();
		var contentWidth = jqueryElement.width();
		var contentTop = parseInt(jqueryElement.css('top'), 10);

		var left = (windowWidth - contentWidth)/2;
		var top = -offset.top + contentTop + topValue + scrollTop;
		jqueryElement.css({top: top+"px", left: left+"px", "font-size" : fontSize+"px", "font-weight" : fontWeight});
	}


	function move(jqueryElement, topValue){
		var offset = jqueryElement.offset();
		var windowWidth = $(window).width();
		var scrollTop = $("body").scrollTop();
		var contentWidth = jqueryElement.width();
		var contentTop = parseInt(jqueryElement.css('top'), 10);

		var left = (windowWidth - contentWidth)/2;
		var top = -offset.top + contentTop + topValue + scrollTop;
		jqueryElement.css({top: top+"px", left: left+"px"});
	}

	function copyToLayerAndShowLayer(e){
		var content = $(e);
		var copy = $(content.clone());
		copy.width(content.width());
		var left = content.offset().left;
		var top = content.offset().top - $("body").scrollTop();
		copy.css({left : left+'px', top : top+'px'});
		$('.detail-page-layer > .wrap').append(copy);
		$('.detail-page-layer').css('display','block');
		return copy;
	}
});