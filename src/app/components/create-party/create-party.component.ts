import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  onSubmit(): void {}
}
