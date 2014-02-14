/***************************
 *
 * @fileoverview    SenJS, for touch screens
 * @author          xushengs@gmail.com
 * @version         0.1.0.0    
 *
 ***************************/
(function(window, undefined){
    var document = window.document,
        navigator = window.navigator,
        location = window.location;

    // override $, Sen
    var _$ = window.$;
    var _sen = window.Sen;

    /**
     * @constructor Sen
     * @description Sen构造函数
     * @param       {String}    selector    选择器
     * @param       {Node}      context     上下文
     * @returns     {Object}    Sen.Dom
     **/
    var $, Sen;
    $ = Sen = function(selector, context){
        //if(selector.css){
//            return selector;
//        }

        return new Sen.Dom(selector, context);
    };

    /**
     * @description 解决命名冲突
     * @returns     {Object}    Sen
     **/
    $.noConflict = function(){
        if ( window.$ === Sen ) {
            window.$ = _$;
        }

        return Sen;
    }

    /**
     * @description 类型判断
     * @param       {Object}    obj   需要判断类型的对象
     * @returns     {String}    类型描述，全小写
     **/
    $.type = function(obj){
        return Object.prototype.toString.call(obj).replace(/(\[object\s+)|(\])/g, '').toLowerCase();
    };

    /**
     * @description 类继承
     * @param       {Object}    child   需要扩展的对象
     * @param       {Object}    parent  要继承的父类
     * @returns     {Object}    扩展后的对象
     **/
    $.extend = function(child, parent){
        var pp = parent.prototype,
            F = function() { };
        F.prototype = pp;
        var ext = new F();
        child.prototype = ext;
        ext.constructor = child;
        child.superclass = pp;

        // 如果没有构造函数，则指定一个
        if (parent != Object && pp.constructor == Object.prototype.constructor) {
            pp.constructor = parent;
        }

        return child;
    };

    /**
     * @description 合并两个对象
     * @param       {Object}    target      需要扩展的对象
     * @param       {Object}    source      扩展属性来源
     * @returns     {Object}    合并后的对象
     **/
    $.merge = function(target, source){
        for(var p in source){
            if($.type(source[p]) === 'object'){
                target[p] = $.merge(source[p]);
            }
            else{
                target[p] = source[p];
            }
        }

        return target;
    };

    /**
     * @description 对数组中的每个元素执行同样的方法
     * @param       {Array}     list    数组
     * @param       {Function}  fn      要执行的方法
     * @param       {Object}    bind    方法中this所引用的对象
     * @returns     {Object}    Sen
     **/
    $.each = function(list, fn, bind){
        var i = 0, len = list.length;
        for(; i < len; i++){
            fn.call(bind, list[i], i, this);
        }

        return this;
    };

    /**
     * @description 去除字符串头尾的空白字符
     * @param       {String}    str    要处理的字符串
     * @returns     {Str}       bind   去除头尾空白字符后的字符串
     **/
    $.trim = function(str){
        str.trim && str.trim();

        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    };

    $.now = function(){
        return +new Date;
    }

    /**
     * @description 空函数，
     **/
    $.empty = function(){
        return;
    }

    // global it
    window.$ = window.Sen = $;


    /**
     * dom.js
     **/
    (function($, undefined){
        /**
         * @constructor Sen.Dom
         * @description Sen.Dom构造函数
         * @param       {String}    selector    选择器
         * @param       {Node}      context     上下文
         * @returns     {Object}    Sen.Dom
         **/
        var Dom = function(selector, context){
            if(!selector){
                return this;
            }

            if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            }

            !context && (context = document);

            var ret = context.querySelectorAll(selector);
            for(var p in ret){
                this[p] = ret[p];
            }

            return this;
        };

        function toCamelCase(str) {
            return str.replace(/-\D/g, function(match) {
                return match.charAt(1).toUpperCase();
            });
        }

        function toHyphenCase(str) {
            return str.replace(/[A-Z]/g, function(match) {
                return ('-' + match.charAt(0).toLowerCase());
            });
        }

        Dom.prototype = {
            // cahce data
            cache: {},

            each: function(fn, bind){
                $.each(this, fn, bind);
                
                return this;
            },

            getStyle: function(name){
                if(!this.length) {
                    return;
                }

                var computed = document.defaultView.getComputedStyle(this[0], null);
                return (computed) ? computed.getPropertyValue([toHyphenCase(name)]) : null;
            },

            css: function(name, value){
                if($.type(name) === 'object'){
                    for(var p in name){
                        this.css(p, name[p]);
                    }
                    return this;
                }

                if(value === undefined){
                    return this.getStyle(name);
                }

                this.each(function(node){
                    node.style[toCamelCase(name)] = value;
                });

                return this;
            },

            position: function(pos){
                var node;

                if (pos === undefined) {
                    if(!this.length){
                        return false;
                    }
                    
                    node = this[0];

                    if (node.parentNode === null || node.style.display == 'none') {
                        return false;
                    }

                    if (document.getBoxObjectFor)  // gecko
                    {
                        box = document.getBoxObjectFor(node);

                        var borderLeft = (node.style.borderLeftWidth) ? parseInt(node.style.borderLeftWidth) : 0;
                        var borderTop = (node.style.borderTopWidth) ? parseInt(node.style.borderTopWidth) : 0;

                        pos = [box.x - borderLeft, box.y - borderTop];
                    }
                    else    // safari & opera
                    {
                        pos = [node.offsetLeft, node.offsetTop];
                        parent = node.offsetParent;
                        if (parent != node) {
                            while (parent) {
                                pos[0] += parent.offsetLeft;
                                pos[1] += parent.offsetTop;
                                parent = parent.offsetParent;
                            }
                        }
                        if (node.style.position == 'absolute') {
                            pos[0] -= document.body.offsetLeft;
                            pos[1] -= document.body.offsetTop;
                        }
                    }

                    if (node.parentNode) { parent = node.parentNode; }
                    else { parent = null; }

                    while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') {
                        // account for any scrolled ancestors
                        pos[0] -= parent.scrollLeft;
                        pos[1] -= parent.scrollTop;

                        if (parent.parentNode) { parent = parent.parentNode; }
                        else { parent = null; }
                    }

                    return { x: pos[0], y: pos[1], left: pos[0], top: pos[1] };
                }

                if (pos.x !== undefined) {
                    node.css('left', pos.x);
                }
                if (pos.y !== undefined) {
                    node.css('top', pos.y);
                }

                return this;
            },

            attr: function(name, value){
                if(value === undefined){
                    if(!this.length) {
                        return;
                    }

                    return this[0].getAttribute(name);
                }

                this.each(function(node){
                    node.setAttribute(name, value);
                });

                return this;
            },

            hasClass: function(klass){
                var i = 0, len = this.length;
                for(; i < len; i++){
                    if((' ' + this[i].className + ' ').indexOf(' ' + klass + ' ') > -1){
                        return true;
                    }
                }

                return false;
            },

            addClass: function(klass){
                this.each(function(node){
                    if($(node).hasClass(klass)){
                        return;
                    }

                    node.className = node.className === '' ? klass : (node.className + ' ' + klass);
                });

                return this;
            },

            removeClass: function(klass){
                this.each(function(node){
                    node.className = $.trim(node.className.replace(new RegExp('(^|\\s)' + klass + '(?:\\s|$)', 'g'), '$1'));
                })

                return this;
            },

            on: function(evt, fn){
                this.each(function(node){
                    node.addEventListener(evt, fn, false);
                });

                return this;
            },

            off: function(evt, fn, bind){
                this.each(function(node){
                    var host = bind;
                    $(node).removeEventListener(evt, fn, false);
                });

                return this;
            },

            html: function(html){
                if(html === undefined){
                    return this[0].innerHTML;
                }

                this.each(function(node){
                    $(node).innerHTML = html;
                });
                return this;
            },

            append: function(node){
                if(node.nodeType){
                    this.each(function(nd){
                        nd.appendChild(node);
                    });

                    return this;
                }

                var div = document.createElement('div');
                div.innerHTML = node;
                $.each(div.childNodes, function(node){
                    this.append(node);
                }, this);
            },

            scrollTo: function(position){
                if(!this.cache.timer){
                    this.cache.timer = 0;
                }

                clearInterval(this.cache.timer);

                var start = [], change = [];
                var self = this;
                var time;
                var duration = 300;

                var attr = { 'x' : 'scrollLeft', 'y' : 'scrollTop' };

                this.each(function(node, i){
                    for(var p in position){
                        start[i] = {};
                        start[i][p] = node[attr[p]];
                        change[i] = {};
                        change[i][p] = position[p] - start[i][p];
                    }
                });

                function swing(p) {
                    //return -Math.cos(p * Math.PI) / 2 + 0.5;      //swing
                    return Math.pow(2, 8 * (p - 1));              //circle
                }

                function transition(pos){
                    return (pos <= 0.5) ? swing(2 * pos) / 2 : (2 - swing(2 * (1 - pos))) / 2;
                }

                function doScroll(){
                    var pos = ($.now() - time) / duration;
                    if (pos >= 1) {
                        clearInterval(self.cache.timer);
                        pos = 1;
                    }
                    pos = transition(pos);
                    self.each(function(node, i){
                        for(var p in position){
                            node[attr[p]] = change[i][p] * pos + start[i][p];
                        }                        
                    });
                }

                time = $.now();
                this.cache.timer = setInterval(doScroll, 13);
            }
        };

        $.Dom = Dom;
    })(Sen);

    (function($, undefined){
        //
    })(Sen);

})(window);