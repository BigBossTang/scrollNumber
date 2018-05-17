var htmlStart = '<div class="mui-scroll-wrapper scroll-item"><div class="mui-scroll"><ul>',
    htmlEnd = '</ul></div></div>';


var data = {
    stop: {}, //注册判断停止的异步控制器
    time: 200, //配置多久未动算停止
    number: {},//存储获取的数字
}
//注册滚动事件
var eventInstall = function (param, func) {
    var h = param.height || 50, words = param.words || [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var start = comput(1, words.length, h);
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        startY: -start,
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
            scrollEnd(_this, y, scrollId,h,words, func);
        }, data.time)

        if (y < -comput(2, words.length, h)) { //到底
            mui(this).scroll().scrollTo(0, y + comput(0, words.length, h), 0)
        }
        if (y > -comput(3,words.length,h)) { //到顶
            mui(this).scroll().scrollTo(0, y - comput(0, words.length, h), 0)
        }
    })
}

//各种计算
var comput = function (type, l, h) { //传入计算类型，数组长度，单块元素高度
    var result = 0;
    if(type===0){//计算总高度
        result = parseInt(l*h);
    }
    if (type === 1) {//计算初始位移
        result = l*h - parseInt(h / 3 * 2);
    }
    if (type === 2) {//计算到底部的临界高度，判断到底的跳转
        result = parseInt(l*h+(l-2)*h);
    }
    if (type === 3) {//计算上边距不足3分之1，顶部临界位移
        result = parseInt(h / 3);
    }
    if (type === 4) {//h/3
        result = parseInt(h / 3);
    }
    return result;
}

//滚动结束处理函数
var scrollEnd = function (node, y, id,h,words, func) {
    var dis = -parseInt(y) % h;
    var l = y;
    if (dis < comput(4,words.length,h)) {
        l = y - (comput(4,words.length,h) - dis)
    } else if (dis > comput(4,words.length,h)) {
        l = y - (comput(4,words.length,h)+h - dis)
    }
    if (dis != comput(4,words.length,h)) mui(node).scroll().scrollTo(0, l, 200);
    getNumber(node, l, id,h,words, func)
}

//取出最终位置的数值
var getNumber = function (node, l, id,h,w, func) {
    console.log('l:'+l,'h:'+h);
    var d = parseInt(Math.abs(l) / h),
        num = Math.abs(d)+2,//修正
        word='', numArr = [];

    data.number[id] = num;
    console.log(num);
    word = w[(num>w.length?num-w.length:num)-1];
    $(node).attr('data-word', word)
    $(node).parent('.scroll-container').find('.scroll-item').each(function () {
        numArr.push($(this).attr('data-word'))
    })
    if (func) func(numArr);

}

//初始化
var scrollInit = function (options, func) {
    var htmlBody = '', tpl = '', htmlContent = '', arr =options.words || [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var inf = 2;
    while (inf > 0) {
        $.each(arr, function (i, w) {
            console.log(w);
            htmlBody = htmlBody + '<li data-word="' + w + '"' + ' data-key="' + i + '">' + w + '</li>';
        })
        inf--;
    }
    htmlContent = htmlStart + htmlBody + htmlEnd;

    $(options.node).html('<div class="scroll-container"></div>')
    for (var i = 0; i < (options.number || 3); i++) {
        tpl = tpl + htmlContent
    }
    $(options.node).find('.scroll-container').html(tpl);
    $(options.node).find('.scroll-item').each(function () {
        $(this).attr({
            'scroll-id': $(this).index() + 1,
            'data-word':arr[0]
        })
    })
    eventInstall(options, func);
}


