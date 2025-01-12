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

@Component({
  selector: 'app-view-elections',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-elections.component.html',
  styleUrl: './view-elections.component.css',
})
export class ViewElectionsComponent implements OnInit {
  elections: any[] = [];

  updateElectionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  constructor(private electionService: ElectionService) {}

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

  onSubmit(): void {}
}
