export type EventColors = {
  name: string;
  value: string;
};

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color: string | EventColors;
  allDay: boolean;
}

export type CalendarView = "month" | "week" | "day";

export interface CalendarContextType {
  // Core state
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  view: CalendarView;
  setView: (view: CalendarView) => void;
  events: CalendarEvent[];

  // Filtering
  hiddenColors: string[];
  setHiddenColors: (colors: string[]) => void;
  toggleColorVisibility: (color: string) => void;
  visibleEvents: CalendarEvent[];

  // Dialog state
  selectedEvent: CalendarEvent | null;
  selectedDate: Date | null;
  isEventDialogOpen: boolean;
  openEventDialog: (date: Date, event?: CalendarEvent) => void;
  closeEventDialog: () => void;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  setIsEventDialogOpen: (open: boolean) => void;
  setSelectedDate: (date: Date | null) => void;

  // CRUD
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
}
