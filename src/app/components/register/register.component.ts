import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  registerForm = new FormGroup(
    {
      nic: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]),
    },
    { validators: passwordMatchValidator() }
  );

  verifyConfirmPassword(): boolean {
    return (
      this.registerForm.value.password ===
      this.registerForm.value.confirmPassword
    );
  }

  submit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...userValues } = this.registerForm.value;

      this.authService.registration(userValues).subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire({
            title: 'Good job!',
            text: 'Registration Successfully completed!',
            icon: 'success',
          });

          this.registerForm.reset();
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: error.error.status,
            text: error.error.message,
          });
          this.registerForm.reset();
        },
      });
    }
  }
}
