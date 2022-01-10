import { Book } from "../entities";
import { BookDao } from "./book-dao";
import {readFile, writeFile} from 'fs/promises';
import {v4} from 'uuid';


export class BookDaoLocal implements BookDao{
    async updateBook(book: Book): Promise<Book> {
        const file = await readFile('C:\\Users\\AdamRanieri\\Desktop\\pleasant-view-backend\\localbooks.json')
        const text: string = await file.toString()
        const books:Book[] = JSON.parse(text);
        const index = books.findIndex(b => b.id === book.id)
        books.splice(index,1,book);
        await writeFile('C:\\Users\\AdamRanieri\\Desktop\\pleasant-view-backend\\localbooks.json', JSON.stringify(books));
        return book
    }

    async getBookById(id: string): Promise<Book> {
        const file = await readFile('C:\\Users\\AdamRanieri\\Desktop\\pleasant-view-backend\\localbooks.json')
        const text: string = await file.toString()
        const books:Book[] = JSON.parse(text);
        return books.find(book => book.id === id);
    }

    async createBook(book: Book): Promise<Book> {
        const file = await readFile('C:\\Users\\AdamRanieri\\Desktop\\pleasant-view-backend\\localbooks.json')
        const text: string = await file.toString()
        const books:Book[] = JSON.parse(text);
        book.id = v4()
        books.push(book);
        await writeFile('C:\\Users\\AdamRanieri\\Desktop\\pleasant-view-backend\\localbooks.json', JSON.stringify(books))
        return book;
    }

    async getAllBooks(): Promise<Book[]> {
        const file = await readFile('C:\\Users\\AdamRanieri\\Desktop\\pleasant-view-backend\\localbooks.json')
        const text: string = await file.toString()
        const books:Book[] = JSON.parse(text);
        return books;
    }

    
}