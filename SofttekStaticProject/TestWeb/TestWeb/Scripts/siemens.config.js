/* By Lance 2017-01-25 */
; (function ($, lay, win) {

    'use strict';

    if (!lay) {
        console.log('Layer is needed !');
        return;
    }

    if (!$) {
        console.log('jQuery is needed !');
        return;
    }


    var gsf = {
        siteName: '',//子站点名称，本地调试不需要修改
        //合并多个对象的属性
        merge: function n() { var t, e, i = arguments, n = {}, r = function (t, e) { var i, n; "object" != typeof t && (t = {}); for (n in e) e.hasOwnProperty(n) && (i = e[n], t[n] = i && "object" == typeof i && "[object Array]" !== Object.prototype.toString.call(i) && "renderTo" !== n && "number" != typeof i.nodeType ? r(t[n] || {}, i) : e[n]); return t }; for (i[0] === !0 && (n = i[1], i = Array.prototype.slice.call(i, 2)), e = i.length, t = 0; e > t; t++) n = r(n, i[t]); return n },
        extend: function (t, e) { var i; t || (t = {}); for (i in e) t[i] = e[i]; return t },//extend({},{},true|false),false means merge and override, true means skip
        top: function (arr, count, isStand) {//找到数组中的TOP元素
            var topValue = (arr.sort(function (a, b) { return b - a; }))[count - 1];
            var topValues = (arr.sort(function (a, b) { return b - a; })).slice(0, count);
            return {
                edgeValue: topValue,
                topValues: topValues
            };
        },
        unique: function (arr) {//数组元素去重
            var result = [], hash = {};
            for (var i = 0, elem; (elem = arr[i]) != null; i++) {
                if (!hash[elem]) {
                    result.push(elem);
                    hash[elem] = true;
                }
            }
            return result;
        },
        browserType: function () {//判断浏览器类型
            var Sys = {};
            var ua = navigator.userAgent.toLowerCase();
            var s;
            (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
            (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
            (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
            (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

            //if (Sys.ie) document.write('IE: ' + Sys.ie);
            //if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
            //if (Sys.chrome) document.write('Chrome: ' + Sys.chrome);
            //if (Sys.opera) document.write('Opera: ' + Sys.opera);
            //if (Sys.safari) document.write('Safari: ' + Sys.safari);

            return Sys;
        },
        log: function (content) {//打印日志
            if (window.console) {
                console.log(content);
            }
        },
        formatDate: function (date, format) {
            if (!date) return;
            if (!format) format = "yyyy-MM-dd";
            switch (typeof date) {
                case "string":
                    date = new Date(date.replace(/-/, "/"));
                    break;
                case "number":
                    date = new Date(date);
                    break;
            }
            if (!date instanceof Date) return;
            var dict = {
                "yyyy": date.getFullYear(),
                "M": date.getMonth() + 1,
                "d": date.getDate(),
                "H": date.getHours(),
                "m": date.getMinutes(),
                "s": date.getSeconds(),
                "MM": ("" + (date.getMonth() + 101)).substr(1),
                "dd": ("" + (date.getDate() + 100)).substr(1),
                "HH": ("" + (date.getHours() + 100)).substr(1),
                "mm": ("" + (date.getMinutes() + 100)).substr(1),
                "ss": ("" + (date.getSeconds() + 100)).substr(1)
            };
            return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
                return dict[arguments[0]];
            });
        },
        /*Define Different Alert Dialog*/
        simpleAlert: function (msg, icon, opt) {
            /*
                Dialog Icon Value
                0: Warning
                1: OK
                2: Fail
                3: Question
                4: Lock
                5: Sad
                6: Smile
            */

            //将消息处理，以全角感叹号结尾
            //todo

            var index = lay.msg(msg, {
                icon: icon,
                time: 3000,
                shade: [0.1, '#FFF'],
                scrollbar: false,
                offset: 200
                //shift: 6//抖动
            }, function () {
                if (opt) {
                    if (Object.prototype.toString.call(opt) === '[object String]') {
                        window.location.href = opt;
                    } else if (Object.prototype.toString.call(opt) === '[object Function]') {
                        opt();
                    }
                }
            });

            return index;
        },
        simpleAlert2: function (msg, icon, opt) {

            //将消息处理，以全角感叹号结尾
            //todo

            msg = msg.endWith('！') ? msg : msg + '！';

            var index = lay.msg(msg, {
                icon: icon,
                time: 3000,
                shade: [0.1, '#FFF'],
                scrollbar: false,
                offset: 200
                //shift: 6//抖动
            }, function () {
                if (opt) {
                    if (Object.prototype.toString.call('') === '[object String]') {
                        window.location.href = opt;
                    } else if (Object.prototype.toString.call('') === '[object Function]') {
                        opt();
                    }
                }
            });

            return index;
        },
        simpleLoading: function (style) {//加载动画
            var index = lay.load(style || 2, { shade: [0.8, '#393D49'] });

            return index;
        },
        appendStyle: function (style) {//追加样式到 head 区域
            var node = document.createElement('style');
            node.type = 'text/css';
            if (node.styleSheet) {         //ie下
                node.styleSheet.cssText = style;
            } else {
                node.innerHTML = style;       //或者写成 node.appendChild(document.createTextNode(style))
            }
            document.getElementsByTagName('head')[0].appendChild(node);
        },
        isArray: Function.isArray || function (o) {//判断对象是否为数组
            return Object.prototype.toString.call(o) === '[object Array]';
        },
        simpleConfirm: function (title, content, opt, callback) {
            //询问框
            var index = lay.confirm(content, {
                title: title,
                icon: 0,
                btn: ['Yes', 'No'], //按钮
                btnAlign: 'c'//按钮居中
            }, function () {
                callback();
                lay.close(index);
            }, function () {
                lay.close(index);
            });

            return index;
        },
        simpleConfirm2: function (title, content, opt, callback,callback2) {
            //询问框
            var index = lay.confirm(content, {
                title: title,
                icon: 0,
                btn: ['Yes', 'No'], //按钮
                btnAlign: 'c'//按钮居中
            }, function () {
                lay.close(index);
                callback();
            }, function () {
                lay.close(index);
                callback2();
            });

            return index;
        },
        simpleIframeWindow: function (title, url, area, btns, isShowScroll, callback) {//以Iframe的方式打开弹窗，窗口标题，页面地址，窗口大小
            title = title || '标题';
            url = url || '';
            area = area || 'auto';
            btns = btns || ['确定'];
            var content = isShowScroll ? url : [url, 'no'];
            var index = lay.open({
                type: 2,
                closeBtn: 0,
                resize: false,
                btnAlign: 'c',
                area: area,
                //skin: 'layui-lay-demo',
                title: title,
                shadeClose: false,
                content: content,
                btn: btns,
                yes: function () {
                    if (callback) {
                        if (false !== callback()) {
                            lay.close(index);
                        }
                    }     
                }
            });
        },
        showWindow: function (title, url, area, isRemote, btns, callback) {//加载HTML并打开弹窗，窗口标题，页面地址，窗口大小，是否远程页面
            title = title || '标题';
            url = url || '';
            area = area || 'auto';
            isRemote = isRemote || false;
            btns = btns || ['确定'];
            
            if (isRemote) {
                //$.ajaxSetup({ async: false });
                $.post(url, function (result, status, req) {
                    if (result) {
                        var index = lay.open({
                            type: 1,
                            closeBtn: 0,
                            resize: false,
                            btnAlign: 'c',
                            area: area,
                            //skin: 'layui-lay-black',
                            title: title,
                            shadeClose: false,
                            content: result,
                            btn: ['确认', '返回'],
                            yes: function () {
                                if (callback) {
                                    callback();
                                }
                            },
                            no: function () {
                                lay.close(index);
                            },
                            success: function () {
                                
                                $('.layui-lay-black .layui-lay-btn0').addClass('btn btn-info');
                                $('.layui-lay-black .layui-lay-btn1').addClass('btn btn-success');
                            }
                        });
                    }
                });
            } else {
                
                var index = lay.open({
                    type: 1,
                    closeBtn: 0,
                    resize: false,
                    btnAlign: 'c',
                    area: area,
                    //skin: 'layui-lay-black',
                    title: title,
                    shadeClose: false,
                    content: $('#' + url).html(),
                    btn: btns,
                    yes: function () {
                        if (callback) {
                            callback();
                        } else {
                            lay.close(index);
                        }
                    },
                    no: function () {
                        lay.close(index);
                    },
                    success: function () {
                        
                        //$('.layui-lay-black .layui-lay-btn > a').removeClass().addClass('btn btn-info');
                        $('.layui-lay-black .layui-lay-btn0').addClass('btn btn-info');
                        $('.layui-lay-black .layui-lay-btn1').addClass('btn btn-success');
                    }
                });
            }
        },
        showWindow2: function (title, url, area, isRemote, btns, callback) {//加载HTML并打开弹窗，窗口标题，页面地址，窗口大小，是否远程页面
            title = title || '标题';
            url = url || '';
            area = area || 'auto';
            isRemote = isRemote || false;
            btns = btns || ['确定'];
            
            if (isRemote) {
                //$.ajaxSetup({ async: false });
                $.post(url, function (result, status, req) {
                    if (result) {
                        var index = lay.open({
                            type: 1,
                            closeBtn: 0,
                            resize: false,
                            btnAlign: 'c',
                            area: area,
                            //skin: 'layui-lay-black',
                            title: title,
                            shadeClose: false,
                            content: result,
                            btn: ['提交', '取消'],
                            yes: function () {
                                if (callback) {
                                    callback();
                                }
                            },
                            no: function () {
                                lay.close(index);
                            },
                            success: function () {

                                $('.layui-lay-black .layui-lay-btn0').addClass('btn btn-info');
                                $('.layui-lay-black .layui-lay-btn1').addClass('btn btn-success');
                            }
                        });
                    }
                });
            } else {

                var index = lay.open({
                    type: 1,
                    closeBtn: 0,
                    resize: false,
                    btnAlign: 'c',
                    area: area,
                    //skin: 'layui-lay-black',
                    title: title,
                    shadeClose: false,
                    content: $('#' + url).html(),
                    btn: btns,
                    yes: function () {
                        if (callback) {
                            callback();
                        } else {
                            lay.close(index);
                        }
                    },
                    no: function () {
                        lay.close(index);
                    },
                    success: function () {

                        //$('.layui-lay-black .layui-lay-btn > a').removeClass().addClass('btn btn-info');
                        $('.layui-lay-black .layui-lay-btn0').addClass('btn btn-info');
                        $('.layui-lay-black .layui-lay-btn1').addClass('btn btn-success');
                    }
                });
            }
        },
        simpleWindow: function (title, url, area, btns, callback) {//加载HTML并打开弹窗，窗口标题，页面地址，窗口大小,关闭时的回调函数
            title = title || '标题';
            url = url || '';
            area = area || 'auto';

            $.post(url, function (result, status, req) {
                if (result) {
                    var index = lay.open({
                        type: 1,
                        closeBtn: 0,
                        resize: false,
                        btnAlign: 'c',
                        area: area,
                        //skin: 'layui-lay-black',
                        title: title,
                        shadeClose: false,
                        content: result,
                        btn: btns || ['确认'],
                        yes: function () {
                            console.log("yes");
                            if (callback) {
                                if (callback()) {
                                    lay.close(index);
                                }
                            }
                            else {
                                lay.close(index);
                            }
                        },
                        no: function () {
                            console.log("no");
                            lay.close(index);
                        },
                        success: function () {
                            //$('.layui-lay-black .layui-lay-btn > a').removeClass().addClass('btn btn-info');
                        }
                    });
                }
            });
        },
        trim: function (str) {//清除空格
            return str.replace(/(^\s*)|(\s*$)/g, "");
        },
        getQueryString: function (name) {//获取URL查询字符串
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;


            //var url = location.search; //获取url中"?"符后的字串  
            //var theRequest = new Object();
            //if (url.indexOf("?") != -1) {
            //    var str = url.substr(1);
            //    strs = str.split("&");
            //    for (var i = 0; i < strs.length; i++) {
            //        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            //    }
            //}
            //return theRequest;


        },
        getParam: function (paramName) {//获取URL查询字符串
            paramValue = "", isFound = !1;
            if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
                arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
                while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
            }
            return paramValue == "" && (paramValue = null), paramValue
        },
        migratejQuery: function () {//扩展 jQuery
            if (!$.handleError) {
                $.extend({
                    handleError: function (s, xhr, status, e) {
                        // If a local callback was specified, fire it  
                        if (s.error) {
                            s.error.call(s.context || s, xhr, status, e);
                        }

                        // Fire the global callback  
                        if (s.global) {
                            (s.context ? $(s.context) : $.event).trigger("ajaxError", [xhr, s, e]);
                        }
                    }
                });
            }
            if (!$.httpData) {
                $.extend({
                    httpData: function (xhr, type, s) {
                        var ct = xhr.getResponseHeader("content-type"), xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0, data = xml ? xhr.responseXML : xhr.responseText;
                        if (xml && data.documentElement.tagName == "parsererror") {
                            throw "parsererror";
                        }
                        if (s && s.dataFilter) {
                            data = s.dataFilter(data, type);
                        }
                        if (typeof data === "string") {
                            if (type == "script") {
                                $.globalEval(data);
                            }

                            if (type == "json") {
                                data = window["eval"]("(" + data + ")");
                            }
                        }

                        return data;
                    }
                });
            }
            if (!$.parseXML) {
                $.extend({
                    // Cross-browser xml parsing
                    parseXML: function (data) {
                        var xml, tmp;
                        try {
                            if (window.DOMParser) { // Standard
                                tmp = new DOMParser();
                                xml = tmp.parseFromString(data, "text/xml");
                            } else { // IE
                                xml = new ActiveXObject("Microsoft.XMLDOM");
                                xml.async = "false";
                                xml.loadXML(data);
                            }
                        } catch (e) {
                            xml = undefined;
                        }
                        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                            jQuery.error("Invalid XML: " + data);
                        }
                        return xml;
                    }
                });
            }
        },
        showDialog: function (url, title, subtitle, summary) {
            title = title || '';
            subtitle = subtitle || '';
            summary = summary || '';
            if ($('#iframeDialog div.uploadify').length > 0) {
                $("#btn_upload").uploadify('destroy');
            }
            $('#iframeDialog div.se').load(url, function (result, status, req) {
                //if (req.status === 401) {
                //    window.location.href = "@FormsAuthentication.LoginUrl";
                //    return;
                //}
                $('#iframeDialog .dialog-title').html(title).hide();
                $('#iframeDialog .dialog-summary').html(summary).hide();
                $('#iframeDialog .dialog-subtitle').html(subtitle);

                gsf.initAccordion($('#iframeDialog'));

                $('#iframeDialog').fadeIn();

            });

        },
        showHtmlDialog: function (content) {
            $('#iframeDialog .dialog-title').hide();
            $('#iframeDialog .dialog-summary').hide();
            $('#iframeDialog .dialog-subtitle').hide();
            $('#iframeDialog .se').html(content);

            gsf.initAccordion($('#iframeDialog'));

            $('#iframeDialog').fadeIn();

        },
        showEmptyDialog: function () {
            $('#iframeDialog .dialog-title').hide();
            $('#iframeDialog .dialog-summary').hide();
            $('#iframeDialog .dialog-subtitle').hide();

            gsf.initAccordion($('#iframeDialog'));

            $('#iframeDialog').fadeIn();

        },
        initAccordion: function ($container) {
            $container.find('.accordion').each(function (index, accordion) {

                var $accordion = $(this);

                //同一级 Level 添加 opener + level 样式
                $accordion.children('.section').find('.opener:first').addClass('opener' + index);

                //判断需要展开的索引
                var activeIndex = $accordion.children('.section.selected').index();

                $accordion.accordion({
                    active: activeIndex === -1 ? false : activeIndex,
                    collapsible: true,
                    header: "> .section .opener" + index,
                    autoHeight: false,
                    icons: {
                        "header": false,
                        "headerSelected": false
                    },
                    change: function () {
                        fixIEfooter();
                    }
                });

            });
        },
        isJson: function (obj) {
            //return typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
            try {
                return JSON.parse(obj) && true;
            } catch (ex) {
                return false;
            }
        },
        isNumber: function (value) {
            return typeof value === 'number' && isFinite(value);
        }
    };

    window.SiemensVSSCfg = gsf;

    //首先备份下jquery的ajax方法  
    var _ajax = $.ajax;
    var ajaxIndex = -1;
    //重写jquery的ajax方法  
    $.ajax = function (opt) {
        //备份opt中error和success方法  
        var fn = {
            error: function (XMLHttpRequest, textStatus, errorThrown) { },
            success: function (data, textStatus) { }
        }
        if (opt.error) {
            fn.error = opt.error;
        }
        if (opt.success) {
            fn.success = opt.success;
        }
        //扩展增强处理  
        var _opt = $.extend(opt, {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //错误方法增强处理  
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            //beforeSend: function (xhr, settings) {
            //    ajaxIndex = layer.load(2);
            //},
            //complete: function (xhr) {
            //    layer.close(ajaxIndex);
            //},
            success: function (data, textStatus) {
                lay.closeAll();
                if (data.Flag === false && data.Msg) {
                    var opt = '';
                    if (data.Msg.indexOf('登录超时') >= 0) {
                        opt = '/Account/Login';
                    }
                    SiemensVSSCfg.simpleAlert(data.Msg, 2, opt);
                } else {
                    //成功回调方法增强处理  
                    fn.success(data, textStatus);
                }
            }
        });
        return _ajax(_opt);
    };

})(jQuery, layer, window);

String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
}
String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
}

Array.prototype.clone = function () { return this.slice(0); }