export interface Event {
  id: string;
  title: string;
  from: Date;
  to: Date;
}

export type Events = Event[];
