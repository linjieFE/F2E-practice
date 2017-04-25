/*
    原生js实现版本
*/
var lazyImgs = document.querySelectorAll('.lazyImg');
var n = lazyImgs.length;

//首先执行一次
loadLazyImgs();

window.onscroll = loadLazyImgs;

function loadLazyImgs() {
    var seeHeight = document.documentElement.clientHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    for (var i = 0; i < lazyImgs.length; i++ ) {
        if (lazyImgs[i].offsetTop < seeHeight + scrollTop) {
            //图片在视口中间
            (function(i) {
                setTimeout(function() {
                    lazyImgs[i].src = lazyImgs[i].getAttribute('data-src');
                    console.log('载入' + i);
                }, 500)
            })(i);
        }
    }
}