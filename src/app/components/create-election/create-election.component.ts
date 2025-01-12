import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-election',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-election.component.html',
  styleUrl: './create-election.component.css',
})
export class CreateElectionComponent {
  createElectionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.createElectionForm.valid) {
      console.log(this.createElectionForm.value);
    }
  }
}
