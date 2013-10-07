/*
function fold(el){
    if(!el){
        return;
    }
    el = $(el);

    el.on("touchstart", function(evt){
        evt.preventDefault();
        var touch = evt.changedTouches[0];
        if(!touch){
           return;
       }
    });
    
    el.on("touchend",function(evt){
        evt.preventDefault();
        var touch = evt.changedTouches[0];
        if(!touch){
            return;
        }
        alert("hehehe");
        $(".page_cur").removeClass("page_cur");
        //$(".mingxing_KTV").addClass("page_cur");
    });
}	
(function(){
    fold($('.page .nav li:nth-child(2)'));
})();
*/
(function(){
	$(".page .nav li").each(function(item, index){
		el=$(item);
		var n=index;
		el.on("touchstart", function(evt){
        	evt.preventDefault();
        	var touch = evt.changedTouches[0];
        	if(!touch){
           		return;
      		}
      		$(".page_cur").removeClass("page_cur");
            var array=$(".page_:nth-child(3)");
            var array=[$(".page_:nth-child(2)"),$(".page_:nth-child(3)"),$(".page_:nth-child(4)"),$(".page_:nth-child(5)")];
        	array[n].addClass("page_cur");
        	nav_fold();
   		});
	
		el.on("touchend",function(evt){
			evt.preventDefault();
			var touch=evt.changedTouches[0];
			if(!touch){
				return ;
			}
		});
	});
})();


(function(){
	$(".nav_left .saiqu_list li").each(function(item, index){
		el=$(item);
		var n=index;
		el.on("touchstart", function(evt){
        	evt.preventDefault();
        	var touch = evt.changedTouches[0];
        	if(!touch){
           		return;
      		}
            $("#saiqu").addClass("saiqu_cur");
      		$(".saiqu_li_cur").removeClass("saiqu_li_cur");
      		$(this).addClass("saiqu_li_cur");
      		$(".saiqu_cur").removeClass("saiqu_cur");

            var array=[$(".saiqu_:nth-child(1)"),$(".saiqu_:nth-child(2)"),$(".saiqu_:nth-child(3)"),$(".saiqu_:nth-child(4)"),$(".saiqu_:nth-child(5)"),$(".saiqu_:nth-child(6)"),$(".saiqu_:nth-child(7)")];
        	array[n].addClass("saiqu_cur");
   		});
	
		el.on("touchend",function(evt){
			evt.preventDefault();
			var touch=evt.changedTouches[0];
			if(!touch){
				return ;
			}
		});
	});
})();

function nav_fold(){
	if($(".shouye").css('display')=="block"){
		$("#shouye").removeClass("shouye_");
		$("#shouye").addClass("shouye_cur")
	}else{
		$("#shouye").removeClass("shouye_cur");
		$("#shouye").addClass("shouye_")
	}
	if($(".mingxing_KTV").css('display')=="block"){
		$("#mingxing").removeClass("mingxing_");
		$("#mingxing").addClass("mingxing_cur")
	}else{
		$("#mingxing").removeClass("mingxing_cur");
		$("#mingxing").addClass("mingxing_")
	}
	if($(".saiqumendian").css("display")=="block"){
		$("#saiqu").removeClass("saiqumendian_");
		$("#saiqu").addClass("saiqumendian_cur")
	}else{
		$("#saiqu").removeClass("saiqumendian_cur");
		$("#saiqu").addClass("saiqumendian_")
	}
	if($(".jieshao").css("display")=="block"){
		$("#jieshao").removeClass("jieshao_");
		$("#jieshao").addClass("jieshao_cur")
	}else{
		$("#jieshao").removeClass("jieshao_cur");
		$("#jieshao").addClass("jieshao_")
	}
	
}
(function(){
	nav_fold();
    $(".saiqu_:nth-child(1)").addClass("saiqu_cur");
})();

function touchScroll(el){
    if(!el){
        return;
    }

    el = $(el);

    var startY = 0, speed = 0, scrollAvailable = 0, marginTop = 0, timer;
    el.on("touchstart", function(evt) {
        evt.preventDefault();
        var touch = evt.changedTouches[0];
        if(!touch){
            return;
        }

        startY = touch.pageY;
        scrollAvailable = this.scrollHeight - this.offsetHeight;
        marginTop = parseInt(el.css('margin-top'), 10);
    }, false);

    el.on("touchmove", function(evt) {
        evt.preventDefault();
        var touch = evt.changedTouches[0];
        if(!touch){
            return;
        }

        speed = touch.pageY - startY;
        startY = touch.pageY;
        var top = this.scrollTop - speed;
        if(top < 0){
            marginTop = Math.ceil(marginTop - top / 2);
            el.css('margin-top', marginTop + 'px');
        }
        else if(top > scrollAvailable){
            marginTop = Math.ceil(marginTop + (scrollAvailable - top) / 2);
            el.css('margin-top', marginTop + 'px');
        }

        this.scrollTop = top;

    },false);

    el.on("touchend", function(evt) {
        evt.preventDefault();
        if(timer){
            clearInterval(timer);
        }

        speed *= 2.5;
        //var ml = parseInt(el.css('margin-left'), 10);
        marginTop /= 2;
        if(Math.abs(marginTop) > Math.abs(speed)){
            speed = marginTop;
        }
        timer = setInterval(function(){slowdown();}, 40);
    },false);

    function slowdown(){
        speed = speed * 0.75;
        if(Math.abs(speed) <= 1){
            clearInterval(timer);
            el.css('margin-top', 0 + 'px');
            return;
        }

        var top = el[0].scrollTop - speed;
        el[0].scrollTop = top;
        if(top < 0){
            el.css('margin-top', -top + 'px');
        }
        else if(top > scrollAvailable){
            el.css('margin-top', (scrollAvailable - top) + 'px');
        }
    }
}
(function(){
    // 模板一
    $('.video_show').each(function(video_show){
        touchScroll(video_show);
    });

    // 处理移动区域的链接点击事件
    var start = 0;
    function touchstart(evt){
        var touch = evt.changedTouches[0];
        if(!touch){
            return;
        }
        start = touch.pageX;
        return;
    }

    function touchend(evt){
        evt.preventDefault();
        var touch = evt.changedTouches[0];
        if(!touch){
            return;
        }
        if(Math.abs(touch.pageX - start) < 20){
            location.href = $(this).attr('href');
        }

        return;
    }

    $('a[href^=vod]').on('touchstart', touchstart);
    $('a[href^=vod]').on('touchend', touchend);
    $('a[href^=live]').on('touchstart', touchstart);
    $('a[href^=live]').on('touchend', touchend);
    $('a[href^=http]').on('touchstart', touchstart);
    $('a[href^=http]').on('touchend', touchend);
})();