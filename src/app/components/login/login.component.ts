import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    empName: '',
    password: '',
    role: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:8080/api/employee/login', this.loginData)
      .subscribe(
        (response) => {
          if (response.redirect) {
            this.router.navigate([`/${response.redirect}`]); // Redirect based on backend response
          } else {
            alert('Login Failed');
          }
        },
        (error) => {
          console.error("Login error:", error);
          if (error.error && error.error.error) {
            alert(error.error.error); // Display the error message from the server
          } else {
            alert('Error logging in.');
          }
        }
      );
  }
}
