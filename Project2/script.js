let form = document.querySelector('#bookForm');
let bookList = document.querySelector('#bookList');

//Book Class
class Book {
    constructor(title, author, isbn) {
        this.title =title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI class
class UI{
    
   static addToBooklist(book){
        let list =document.querySelector('#bookList');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td> ${book.title}</td>
        <td> ${book.author}</td>
        <td> ${book.isbn}</td>
        <td> <a href ='#' class="delete">x</a></td>`;
        list.appendChild(row);

        //console.log(row);

        
    }
    static clearFeilds(){
       document.querySelector("#title").value ='';
       document.querySelector("#author").value ='';
       document.querySelector("#isbn").value ='';

    }
    static showAlert(message,className){
        let div =document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#bookForm')
        container.insertBefore(div,form);

        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);
    }

    static deleteFromBook(target){
        //console.log(target);
        if(target.hasAttribute('href')){
           //console.log(target);
           target.parentElement.parentElement.remove();
           Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
           UI.showAlert('Book Removed!', 'success');
        }
    }
}

//Store in local storage
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else
        {
        books= JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBoook(book){
        let books =Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static displayBooks(){
        let books =Store.getBooks();
        books.forEach(book=>{
            UI.addToBooklist(book);
        });
    }

    static removeBook(isbn){
        let books = Store.getBooks();
        books.forEach((book,index)=>
        {
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Add Event Listener
form.addEventListener('submit',newBook);
bookList.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBooks());


//Define function
function newBook(e) {
    let title = document.querySelector("#title").value,
    author =document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;


    if(title === ''||author===''||isbn===''){
        ui.showAlert("Please fill all the fields!","error");
    }
    else{
        
    let book = new Book(title, author, isbn);

    UI.addToBooklist(book);
    UI.clearFeilds();
    UI.showAlert("Book Added!","success");

    Store.addBoook(book);
        
    }




    e.preventDefault();
}

function removeBook(e) {
    
    //console.log(e.target);
    //if(e.target.class)
    UI.deleteFromBook(e.target);
    e.preventDefault();
}


