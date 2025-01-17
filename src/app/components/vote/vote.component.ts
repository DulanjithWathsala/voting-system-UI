import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-vote',
  imports: [],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css',
})
export class VoteComponent implements OnInit {
  currentUserEmail: string = '';
  isVerified: boolean = false;

  constructor(
    private dataService: DataService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.currentUserEmail = this.dataService.getData('currentUserEmail');
    this.voteService.checkUserIsVerified(this.currentUserEmail).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
