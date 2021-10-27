import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from '../data-table/data-table-datasource';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent implements OnInit {
  @Output() onAddPerson: EventEmitter<Person> = new EventEmitter();
  person: Person = {
    firstName: '',
    lastName: '',
    postalCode: '',
    city: '',
    phoneNumber: '',
  };
  patternAlphabet!: '[a-zA-Z ]*';
  patternNumeric!: '[0-9]*';
  patternPhoneNumber!: '+?[0-9 ]+';

  constructor(private service: PersonService) {}

  onSubmit() {
    /* Validaciju sam pokusao napraviti s FormControl,
    ali nisam uspio napraviti da radi u potpunosti  */
    if (
      !this.person.firstName ||
      !this.person.lastName ||
      !this.person.postalCode ||
      !this.person.city ||
      !this.person.phoneNumber
    ) {
      alert('Molim unesite sva polja');
      return;
    }

    //let newPerson: Person = this.person;
    let newPerson: Person = Object.assign({}, this.person);

    this.service.addPerson(newPerson).subscribe(
      (res) => {
        console.log('HTTP response', res);
        this.onAddPerson.emit(newPerson);
      },
      (err: HttpErrorResponse) => {
        console.log('HTTP Error', err);
        // Ne znam kako pravilno handleati HttpErrorResponseove
        alert('Greška! Unešen je duplikat, ili su podaci krivo uneseni!');
      },
      () => console.log('HTTP request completed.')
    );
  }

  ngOnInit(): void {}
}
