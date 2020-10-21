'use-strict'

var gCanvas;
var gCtx;
const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;

function onInit() {
    createMeme();
    renderEditor();
    createGallery();
    renderGallery();
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    // drawImgFromlocal();
    renderMeme();
}

function renderEditor() {
    var strHTML = '';
    strHTML = `
    <canvas id="canvas" height="${CANVAS_HEIGHT}" width="${CANVAS_WIDTH}" style="border: 1px solid black;"></canvas>
    `
    strHTML += `
    <div class="control-boxes">
        <input type="text" name="line" id="" value="" placeholder="Enter Meme Text" oninput="onTxtInput(this.value)">
        <button class="btn increase" onclick="onIncreaseFont()"><img src="icons/increase font - icon.png" alt=""></button>
        <button class="btn decrease" onclick="onDecreaseFont()"><img src="icons/decrease font - icon.png" alt=""></button>
    </div>
    `
    document.querySelector('.canvas-container').innerHTML = strHTML;
}

function renderMeme() {
    var img = new Image()
    img.src = gMeme.selectedImgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        drawText();
    }
}

function renderGallery() {
    // console.log('renderGallery');
    // console.log('gImgs', gImgs);
    var strHTML = '';
    strHTML += gImgs.map(function (image) {
        return `
        <img src="${image.url}" alt="" onclick="onImgClick('${image.id}')">
        `
    }).join('');
    document.querySelector('.img-gallery-container').innerHTML = strHTML;
}

function drawText(text, x, y) {
    let line = gMeme.lines[0];
    // gCtx.strokeStyle = 'red'
    gCtx.fillStyle = line.color;
    gCtx.lineWidth = '2';
    gCtx.font = line.size + 'px' + ' Impact';
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.x, line.y);
    // gCtx.strokeText(text, x, y)
}

// line.size + 'Impact'

function drawImgFromlocal() {
    var img = new Image()
    img.src = gMeme.selectedImgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}

function onTxtInput(lineTxt) {
    setTxtInput(lineTxt);
    renderMeme();
}

function onImgClick(imgId) {
    console.log('imgId', imgId);
    setEditImg(imgId);
    document.querySelector('.control-boxes input').value = '';
}

function onIncreaseFont() {
increaseLineFont();
renderMeme();
}

function onDecreaseFont() {
decreaseLineFont();
renderMeme();
}