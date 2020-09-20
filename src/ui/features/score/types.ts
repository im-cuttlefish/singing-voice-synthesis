export interface Note {
  pitch: string;
  from: number;
  duration: number;
}

export interface Score {
  notes: Note[];
}
