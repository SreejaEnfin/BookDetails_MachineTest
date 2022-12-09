import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url = 'http://localhost:3000/books';
  page:any
  size:any
limit:number = 3;

  constructor(private http: HttpClient) {}

  addBook(bk: Book) {
    return this.http.post(this.url, bk);
  }

  getBookList(page:number) {
    return this.http.get<Book[]>(this.url +'?page=' +page +'&limit=' +this.limit);
  }

  deleteBook(id: any) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateBook(bk: Book) {
    return this.http.put(`${this.url}/${bk._id}`, bk);
  }
}
