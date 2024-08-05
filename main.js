        document.addEventListener('DOMContentLoaded', () => {
            const STORAGE_KEY = 'BOOKSHELF_APPS';
            let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            
            const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
            const completeBookshelfList = document.getElementById('completeBookshelfList');
            const inputBookForm = document.getElementById('inputBook');
            const searchBookForm = document.getElementById('searchBook');
        
            const updateLocalStorage = () => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
            };
        
            const generateId = () => +new Date();
        
            const renderBooks = (filter = '') => {
                incompleteBookshelfList.innerHTML = '';
                completeBookshelfList.innerHTML = '';
        
                books
                    .filter(book => book.title.toLowerCase().includes(filter.toLowerCase()))
                    .forEach(book => {
                        const bookElement = document.createElement('article');
                        bookElement.classList.add('book_item');
                        bookElement.innerHTML = `
                            <h3>${book.title}</h3>
                            <p>Penulis: ${book.author}</p>
                            <p>Tahun: ${book.year}</p>
                            <div class="action">
                                <button class="green">${book.isComplete ? 'Belum selesai di Baca' : 'Selesai dibaca'}</button>
                                <button class="red">Hapus buku</button>
                            </div>
                        `;
        
                        const actionButtons = bookElement.querySelectorAll('.action button');
                        actionButtons[0].addEventListener('click', () => {
                            book.isComplete = !book.isComplete;
                            updateLocalStorage();
                            renderBooks(filter);
                        });
        
                        actionButtons[1].addEventListener('click', () => {
                            if (confirm(`Apakah Anda yakin ingin menghapus buku "${book.title}"?`)) {
                                books = books.filter(b => b.id !== book.id);
                                updateLocalStorage();
                                renderBooks(filter);
                            }
                        });
        
                        if (book.isComplete) {
                            completeBookshelfList.append(bookElement);
                        } else {
                            incompleteBookshelfList.append(bookElement);
                        }
                    });
            };
        
            inputBookForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const title = document.getElementById('inputBookTitle').value;
                const author = document.getElementById('inputBookAuthor').value;
                const year = parseInt(document.getElementById('inputBookYear').value);
                const isComplete = document.getElementById('inputBookIsComplete').checked;
        
                const newBook = {
                    id: generateId(),
                    title,
                    author,
                    year,
                    isComplete
                };
        
                books.push(newBook);
                updateLocalStorage();
                renderBooks();
                inputBookForm.reset();
            });
        
            searchBookForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const searchTitle = document.getElementById('searchBookTitle').value;
                renderBooks(searchTitle);
            });
        
            renderBooks();
        });
        