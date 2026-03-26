export interface CardExample {
  id: string;
  sourceText: string;
  translationText: string;
}

export interface StudyCard {
  id: string;
  lesson: string;
  section: string;
  kanji: string;
  hira: string;
  pos: string;
  english: string;
  definition: string;
  examples: CardExample[];
}

export interface StudyCardDraft {
  id?: string;
  lesson: string;
  section: string;
  kanji: string;
  hira: string;
  pos: string;
  english: string;
  definition: string;
  examples: CardExample[];
}
