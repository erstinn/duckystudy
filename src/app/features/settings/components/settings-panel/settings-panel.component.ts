import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreferencesStore, StudyMode, ThemeMode, UiLanguage } from '../../../../core/services/preferences.store';

@Component({
  selector: 'app-settings-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-panel.component.html',
})
export class SettingsPanelComponent {
  readonly themeOptions: ThemeMode[] = ['dark', 'light'];
  readonly languageOptions: UiLanguage[] = ['en', 'ja'];
  readonly modeOptions: StudyMode[] = ['classic', 'multiple-choice', 'mixed'];

  constructor(readonly preferences: PreferencesStore) {}

  setTheme(theme: ThemeMode): void {
    this.preferences.patch({ theme });
  }

  setLanguage(uiLanguage: UiLanguage): void {
    this.preferences.patch({ uiLanguage });
  }

  setMode(preferredMode: StudyMode): void {
    this.preferences.patch({ preferredMode });
  }

  setGoal(value: number): void {
    this.preferences.patch({ dailyGoal: Math.max(1, Math.round(value || 1)) });
  }

  setReduceMotion(value: boolean): void {
    this.preferences.patch({ reduceMotion: value });
  }
}
