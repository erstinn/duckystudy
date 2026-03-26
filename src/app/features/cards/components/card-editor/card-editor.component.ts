import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardExample, StudyCard, StudyCardDraft } from '../../../../core/models/card.models';

@Component({
  selector: 'app-card-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-editor.component.html',
})
export class CardEditorComponent {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() set card(value: StudyCard | null) {
    this.draft = value ? this.cloneCard(value) : this.createEmptyDraft();
  }

  @Output() saveCard = new EventEmitter<StudyCardDraft>();
  @Output() cancelEdit = new EventEmitter<void>();

  draft: StudyCardDraft = this.createEmptyDraft();

  addExample(): void {
    this.draft.examples.push({
      id: crypto.randomUUID(),
      sourceText: '',
      translationText: '',
    });
  }

  removeExample(index: number): void {
    this.draft.examples.splice(index, 1);
  }

  submit(): void {
    this.saveCard.emit({
      ...this.draft,
      examples: this.draft.examples.map((example) => ({ ...example })),
    });
  }

  reset(): void {
    this.draft = this.createEmptyDraft();
    this.cancelEdit.emit();
  }

  trackExample(_: number, example: CardExample): string {
    return example.id;
  }

  private createEmptyDraft(): StudyCardDraft {
    return {
      lesson: '',
      section: '',
      kanji: '',
      hira: '',
      pos: '',
      english: '',
      definition: '',
      examples: [{ id: crypto.randomUUID(), sourceText: '', translationText: '' }],
    };
  }

  private cloneCard(card: StudyCard): StudyCardDraft {
    return {
      id: card.id,
      lesson: card.lesson,
      section: card.section,
      kanji: card.kanji,
      hira: card.hira,
      pos: card.pos,
      english: card.english,
      definition: card.definition,
      examples: card.examples.length
        ? card.examples.map((example) => ({ ...example }))
        : [{ id: crypto.randomUUID(), sourceText: '', translationText: '' }],
    };
  }
}
