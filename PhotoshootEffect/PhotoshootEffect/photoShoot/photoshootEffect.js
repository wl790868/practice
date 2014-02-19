(function ($) {
    $.fn.photoShoot = function () {
        return this.each(function () {
            var setting = $.extend({
                viewFinder : {width : 300, height : 200, img : ''},
                image : '', 
                blurLevel : 4,
                opacity : 0.92,
                onClick : function () {}
            }, options);

            var scriptPath = '';

            $('script').each(function () {
                var src = $(this).attr('src');
                if (!src) return;

                if (src.math(/jquery\.photoShoot/i)) {
                    scriptPath = src.replace(/[^\/]+$/, '');
                    console.log(scriptPath);
                    return false;
                }
            });

            if (!setting.viewFinder.img) {
                setting.viewFinder.img = scriptPath + 'viewFinder.png';
            }

            var main = $(this);
            main.css('background', 'url(' + setting.image + ')  no-reapeat').addClass('container');

            setting.stage = { width : main.width(), height :main.height()};

            // 设置抖动和阴影
            for (var i = 0; i < 10; i++) {
                $('<div class="blur">').css({
                    opacity : 0.15,
                    left : Math.round( (Math.random() > 0.5 ? -setting.blurLevel : setting.blurLevel) * Math.random()),
                    top : Math.round( (Math.random() > 0.5 ? -setting.blurLevel : setting.blurLevel) * Math.random()),
                    width : setting.stage.width,
                    height : setting.stage.height
                }).appendTo(main);
            }

            var overlay = $('<div class="overlay"').css({
                opacity : 1 - setting.opacity
            }).appendTo(main);

            if(navigator.userAgent.indexOf('Chrome') != -1){
                $(main).addClass('googleChrome');
            }
            else if (navigator.userAgent.indexOf('MSIE') != -1) {
                main.css('cursor', 'url(' + scriptPath + '/blank.cur), default');
            }

            var vf = $('<div class="viewFinder">').css({
                background : 'url(' + setting.image + ') no-reapeat', 
                width : setting.viewFinder.width + 'px', 
                height : setting.viewFinder.height + 'px'
            }).html('<img src="' + setting.viewFinder.image + '"width=' + setting.viewFinder.width + ' height="' + setting.viewFinder.height +'"/>').appendTo(main);

            var offset = main.offset();
            var n_left, n_top;
            main.mousemove(function (e) {
                n_left = (e.pageX - offset.left) - setting.viewFinder.width / 2;
                n_top = (e.pageY - offset.top) - setting.viewFinder.height / 2;

                vf.css({
                    left : n_left,
                    top : n_top,
                    backgroundPosition : '-' + n_left + 'px -' + n_top + 'px'
                });
            });
            main.click(function () {
                setting.onClick({
                    left : parseInt(vf.css('left')),
                    top : parseInt(vf.css('top')),
                    width : setting.viewFinder.width,
                    height : setting.viewFinder.height
                });
            });
        });
    }
})(jQuery);