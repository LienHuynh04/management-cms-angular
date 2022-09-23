import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-care',
  templateUrl: './staff-care.component.html',
  styleUrls: ['./staff-care.component.scss']
})
export class StaffCareComponent implements OnInit {
  @Input() care: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
