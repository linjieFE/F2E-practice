function getImg() {
    return document.getElementById('img');
}

function CropImg() {
    this.app = document.getElementById('app');
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.img = getImg();

    this.toDrawImage();
    this.cutImg();
}
CropImg.prototype.toDrawImage = function() {
    //TODO to handle imgWidth > offsetWidth
    var sWdth = this.canvas.offsetWidth;
    var sHeight = this.canvas.offsetHeight;
    
    //to draw
    this.img.onload = function() {
        this.ctx.drawImage(this.img, 0, 0, sWdth, sHeight);
    }.bind(this)
}

CropImg.prototype.cutImg = function() {
    var conver = this.canvas.getContext('2d');
    conver.fillStyle = "rgba(0, 0, 0, 0.5)";
    conver.fillRect(0, 0, 100, 100);
    conver.clearRect(10, 10, 150, 150);
}

var crop = new CropImg();