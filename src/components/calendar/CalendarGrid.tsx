"use client";

import { useCalendar } from "@/components/calendar/CalendarProvider";
import { DayView } from "@/components/calendar/views/DayView";
import { MonthView } from "@/components/calendar/views/MonthView";
import { WeekView } from "@/components/calendar/views/WeekView";

export function CalendarGrid() {
  const { view } = useCalendar();

  return (
    <div className="flex-1 overflow-y-auto">
      {view === "month" && <MonthView />}
      {view === "week" && <WeekView />}
      {view === "day" && <DayView />}
    </div>
  );
}
