!(function() {

    function removeElemt(elemt) {
        var parentNode = elemt.parentNode;
        if (parentNode && parentNode !== 11) {
            parentNode.removeChild(elemt);
        }
    }

    function randomFunName() {
        return 'jsonp_' + new Date().getTime() + Math.random().toString().substr(2);
    }

    var jsonp = function(url, params, cb) {
        var callbackName = randomFunName();
        var paramsStr = '';
        if (url) {
            if (typeof params === 'function') {
                // no params data 
                cb = params;
            } else if (typeof params === 'object') {
                // params data
                for (var key in params) {
                    if (params.hasOwnProperty(key)) {
                        paramsStr = '&' + key + '=' + params[key];
                    }
                }
            }

            if (url.indexOf('callback') !== -1) {
                //to find function name
                var _arr = url.split('=');
                var _funName = '';
                 _arr.forEach(function(_item, index) {
                    if (_item.indexOf('callback') !== -1) {
                        _funName = _arr[index+1].indexOf('&') !== -1 ? _arr[index + 1].substring(0 ,_arr[index+1].indexOf('&')) : _arr[index+1];
                    }
                 });

                callbackName = _funName;
                url = url + paramsStr;
            } else {
                url = url + '?callback=' + callbackName + paramsStr;
            }


            var scriptElm = document.createElement('script');
            scriptElm.setAttribute('type', 'text/javascript');
            scriptElm.src = url;
            document.body.appendChild(scriptElm);

            window[callbackName] = function(data) {
                //remove script elemt
                removeElemt(scriptElm);
                cb(data);
            }
        }
    }

    window.jsonp = jsonp;
})();