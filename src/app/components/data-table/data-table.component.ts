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
  }

  loadCsvData(): void {
    this.service
      .getPeopleFromFile()
      .subscribe((data: Person[]) => (this.dataSource.data = this.dataSource.data.concat(data)));

  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.getPeople().subscribe((data: Person[]) => (this.dataSource.data = data));
    this.table.dataSource = this.dataSource;
  }
}
