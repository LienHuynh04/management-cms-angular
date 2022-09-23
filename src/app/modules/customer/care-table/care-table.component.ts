import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-care-table',
  templateUrl: './care-table.component.html',
  styleUrls: ['./care-table.component.scss']
})
export class CareTableComponent implements OnInit {
  @Input() care: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
