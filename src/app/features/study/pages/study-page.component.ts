import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { CardWorkspaceStore } from '../../../core/services/card-workspace.store';
import { PreferencesStore } from '../../../core/services/preferences.store';

@Component({
  selector: 'app-study-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './study-page.component.html',
})
export class StudyPageComponent {
  readonly queue = signal<number[]>([]);
  readonly queuePos = signal(0);
  readonly isFlipped = signal(false);
  readonly isComplete = signal(false);
  readonly scores = signal({ again: 0, good: 0, easy: 0 });

  readonly current = computed(() => {
    const queue = this.queue();
    const cards = this.store.cards();
    const queuePos = this.queuePos();

    if (!queue.length || queuePos >= queue.length) {
      return null;
    }

    return cards[queue[queuePos]] ?? null;
  });

  readonly progress = computed(() => {
    const queue = this.queue();
    if (!queue.length) {
      return 0;
    }

    return Math.round((this.queuePos() / queue.length) * 100);
  });

  constructor(
    readonly store: CardWorkspaceStore,
    readonly preferences: PreferencesStore,
  ) {
    void this.store.ensureLoaded();

    effect(() => {
      const cards = this.store.cards();
      if (!cards.length) {
        return;
      }

      if (!this.queue().length || this.queue().some((index) => index >= cards.length)) {
        this.restart();
      }
    });
  }

  flip(): void {
    if (this.current()) {
      this.isFlipped.set(true);
    }
  }

  async grade(rating: 0 | 1 | 2): Promise<void> {
    const current = this.current();
    if (!current || !this.isFlipped()) {
      return;
    }

    this.scores.update((scores) => ({
      again: scores.again + (rating === 0 ? 1 : 0),
      good: scores.good + (rating === 1 ? 1 : 0),
      easy: scores.easy + (rating === 2 ? 1 : 0),
    }));

    this.store.saveReview(current.id, rating).catch(console.error);

    if (rating === 0) {
      const queue = [...this.queue()];
      const cardIndex = queue[this.queuePos()];
      queue.splice(Math.min(this.queuePos() + 3, queue.length), 0, cardIndex);
      this.queue.set(queue);
    }

    const nextPosition = this.queuePos() + 1;
    this.queuePos.set(nextPosition);

    if (nextPosition >= this.queue().length) {
      this.isComplete.set(true);
      return;
    }

    this.isFlipped.set(false);
  }

  restart(): void {
    this.queue.set(this.store.cards().map((_, index) => index));
    this.queuePos.set(0);
    this.isFlipped.set(false);
    this.isComplete.set(false);
    this.scores.set({ again: 0, good: 0, easy: 0 });
  }
}
