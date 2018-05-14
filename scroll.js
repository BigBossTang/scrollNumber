var htmlContent='<div class="mui-scroll-wrapper scroll-item">\n' +
    '    <div class="mui-scroll">\n' +
    '        <ul>\n' +
    '            <li>1</li>\n' +
    '            <li>2</li>\n' +
    '            <li>3</li>\n' +
    '            <li>4</li>\n' +
    '            <li>5</li>\n' +
    '            <li>6</li>\n' +
    '            <li>7</li>\n' +
    '            <li>8</li>\n' +
    '            <li>9</li>\n' +
    '            <li>0</li>\n' +
    '            <li>1</li>\n' +
    '            <li>2</li>\n' +
    '            <li>3</li>\n' +
    '            <li>4</li>\n' +
    '            <li>5</li>\n' +
    '            <li>6</li>\n' +
    '            <li>7</li>\n' +
    '            <li>8</li>\n' +
    '            <li>9</li>\n' +
    '            <li>0</li>\n' +
    '        </ul>\n' +
    '    </div>\n' +
    '</div>';

var data = {
    n: 1,
    stop: {}, //注册判断停止的异步控制器
    time: 200, //配置多久未动算停止
    number: {},//存储获取的数字
}
//注册滚动事件
var eventInstall = function (func) {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        startY: -468,
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        bounce: false,
    });
    //滚动监听
    $('.mui-scroll-wrapper').on('scroll', function (e) {
        var scrollId = $(this).attr('scroll-id');
        var y = parseInt(e.originalEvent.detail.y), max = parseInt(e.originalEvent.detail.maxScrollY),
            dis = max - y;
        var _this = this;
        //监听滚动停止，预设200ms未动算停止
        clearTimeout(stop[scrollId]);
        stop[scrollId] = setTimeout(function () {
            scrollEnd(_this, y, scrollId,func);
        }, data.time)

        if (y < -(data.n * 500 + 318)) {
            mui(this).scroll().scrollTo(0, y+500, 0)
        }
        if (y > -(235)) {
            mui(this).scroll().scrollTo(0, y-500, 0)
        }
    })
}


//滚动结束处理函数
var scrollEnd = function (node, y, id,func) {
    var dis = -parseInt(y) % 50;
    var l = y;
    if (dis < 18) {
        l = y - (18 - dis)
    } else if (dis > 18) {
        l = y - (68 - dis)
    }
    if (dis != 18) mui(node).scroll().scrollTo(0, l, 200);
    getNumber(node,l, id,func)
}

//取出最终位置的数值
var getNumber = function (node,l, id,func) {
    var d = parseInt(Math.abs(l) / 50) - 8,
        num = Math.abs(d),numArr=[];
    if (l >= -368) {
        num = 10 + d;
    }
    data.number[id] = num;
    $(node).attr('scroll-num',num)
    $(node).parent('.scroll-container').find('.scroll-item').each(function () {
        numArr.push($(this).attr('scroll-num'))
    })
    if(func)func(numArr);

}

var scrollInit = function (node,num,func) {
    var tpl = ''
    $(node).html('<div class="scroll-container"></div>')
    for(var i=0;i<(num||3);i++){
        tpl = tpl + htmlContent
    }
    $(node).find('.scroll-container').html(tpl);
    $(node).find('.scroll-item').each(function () {
        $(this).attr({
            'scroll-id':$(this).index()+1,
            'scroll-num':1
        })
    })
    eventInstall(func);
}


