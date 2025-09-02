"use client";

import { useCalendar } from "@/components/calendar/calendar-provider"
import { DayView } from "@/components/calendar/views/day-view";
import { MonthView } from "@/components/calendar/views/month-view";
import { WeekView } from "@/components/calendar/views/week-view";

export function CalendarGrid() {
    const { view } = useCalendar();

    return (
        <div className="flex-1 overflow-hidden">
            {view === 'month' && <MonthView />}
            {view === 'week' && <WeekView />}
            {view === 'day' && <DayView />}
        </div>
    )
}