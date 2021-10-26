import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ErrorHandler,
} from '@angular/core';
import { Person } from '../data-table/data-table-datasource';
import { PersonService } from 'src/app/services/person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent implements ErrorHandler, OnInit {
  @Output() onAddPerson: EventEmitter<Person> = new EventEmitter();
  firstName!: string;
  lastName!: string;
  postalCode!: string;
  city!: string;
  phoneNumber!: string;

  constructor(private service: PersonService) {}
  handleError(error: HttpErrorResponse): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.postalCode ||
      !this.city ||
      !this.phoneNumber
    ) {
      return;
    }

    const newPerson: Person = {
      firstName: this.firstName,
      lastName: this.lastName,
      postalCode: this.postalCode,
      city: this.city,
      phoneNumber: this.phoneNumber,
    };


    this.service.addPerson(newPerson).subscribe(
      (res) => console.log('HTTP response', res),
      (err) => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );
    console.log(newPerson);
  }

  ngOnInit(): void {}
}
