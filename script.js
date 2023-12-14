document.addEventListener("DOMContentLoaded", function () {
    const bookArray = JSON.parse(localStorage.getItem('books')) || [];
    const form = document.querySelector('.addbook');
    const booksContainer = document.querySelector('.book_box');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const bookName = document.getElementById('bookname').value;
      const authorName = document.getElementById('authorname').value;
      const pages = document.getElementById('pages').value;
      const readStatus = document.querySelector('input[name="read"]:checked').value;
  
      const newBook = {
        bookName: bookName,
        authorName: authorName,
        pages: pages,
        readStatus: readStatus
      };
  
      bookArray.push(newBook);
      localStorage.setItem('books', JSON.stringify(bookArray));
      displayBooks();
    });
  
    function displayBooks() {
      booksContainer.innerHTML = '';
  
      bookArray.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
  
        bookElement.innerHTML = `
          <h3>${book.bookName}</h3>
          <h4>${book.authorName}</h4>
          <p>${book.pages} pages</p>
          <button class="${book.readStatus.toLowerCase()}">${book.readStatus}</button>
          <button class="delete">Delete</button>
        `;
  
        booksContainer.appendChild(bookElement);
  
        bookElement.querySelector('.delete').addEventListener('click', function() {
          deleteBook(book.bookName);
        });
      });
    }
  
    function deleteBook(bookName) {
      const index = bookArray.findIndex(book => book.bookName === bookName);
      bookArray.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(bookArray));
      displayBooks();
    }
  
    displayBooks();
  });