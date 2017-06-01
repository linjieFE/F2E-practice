/*
    原生js实现版本
*/
!(function(){

    LazyLoad.prototype._loadImgs = function(){
        //如果图片都加载完毕 则不再执行
        var _imgs = this.allImgs;
        console.log(this.allImgs);
        var seeHeight = document.documentElement.clientHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        for (var i = _imgs.length - 1; i >= 0; i-- ) {
            if (_imgs[i].offsetTop < seeHeight + scrollTop) {
                //图片在视口中间
                if (_imgs[i].getAttribute('src') === this.defaultImgName) {
                    _imgs[i].src = _imgs[i].getAttribute('data-src');
                    _imgs.splice(i, 1);
                }
            }
        }
    }
    function LazyLoad(imgName, className, delayTime) {
        this.defaultImgName = imgName ? imgName : 'default.png';
        this.defaultClassName = className ? className : '.lazyImg';
        this.allImgs = [];
        //imgs = [];

        //初始化
        var nodes = document.querySelectorAll(this.defaultClassName);
        if (nodes.length == 0) return;

        for (var i = 0;i < nodes.length;i++) {
            this.allImgs.push(nodes[i]);
        }

        //首先执行一次
        this._loadImgs.bind(this);

        if (delayTime) {
            var self = this;
            var timer;
            window.addEventListener('scroll', function() {
                timer && clearTimeout(timer);
                timer = setTimeout(function() {
                    self._loadImgs();
                }.bind(self), delayTime)
            })
        } else {
            window.addEventListener('scroll', this._loadImgs.bind(this));
        }

    }
    
    window.LazyLoad = LazyLoad;
})()