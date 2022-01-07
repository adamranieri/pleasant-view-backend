import { BookDao } from "../daos/book-dao";
import { Book } from "../entities";
import { BookService } from "./book-service";

export class BookServiceImpl implements BookService{

    // Dependency Injection
    // Services that depend/rely on funcitonality in a DAO(s)
    // rather than Inheriting the functionality, the depency is built-into/ composition the class
    private bookDao:BookDao;

    constructor(bookDao:BookDao){
        this.bookDao = bookDao;
    }
    retrieveBookById(id: string): Promise<Book> {
        return this.bookDao.getBookById(id);
    }

    retrieveAllBooks(): Promise<Book[]> {
        return this.bookDao.getAllBooks();
    }
    registerBook(book: Book): Promise<Book> {
        return this.bookDao.createBook(book);
    }

    
}