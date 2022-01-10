import { BookDao } from "../daos/book-dao";
import { Book } from "../entities"
import { BookService } from "../services/book-service"
import { BookServiceImpl } from "../services/book-service-impl";

describe("Book Service Tests",  ()=>{

    class BookDaoStub implements BookDao{

        createBook(book: Book): Promise<Book> {
            throw new Error("Method not implemented.");
        }
        
        async getAllBooks(): Promise<Book[]> {
            return [{
                "id": "101",
                "title": "Scott Pilgrim",
                "author": "Bryan Lee",
                "returnDate": 0,
                "isCheckedout": false
            },
            {
                "id": "202",
                "title": "Enders Game",
                "author": "Orson Scott Clark",
                "returnDate": 0,
                "isCheckedout": false
            },
            {
                "id": "303",
                "title": "Hunting Lareaux",
                "author": "Lorrain Shannon",
                "returnDate": 0,
                "isCheckedout": false
            },
            {   id:"404",
                title:"Harry Potter and the Chamber of Secrets", 
                author:"J.K. Rowling", 
                returnDate:0, 
                isCheckedout:false
            }]
        }

        async getBookById(id: string): Promise<Book> {
            const books:Book[] = await this.getAllBooks();
            return books.find(b => b.id === id)
        }
        
    }

    const bookDaoStub = new BookDaoStub()
    const bookService:BookService = new BookServiceImpl(bookDaoStub);


    it("Should return a book due 2 weeks from now", async ()=>{
        const checkedOutBook:Book = await bookService.checkoutBook("101","does not matter") 
        const currentTime = Date.now() / 1000;// returns unix epoch time. seconds from midnight january 1970
        expect(checkedOutBook.returnDate).toBeLessThanOrEqual(currentTime + 1_209_600)
        expect(checkedOutBook.returnDate).not.toBe(0);

    })

    it("Should throw an error if the member has overdue books", ()=>{
        fail()
    })

    it("Should throw an error if it is the last copy of that book", ()=>{
        fail()
    })

    it("should throw an error if a member has more than three books", ()=>{
        fail()
    })

})