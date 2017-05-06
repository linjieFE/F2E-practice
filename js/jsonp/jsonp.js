var jsonp = function(url, cb) {
    var callbackName = 'test';
    if (url) {
        if (url.indexOf('?') !== -1) {
            url = url + '&callback=' + callbackName;
        } else {
            url = url + '?callback=' + callbackName;
        }

        var scriptElm = document.createElement('script');
        scriptElm.setAttribute('type', 'text/javascript');
        scriptElm.src = url;
        document.body.appendChild(scriptElm);

        window[callbackName] = function(data) {
            cb(data);
        }
    }
}