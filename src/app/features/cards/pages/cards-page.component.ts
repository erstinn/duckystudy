import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudyCard, StudyCardDraft } from '../../../core/models/card.models';
import { CardWorkspaceStore } from '../../../core/services/card-workspace.store';
import { CardEditorComponent } from '../components/card-editor/card-editor.component';

@Component({
  selector: 'app-cards-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CardEditorComponent],
  templateUrl: './cards-page.component.html',
})
export class CardsPageComponent {
  readonly searchTerm = signal('');
  readonly selectedCardId = signal<string | null>(null);
  readonly filteredCards = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();
    if (!searchTerm) {
      return this.store.cards();
    }

    return this.store.cards().filter((card) =>
      [card.english, card.kanji, card.hira, card.lesson, card.section, card.definition]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm),
    );
  });

  readonly selectedCard = computed(() => {
    const selectedCardId = this.selectedCardId();
    return this.store.cards().find((card) => card.id === selectedCardId) ?? null;
  });

  constructor(readonly store: CardWorkspaceStore) {
    void this.store.ensureLoaded();
  }

  selectCard(card: StudyCard): void {
    this.selectedCardId.set(card.id);
  }

  createCard(): void {
    this.selectedCardId.set(null);
  }

  saveCard(draft: StudyCardDraft): void {
    if (draft.id) {
      this.store.updateCard(draft);
      this.selectedCardId.set(draft.id);
      return;
    }

    this.store.addCard(draft);
  }

  deleteCard(cardId: string): void {
    this.store.deleteCard(cardId);

    if (this.selectedCardId() === cardId) {
      this.selectedCardId.set(null);
    }
  }
}
