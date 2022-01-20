/* eslint-disable no-underscore-dangle */
const Book = (title, author, pages, read) => {
  const info = () =>
    `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`;
  const toggleRead = () => {
    this.read = !this.read;
  };
  return { title, author, pages, read, info, toggleRead };
};

const Library = () => {
  const library = [];
  const DATA_ATTRIBUTES = {
    bookIndex: 'data-index',
  };
  const CSS = {
    container: 'library-container',
    title: 'card-title',
    author: 'card-author',
    pages: 'card-pages',
    read: 'card-read',
    btn: 'card-button',
    ckbox: 'card-checkbox',
  };
  const container = document.createElement('div');
  container.classList.add(CSS.container);

  // FUNCTION
  function addBookToLibrary(book) {
    library.push(book);
    renderBook(library[library.length - 1], library.length - 1);
  }

  function createAndAddBookToLibrary(title, author, page, read) {
    addBookToLibrary(Book(title, author, page, read));
  }

  function renderBook(book, bookIndex) {
    // CREATE DOM ELEMENTS
    const card = document.createElement('div');
    const title = document.createElement('h4');
    const author = document.createElement('h5');
    const pages = document.createElement('p');
    const read = document.createElement('span');
    const btnTglRead = document.createElement('input');
    const btnRemove = document.createElement('button');

    // ADD CLASSES
    card.classList.add('card');
    title.classList.add(CSS.title);
    author.classList.add(CSS.author);
    pages.classList.add(CSS.pages);
    read.classList.add(CSS.read);
    btnTglRead.classList.add(CSS.ckbox);
    btnRemove.classList.add(CSS.btn);

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `Pages: ${book.pages}`;
    read.textContent = 'Read';
    btnRemove.textContent = 'Remove Book';
    read.style.marginRight = '8px';

    btnTglRead.setAttribute('type', 'checkbox');
    if (book.read) {
      btnTglRead.setAttribute('checked', book.read);
    }
    btnRemove.setAttribute(DATA_ATTRIBUTES.bookIndex, bookIndex);
    btnTglRead.addEventListener('click', () => book.toggleRead());
    btnRemove.addEventListener('click', (e) => {
      removeBook(e);
      container.removeChild(card);
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(btnTglRead);
    card.appendChild(btnRemove);
    container.appendChild(card);
  }

  function clearContainer() {
    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }
  }

  function render() {
    clearContainer();
    for (let i = 0; i < library.length; i += 1) {
      renderBook(library[i], i);
    }
  }

  function removeBook(e) {
    library.splice(e.target.getAttribute(DATA_ATTRIBUTES.bookIndex), 1);
  }

  return { container, createAndAddBookToLibrary, render };
};

(() => {
  // SELECT DOM ELEMENTS
  const wrapper = document.querySelector('.wrapper');
  const btnNewBook = document.querySelector('button.add');
  const btnSubmit = document.getElementById('btn-submit');
  const form = document.querySelector('form');
  const library = Library();

  // SAMPLE DATA
  library.createAndAddBookToLibrary('Harry Potter 1', 'JK Rowling', 200, true);
  library.createAndAddBookToLibrary('SomeTitle', 'Some Author', 300, false);
  library.createAndAddBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

  btnNewBook.addEventListener('click', () => {
    form.classList.toggle('visible');
  });

  btnSubmit.addEventListener('click', () => {
    if (form.checkValidity()) {
      const formData = new FormData(form);
      const title = formData.get('title');
      const author = formData.get('author');
      const pages = formData.get('pages');
      const read = formData.get('read') === 'on';
      library.createAndAddBookToLibrary(title, author, pages, read);
      const childNodes = form.querySelectorAll('input');
      childNodes.forEach((e) => {
        e.value = '';
      });
    }
  });

  // FUNCTIONS
  function updateDisplay() {
    library.render();
  }

  wrapper.appendChild(library.container);
  updateDisplay();
})();
