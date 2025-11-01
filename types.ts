
export interface Word {
  english: string;
  type: string;
  definition: string;
  vietnamese: string;
}

export interface Topic {
  id: number;
  title: string;
  vietnameseTitle: string;
  words: Word[];
}
