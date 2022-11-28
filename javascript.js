const myLibrary = [];

const container = document.querySelector('.book-display');
const h1 = document.querySelector('h1');

const newBookButton = document.querySelector('#new-book-button');
newBookButton.addEventListener('click', newBookClick);

const newBookForm = document.querySelector('.new-book-form');

const submitBookButton = document.querySelector('#submit-book-button');
submitBookButton.addEventListener('click', submitFormClick);

const authorInput = document.querySelector('#author-input');
const titleInput = document.querySelector('#title-input');

const HAS_READ_STRING = 'Has Read';
const HAS_NOT_READ_STRING = 'Has Not Read';

window.onclick = (event) => {
  if (event.target.className === 'new-book-form') {
    closeNewBookForm();
  }
}

addBookToLibrary('Game Of Thrones', 'George RR Martin');
addBookToLibrary('Hop on Pop', 'Dr. Suess');
displayMyLibrary();


function Book(title, author, hasRead) {
  this.title = title;
  this.author = author;
  this.hasRead = hasRead;
}

Book.prototype.toggleReadStatus = function() {
  this.hasRead = !this.hasRead;
}

function addBookToLibrary(title, author) {
  let book = new Book(title, author, false);
  myLibrary.push(book);
}

function getBookIndexFromClick(target) {
  let tableElement = target.closest('.book');
  return tableElement.id.slice(-1);
}

function removeBookClick(event) {
  let index = getBookIndexFromClick(event.target);
  
  myLibrary.splice(index, 1);
  displayMyLibrary();
}

function toggleHasReadClick(event) {
  let index = getBookIndexFromClick(event.target);
  let book = myLibrary[index];

  book.toggleReadStatus();

  event.target.value = book.hasRead ? HAS_READ_STRING : HAS_NOT_READ_STRING;
}

function newBookClick(event) {
  newBookForm.style.display = 'block';
}

function closeNewBookForm() {
  titleInput.value = '';
  authorInput.value = '';

  newBookForm.style.display = 'none';
}

function submitFormClick(event) {
  addBookToLibrary(titleInput.value, authorInput.value);
  closeNewBookForm();
  displayMyLibrary();
  
  event.preventDefault();
}

function displayMyLibrary() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];

    let bookContainer = document.createElement('div');
    bookContainer.classList.add('book');
    bookContainer.id = 'book-index-' + i.toString();

    let table = document.createElement('table');

    let titleRow = document.createElement('tr');
    let titleHead = document.createElement('th');
    titleHead.textContent = 'Title';
    let titleData = document.createElement('td');
    titleData.textContent = book.title;

    let authorRow = document.createElement('tr');
    let authorHead = document.createElement('th');
    authorHead.textContent = 'Author';
    let authorData = document.createElement('td');
    authorData.textContent = book.author;

    let removeButton = document.createElement('input');
    removeButton.type = 'button';
    removeButton.value = 'Remove';
    removeButton.addEventListener('click', removeBookClick);

    let hasReadButton = document.createElement('input');
    hasReadButton.type = 'button';
    hasReadButton.value = book.hasRead ? HAS_READ_STRING : HAS_NOT_READ_STRING;
    hasReadButton.addEventListener('click', toggleHasReadClick);

    titleRow.appendChild(titleHead);
    titleRow.appendChild(titleData);
    table.appendChild(titleRow);

    authorRow.appendChild(authorHead);
    authorRow.appendChild(authorData);
    table.appendChild(authorRow);

    bookContainer.appendChild(table);
    bookContainer.appendChild(removeButton);
    bookContainer.appendChild(hasReadButton);
    bookContainer.appendChild(document.createElement('hr'));

    container.appendChild(bookContainer);
  }
}