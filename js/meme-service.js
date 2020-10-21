'use-strict';

var gImgs = [];
var gMeme = {};

function createMeme(imageId = 1, imgUrl = 'img/1.jpg') {
    var meme = {
        selectedImgId: imageId,
        selectedLineIdx: 0,
        selectedImgUrl: imgUrl,
        lines: [
            {
                txt: 'Line 1',
                size: 40,
                align: 'center',
                color: 'red',
                x: 200,
                y: 50,
            }
        ]
    }
    gMeme = meme;
}

function createGallery() {
    var galleryImages = [
        { id: '1', url: 'img/1.jpg' },
        { id: '2', url: 'img/2.jpg' }
    ]
    gImgs = galleryImages;
}

function setTxtInput(lineTxt) {
    gMeme.lines[0].txt = lineTxt;
}

function setEditImg(imgId) {
    let image = getImgById(imgId);
    console.log('image', image);
    createMeme(image.id, image.url);
    renderMeme();
}

function getImgById(imgId) {
    console.log('imgId', imgId);
    let image = gImgs.find(function (image) {
        console.log('image-getImgByID', image);
        return image.id === imgId
    })
    return image;
}

function increaseLineFont() {
    let currSize = gMeme.lines[0].size;
    if (currSize < 100 ) gMeme.lines[0].size += 5;
}

function decreaseLineFont() {
    let currSize = gMeme.lines[0].size;
    if (currSize > 5) gMeme.lines[0].size -= 5;
}