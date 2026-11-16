import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  // Je kunt hier ook templateUrl: './button.component.html' gebruiken
  templateUrl: './button.component.html', 
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() buttonId: string = '';
  @Input() ariaLabel: string = '';
  @Input() classes: string[] = [];
  @Input() buttonType: string = 'button';
}