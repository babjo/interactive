$(function(){

	$('.content').each(function(index, e){
		$(e).click(function(event){
			$("body").css('overflow', 'hidden');
			var copy = copyToLayerAndShowLayer(e);
			var initLeft = parseInt(copy.css('left'), 10);
			var initTop = parseInt(copy.css('top'), 10);

			move(copy, 10);

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
		});
	});

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