import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ElectionService } from '../../services/election.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-election',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-election.component.html',
  styleUrl: './create-election.component.css',
})
export class CreateElectionComponent {
  constructor(private electionService: ElectionService) {}

  createElectionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.createElectionForm.valid) {
      this.electionService.create(this.createElectionForm.value).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Election created successfully!',
            icon: 'success',
          });
          this.createElectionForm.reset();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
          });
        },
      });
    }
  }
}
