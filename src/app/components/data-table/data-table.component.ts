import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataTableDataSource, Person } from './data-table-datasource';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Person>;
  dataSource: DataTableDataSource;
  test: string = '';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'firstName',
    'lastName',
    'postalCode',
    'city',
    'phoneNumber',
  ];

  constructor(private service: PersonService) {
    this.dataSource = new DataTableDataSource();
    //this.service.getPeopleFromFile();
  }
  funkcija(): void {

    this.service.getPeopleFromFile().subscribe((data) => (this.test = data));
    //console.log(x);
    console.log(this.test);
  }
  gumb(): void {
    console.log(this.test);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.service.getPeople().subscribe((data) => (this.dataSource.data = data));
    this.table.dataSource = this.dataSource;
  }
}
