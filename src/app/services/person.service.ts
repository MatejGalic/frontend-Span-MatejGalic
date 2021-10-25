import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../components/data-table/data-table-datasource';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = 'https://localhost:44379/api';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl + '/person');
  }

  addPerson(person: Person): Observable<Person>{
    return this.http.post<Person>(this.apiUrl + '/person', person, httpOptions);
  }

}
