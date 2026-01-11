const table = document.querySelector("#library-body");

const myLibrary = [];

function Book( id, title, author, pages, read ) {
    // Book constructor
    if(!new.target) {
        throw Error("Did not use 'new' keyword!");
    }

    this.id = `id-${id}`;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary( title, author, pages, read ) {
    // take params, create a book then store it in the array
    let myBook = new Book( crypto.randomUUID(), title, author, pages, read );
    myLibrary.push(myBook);
}

function displayBooks() {
    // Clear table
    table.textContent = "";

    // Update table
    for( let i = 0; i < myLibrary.length; ++i ) {
        const tableRow = document.createElement("tr");
        tableRow.setAttribute("id", myLibrary[i]["id"]);
        for(const key in myLibrary[i]) {
            const tableData = document.createElement("td");
            tableData.textContent = myLibrary[i][key];
            tableData.setAttribute("class", key);

            tableRow.appendChild(tableData);

            if(key == 'read') {
                const btnData = document.createElement("td");
                const btn = document.createElement("input");
                btn.setAttribute("type", "checkbox");
                btn.addEventListener('change', (evt) => {
                    const parentRow = btn.parentElement.parentElement;
                    bookRead(parentRow.id, evt.currentTarget.checked);
                });
                btnData.appendChild(btn);
                tableRow.appendChild(btnData);
            }
        }
        table.appendChild(tableRow);
    }
}

function bookRead(id, state) {
    const readTD = document.querySelector(`#${id} .read`);
    readTD.textContent = state;
}

const add = document.querySelector("#add-btn");
const modal = document.querySelector("#add-book");
add.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.showModal();
});

const closeModal = document.querySelector("#close-modal");
closeModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.close();
})

const form = document.querySelector("#book-form");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const formObj = Object.fromEntries(formData.entries());

    addBookToLibrary(formObj.title, formObj.author, formObj.pages, formObj.read == undefined ? false : formObj.read);
    displayBooks();
    form.reset();
    modal.close();
});

// Form Validation
const title = document.querySelector("#title");
title.addEventListener('input', (evt) => {
    if(title.validity.valueMissing) {
        title.setCustomValidity("You must enter a title!");
    } else {
        title.setCustomValidity("");
    }
});

const author = document.querySelector("#author");
author.addEventListener('input', (evt) => {
    if(author.validity.valueMissing) {
        author.setCustomValidity("You must enter an author name!");
    } else {
        title.setCustomValidity("");
    }
});

const pages = document.querySelector("#pages");
pages.addEventListener('input', (evt) => {
    if(pages.validity.valueMissing) {
        pages.setCustomValidity("You must enter the number of pages!");
    } else {
        pages.setCustomValidity("");
    }
})