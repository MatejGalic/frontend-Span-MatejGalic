import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Person } from '../components/data-table/data-table-datasource';
import { environment } from '../../environments/environment';
import { map, first } from 'rxjs/operators';

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

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  getPeopleFromFile(): Observable<any> {
    //let x =

    return this.getCsvFile().pipe(
      map(res => {
        const list = res.split('\r\n');
        let csvDataArray: any = [];

        list.forEach((e) => {
          csvDataArray.push(e);
        });
        console.log("ermm");
        return this.csvToPerson(csvDataArray);
        })
    );

    /*
    this.getCsvFile().subscribe((data) => {
      const list = data.split('\r\n');
      let csvDataArray: any = [];

      list.forEach((e) => {
        csvDataArray.push(e);
      });
      return of(this.csvToPerson(csvDataArray));
    });
    */
    //let returnValue: Observable<Person[]> | undefined = undefined;

    //this.getCsvFile()
/*
    this.getCsvFile().pipe(
        map(res => {

            return res;
          }),
          catchError(this.handleError)
      )
*/
/*

    */
    //console.log(returnValue);
    //return returnValue;
  }

  getCsvFile(): Observable<string> {

    return this.http.get(this.csvFilePath, { responseType: 'text' });
  }

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
      console.log(people);
    }

    return people;
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl + '/person', person, httpOptions);
  }
}
