// src/app/services/employee.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './Employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employee';

  constructor(private http: HttpClient) {}

  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // Add a new employee
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  // Update an existing employee (new method)
  updateEmployee(employee: Employee): Observable<Employee> {
    const updateUrl = `${this.apiUrl}/${employee.empId}`;  // Assume employee ID is passed as part of the URL
    return this.http.put<Employee>(updateUrl, employee);
  }

  // Delete an employee
  deleteEmployee(id: String): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
}
