import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PersonService } from 'src/app/services/person.service';
import { DataTableDataSource, Person } from './data-table-datasource';

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
  //isnum = /^\d+$/.test('');

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

  /**
   * Checks if value consists only of digits.
   *
   * @param val string value to check
   * @returns `true` if value consists only of digits, `false` otherwise
   */
  isnum(val: string): boolean {
    return /^\d+$/.test(val);
  }

  /**
   * Loads .csv file data from assets and binds to `MatTable`
   */
  loadCsvData(): void {
    this.service.getPeopleFromFile().subscribe((data: Person[]) => {
      this.dataSource.data = this.dataSource.data.concat(data);
      this.refresh();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.service.getPeople().subscribe((data: Person[]) => {
      this.dataSource.data = data;
      this.table.dataSource = this.dataSource;
    });
  }

  addPerson(e: Person) {
    this.dataSource.data.push(e);
    this.refresh();
  }

  refresh(): void {
    this.paginator._changePageSize(this.paginator.pageSize); // trik da se tablica osvjezi
  }
}
