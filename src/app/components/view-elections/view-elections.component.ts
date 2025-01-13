import { Component, OnInit } from '@angular/core';
import { ElectionService } from '../../services/election.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-elections',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-elections.component.html',
  styleUrl: './view-elections.component.css',
})
export class ViewElectionsComponent implements OnInit {
  elections: any[] = [];
  selectedElection: any = {};

  updateElectionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  constructor(
    private electionService: ElectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchElections();
  }

  fetchElections(): void {
    this.electionService.getAllElections().subscribe({
      next: (data: any[]) => {
        this.elections = data;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: 'Could not fetch data',
        });
      },
    });
  }

  onSubmit(): void {
    if (this.updateElectionForm.valid) {
      this.electionService
        .updateElectionDetails(
          this.selectedElection.id,
          this.updateElectionForm.value
        )
        .subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Good job!',
              text: 'Election details updated successfully!',
              icon: 'success',
            }).then(() => {
              window.location.reload();
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong!',
              text: 'Could not update election data.',
            });
          },
        });
    }
  }

  onSelectElection(selectedElection: any): void {
    this.selectedElection = selectedElection;

    if (typeof this.selectedElection.startDate === 'string') {
      this.selectedElection.startDate = new Date(
        this.selectedElection.startDate
      );
    }
    if (typeof this.selectedElection.endDate === 'string') {
      this.selectedElection.endDate = new Date(this.selectedElection.endDate);
    }

    if (this.selectedElection.startDate instanceof Date) {
      this.selectedElection.startDate = this.selectedElection.startDate
        .toISOString()
        .split('T')[0];
    }
    if (this.selectedElection.endDate instanceof Date) {
      this.selectedElection.endDate = this.selectedElection.endDate
        .toISOString()
        .split('T')[0];
    }
    this.updateElectionForm.patchValue({
      title: selectedElection.title,
      description: selectedElection.description,
      startDate: selectedElection.startDate,
      endDate: selectedElection.endDate,
      status: selectedElection.status,
    });
  }

  deleteCurrentElection(electionId: any): void {
    Swal.fire({
      title: 'Do you want to Delete current election details?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.electionService.deleteElection(electionId).subscribe(() => {
          Swal.fire('Delete successful!', '', 'success');
          this.fetchElections();
        });
      } else if (result.isDenied) {
        Swal.fire('Delete canceled!', '', 'info');
      }
    });
  }

  ballotsOnClick(election: any): void {
    this.router.navigate(['/ballots'], {
      queryParams: { data: btoa(JSON.stringify(election)) },
    });
  }
}
