import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 // title = 'contactly.web';
 http = inject(HttpClient);

  contactsForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(null),
    phoneNumber: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false)
  })

  contacts$ = this.getContacts();

  onFormSubmit() {
    const addContactRequest = {
      name: this.contactsForm.value.name,
      email: this.contactsForm.value.email,
      phoneNumber: this.contactsForm.value.phoneNumber,
      favorite: this.contactsForm.value.favorite,
    }
    console.log(addContactRequest);
    this.http.post('http://localhost:5077/api/Contacts', addContactRequest)
    .subscribe({
      next: (value) => {
        console.log(value);
        this.contacts$ = this.getContacts();
        this.contactsForm.reset();
      },
      error: (err) => {
        console.error('Error adding contact:', err);
        if (err.status === 400) {
          console.error('Bad Request - likely a problem with the request payload or format');
        }
      }
      
    });
  }

  onDelete(id: string) {
    this.http.delete(`http://localhost:5077/api/Contacts/${id}`)
    .subscribe({
      next: (value) => {
        alert('Item deleted');
        this.contacts$ = this.getContacts();
      }
    })
  }

private getContacts(): Observable<Contact[]> {
  return this.http.get<Contact[]>('http://localhost:5077/api/Contacts');
}
}
