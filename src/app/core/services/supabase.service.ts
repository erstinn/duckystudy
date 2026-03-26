import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { CardExample, StudyCard } from '../models/card.models';

interface FlashcardRow {
  id: string;
  lesson: string;
  section: string;
  kanji: string;
  hira: string;
  pos: string;
  english: string;
  definition: string;
  ex_jp: string;
  ex_en: string;
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getCards(): Promise<StudyCard[]> {
    const { data, error } = await this.client
      .from('flashcards')
      .select('*')
      .order('lesson')
      .order('section');

    if (error) {
      console.error('[Supabase] flashcards query failed:', error);
      throw error;
    }

    return (data as FlashcardRow[]).map((row) => this.mapRow(row));
  }

  async saveGrade(cardId: string, grade: number): Promise<void> {
    const { error } = await this.client.from('card_progress').insert({ card_id: cardId, grade });
    if (error) {
      throw error;
    }
  }

  private mapRow(row: FlashcardRow): StudyCard {
    return {
      id: row.id,
      lesson: row.lesson,
      section: row.section,
      kanji: row.kanji,
      hira: row.hira,
      pos: row.pos,
      english: row.english,
      definition: row.definition,
      examples: this.mapExamples(row.ex_jp, row.ex_en),
    };
  }

  private mapExamples(japanese: string, english: string): CardExample[] {
    const jpLines = this.splitExamples(japanese);
    const enLines = this.splitExamples(english);
    const total = Math.max(jpLines.length, enLines.length, 0);

    return Array.from({ length: total }, (_, index) => ({
      id: crypto.randomUUID(),
      sourceText: jpLines[index] ?? '',
      translationText: enLines[index] ?? '',
    })).filter((example) => example.sourceText || example.translationText);
  }

  private splitExamples(value: string): string[] {
    return value
      .split(/\n+|\|\|/g)
      .map((part) => part.trim())
      .filter(Boolean);
  }
}
