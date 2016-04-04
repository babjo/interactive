$(function(){

	$('.content').each(function(index, e){
		var initTop = $(e).css('top');
		var initLeft = $(e).css('left');
		var moved = false;
		
		(function (){
			var moved = false;
			$(e).click(function(event){
				var offset = $(e).offset();
				var width = $(window).width();
				var contentWidth = $(e).width();
				var contentTop = parseInt($(e).css(top), 10);

				var left = (width - contentWidth)/2 - offset.left;
				var top = -offset.top + 10;

				if(moved){
					$(e).css({top:initTop, left:initLeft});
					moved = false;
				}else{
					$(e).css({top: top+"px", left: left+"px"});
					moved = true;
				}
			});
		})();
	});

	/*
	var initTop = $(".content").css('top');
	var initLeft = $(".content").css('left');

	var moved = false;

	$('.content').click(function(e){

		var offset = $(".content").offset();
		var width = $(window).width();
		var contentWidth = $(".content").width();

		var left = (width - contentWidth)/2 - offset.left;

		if(moved){
			$(".content").css({top:initTop, left:initLeft});
			moved = false;
		}else{
			$(".content").css({top:"10px", left: left+"px"});
			moved = true;
		}
	});*/

});