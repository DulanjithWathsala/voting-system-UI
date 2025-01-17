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

@Component({
  selector: 'app-vote',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css',
})
export class VoteComponent implements OnInit {
  currentUserEmail: any;

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
    party: new FormControl('', Validators.required),
  });

  constructor(
    private dataService: DataService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem('currentEmail');

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

  generateOtp(): void {}

  verifyOtp(): void {}

  showCandidates(): void {}

  castVote(candidateId: string): void {}

  onSubmitVote(): void {}
}
