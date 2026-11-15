import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  // Je kunt hier ook templateUrl: './button.component.html' gebruiken
  template: `
    <button
      [id]="buttonId"
      [attr.aria-label]="ariaLabel || null"
      class="btn spin-button"
      [ngClass]="classes"
      [type]="buttonType"
    >
      <!-- ng-content zorgt ervoor dat alles wat je tussen de tags zet hier belandt -->
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() buttonId: string = '';
  @Input() ariaLabel: string = '';
  @Input() classes: string[] = [];
  @Input() buttonType: string = 'button';
}