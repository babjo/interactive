$(function(){

	$('.content').each(function(index, e){
		bindClickMoveEvent(e, 10);
	});

	/* 클릭하면
	* 1. 흰 배경(fixed) z-index 값을 바꾸고 wrap(relative)을 삽입한다.
	* 2. 이미지를 복사하고 wrap 태그 안에 동일한 위치에 넣는다. (left와 scrollTop 활용)
	* 3. 복사한 태그를 최초 값을 저장하고 위치로 이동시킨다.
	* 4. 높이 값을 계산하고 그 아래 글(absolute)을 배치한다.
	*
	* 다시 한번 더 클릭하면
	* 1. 최초 값으로 바꾸며 본래 자리로 이동한다.
	* 2. 애니메이션이 끝나면 wrap 태그를 삭제한다.
	* 3. 흰 배경을 z-index 값을 낮춘다.
	* */

	// 복사안하고 옮기기
	function bindClickMoveEvent (e, move){
		var initTop = $(e).css('top');
		var initLeft = $(e).css('left');

		(function (){
			var moved = false;
			$(e).click(function(event){
				var offset = $(e).offset();
				var width = $(window).width();
				var scrollTop = $("body").scrollTop();
				console.log(scrollTop);
				var contentWidth = $(e).width();
				var contentTop = parseInt($(e).css('top'), 10);

				var left = (width - contentWidth)/2 - offset.left;
				var top = -offset.top + contentTop + move + scrollTop;


				if(moved){
					$(e).css({top:initTop, left:initLeft});
					moved = false;
				}else{
					$(e).css({top: top+"px", left: left+"px"});
					moved = true;
				}
			});
		})();
	}
});