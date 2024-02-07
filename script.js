import { HuffmanCoder } from './huffman.js';


onload = function () {
    const encode = document.getElementById('encode');
    const decode = document.getElementById('decode');
    const temptext = document.getElementById('temptext');
    const upload = document.getElementById('uploadedFile');

    const coder = new HuffmanCoder();
    temptext.innerText = "Upload file only with .txt extension";

    upload.addEventListener('change',()=>{ temptext.innerText = "File uploaded" });

    encode.onclick = function () {

        const uploadedFile = upload.files[0];
        if(uploadedFile === undefined){
            temptext.innerText = "No file uploaded !";
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){
            const text = fileLoadedEvent.target.result;
            if(text.length===0){
                temptext.innerText = "Text file is empty! Upload another file !";
                return;
            }
            let [encoded, info] = coder.encode(text);
            downloadFile(uploadedFile.name.split('.')[0] +'_encoded.txt', encoded);
            temptext.innerText = info;
        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };

    decode.onclick = function () {

        const uploadedFile = upload.files[0];
        if(uploadedFile===undefined){
            temptext.innerText = "No file uploaded !";
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){
            const text = fileLoadedEvent.target.result;
            if(text.length===0){
                temptext.innerText = "Text file is empty! Upload another file !";
                return;
            }
            let [decoded, info] = coder.decode(text);
            downloadFile(uploadedFile.name.split('.')[0] +'_decoded.txt', decoded);
            temptext.innerText = info;
        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };

};

function downloadFile(fileName, data){
    let a = document.createElement('a');
    a.href = "data:application/octet-stream,"+encodeURIComponent(data);
    a.download = fileName;
    a.click();
}