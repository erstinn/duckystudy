import { Component } from '@angular/core';
import { AppShellComponent } from './shared/ui/app-shell/app-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppShellComponent],
  template: '<app-shell />',
  styles: [
    `
      :host {
        display: block;
        min-height: 100dvh;
      }
    `,
  ],
})
export class App {}
