import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  submit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          console.log(data);

          localStorage.setItem('authToken', `${data.jwtToken}`);
          localStorage.setItem('currentEmail', this.loginForm.value.username!);
          Swal.fire({
            title: 'Good job!',
            text: 'Login successful!',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/layout']);
          });

          this.loginForm.reset();
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Login failed!',
            text: 'Please enter valid credentials',
          });
        },
      });
    }
  }
}
