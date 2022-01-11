        function Book(title, author, pages, read){
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }
        Book.prototype.info = function(){
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`           
        }        
        Book.prototype.toggleRead = function(){
            this.read = !this.read;
        }
        
        let myLibrary = [];
        const dataAttributes = {
            bookIndex: 'data-index',
        };

        const wrapper = document.querySelector('.wrapper');
        const btnNewBook = document.querySelector('button.add');
        const btnSubmit = document.getElementById('btn-submit');
        const form = document.querySelector('form');
        myLibrary.push(new Book('Harry Potter 1', 'JK Rowling', 200, true));
        myLibrary.push(new Book('SomeTitle', 'Some Author', 300, false));
        myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));

        updateDisplay();

        btnNewBook.addEventListener('click', e => {
            form.style.display = form.style.display === 'none' ? 'grid' : 'none';
        });

        btnSubmit.addEventListener('click', e => {
            console.log('submitted');
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const pages = document.getElementById('pages').value;
            const read = document.getElementById('read').checked;
            addBookToLibrary(title, author, pages, read);
        });

        function updateDisplay(){
            clearDisplay();
            for (let i = 0; i < myLibrary.length; i++){
                console.log(myLibrary[i].info())
                displayBook(myLibrary[i], i);
            }
        }

        function clearDisplay(){
            while (wrapper.hasChildNodes()){
                wrapper.removeChild(wrapper.firstChild);
            }
        }

        function removeBook(e){
            myLibrary.splice(e.target.getAttribute(dataAttributes.bookIndex),1);
            updateDisplay();
        }
        
        function displayBook(book, bookIndex){

            const card = document.createElement('div')
            card.classList.add('card');

            const elements = [];
            const title = document.createElement('h4');
            title.textContent = book.title
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
            btnTglRead.addEventListener('click',e => book.toggleRead());
            elements.push(btnTglRead);

            const btnRemove = document.createElement('button');
            btnRemove.textContent = 'Delete Book';
            btnRemove.classList.add('card', 'btn', 'secondary');
            btnRemove.setAttribute(dataAttributes.bookIndex, bookIndex);
            btnRemove.addEventListener('click', removeBook);
            elements.push(btnRemove);
            
            // add elements to card
            for (let element of elements){
                card.appendChild(element);
            }
            // add card to wrapper
            wrapper.appendChild(card);
        }

        function addBookToLibrary(title, author, pages, read){
            myLibrary.push(new Book(title, author, pages, read));
            updateDisplay();
        }

        