import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-candidates',
  imports: [CommonModule],
  templateUrl: './manage-candidates.component.html',
  styleUrl: './manage-candidates.component.css',
})
export class ManageCandidatesComponent {
  elections: any[] = [];
  candidates: any[] = [];

  loadCandidates(): void {}

  deleteCandidate(candidateId: any): void {}
}
