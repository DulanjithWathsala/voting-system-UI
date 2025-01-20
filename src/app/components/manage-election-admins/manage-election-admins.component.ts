import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { SuperAdminService } from '../../services/super-admin.service';

@Component({
  selector: 'app-manage-election-admins',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-election-admins.component.html',
  styleUrl: './manage-election-admins.component.css',
})
export class ManageElectionAdminsComponent implements OnInit {
  enteredEmail: any;
  selectedAdmin: any;
  electionAdmins: any[] = [];

  constructor(
    private authService: AuthService,
    private superAdminService: SuperAdminService
  ) {}

  ngOnInit(): void {
    this.fetchElectionAdmins();
  }

  fetchElectionAdmins(): void {
    this.superAdminService.getAllElectionAdmins().subscribe((data: any[]) => {
      this.electionAdmins = data;
      console.log(this.electionAdmins);
    });
  }

  searchUser(): void {
    console.log(this.enteredEmail);

    this.authService.getUserByEmail(this.enteredEmail).subscribe({
      next: (data) => {
        console.log(data);

        this.selectedAdmin = data;
        Swal.fire({
          title: 'Good job!',
          text: 'Search successful!',
          icon: 'success',
        });
      },
      error: (error) => {
        this.selectedAdmin = null;
        Swal.fire({
          title: 'No user found!',
          text: 'Search failed!',
          icon: 'error',
        });
      },
    });
  }

  makeAdmin(nic: any): void {
    this.superAdminService.createElectionAdmin(nic).subscribe({
      next: (data) => {
        console.log(data);
        this.selectedAdmin = null;
        this.fetchElectionAdmins();
        Swal.fire({
          title: 'Good job!',
          text: 'Election Admin Created Successfully!',
          icon: 'success',
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Failed!',
          text: 'Something went wrong. Try again!',
          icon: 'error',
        });
      },
    });
  }

  deleteAdmin(nic: any): void {}
}
