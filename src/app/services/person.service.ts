import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from '../components/data-table/data-table-datasource';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = environment.apiEndpoint + '/person';
  private csvFilePath = environment.csvFilePath;

  constructor(private http: HttpClient) {}

  /**
   * Gets data from API
   *
   * @returns `Observable<Person[]>` from API
   */
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  /**
   * Gets `Observable<Person[]>` data from local .csv file
   *
   * @returns `Observable<Person[]>` from file
   */
  getPeopleFromFile(): Observable<any> {
    let x: Person[] = [];
    let s = 'test';
    var subject = new Subject<Person[]>();

    this.getCsvFile().subscribe((data) => {
      const list = data.split('\r\n');
      let csvDataArray: any = [];

      list.forEach((e) => {
        csvDataArray.push(e);
      });

      s = 'prosao';

      x = this.csvToPerson(csvDataArray);
      subject.next(x);
    });
    return subject.asObservable();
  }

  /**
   * Gets `Observable<string>` directly from local .csv file
   *
   * @returns `Observable<string>` data from .csv file
   */
  getCsvFile(): Observable<string> {
    return this.http.get(this.csvFilePath, { responseType: 'text' });
  }

  /**
   * Converts .csv data to `Person[]`
   *
   * @param data csv formatted text
   * @returns data formatted as `Person[]`
   */
  csvToPerson(data: string[]): Person[] {
    const people: Person[] = [];
    const headers = [
      'firstName',
      'lastName',
      'postalCode',
      'city',
      'phoneNumber',
    ];

    for (let i = 0; i < data.length; i++) {
      let obj: any = {};
      let currentline = data[i].split(';');
      if (currentline.length === 5) {
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        people.push(obj);
      }
    }
    return people;
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person, httpOptions);
  }
}
