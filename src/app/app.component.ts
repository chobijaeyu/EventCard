import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-card></app-card>
  `,
  styles: [
    `
    \:host{
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    `
  ]
})
export class AppComponent {
  title = 'eventcard';
}
