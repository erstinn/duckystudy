import { Injectable, computed, signal } from '@angular/core';
import { StudyCard, StudyCardDraft } from '../models/card.models';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class CardWorkspaceStore {
  readonly cards = signal<StudyCard[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  readonly totalCards = computed(() => this.cards().length);

  private hasLoaded = false;

  constructor(private readonly supabase: SupabaseService) {}

  async ensureLoaded(): Promise<void> {
    if (this.hasLoaded || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const cards = await this.supabase.getCards();
      this.cards.set(cards);
      this.hasLoaded = true;
    } catch (error) {
      console.error(error);
      this.errorMessage.set(error instanceof Error ? error.message : 'Failed to load cards.');
    } finally {
      this.isLoading.set(false);
    }
  }

  addCard(draft: StudyCardDraft): void {
    const nextCard = this.normalizeDraft(draft);
    this.cards.update((cards) => [nextCard, ...cards]);
  }

  updateCard(draft: StudyCardDraft): void {
    if (!draft.id) {
      return;
    }

    const nextCard = this.normalizeDraft(draft);
    this.cards.update((cards) => cards.map((card) => (card.id === nextCard.id ? nextCard : card)));
  }

  deleteCard(cardId: string): void {
    this.cards.update((cards) => cards.filter((card) => card.id !== cardId));
  }

  async saveReview(cardId: string, grade: number): Promise<void> {
    await this.supabase.saveGrade(cardId, grade);
  }

  private normalizeDraft(draft: StudyCardDraft): StudyCard {
    return {
      id: draft.id ?? crypto.randomUUID(),
      lesson: draft.lesson.trim() || 'Custom',
      section: draft.section.trim() || 'Draft',
      kanji: draft.kanji.trim(),
      hira: draft.hira.trim(),
      pos: draft.pos.trim() || 'word',
      english: draft.english.trim(),
      definition: draft.definition.trim(),
      examples: draft.examples
        .map((example) => ({
          id: example.id || crypto.randomUUID(),
          sourceText: example.sourceText.trim(),
          translationText: example.translationText.trim(),
        }))
        .filter((example) => example.sourceText || example.translationText),
    };
  }
}
