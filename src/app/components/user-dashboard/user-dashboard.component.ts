// user-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/empService/employee.service';
import { Employee } from 'src/app/service/empService/Employee.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  employee: Employee | undefined;
  today!: string | number | Date;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(id).subscribe((data) => {
      this.employee = data;
    });
  }
}
