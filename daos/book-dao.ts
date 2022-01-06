import { Book } from "../entities";

export interface BookDao{

    createBook(book:Book): Promise<Book>

    getAllBooks(): Promise<Book[]>
    
}