import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  public headercolumn: string[] = [
    'date','starttime','endtime','update'];
  constructor() { }

  ngOnInit(): void {
  }



}
