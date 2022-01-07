import { Book } from "../entities";

export interface BookService{

    retrieveAllBooks():Promise<Book[]>

    registerBook(book:Book): Promise<Book>

    retrieveBookById(id: string): Promise<Book>
}