import express from 'express';
import { BookDao } from './daos/book-dao';
import { BookDaoLocal } from './daos/book-dao-impl-local';
import { Book, Member } from './entities';
import { BookService } from './services/book-service';
import { BookServiceImpl } from './services/book-service-impl';
import cors from 'cors'
import { LoginService, LoginServiceImpl } from './services/login-service';
import { MemberDAO, MemberDAOLocalImpl } from './daos/member-dao';
import logMiddleware from './middleware/logger-middleware';



const app = express();
app.use(express.json());
app.use(cors())
app.use(logMiddleware)

const bookDao: BookDao = new BookDaoLocal();
const memberDao: MemberDAO = new MemberDAOLocalImpl()
const bookService: BookService = new BookServiceImpl(bookDao ,memberDao);// Dependency Injection
const loginService: LoginService = new LoginServiceImpl(memberDao)

app.post("/books", async (req,res)=>{
    const book:Book = req.body;
    const savedBook: Book = await bookService.registerBook(book);
    res.status(201)
    res.send(savedBook)
})

app.get("/books", async (req,res)=>{
    const books:Book[] = await bookService.retrieveAllBooks();
    res.status(200);
    res.send(books)
})

app.get("/books/:id", async (req,res)=>{
    const {id} = req.params
    const book:Book = await bookService.retrieveBookById(id)
    res.send(book)
})

// NEVER PUT SENSITIVE INFORMATION IN A URL
app.patch('/login', async (req,res)=>{
    // interface LoginData{
    //     username: string 
    //     password: string
    // }
    try {
        const body:{username:string, password:string} = req.body;
        const member:Member = await loginService.loginWithUsernamePassword(body.username,body.password)
        res.send(member)
        
    } catch (error) {
        res.send("Unable to login, check that your username password is correct")
    }

})

app.patch('/books/:id/checkout', async (req,res)=>{

    const {id} = req.params
    const body:{username:string} = req.body;
    const book:Book  = await bookService.checkoutBook(id, body.username);
    res.send(book)
})

app.listen(5000,()=>console.log("Application Started"));