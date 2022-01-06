import { BookDao } from "../daos/book-dao"
import { BookDaoLocal } from "../daos/book-dao-impl-local";
import { Book } from "../entities";

describe("Book DAO Tests", ()=>{

    const bookDao: BookDao = new BookDaoLocal();
    let testBook: Book = {id:'', title:"Scott Pilgrim", author:"Bryan Lee", returnDate:0, isCheckedout:false}

    it("Should Create a book", async () =>{
        const returnedBook: Book = await bookDao.createBook(testBook);
        expect(returnedBook.id).toBeTruthy()
    })


    it("Should get all Books", async ()=>{
        const book1: Book = {id:'', title:"Enders Game", author:"Orson Scott Clark", returnDate:0, isCheckedout: false}
        const book2: Book = {id:'', title:"Hunting Lareaux", author:"Lorrain Shannon", returnDate:0, isCheckedout: false}
        const book3: Book = {id:'', title:"Frankenstein", author:"Mary Shelley", returnDate:0, isCheckedout: false}
        await bookDao.createBook(book1);
        await bookDao.createBook(book2);
        await bookDao.createBook(book3);

        const books:Book[] = await bookDao.getAllBooks();
        expect(books.length).toBeGreaterThanOrEqual(4);
    })

})