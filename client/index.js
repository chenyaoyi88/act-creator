const oFile = document.getElementById('file');
const oPhonePreview = document.getElementById('preview-phone');
const oModalSelect = document.getElementById('model-select');
const oScanModalBox = document.getElementById('scancode-modal-box');
const oBtnScancodePreview = document.getElementById('btn-scancode-preview');
const oBtnRelease = document.getElementById('btn-release');
const oQrCode = document.getElementById('qrcode');

let formData = null;

let activityUrl = 'https://www.guanghuobao.com/ghb-web/driver_signup/index.html';

oModalSelect.onchange = function () {
    console.log(this.value);
};

document.addEventListener('click', function (ev) {
    const oEvent = ev || event;
    const oTarget = oEvent.srcElement || oEvent.target;

    switch (oTarget.id) {
        case 'btn-upload':
            if (!formData) {
                alert('请选择上传文件');
                return;
            };

            $.ajax({
                url: '//localhost:3000/upload',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    console.log(data);
                    formData = null;
                    oFile.value = '';
                },
                error: function () {
                    $("#result").html("与服务器通信发生错误");
                }
            });

            break;
        case 'btn-scancode-preview':
            oScanModalBox.classList.add('show');
            oQrCode.innerHTML = '';
            new QRCode(oQrCode, activityUrl);
            break;
        case 'scancode-modal-bg':
            oTarget.parentNode.classList.remove('show');
            break;
        case 'btn-release':
            break;
        default:
    };

}, false);

oFile.onchange = function (ev) {
    const oEvent = ev || event;
    const oTarget = oEvent.srcElement || oEvent.target;
    const aFiles = oTarget.files;
    let sImages = '';

    formData = new FormData();

    for (let file in aFiles) {
        formData.append('file', aFiles[file]);
    }

    for (let i = 0; i < aFiles.length; i++) {
        const imgSrc = window.URL.createObjectURL(aFiles[i]);
        sImages += `<img class="ac-img" src="${imgSrc}">`;
    };

    oPhonePreview.innerHTML = sImages;
};