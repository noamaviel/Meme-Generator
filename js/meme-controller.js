'use-strict'

const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 400;
var gCanvas;
var gCtx;

function onInit() {
    createMeme();
    renderEditor();
    createGallery();
    renderGallery();
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    document.querySelector('.editor-container').style.diplay = 'none';
    // renderMeme();
}

function renderEditor() {
    var strHTML = '';
    strHTML = `  <div class="canvas-box">
    <canvas id="canvas" height="${CANVAS_HEIGHT}" width="${CANVAS_WIDTH}" style="border: 1px solid black;"></canvas>
    </div>
    `
    strHTML += `
    <div class="control-boxes">
        <input type="text" name="line" id="" value="" placeholder="Enter Meme Text" oninput="onTxtInput(this.value)">
        <button class="btn increase" onclick="onIncreaseFont()"><img src="icons/increase font - icon.png" alt=""></button>
        <button class="btn decrease" onclick="onDecreaseFont()"><img src="icons/decrease font - icon.png" alt=""></button>
        <button class="btn up" onclick="onArrowUp()"><img src="icons/arrow-up.svg" alt=""></button>
        <button class="btn down" onclick="onArrowDown()"><img src="icons/arrow-down.svg" alt=""></button>
        <button class="btn add" onclick="onAddLine()"><img src="icons/add.png" alt=""></button>
        <button class="btn switch-line" onclick="onSwitchLine()"><img src="icons/up-and-down-opposite-double-arrows-side-by-side.png" alt=""></button> 
        <button class="btn rotate-focus" onclick="onRotateFocus()"><img src="icons/rotate-arrow.svg" alt=""></button>
        </div>
    `
    document.querySelector('.editor-container').innerHTML = strHTML;
}

function renderMeme() {
    var img = new Image()
    img.src = gMeme.selectedImgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        gMeme.lines.forEach((line, index) => drawText(line, index));
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

function drawText(line, idx) {
    // let line = gMeme.lines[0];
    // gCtx.strokeStyle = 'red'
    gCtx.fillStyle = line.color;
    gCtx.lineWidth = '2';
    gCtx.font = line.size + 'px' + ' Impact';
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.x, line.y);
    // gCtx.strokeText(text, x, y)
    let textWidth = gCtx.measureText(line.txt).width;
    if (idx === gMeme.selectedLineIdx) {
        gCtx.setLineDash([6]);
        gCtx.strokeRect(line.x - (textWidth / 2), line.y - line.size, textWidth, line.size);
    }
}

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
    setEditImg(imgId);
    document.querySelector('.control-boxes input').value = '';
    document.querySelector('.img-gallery').style.display = 'none';
    document.querySelector('.editor-container').style.display = 'flex';
    renderMeme();
}

function onIncreaseFont() {
    increaseLineFont();
    renderMeme();
}

function onDecreaseFont() {
    decreaseLineFont();
    renderMeme();
}

function onArrowUp() {
    moveUp();
    renderMeme();
}

function onArrowDown() {
    moveDown();
    renderMeme();
}

function onAddLine() {
    addLine();
    document.querySelector('input').value = '';
    renderMeme();
}

function onRotateFocus() {
    rotateFocus();
    document.querySelector('input').value = gMeme.lines[gMeme.selectedLineIdx].txt;
    renderMeme();
}

function onSwitchLine() {
    switchLines();
    renderMeme();
}