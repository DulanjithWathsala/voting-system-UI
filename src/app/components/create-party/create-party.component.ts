import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PartyService } from '../../services/party.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-party',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-party.component.html',
  styleUrl: './create-party.component.css',
})
export class CreatePartyComponent {
  createPartyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    registrationNumber: new FormControl('', Validators.required),
  });

  constructor(private partyService: PartyService) {}

  onSubmit(): void {
    if (this.createPartyForm.valid) {
      this.partyService.create(this.createPartyForm.value).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Party created successfully!',
            icon: 'success',
          });
          this.createPartyForm.reset();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Could not create party. Try again!',
          });
        },
      });
    }
  }
}
