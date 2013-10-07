
/*
(function($, undefined){
    window.onerror = function(err){
        for(var p in err){
            log(p + ':' + err[p]);
        }
        log(err.message);
    };

    var log = (function(){
        var id = '_sen_log_' + (+new Date);
        $(document.body).append('<div style="position:fixed;z-index:10000;right:0;bottom:0;background:#fff;border:1px solid #ccc;border-radius:6px 0 0 0;box-shadow:-2px -2px 2px #ccc;width:320px;height:240px;overflow:auto;"><ul id="' + id + '"></ul></div>');

        var logbox = $('#' + id);

        return function(info){
            logbox.append('<li>' + info + '</li>');
        };
    })();

    $.log = log;
})(Sen);
//*/


function touchScroll(el){
    if(!el){
        return;
    }

    el = $(el);

    var startX = 0, speed = 0, scrollAvailable = 0, marginLeft = 0, timer;
    el.on("touchstart", function(evt) {
        evt.preventDefault();
        var touch = evt.changedTouches[0];
        if(!touch){
            return;
        }

        startX = touch.pageX;
        scrollAvailable = this.scrollWidth - this.offsetWidth;
        marginLeft = parseInt(el.css('margin-left'), 10);
    }, false);

    el.on("touchmove", function(evt) {
        evt.preventDefault();
        var touch = evt.changedTouches[0];
        if(!touch){
            return;
        }

        speed = touch.pageX - startX;
        startX = touch.pageX;
        var left = this.scrollLeft - speed;

        if(left < 0){
            marginLeft = Math.ceil(marginLeft - left / 2);
            el.css('margin-left', marginLeft + 'px');
        }
        else if(left > scrollAvailable){
            marginLeft = Math.ceil(marginLeft + (scrollAvailable - left) / 2);
            el.css('margin-left', marginLeft + 'px');
        }

        this.scrollLeft = left;

    },false);

    el.on("touchend", function(evt) {
        evt.preventDefault();
        if(timer){
            clearInterval(timer);
        }

        speed *= 2.5;
        //var ml = parseInt(el.css('margin-left'), 10);
        marginLeft /= 2;
        if(Math.abs(marginLeft) > Math.abs(speed)){
            speed = marginLeft;
        }
        timer = setInterval(function(){slowdown();}, 40);
    },false);

    function slowdown(){
        speed = speed * 0.75;
        if(Math.abs(speed) <= 1){
            clearInterval(timer);
            el.css('margin-left', 0 + 'px');
            return;
        }

        var left = el[0].scrollLeft - speed;
        el[0].scrollLeft = left;
        if(left < 0){
            el.css('margin-left', -left + 'px');
        }
        else if(left > scrollAvailable){
            el.css('margin-left', (scrollAvailable - left) + 'px');
        }
    }
}

(function(){
    // 模板一
    $('.box').each(function(box){
        touchScroll(box);
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
