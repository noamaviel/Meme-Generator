'use-strict'

var gCanvas;
var gCtx;
const mediaQuery = window.matchMedia('(max-width: 980px)');
const mediaQueryNarrow = window.matchMedia('(max-width: 630px)');

function onInit() {

    createMeme();
    renderEditor();
    createGallery();
    renderGallery();
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    document.querySelector('.editor-container').style.display = 'none';

    mediaQuery.addEventListener("change", () => {
        this.onWindowWidthChange();
    });
    onWindowWidthChange();

    mediaQueryNarrow.addEventListener("change", () => {
        this.onNarrowWidthChange();
    });
    onNarrowWidthChange();
}

function renderEditor() {
    var strHTML = '';
    strHTML = `  <div class="canvas-box">
    <canvas id="canvas" height="400" width="400"></canvas>
    </div>
    `
    strHTML += `
    <div class="control-boxes">
        <input class="text-input" type="text" name="line" id="" value="" placeholder="Enter Meme Text" oninput="onTxtInput(this.value)">
        <input onchange="onColorPick()" class="paint-input" type="color" id="create-color" value="" style="display: block">
            <button class="btn paint-img" onclick="onPaintClick()"><img src="icons/paint-board-and-brush.png" alt=""></button>
            <select onchange="onFontChange()" class="font-dropdown" id="fonts" name="fonts">
            <option value="Impact">Impact</option>
            <option value="Arial Black">Arial</option>
            <option value="Comic Sans MS">Comic Sans</option>
          </select>
          <button class="btn delete" onclick="onDeleteLine()"><img src="icons/trash.png" alt=""></button>
          <button class="btn align-left" onclick="onTxtAlign('right')"><img src="icons/align-to-left.png" alt=""></button>
          <button class="btn align-center" onclick="onTxtAlign('center')"><img src="icons/center-text-alignment.png" alt=""></button>
          <button class="btn align-right" onclick="onTxtAlign('left')"><img src="icons/align-to-right.png" alt=""></button>
            <button class="btn increase" onclick="onIncreaseFont()"><img src="icons/increase font - icon.png" alt=""></button>
        <button class="btn decrease" onclick="onDecreaseFont()"><img src="icons/decrease font - icon.png" alt=""></button>
        <button class="btn up" onclick="onArrowUp()"><img src="icons/arrow-up.svg" alt=""></button>
        <button class="btn down" onclick="onArrowDown()"><img src="icons/arrow-down.svg" alt=""></button>
        <button class="btn add" onclick="onAddLine()"><img src="icons/add.png" alt=""></button>
        <button class="btn switch-line" onclick="onSwitchLine()"><img src="icons/up-and-down-opposite-double-arrows-side-by-side.png" alt=""></button> 
        <button class="btn rotate-focus" onclick="onRotateFocus()"><img src="icons/rotate-arrow.svg" alt=""></button>
        <a href="#" class="download-img" onclick="downloadImg()" download="">Download</a>
        </div>
    `
    document.querySelector('.editor-container').innerHTML = strHTML;
}

function renderMeme(drawFocus = true) {
    var img = new Image()
    img.src = gMeme.selectedImgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        gMeme.lines.forEach((line, index) => drawText(line, index, drawFocus));
    }
}

function renderGallery() {
    var strHTML = '';
    strHTML += gImgs.map(function (image) {
        return `
        <img src="${image.url}" alt="" onclick="onImgClick('${image.id}')">
        `
    }).join('');
    document.querySelector('.img-gallery-container').innerHTML = strHTML;
}

function drawText(line, idx, drawFocus) {
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.lineWidth = '2';
    gCtx.font = line.size + 'px ' + line.font;
    gCtx.textAlign = line.align;
    gCtx.setLineDash([0]);
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeText(line.txt, line.x, line.y);
    if (drawFocus) {
        if (idx === gMeme.selectedLineIdx) {
            let textWidth = gCtx.measureText(line.txt).width;
            let align = gMeme.lines[idx].align;
            let xOffset = 0;  //align === left
            if (align === 'center') xOffset = (textWidth / 2);
            if (align === 'right') xOffset = textWidth;
            gCtx.setLineDash([6]);
            gCtx.strokeRect(line.x - xOffset, line.y - line.size, textWidth, line.size);
        }
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
    document.querySelector('.paint-input').value = '#ffffff';
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
    document.querySelector('.font-dropdown').value = 'Impact';
    renderMeme();
}

function onRotateFocus() {
    rotateFocus();
    document.querySelector('.text-input').value = gMeme.lines[gMeme.selectedLineIdx].txt;
    document.querySelector('.paint-input').value = gMeme.lines[gMeme.selectedLineIdx].color;
    document.querySelector('.font-dropdown').value = gMeme.lines[gMeme.selectedLineIdx].font;
    renderMeme();
}

function onSwitchLine() {
    switchLines();
    renderMeme();
}

function onPaintClick() {
    document.querySelector('.paint-input').click();
}

function onColorPick() {
    let color = document.querySelector('.paint-input').value;
    setTxtColor(color);
    renderMeme();
}

function onFontChange() {
    let font = document.querySelector('.font-dropdown').value;
    setFont(font);
    renderMeme();
}

function onTxtAlign(align) {
    setTxtAlignment(align);
    renderMeme();
}

function onDeleteLine() {
    deleteLine();
    onRotateFocus();
}

function downloadImg() {
    renderMeme(false);

    var imgContent = gCanvas.toDataURL('image/jpeg');
    document.querySelector('.download-img').download = 'my-meme.jpg'
    document.querySelector('.download-img').href = imgContent;
}

function onWindowWidthChange() {
    if (mediaQuery.matches) {
        gCanvas.height = 300;
        gCanvas.width = 300;
    } else {
        gCanvas.height = 400;
        gCanvas.width = 400;
    }
    renderMeme();
}

function onNarrowWidthChange() {
    if (mediaQueryNarrow.matches) {
        document.querySelector('.main-nav').style.transform = 'translateY(-300%)';
        document.querySelector('.open').style.display = 'inline-block';
    } else {
        document.querySelector('.main-nav').style.transform = 'translateY(0%)';
        document.querySelector('.open').style.display = 'none';
        document.querySelector('.close').style.display = 'none';
    }
}

function onOpenMenu() {
    document.querySelector('.open').style.display = 'none';
    document.querySelector('.close').style.display = 'inline-block';
    document.querySelector('.main-nav').style.transform = 'translateY(82%)';
    document.getElementById('nav').classList.toggle('nav-narrow');
}

function onCloseMenu() {
    document.querySelector('.open').style.display = 'inline-block';
    document.querySelector('.close').style.display = 'none';
    document.querySelector('.main-nav').style.transform = 'translateY(-300%)';
    document.getElementById('nav').classList.toggle('nav-narrow');
}