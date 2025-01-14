import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ElectionService } from '../../services/election.service';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../../services/candidate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-candidates',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-candidates.component.html',
  styleUrl: './manage-candidates.component.css',
})
export class ManageCandidatesComponent implements OnInit {
  elections: any[] = [];
  candidates: any[] = [];
  selectedElectionId: string = '';

  constructor(
    private electionService: ElectionService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.electionService.getAllElections().subscribe((data: any[]) => {
      this.elections = data;
    });
  }

  loadCandidatesOnClick(): void {
    this.candidateService
      .retrieveCandidesByElectionId(this.selectedElectionId)
      .subscribe({
        next: (data: any[]) => {
          if (data.length === 0) {
            this.candidates = [];
            Swal.fire({
              title: 'No candidates found for this election',
              icon: 'info',
            });
          } else {
            this.candidates = data;
            Swal.fire({
              title: 'Candites serach successful!',
              icon: 'success',
            });
          }
        },
        error: (error) => {
          Swal.fire({
            title: 'Search failed. Try again!',
            icon: 'error',
          });
        },
      });
  }

  deleteCandidate(candidateId: any): void {
    Swal.fire({
      title: 'Do you want to Delete current candidate?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.candidateService.deleteCandidate(candidateId).subscribe(() => {
          Swal.fire('Delete successful!', '', 'success');
        });
      } else if (result.isDenied) {
        Swal.fire('Delete canceled!', '', 'info');
      }
    });
  }
}
