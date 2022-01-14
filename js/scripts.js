    class Book {
        constructor(title, author, pages, read){
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }
        info(){
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`           
        }        
        toggleRead(){
            this.read = !this.read;
        }
    }    

    class Library{
        constructor(){
            this.books = [];
        }
        addBook(book){
            if(book instanceof Book){
                this.books.push(book);
            }
        }
        removeBook(index){
            this.books.splice(index, 1);
        }
    }

    (()=>{
        let myLibrary = new Library();
    /**for storing custom attributes */
        const dataAttributes = {
            bookIndex: 'data-index',
        };
        /** wrapper for book cards */
        const wrapper = document.querySelector('.wrapper');
        /** button that adds new cards, toggles form show/hide */
        const btnNewBook = document.querySelector('button.add');
        const btnSubmit = document.getElementById('btn-submit');
        const form = document.querySelector('form');

        /**sample data */
        myLibrary.addBook(new Book('Harry Potter 1', 'JK Rowling', 200, true));
        myLibrary.addBook(new Book('SomeTitle', 'Some Author', 300, false));
        myLibrary.addBook(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));

        render();
        function render(){
            clearDisplay();
            for (let i = 0; i < myLibrary.books.length; i++){
                renderBook(myLibrary.books[i], i);
            }
        }

        function clearDisplay(){
            while (wrapper.hasChildNodes()){
                wrapper.removeChild(wrapper.firstChild);
            }
        }
       
        btnNewBook.addEventListener('click', () => {
            form.style.display = form.style.display === 'none' ? 'grid' : 'none';
        });
    
        btnSubmit.addEventListener('click', createAndAddBookToLibrary);
    
        function createAndAddBookToLibrary(){
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const pages = document.getElementById('pages').value;
            const read = document.getElementById('read').checked;
            myLibrary.addBook(new Book(title, author, pages, read));
            render();
        }
        
        function renderBook(book, bookIndex){
    
            const card = document.createElement('div')
            card.classList.add('card');
            
            /** array to hold all the elements that will be added all at once in the end */
            const elements = [];

            const title = document.createElement('h4');
            title.textContent = book.title;
            title.classList.add('card','title');
            elements.push(title);
    
            const author = document.createElement('h5');
            author.textContent = book.author;
            author.classList.add('card', 'author');
            elements.push(author);
    
            const pages = document.createElement('p');
            pages.textContent = `Pages: ${book.pages}`;
            pages.classList.add('card','pages');
            elements.push(pages);
    
            const read = document.createElement('span');
            read.textContent = `Read`;
            read.style.marginRight = '8px';
            read.classList.add('card', 'read');
            elements.push(read);
    
            const btnTglRead = document.createElement('input');
            btnTglRead.setAttribute('type', 'checkbox');
            book.read ? btnTglRead.setAttribute('checked', book.read) : null;
            btnTglRead.addEventListener('click', () => book.toggleRead());
            elements.push(btnTglRead);
    
            const btnRemove = document.createElement('button');
            btnRemove.textContent = 'Delete Book';
            btnRemove.classList.add('card', 'btn', 'secondary');
            btnRemove.setAttribute(dataAttributes.bookIndex, bookIndex);
            btnRemove.addEventListener('click', ()=>{
                myLibrary.removeBook();
                render();
            });
            elements.push(btnRemove);
            
            // add elements to card
            for (let element of elements){
                card.appendChild(element);
            }
            // add card to wrapper
            wrapper.appendChild(card);
        }
    })();

    