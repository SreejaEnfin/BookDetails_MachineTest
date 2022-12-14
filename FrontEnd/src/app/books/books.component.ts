import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../book.model';
import { BooksService } from '../bookservice.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  bookForm!: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  status: boolean = true;
  page:number=1;
  pagecount:any;
  arraynum!:[];
  books!: Book[];
  x:any[] = [];
  

  constructor(
    private fb: FormBuilder,
    private bookservice: BooksService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.getBooks();
    this.bookForm = this.fb.group({
      _id: '',
      bookId: ['', [Validators.required]],
      bookName: ['', [Validators.required]],
      authorName: ['', [Validators.required]],
      publishedYear: ['', [Validators.required]],
      bookPrice: ['', [Validators.required]],
      bookStatus: 1,
    });
    
  }


  onAddBook() {
    this.showModal = true;
  }

  onCloseModal() {
    this.bookForm.reset();
    this.showModal = false;
    this.editMode=false;
  }

  getBooks() {
    this.bookservice.getBookList(this.page).subscribe((res:any) => {
      console.log(res.data.finalData);
      this.books = res.data.finalData;
      this.pagecount = res.data.pageCount;
      this.x = res.pages;
      console.log(this.pagecount);
      console.log(this.x);
    });
  }


  pageChange(i:any){
    console.log(i);
    this.bookservice.getBookList(i).subscribe((res: any) => {
      console.log(res.data.finalData);
      this.books = res.data.finalData;
    });
  }


  onEditBook(bk: Book) {
    this.editMode = true;
    this.showModal = true;
    this.bookForm.patchValue(bk);
  }

  onbookSubmit() {
    if (this.bookForm.valid) {
      if (this.editMode) {
        this.bookservice.updateBook(this.bookForm.value).subscribe(
          (res) => {
            this.getBooks();
            this.onCloseModal();
            alert('Book Details successfully updated!!!');
            this.editMode = false;
          },
          (err) => {
            console.log(err.e);
          }
        );
      } else {
        this.bookservice.addBook(this.bookForm.value).subscribe(
          (res) => {
            this.getBooks();
            this.onCloseModal();
            alert('Book Details successfully added!!!');
            // this.onReset();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      alert('Please check the Format of each field ');
    }
  }

  onDeleteBook(id: any) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.bookservice.deleteBook(id).subscribe(
        (res) => {
          this.status = false;
          console.log(res);
          this.getBooks();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
