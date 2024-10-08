import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/empService/employee.service';
import { Employee } from 'src/app/service/empService/Employee.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  employees: Employee[] = [];
  editingEmployee: Employee | null = null;  // The employee currently being edited
  selectedEmployee: Employee | null = null; 

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  /*// Method to select an employee for editing
  editEmployee(employee: Employee): void {
    this.editingEmployee = { ...employee };  // Create a copy to avoid direct mutation
  }

  // Method to save changes after editing
  saveChanges(): void {
    if (this.editingEmployee) {
      const updatedFields = {
        empName: this.editingEmployee.empName,
        empAge: this.editingEmployee.empAge,
        empCity: this.editingEmployee.empCity,
      };

      this.employeeService.updateEmployee(this.editingEmployee.id, updatedFields).subscribe(() => {
        this.loadEmployees();  // Reload employees after updating
        this.editingEmployee = null;  // Reset the editing state
      });
    }
  }*/
  // Enable editing for the selected employee
  editEmployee(employee: Employee): void {
    this.selectedEmployee = { ...employee };  // Create a copy of the employee to avoid mutating the original data
  }

  // Save changes to the selected employee
  saveChanges(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(() => {
      this.loadEmployees();  // Reload the employee list after saving changes
      this.selectedEmployee = null;  // Clear the selected employee after saving
    });
  }

  // Method to delete an employee
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.employees = this.employees.filter(e => e.id !== id);  // Remove from local list
      });
    }
  }
}
