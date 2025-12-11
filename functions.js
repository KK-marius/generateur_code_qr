let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let popup = document.getElementById("popup");
let container = document.getElementById("container");

function generateurCodeQR(){
    if(qrText.value.length > 0){
        const url= "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;
                
        qrImage.crossOrigin = "anonymous";
        qrImage.src = url;

        qrImage.onload = function() {
            imgBox.classList.add("show-img");
            document.getElementById("downloadBtn").style.display = "block";

            // Dessiner dans le canvas
            let canvas = document.getElementById("qrCanvas");
            let ctx = canvas.getContext("2d");

            canvas.width = qrImage.width;
            canvas.height = qrImage.height;

            ctx.drawImage(qrImage, 0, 0);
        };

    }else{
        qrText.classList.add('error')
        setTimeout(()=>{
            qrText.classList.remove('error')
        },1000)
    }
 }

 function telechargerQRCode(){
    let canvas = document.getElementById("qrCanvas");

    const lien = document.createElement("a");
    lien.download = "qr-code.png";  // Nom du fichier à télécharger
    lien.href = canvas.toDataURL("image/png");

    lien.click();
}

function telechargerQRCodeAndOpenPopup(){
    telechargerQRCode();
    popup.classList.add("open-popup");
    container.style.visibility = "hidden";
}

function closePopup(){
    popup.classList.remove("open-popup");
    container.style.visibility = "visible";
}
