import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Flashcard, SupabaseService } from './supabase.service';

type ThemeName = 'gold' | 'rose' | 'dawn';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  cards: Flashcard[] = [];
  queue: number[] = [];
  queuePos = 0;
  isFlipped = false;
  scores = { again: 0, good: 0, easy: 0 };
  isComplete = false;
  readonly themes: ThemeName[] = ['gold', 'rose', 'dawn'];
  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly theme = signal<ThemeName>('gold');

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    void this.loadCards();
  }

  private async loadCards() {
    try {
      this.cards = await this.supabase.getCards();
      console.group('[Supabase] flashcards query result');
      console.log('row count:', this.cards?.length ?? 0);
      console.table(
        this.cards.map((card) => ({
          id: card.id,
          lesson: card.lesson,
          section: card.section,
          english: card.english,
          kanji: card.kanji,
          hira: card.hira,
        })),
      );
      console.log('raw rows:', JSON.stringify(this.cards, null, 2));
      console.groupEnd();
      this.queue = this.cards.map((_, i) => i);
    } catch (error) {
      console.error(error);
      this.errorMessage.set(error instanceof Error ? error.message : 'Failed to load cards.');
    } finally {
      this.isLoading.set(false);
    }
  }

  get current(): Flashcard | null {
    if (!this.queue.length || this.queuePos >= this.queue.length) {
      return null;
    }

    return this.cards[this.queue[this.queuePos]] ?? null;
  }

  get progress(): number {
    if (!this.queue.length) {
      return 0;
    }

    return Math.round((this.queuePos / this.queue.length) * 100);
  }

  flip() {
    if (!this.isFlipped && this.current) {
      this.isFlipped = true;
    }
  }

  async grade(rating: 0 | 1 | 2) {
    const current = this.current;

    if (!this.isFlipped || !current) {
      return;
    }

    if (rating === 0) {
      this.scores.again++;
    } else if (rating === 1) {
      this.scores.good++;
    } else {
      this.scores.easy++;
    }

    this.supabase.saveGrade(current.id, rating).catch(console.error);

    if (rating === 0) {
      const cardIdx = this.queue[this.queuePos];
      this.queue.splice(Math.min(this.queuePos + 3, this.queue.length), 0, cardIdx);
    }

    this.queuePos++;
    if (this.queuePos >= this.queue.length) {
      this.isComplete = true;
      return;
    }

    this.isFlipped = false;
  }

  restart() {
    this.queue = this.cards.map((_, i) => i);
    this.queuePos = 0;
    this.isFlipped = false;
    this.scores = { again: 0, good: 0, easy: 0 };
    this.isComplete = false;
  }

  setTheme(theme: ThemeName) {
    this.theme.set(theme);
  }

  themeLabel(theme: ThemeName): string {
    if (theme === 'rose') {
      return 'Rose Pine';
    }

    if (theme === 'dawn') {
      return 'Dawn';
    }

    return 'Gold';
  }

  examplesFor(card: Flashcard): Array<{ jp: string; en: string }> {
    const jpExamples = this.splitExamples(card.ex_jp);
    const enExamples = this.splitExamples(card.ex_en);
    const total = Math.max(jpExamples.length, enExamples.length, 1);

    return Array.from({ length: total }, (_, index) => ({
      jp: jpExamples[index] ?? '',
      en: enExamples[index] ?? '',
    })).filter((example) => example.jp || example.en);
  }

  private splitExamples(value: string): string[] {
    return value
      .split(/\n+|\|\|/g)
      .map((part) => part.trim())
      .filter(Boolean);
  }
}
