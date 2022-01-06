import express from 'express';
import { BookDao } from './daos/book-dao';
import { BookDaoLocal } from './daos/book-dao-impl-local';
import { Book } from './entities';
import { BookService } from './services/book-service';
import { BookServiceImpl } from './services/book-service-impl';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

const bookDao: BookDao = new BookDaoLocal();
const bookService: BookService = new BookServiceImpl(bookDao);// Dependency Injection

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

app.listen(5000,()=>console.log("Application Started"));