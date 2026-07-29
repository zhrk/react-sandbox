interface CalendarEvent {
  id: string;
  title: string;
  from: Date;
  to: Date;
}

export interface Props {
  events: CalendarEvent[];
  onSelect: (from: Date, to: Date) => void;
}
