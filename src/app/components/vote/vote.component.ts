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
import { CandidateService } from '../../services/candidate.service';
import { OtpService } from '../../services/otp.service';

@Component({
  selector: 'app-vote',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css',
})
export class VoteComponent implements OnInit {
  currentUserEmail: any;
  currentUserNic: any;
  selectedElectionId: any;

  loading: boolean = false;
  isVerified: boolean = false;
  isVoted: boolean = false;
  isGenorated: boolean = false;

  otp: string = '';

  elections: any[] = [];
  parties: any[] = [];
  candidates: any[] = [];

  voteForm = new FormGroup({
    election: new FormControl('', Validators.required),
  });

  constructor(
    private voteService: VoteService,
    private electionService: ElectionService,
    private candidateService: CandidateService,
    private otpService: OtpService
  ) {}

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem('currentEmail');

    this.fetchElections();

    this.voteService
      .getUserDetailsByEmail(this.currentUserEmail)
      .subscribe((data: any) => {
        this.currentUserNic = data.nic;
      });

    this.voteService.checkUserIsVerified(this.currentUserEmail).subscribe({
      next: (data) => {
        this.isVerified = true;
        console.log(data);
      },
      error: (error) => {
        Swal.fire({
          title: 'Not verified!',
          text: 'Please verify your email to vote.',
          icon: 'warning',
        });
      },
    });

    this.voteService.checkUserIsCasted(this.currentUserEmail).subscribe({
      next: (data: boolean) => {
        this.isVoted = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fetchElections(): void {
    this.electionService.getAllElections().subscribe((data: any[]) => {
      this.elections = data;
    });
  }

  onElectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedElectionId = target.value;
  }

  generateOtp(): void {
    this.loading = true;
    this.otpService.generateOtp(this.currentUserEmail).subscribe({
      next: (data) => {
        this.loading = false;
        this.isGenorated = true;
        Swal.fire({
          title: 'Otp sent your email!',
          icon: 'success',
        });
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({
          title: 'Otp could not sent. Try again!',
          icon: 'error',
        });
      },
    });
  }

  verifyOtp(): void {
    if (this.otp === '') {
      Swal.fire({
        title: 'Otp cant be empty!',
        icon: 'warning',
      });
    } else {
      this.otpService.verifyOtp(this.currentUserEmail, this.otp).subscribe({
        next: (data) => {
          this.isVerified = true;
          Swal.fire({
            title: 'Verification Successfull!',
            icon: 'success',
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Verification failed. Try again!',
            icon: 'error',
          });
        },
      });
    }
  }

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

  castVote(candidateId: string, candidateFullName: string): void {
    console.log(candidateId);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vote!',
    }).then((result) => {
      if (result.isConfirmed) {
        const requestBody = {
          userNic: this.currentUserNic,
          candidateId,
          candidateFullName,
          election: {
            id: this.selectedElectionId,
          },
        };

        this.voteService.castVote(requestBody).subscribe({
          next: (data) => {
            this.isVoted = true;
            Swal.fire({
              title: 'Good job!',
              text: 'Your vote has been captured!',
              icon: 'success',
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Failed!',
              text: 'Failed to vote. Try again!',
              icon: 'error',
            });
          },
        });

        Swal.fire({
          title: 'Voted!',
          text: 'Your vote has been casted.',
          icon: 'success',
        });
      }
    });
  }
}
