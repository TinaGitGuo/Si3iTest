$(function(){

    //Map();
})

function Map() {
    /*
     * 配置Raphael生成svg的属性
     */
    Raphael.getColor.reset(); // 复位色谱位置
    var R = Raphael("map", 650, 500); //大小与矢量图形文件图形对应；
    var current = null;

    //省份文字样式；
    var textAttr = {
        "fill": "#fff",
        "font-size": "12px",
        "cursor": "pointer"
    };

    //调用绘制地图方法
    paintMap(R, $("#info h4").html(), $('#mapXX').val(), $('#mapYY').val(), textAttr);

    $('body').append("<div class='tiplayer' style='display:none'></div>");
    var tiplayer = $('.tiplayer');
    for (var state in china) {
        if (state == 'clone') {
            continue;
        }
        china[state]['path'].transform("t30,0");

        (function(st, state) {
            //***获取当前图形的中心坐标
            var xx = st.getBBox().x + (st.getBBox().width / 2);
            var yy = st.getBBox().y + (st.getBBox().height / 2);

            //***修改部分地图文字偏移坐标
            switch (china[state]['name']) {
                case "江苏省":
                    xx += 5;
                    yy -= 10;
                    break;
                case "河北省":
                    xx -= 10;
                    yy += 20;
                    break;
                case "天津市":
                    xx += 20;
                    yy += 10;
                    break;
                case "上海市":
                    xx += 20;
                    break;
                case "广东省":
                    yy -= 10;
                    break;
                case "澳门特别行政区":
                    yy += 10;
                    break;
                case "香港特别行政区":
                    xx += 20;
                    yy += 5;
                    break;
                case "甘肃省":
                    xx -= 40;
                    yy -= 30;
                    break;
                case "陕西省":
                    xx += 5;
                    yy += 20;
                    break;
                case "内蒙古自治区":
                    xx -= 15;
                    yy += 65;
                    break;
                default:
            }
            //图形的点击事件
            $(st[0]).click(function(e) {
                if (this.attributes.fill.nodeValue == "#becdd7") {
                    obj = 1
                }
                else { obj=0 }
                clickMap(obj);

           });
            
            //移入事件,显示信息 只在PC端有hover提示效果

            if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {

                $(st[0]).hover(function(e) {

                    if (e.type == 'mouseenter') {
                        $(this)[0].setAttribute("fill-opacity", 0.5);
                        $(this)[0].style["fill-opacity"] = 0.5;

                    } else {
                        if (current != state) {
                            $(this)[0].setAttribute("fill-opacity", 0.7);
                            $(this)[0].style["fill-opacity"] = 0.7;
                        }
                        else {
                            $(this)[0].setAttribute("fill-opacity", 1);
                            $(this)[0].style["fill-opacity"] = 1;

                        }
                    }
                });
            }

            // 地图点击事件

            function clickMap(obj) {
                if (obj == 1) return;
                if (current == state) return;

                //重置上次点击的图形
                current && china[current]['path'].animate({
                    transform: "t30,0",
                    "fill-opacity": china[current]['isClick'] ? 1:0.7,
                    stroke: "#fff"
                }, 500, "bounce");

                $("text").remove(); //删除节点

                current = state; //将当前值赋给变量

                //对本次点击
                china[state]['path'].animate({
                    transform: "t30,0 s1.03 1.03",
                    "fill-opacity": 1, //fill 填充颜色
                    stroke: "#e6dddd"
                }, 500, "bounce");
                st.toFront(); //向上
                R.safari();
                china[state]['text'] = R.text(xx, yy, china[state]['name']).attr(textAttr)
                china[state]['text'].toFront();

                if (china[current] === undefined) return;

                //显示选中的城市

                if (obj == 0) {
                    $('#mapXX').val(xx);
                    $('#mapYY').val(yy);
                    $("#ChoiceProvince").val(1);
  
                        $("#info h4").html(china[state]['name']);
                    
                    $("#Province").val(china[state]['name']);

                    loadData();
                }
            }


        })

        (china[state]['path'], state);
    }
}