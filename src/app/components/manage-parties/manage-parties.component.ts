import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-manage-parties',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-parties.component.html',
  styleUrl: './manage-parties.component.css',
})
export class ManagePartiesComponent {
  parties: any[] = [];

  updatePartyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    registrationNumber: new FormControl('', Validators.required),
  });

  onSelectParty(party: any): void {}

  OnDeleteParty(partyId: any): any {}

  onUpdate(): void {}
}
