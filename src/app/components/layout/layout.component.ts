import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ElectionService } from '../../services/election.service';
import { VoteService } from '../../services/vote.service';
import { NgChartsModule } from 'ng2-charts';
import { CandidateService } from '../../services/candidate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  elections: any[] = [];
  candidates: any[] = [];
  selectedElectionId: any;
  candidateIds: number[] = [];
  currentUserEmail: any;
  currentUserRole: any;

  electionForm = new FormGroup({
    election: new FormControl('', Validators.required),
  });

  // Chart properties
  public chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  public chartLabels: any[] = [];
  public chartData: number[] = [];
  public chartType: string = 'bar';

  constructor(
    public router: Router,
    private electionService: ElectionService,
    private voteService: VoteService,
    private candidateService: CandidateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchElections();

    this.currentUserEmail = localStorage.getItem('currentEmail');

    this.authService.getUserByEmail(this.currentUserEmail).subscribe((data) => {
      this.currentUserRole = data.userType;
      console.log(this.currentUserRole);
    });
  }

  onElectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedElectionId = target.value;
    console.log(this.selectedElectionId);
  }

  fetchElections(): void {
    this.electionService.getAllElections().subscribe((data: any[]) => {
      this.elections = data;
    });
  }

  showResults() {
    if (this.electionForm.valid) {
      this.voteService
        .getResultsByElectionId(this.selectedElectionId)
        .subscribe({
          next: (data) => {
            console.log(data);

            const ids = data.map((result: any) => result.candidateId);
            const values = data.map((result: any) => result.voteCount);

            const requestBody = {
              ids: ids,
            };

            this.candidateService
              .retrieveCandidateNamesByIds(requestBody)
              .subscribe({
                next: (data) => {
                  this.chartLabels = data.names;
                  this.chartData = values;
                },
                error: (error) => {
                  console.log(error);
                },
              });
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

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
