import { Book } from "../entities";

export interface BookDao{

    createBook(book:Book): Promise<Book>

    getAllBooks(): Promise<Book[]>

    getBookById(id: string): Promise<Book>
    
}