import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  employee = {
    empId: '',
    empName: '',
    empAge: 0,
    empGender: '',
    empCity: '',
    role: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:8080/api/employee', this.employee).subscribe(
      response => {
        console.log('Registration successful', response);
        //alert('Employee registered successfully!');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('There was an error during registration!', error);
        alert('Registration failed.');
      }
    );
  }
}
