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
import { MatButtonModule } from '@angular/material/button';
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
      this.table.dataSource = this.dataSource;
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
}
