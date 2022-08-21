import {Component, Inject, OnInit} from '@angular/core';
import {ColumnConfig, ColumnInterface, COLUMNS} from '../../../core/interfaces/column.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cols: ColumnInterface[] = this.colums.customer;
  listOfData: any;
  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
  ) { }

  ngOnInit(): void {
    this.listOfData = new Array(100).fill(0).map((_, index) => ({
      id: index,
      full_name: `Edward King ${index}`,
      phone: `012345678${index}`,
      address: `Viet Nam no. ${index}`,
      email: `abc${index}@gmail.com`,
      updated_at: new Date().toLocaleDateString()
    }));
  }

  confirm() {}
}
