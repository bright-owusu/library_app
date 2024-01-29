const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
};

// add the info about a book to the prototype to save memory
Book.prototype.info = function() {
  let bookRead = "not read yet";
  if (this.read) {
    bookRead = "finished reading";
  };
  return `${this.title} by ${this.author}, ${this.pages} pages, ${bookRead}`;
};

// ADD A BOOK TO THE LIBRARY
function addBookToLibrary(title, author, pages, read = false) {
  // create a new book
  let book = new Book(title, author, pages, read);
  // add new book to the library
  myLibrary.push(book);
}

// UPDATE A BOOK IN THE LIBRARY
function updateBookInLibrary(title, author, pages, read, index, library) {
  // create a new book
  let book = new Book(title, author, pages, read);
  // add new book to the library
  library[index] = book;
}


// DISPLAY MODAL
// add book modal
const addBookBtn = document.querySelector("#add-book-btn");
const addBookModal = document.querySelector("#add-book-modal");
const submitBookBtn = document.querySelector("#submit-book");
const closeModalBtn = document.querySelector("#close-modal");
// update book modal
// const updateBookBtn = document.querySelector("#update-book-btn");
const updateBookModal = document.querySelector("#update-book-modal");
const updateBookBtn = document.querySelector("#update-book");
const closeUpdateModalBtn = document.querySelector("#close-update-modal");
closeUpdateModalBtn.addEventListener("click", () => {
  updateBookModal.close();
})
// display modal
addBookBtn.addEventListener("click", () => {
  addBookModal.showModal();
});
// close modal
closeModalBtn.addEventListener("click", () => {
  addBookModal.close();
});

// display "No books found" if myLibrary is empty
const noBooksCard = document.querySelector("#no-books");
const booksDisplay = document.querySelector("#books-display");

// DELETE BOOK FUNCTION
function deleteBook(index) {
  // Remove the book from the library array
  myLibrary.splice(index, 1);
  // Clear previous content
  booksDisplay.textContent = "";
  // Display the updated books in the library
  displayBooks(myLibrary);
}

// TOGGLE READ FUNCTION
function toggleRead(index, library) {
  let book = library[index];
  if (book.read) {
    // set read to false if book is read already
    book.read = false;
  } else {
    // set read to true if book is not read
    book.read = true;
  }
  // Clear previous content
  booksDisplay.textContent = "";
  // Display the updated books in the library
  displayBooks(library);
}

// stores the index of books to be edited
let indexToUpdate;

// EDIT BOOK FUNCTION
function editBook(index, library) {
  indexToUpdate = index;
  let book = library[index];
  // populate form with book information
  let titleInput = document.querySelector("#update-title");
  let authorInput = document.querySelector("#update-author");
  let pagesInput = document.querySelector("#update-pages");
  let readInput = document.querySelector("#update-read");
  titleInput.value = book.title;
  authorInput.value = book.author;
  pagesInput.value = book.pages;
  readInput.checked = book.read;
}


