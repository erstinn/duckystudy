import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

export interface Flashcard {
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
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getCards(): Promise<Flashcard[]> {
    const { data, error } = await this.client
      .from('flashcards')
      .select('*')
      .order('lesson')
      .order('section');

    if (error) {
      console.error('[Supabase] flashcards query failed:', error);
      throw error;
    }

    // console.group('[Supabase] flashcards query result');
    // console.log('row count:', data?.length ?? 0);
    // console.table(
    //   (data ?? []).map((card) => ({
    //     id: card.id,
    //     lesson: card.lesson,
    //     section: card.section,
    //     english: card.english,
    //     kanji: card.kanji,
    //     hira: card.hira,
    //   }))
    // );
    // console.log('raw rows:', JSON.stringify(data, null, 2));
    // console.groupEnd();

    return data as Flashcard[];
  }

  async saveGrade(cardId: string, grade: number): Promise<void> {
    const { error } = await this.client
      .from('card_progress')
      .insert({ card_id: cardId, grade });
    if (error) throw error;
  }
}
