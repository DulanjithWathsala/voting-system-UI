import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ElectionService } from '../../services/election.service';

@Component({
  selector: 'app-create-candidate',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.css',
})
export class CreateCandidateComponent implements OnInit {
  currentNic: string = '';
  currentUser: any = null;
  elections: any[] = [];

  createCandidateForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    partyId: new FormControl('', Validators.required),
    election: new FormControl('', Validators.required),
  });

  constructor(
    private candidateService: CandidateService,
    private electionService: ElectionService
  ) {}

  ngOnInit(): void {
    this.electionService.getAllElections().subscribe((data: any[]) => {
      this.elections = data;
    });
  }

  searchOnClick(): void {
    this.candidateService.retrieveByNic(this.currentNic).subscribe({
      next: (data) => {
        this.currentUser = data;
        Swal.fire({
          title: 'Search successful!',
          icon: 'success',
        });
      },
      error: (error) => {
        this.currentUser = null;
        Swal.fire({
          title: error.error.message,
          icon: 'error',
        });
      },
    });
  }

  onSubmit(): void {
    if (this.createCandidateForm.valid) {
      const { election, ...canidateDetails } = this.createCandidateForm.value;

      const requestBody = {
        nic: this.currentNic,
        election: {
          id: election,
        },
        fullName: this.createCandidateForm.value.fullName,
        position: this.createCandidateForm.value.position,
      };

      this.candidateService.create(requestBody).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Election created successfully!',
            icon: 'success',
          }).then(() => {
            this.createCandidateForm.reset();
            this.currentUser = null;
            this.currentNic = '';
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Could not save the candidate',
          });
        },
      });
    }
  }
}
