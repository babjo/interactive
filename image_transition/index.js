$(function(){

	$('.a').each(function(index, e){
		$(e).click(function(){
			var img = $(e).children().eq(0);
			var title = $(e).children().eq(1);
			var titleHeight = title.height();

			bindMoveEvent(title,
				function(copy){
					return {top : parseInt(copy.css('top'), 10), left : parseInt(copy.css('left'), 10), fontSize : parseInt(copy.css('font-size'), 10), fontWeight : parseInt(copy.css('font-weight'), 10)};
				},
				function(copy){
					var fontWeight = 500;
					var fontSize = 20;
					var screenTop = 10;

					var offset = copy.offset();
					var windowWidth = $(window).width();
					var scrollTop = $("body").scrollTop();
					var contentWidth = copy.width();
					var contentTop = parseInt(copy.css('top'), 10);

					var left = (windowWidth - contentWidth)/2;
					var top = -offset.top + contentTop + screenTop + scrollTop;
					copy.css({top: top+"px", left: left+"px", fontSize: fontSize+"px", fontWeight : fontWeight});					
				},
				function(copy, initialCss){
					copy.css({top:initialCss.top+'px', left:initialCss.left+'px', "font-size" : initialCss.fontSize+"px", "font-weight": initialCss.fontWeight});
				});
			
			bindMoveEvent(img, 
				function(copy){
					return {top :  parseInt(copy.css('top'), 10), left : parseInt(copy.css('left'), 10)};
				},
				function(copy){
					var screenTop = 40;
					
					var offset = copy.offset();
					var windowWidth = $(window).width();
					var scrollTop = $("body").scrollTop();
					var contentWidth = copy.width();
					var contentTop = parseInt(copy.css('top'), 10);

					var left = (windowWidth - contentWidth)/2;
					var top = -offset.top + contentTop + screenTop + scrollTop;
					copy.css({top: top+"px", left: left+"px"});
				},
				function(copy, initialCss){
					//console.log(titleHeight);
					copy.css({top: initialCss.top - titleHeight +'px', left: initialCss.left+'px'});
				});
		});
	});

	function bindMoveEvent(e, saveInitial, change ,loadInitial){
		$("body").css('overflow', 'hidden');

		var copy = copyToLayerAndShowLayer(e);
		var init = saveInitial(copy);

		change(copy);
		
		$('.detail-page-layer').click(function(){
			loadInitial(copy, init);		
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