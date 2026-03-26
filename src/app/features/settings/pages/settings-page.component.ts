import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SettingsPanelComponent } from '../components/settings-panel/settings-panel.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, SettingsPanelComponent],
  templateUrl: './settings-page.component.html',
})
export class SettingsPageComponent {}
