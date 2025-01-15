import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(public router: Router) {}

  onSignOut(event: Event): void {
    event.preventDefault();
    Swal.fire({
      title: 'Sign Out!',
      text: 'Do you want to cofirm sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sign out!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken');
        this.router.navigate(['']);
        Swal.fire({
          title: 'Success!',
          text: 'signed out successfully.',
          icon: 'success',
        });
      }
    });
  }
}
