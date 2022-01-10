import { BookDao } from "../daos/book-dao";
import { MemberDAO } from "../daos/member-dao";
import { Book, Member } from "../entities";
import { BookService } from "./book-service";

export class BookServiceImpl implements BookService{

    // Dependency Injection
    // Services that depend/rely on funcitonality in a DAO(s)
    // rather than Inheriting the functionality, the depency is built-into/ composition the class
    private bookDao:BookDao;
    private memberDao:MemberDAO;

    constructor(bookDao:BookDao, memberDao:MemberDAO){
        this.bookDao = bookDao;
        this.memberDao = memberDao;
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

    async checkoutBook(id: string, memberUsername: string): Promise<Book> {
        const book:Book = await this.bookDao.getBookById(id);
        book.returnDate = Date.now()/1000 + 1_209_600;// unix epoch time
        book.isCheckedout = true;
        
        const member:Member = await this.memberDao.getMemberByUsername(memberUsername);
        member.checkedOutBooks.push(book.id);

        this.memberDao.updateMember(member);
        this.bookDao.updateBook(book)

        return book
    }

    
}