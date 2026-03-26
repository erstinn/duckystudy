import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';
export type UiLanguage = 'en' | 'ja';
export type StudyMode = 'classic' | 'multiple-choice' | 'mixed';

interface PreferenceState {
  theme: ThemeMode;
  uiLanguage: UiLanguage;
  preferredMode: StudyMode;
  dailyGoal: number;
  reduceMotion: boolean;
}

const STORAGE_KEY = 'duckystudy.preferences';

@Injectable({ providedIn: 'root' })
export class PreferencesStore {
  readonly theme = signal<ThemeMode>('dark');
  readonly uiLanguage = signal<UiLanguage>('en');
  readonly preferredMode = signal<StudyMode>('mixed');
  readonly dailyGoal = signal(20);
  readonly reduceMotion = signal(false);

  constructor() {
    this.load();
  }

  patch(partial: Partial<PreferenceState>): void {
    if (partial.theme) {
      this.theme.set(partial.theme);
    }

    if (partial.uiLanguage) {
      this.uiLanguage.set(partial.uiLanguage);
    }

    if (partial.preferredMode) {
      this.preferredMode.set(partial.preferredMode);
    }

    if (typeof partial.dailyGoal === 'number') {
      this.dailyGoal.set(partial.dailyGoal);
    }

    if (typeof partial.reduceMotion === 'boolean') {
      this.reduceMotion.set(partial.reduceMotion);
    }

    this.persist();
  }

  private load(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const rawValue = localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return;
    }

    try {
      const parsed = JSON.parse(rawValue) as Partial<PreferenceState>;
      this.patch(parsed);
    } catch (error) {
      console.warn('Could not restore preferences', error);
    }
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        theme: this.theme(),
        uiLanguage: this.uiLanguage(),
        preferredMode: this.preferredMode(),
        dailyGoal: this.dailyGoal(),
        reduceMotion: this.reduceMotion(),
      }),
    );
  }
}