// DISPLAY ALL THE BOOKS IN THE LIBRARY
function displayBooks(library) {
  if (library.length == 0) {
    noBooksCard.style.display = "flex";
  } else {
    noBooksCard.style.display = "none";
    // list all books
    for (let i = 0; i < library.length; i++) {
      let book = library[i];
      // CREATE BOOK CARD
      // book card
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      // card band
      const band = document.createElement("div");
      band.classList.add("band");
      // card content
      const content = document.createElement("div");
      content.classList.add("content");
      // title
      const title = document.createElement("div");
      title.classList.add("title");
      const bookTitleSpan = document.createElement("span");
      bookTitleSpan.textContent = book.title;
      // author
      const author = document.createElement("div");
      author.classList.add("author");
      const bookAuthorSpan = document.createElement("span");
      bookAuthorSpan.textContent = `By: ${book.author}`;
      // pages
      const pages = document.createElement("div");
      pages.classList.add("pages");
      bookPagesSpan = document.createElement("span");
      bookPagesSpan.textContent = `${book.pages} pages`;

      // CREATE BUTTON SVGs
      // SVG delete book <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      const svgDelete = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // Set attributes such as xmlns and viewBox
      svgDelete.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgDelete.setAttribute('viewBox', '0 0 24 24');
      svgDelete.setAttribute('height', '1.5rem');
      svgDelete.setAttribute('width', '1.5rem');
      // Create the path element
      const deletePathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      deletePathElement.setAttribute('d', 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z');
      // Append the path element to the SVG container
      svgDelete.appendChild(deletePathElement);
      // SVG edit <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      const svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // Set attributes such as xmlns and viewBox
      svgEdit.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgEdit.setAttribute('viewBox', '0 0 24 24');
      svgEdit.setAttribute('height', '1.5rem');
      svgEdit.setAttribute('width', '1.5rem');
      // Create the title element
      const editTitleElement = document.createElementNS("http://www.w3.org/2000/svg", "title");
      editTitleElement.textContent = 'Edit';
      // Create the path element
      const EditPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      EditPathElement.setAttribute('d', 'M21.04 13.13C21.18 13.13 21.31 13.19 21.42 13.3L22.7 14.58C22.92 14.79 22.92 15.14 22.7 15.35L21.7 16.35L19.65 14.3L20.65 13.3C20.76 13.19 20.9 13.13 21.04 13.13M19.07 14.88L21.12 16.93L15.06 23H13V20.94L19.07 14.88M3 7V5H5V4C5 2.89 5.9 2 7 2H13V9L15.5 7.5L18 9V2H19C20.05 2 21 2.95 21 4V10L11 20V22H7C5.95 22 5 21.05 5 20V19H3V17H5V13H3V11H5V7H3');
      // Append the path element to the SVG container
      svgEdit.appendChild(editTitleElement);
      svgEdit.appendChild(EditPathElement);
      // SVG read <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      // Create a new SVG element
      const svgRead = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // Set attributes such as xmlns and viewBox
      svgRead.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgRead.setAttribute('viewBox', '0 0 24 24');
      svgRead.setAttribute('height', '1.5rem');
      svgRead.setAttribute('width', '1.5rem');
      // Create the title element
      const readTitleElement = document.createElementNS("http://www.w3.org/2000/svg", "title");
      readTitleElement.textContent = 'Read';
      // Create the path element
      const readPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      readPathElement.setAttribute('d', 'M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M3 7V5H5V4C5 2.89 5.9 2 7 2H13V9L15.5 7.5L18 9V2H19C20.05 2 21 2.95 21 4V13.8C20.12 13.29 19.09 13 18 13C14.69 13 12 15.69 12 19C12 20.09 12.29 21.12 12.8 22H7C5.95 22 5 21.05 5 20V19H3V17H5V13H3V11H5V7H3');
      // Append the path element to the SVG container
      svgRead.appendChild(readTitleElement);
      svgRead.appendChild(readPathElement);
      // SVG unread <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      // Create a new SVG element
      const svgUnread = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // Set attributes such as xmlns and viewBox
      svgUnread.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgUnread.setAttribute('viewBox', '0 0 24 24');
      svgUnread.setAttribute('height', '1.5rem');
      svgUnread.setAttribute('width', '1.5rem');
      // Create the title element
      const unreadTitleElement = document.createElementNS("http://www.w3.org/2000/svg", "title");
      unreadTitleElement.textContent = 'Not Read';
      // Create the path element
      const UnreadPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      UnreadPathElement.setAttribute('d', 'M3 7V5H5V4C5 2.9 5.9 2 7 2H13V9L15.5 7.5L18 9V2H19C20 2 21 3 21 4V13.8C20.1 13.3 19.1 13 18 13C14.7 13 12 15.7 12 19C12 20.1 12.3 21.1 12.8 22H7C5.9 22 5 21 5 20V19H3V17H5V13H3V11H5V7H3M5 5V7H7V5H5M5 19H7V17H5V19M5 13H7V11H5V13M14 18V20H22V18H14Z');
      // Append the title and path elements to the SVG container
      svgUnread.appendChild(unreadTitleElement);
      svgUnread.appendChild(UnreadPathElement);

      // CREATE CARD BUTTONS
      const cardBtns = document.createElement("div");
      cardBtns.classList.add("card-btns");

      // edit card button
      const editCardBtn = document.createElement("a");
      editCardBtn.classList.add("btn", "btn-edit");
      editCardBtn.href = "#";
      editCardBtn.appendChild(svgEdit);
      cardBtns.appendChild(editCardBtn);
      // add event listener to edit card button
      editCardBtn.addEventListener("click", () => {
        editBook(i, library);
        updateBookModal.showModal();
      });

      // read toggle button
      const toggleReadBtn = document.createElement("a");
      toggleReadBtn.classList.add("btn", "btn-read");
      toggleReadBtn.href = "#";
      cardBtns.appendChild(toggleReadBtn);
      // add event listener to toggle read button
      toggleReadBtn.addEventListener("click", () => {
        toggleRead(i, library);
      });

      // delete card button
      const deleteCardBtn = document.createElement("a");
      deleteCardBtn.classList.add("btn", "btn-delete");
      deleteCardBtn.href = "#";
      deleteCardBtn.appendChild(svgDelete);
      // Add event listener to the delete button
      deleteCardBtn.addEventListener("click", () => {
        // Call the deleteBook function with the index
        deleteBook(i);
      });
      cardBtns.appendChild(deleteCardBtn);

      // APPEND ELEMENTS TO THEIR RESPECTIVE PARENT ELEMENTS
      title.appendChild(bookTitleSpan);
      author.appendChild(bookAuthorSpan);
      pages.appendChild(bookPagesSpan);
      content.appendChild(title);
      content.appendChild(author);
      content.appendChild(pages);
      content.appendChild(cardBtns);
      bookCard.appendChild(band);
      bookCard.appendChild(content);
      booksDisplay.appendChild(bookCard);

      // TOGGLE READ FUNCTION
      if (book.read) {
        if (bookCard.classList.contains("unread")) {
          bookCard.classList.remove("unread");
        }
        bookCard.classList.add("read");
        if (toggleReadBtn.classList.contains("unread")) {
          toggleReadBtn.classList.remove("unread");
        }
        toggleReadBtn.classList.add("read");
        toggleReadBtn.appendChild(svgRead);
      } else {
        if (bookCard.classList.contains("read")) {
          bookCard.classList.remove("read");
        }
        bookCard.classList.add("unread");
        if (toggleReadBtn.classList.contains("read")) {
          toggleReadBtn.classList.remove("read");
        }
        toggleReadBtn.classList.add("unread");
        toggleReadBtn.appendChild(svgUnread);
      }
    }
  }
}


// SUBMIT BOOK
submitBookBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent form submission
  // form elements
  let titleInput = document.querySelector("#title");
  let authorInput = document.querySelector("#author");
  let pagesInput = document.querySelector("#pages");
  let readInput = document.querySelector("#read");
  // form data
  let titleData = titleInput.value;
  let authorData = authorInput.value;
  let pagesData = pagesInput.value;
  let readData = readInput.checked;
  // add book to library
  addBookToLibrary(titleData, authorData, pagesData, readData);
  // clear form data
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
  // close the dialog
  addBookModal.close();
  // clear previous content
  booksDisplay.textContent = "";
  // display the books in the library
  displayBooks(myLibrary);
})


// UPDATE BOOK
updateBookBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent form submission
  // check if indexToUpdate is defined
  if (indexToUpdate !== undefined) {
    // form elements
    let titleInput = document.querySelector("#update-title");
    let authorInput = document.querySelector("#update-author");
    let pagesInput = document.querySelector("#update-pages");
    let readInput = document.querySelector("#update-read");
    // form data
    let titleData = titleInput.value;
    let authorData = authorInput.value;
    let pagesData = pagesInput.value;
    let readData = readInput.checked;
    // replace previous data with new data, maintaining the index
    updateBookInLibrary(titleData, authorData, pagesData, readData, indexToUpdate, myLibrary);
    // clear form data
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
    // close the dialog
    updateBookModal.close();
    // clear previous content
    booksDisplay.textContent = "";
    // display the books in the library
    displayBooks(myLibrary);
    // reset indexToUpdate after updating
    indexToUpdate = undefined;
  }
})