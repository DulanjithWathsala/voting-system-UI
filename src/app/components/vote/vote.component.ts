import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { VoteService } from '../../services/vote.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ElectionService } from '../../services/election.service';
import { BallotService } from '../../services/ballot.service';
import { PartyService } from '../../services/party.service';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-vote',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css',
})
export class VoteComponent implements OnInit {
  currentUserEmail: any;
  selectedElectionId: any;

  isVerified: boolean = true;
  isVoted: boolean = false;

  otp: string = '';

  elections: any[] = [];
  ballots: any[] = [];
  parties: any[] = [];
  candidates: any[] = [];

  voteForm = new FormGroup({
    election: new FormControl('', Validators.required),
    ballot: new FormControl('', Validators.required),
  });

  constructor(
    private voteService: VoteService,
    private electionService: ElectionService,
    private ballotService: BallotService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem('currentEmail');

    this.fetchElections();

    // this.voteService.checkUserIsVerified(this.currentUserEmail).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   error: (error) => {
    //     Swal.fire({
    //       title: 'Not verified!',
    //       text: 'Please verify your email to vote.',
    //       icon: 'warning',
    //     });
    //   },
    // });
  }

  fetchElections(): void {
    this.electionService.getAllElections().subscribe((data: any[]) => {
      this.elections = data;
    });
  }

  fetchBallots(): void {
    this.ballotService
      .retrieveBallotByElectionId(this.selectedElectionId)
      .subscribe((data: any[]) => {
        this.ballots = data;
      });
  }

  onElectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedElectionId = target.value;

    this.fetchBallots();
  }

  generateOtp(): void {}

  verifyOtp(): void {}

  showCandidates(): void {
    this.candidates = [];
    if (this.voteForm.valid) {
      this.candidateService
        .retrieveCandidesByElectionId(this.voteForm.value.election)
        .subscribe({
          next: (data: any[]) => {
            this.candidates = data;

            Swal.fire({
              title: 'Candiates Loaded',
              icon: 'success',
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Candiates Loading failed. Try again!',
              icon: 'error',
            });
          },
        });
    }
  }

  castVote(candidateId: string): void {}

  onSubmitVote(): void {}
}
