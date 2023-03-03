//alert dialog
document.getElementById("alert").addEventListener("click", () => {
    document.getElementById("alertDialog").showModal();
});

document.getElementById("alertButton").addEventListener("click", () => {
    document.getElementById("alertDialog").close()
});

//confirm dialog
let confirmDialog = document.getElementById("confirmDialog");

confirmDialog.addEventListener("close", ()=> {
    let res = confirmDialog.returnValue;
    document.getElementsByTagName("output")[0].innerText = `Confirm Result: ${res}`;
});

document.getElementById("confirm").addEventListener("click", () => {
    confirmDialog.showModal()
});

//prompt button
let promptDialog = document.getElementById("promptDialog")

let promptText = "";

document.getElementById("promptInput").addEventListener("input", (e) => {
    promptText = e.target.value;
});

promptDialog.addEventListener("close", ()=> {
    let res = promptDialog.returnValue;

    function clean (strings, res) {
        if(res === "cancel") {
            return 'Prompt canceled';
        } else {
            let safe = DOMPurify.sanitize(promptText);
            return `${strings[0]}${safe}`;
    
        }
    }

    document.getElementsByTagName("output")[0].innerHTML = clean`Prompt Result: ${res}`;
});

document.getElementById("prompt").addEventListener("click", () => {
    promptDialog.showModal();
});
