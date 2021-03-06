'use-strict';

const MAX_LINE_IDX = 4;
var gImgs = [];
var gMeme = {};

function createMeme(imageId = 1, imgUrl = 'img/1.jpg') {
    var meme = {
        selectedImgId: imageId,
        selectedLineIdx: 0,
        selectedImgUrl: imgUrl,
        lines: [],
    }
    meme.lines.push(createLine());
    gMeme = meme;
}

function createGallery() {
    var galleryImages = [
        { id: '1', url: 'img/1.jpg' },
        { id: '2', url: 'img/2.jpg' },
        { id: '3', url: 'img/3.jpg' },
        { id: '4', url: 'img/4.jpg' },
        { id: '5', url: 'img/5.jpg' },
        { id: '6', url: 'img/6.jpg' },
        { id: '7', url: 'img/7.jpg' },
        { id: '8', url: 'img/8.jpg' },
        { id: '9', url: 'img/9.jpg' },
        { id: '10', url: 'img/10.jpg' },
        { id: '11', url: 'img/11.jpg' },
        { id: '12', url: 'img/12.jpg' },
        { id: '13', url: 'img/13.jpg' },
        { id: '14', url: 'img/14.jpg' },
        { id: '15', url: 'img/15.jpg' },
        { id: '16', url: 'img/16.jpg' },
        { id: '17', url: 'img/17.jpg' },
        { id: '18', url: 'img/18.jpg' },
    ]
    gImgs = galleryImages;
}

function setTxtInput(lineTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = lineTxt;
}

function setEditImg(imgId) {
    let image = getImgById(imgId);
    createMeme(image.id, image.url);
    renderMeme();
}

function getImgById(imgId) {
    let image = gImgs.find(function (image) {
        return image.id === imgId
    })
    return image;
}

function increaseLineFont() {
    let currSize = gMeme.lines[gMeme.selectedLineIdx].size;
    if (currSize < 100) gMeme.lines[gMeme.selectedLineIdx].size += 5;
}

function decreaseLineFont() {
    let currSize = gMeme.lines[gMeme.selectedLineIdx].size;
    if (currSize > 5) gMeme.lines[gMeme.selectedLineIdx].size -= 5;
}

function moveUp() {
    let currY = gMeme.lines[gMeme.selectedLineIdx].y;
    let currSize = gMeme.lines[gMeme.selectedLineIdx].size;
    if (currY > currSize) gMeme.lines[gMeme.selectedLineIdx].y -= 10;
}

function moveDown() {
    let currY = gMeme.lines[gMeme.selectedLineIdx].y;
    if (currY < gCanvas.height) gMeme.lines[gMeme.selectedLineIdx].y += 10;
}

function addLine() {
    if (gMeme.lines.length - 1 >= MAX_LINE_IDX) return;
    if (gMeme.lines.length === 1) {
        gMeme.lines.push(createLine('Enter text', gCanvas.height - 50));
    } else {
        gMeme.lines.push(createLine('Enter text', gCanvas.height / 2));
    }
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function createLine(lineTxt = 'Enter text', lineY = 50) {
    let line = {
        txt: lineTxt,
        font: 'Impact',
        size: 40,
        align: 'center',
        color: '#ffffff',
        stroke: 'black',
        x: 200,
        y: lineY,
        upperLeftX: 0,
        upperLeftY: 0,
        lowerRightX: 0,
        lowerRightY: 0,
    }
    return line;
}

function rotateFocus() {
    let focus = gMeme.selectedLineIdx;
    if (focus >= gMeme.lines.length - 1) {
        focus = 0;
    } else {
        focus++;
    }
    gMeme.selectedLineIdx = focus;
}

function switchLines() {
    if (gMeme.lines.length <= 1) return;
    let tmp = gMeme.lines[0].y;
    gMeme.lines[0].y = gMeme.lines[1].y;
    gMeme.lines[1].y = tmp;
}

function setTxtColor(clr) {
    gMeme.lines[gMeme.selectedLineIdx].color = clr;
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function setTxtAlignment(aln) {
    gMeme.lines[gMeme.selectedLineIdx].align = aln;
}

function deleteLine() {
    if (gMeme.lines.length <= 1) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    rotateFocus();
}