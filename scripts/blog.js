//create functionality
let createDialog = document.getElementById("createDialog");
let editDialog = document.getElementById("editDialog");
let deleteDialog = document.getElementById("deleteDialog");


let blogArray = [];

let inputTitle = "";
let inputDate = "";
let inputSummary = "";

document.getElementById("createTitle").addEventListener("input", (e) => {
    inputTitle = e.target.value;
});
document.getElementById("createDate").addEventListener("input", (e) => {
    inputDate = e.target.value;
});
document.getElementById("createSummary").addEventListener("input", (e) => {
    inputSummary = e.target.value;
});

let currEdit = null;

function updatePostings () {
    let currPosts = Array.from(document.getElementsByClassName("blogPost"));
    currPosts.forEach( (post) => {
        post.remove();
    });
    for (let i = 0; i < blogArray.length; i++) {
        let blogEntry = blogArray[i];
        let template = document.getElementById("blogTemplate");
        const clone = template.content.cloneNode(true);
        let title = clone.querySelector('h2');
        let body = clone.querySelectorAll('p');
        title.innerText = blogEntry["title"];
        body[0].innerText = blogEntry["date"];
        body[1].innerText = blogEntry["summary"];
        let editButton = clone.querySelector(".edit");
        editButton.addEventListener("click", editClicked);
        editButton.num = i;
        let deletButton = clone.querySelector(".delete");
        deletButton.addEventListener("click", deleteClicked);
        deletButton.num = i;
        document.body.append(clone);
    }
    localStorage.setItem("blogArray", JSON.stringify(blogArray));
}

function clearDialog() {
    const inputs = createDialog.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
    let textArea =  createDialog.querySelector('textArea');
    textArea.value = '';
}

let editTitle = "";
let editDate = "";
let editSummary = "";

document.getElementById("editTitle").addEventListener("input", (e) => {
    editTitle = e.target.value;
});
document.getElementById("editDate").addEventListener("input", (e) => {
    editDate = e.target.value;
});
document.getElementById("editSummary").addEventListener("input", (e) => {
    editSummary = e.target.value;
});


function editClicked(e) {
    let titleInput = document.getElementById('editTitle');
    let dateInput = document.getElementById('editDate');
    let summaryInput = document.getElementById('editSummary');
    let editButton = e.target;
    let currBlog = blogArray[editButton.num]
    titleInput.value = currBlog["title"];
    dateInput.value = currBlog["date"]
    summaryInput.value = currBlog["summary"]
    editDialog.currentButton = editButton;
    editTitle = currBlog["title"];
    editDate = currBlog["date"]
    editSummary= currBlog["summary"]
    editDialog.showModal();
}

function deleteClicked(e) {
    deleteDialog.currentButton = e.target;
    deleteDialog.showModal();
}



createDialog.addEventListener("close", ()=> {
    let res = createDialog.returnValue;
    if(res === "cancel") {
        clearDialog();
    } else {
        blogArray.push({"title" : inputDate, "date" : inputDate, "summary" : inputSummary});
        updatePostings();
        clearDialog();
    }
});

editDialog.addEventListener("close", (e) => {
    let blogEntry = blogArray[e.target.currentButton.num];
    blogEntry["title"] = editTitle;
    blogEntry["date"] = editDate;
    blogEntry["summary"] = editSummary;
    updatePostings();
    clearDialog();
});

deleteDialog.addEventListener("close", (e) => {
    if(deleteDialog.returnValue === "cancel") {
        return
    }
    blogArray.splice([e.target.currentButton.num], 1);
    updatePostings();
    clearDialog();
});


document.getElementById("add").addEventListener("click", () => {
    createDialog.showModal();
});


document.addEventListener("beforeunload", () => {
    localStorage.setItem("blogArray", JSON.stringify(blogArray));
});

window.addEventListener("load", () => {
    let blogArrayString = localStorage.getItem("blogArray");
    blogArray = JSON.parse(blogArrayString);
    updatePostings();
});