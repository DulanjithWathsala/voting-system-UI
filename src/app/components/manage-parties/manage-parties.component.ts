import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PartyService } from '../../services/party.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-parties',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-parties.component.html',
  styleUrl: './manage-parties.component.css',
})
export class ManagePartiesComponent implements OnInit {
  parties: any[] = [];
  selectedParty: any = {};

  updatePartyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
    registrationNumber: new FormControl('', Validators.required),
  });

  constructor(private partyService: PartyService) {}

  ngOnInit(): void {
    this.fetchParties();
  }

  fetchParties(): void {
    this.partyService.getAllParties().subscribe((data: any[]) => {
      this.parties = data;
    });
  }

  onSelectParty(party: any): void {
    this.selectedParty = party;

    this.updatePartyForm.patchValue({
      name: this.selectedParty.name,
      symbol: this.selectedParty.symbol,
      registrationNumber: this.selectedParty.registrationNumber,
    });
  }

  OnDeleteParty(partyId: any): any {
    Swal.fire({
      title: 'Do you want to Delete current party details?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.partyService.deleteParty(partyId).subscribe(() => {
          Swal.fire('Delete successful!', '', 'success');
          this.fetchParties();
        });
      } else if (result.isDenied) {
        Swal.fire('Delete canceled!', '', 'info');
      }
    });
  }

  onUpdate(): void {
    if (this.updatePartyForm.valid) {
      this.partyService
        .updatePartyDetails(this.selectedParty.id, this.updatePartyForm.value)
        .subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Good job!',
              text: 'Party details updated successfully!',
              icon: 'success',
            }).then(() => {
              window.location.reload();
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong!',
              text: 'Could not update party data.',
            });
          },
        });
    }
  }
}
