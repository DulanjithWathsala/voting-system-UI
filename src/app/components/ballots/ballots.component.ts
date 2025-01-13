import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BallotService } from '../../services/ballot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ballots',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ballots.component.html',
  styleUrl: './ballots.component.css',
})
export class BallotsComponent implements OnInit {
  election: any;
  ballots: any[] = [];

  createBallotForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
  });

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private ballotService: BallotService
  ) {}

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe((params) => {
      this.election = JSON.parse(atob(params['data']));
    });

    this.fetchBallots();
  }

  fetchBallots(): void {
    const { id } = this.election;
    this.ballotService.retrieveBallotByElectionId(id).subscribe({
      next: (data: any[]) => {
        this.ballots = data;
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

  onViewBallots(): void {}

  onBack(): void {
    this.router.navigate(['/layout/view-elections']);
  }

  onSubmit(): void {
    if (this.createBallotForm.valid) {
      const requestBody = {
        election: { ...this.election },
        ...this.createBallotForm.value,
      };
      this.ballotService.create(requestBody).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Good job!',
            text: 'Ballot created successfully!',
            icon: 'success',
          }).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Could not save ballot details',
          });
        },
      });
    }
  }

  viewResults(ballot: any): void {}

  toggleBallotStatus(ballot: any): void {
    ballot.isActive = !ballot.isActive;

    //send req to backend here
  }

  deleteBallot(ballotId: any): void {}
}
