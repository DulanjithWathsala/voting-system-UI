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
            Swal.fire({
              title: 'No candidates found for this election',
              icon: 'info',
            }).then(() => {
              window.location.reload();
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

  deleteCandidate(candidateId: any): void {}
}
