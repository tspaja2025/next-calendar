'use client';

import React from 'react';
import { useCalendar } from '@/components/calendar/calendar-provider';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isSameDay,
  isToday,
  addMonths,
  subMonths
} from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function MiniCalendar() {
  const { currentDate, setCurrentDate, events } = useCalendar();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const hasEventsOnDay = (day: Date) => {
    return events.some(event => 
      isSameDay(event.startDate, day) || 
      (event.startDate <= day && event.endDate >= day)
    );
  };

  const handleDayClick = (day: Date) => {
    setCurrentDate(day);
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="space-y-3">
      {/* Mini calendar header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevMonth}
            className="w-6 h-6 p-0 hover:bg-gray-100"
          >
            <ChevronLeft className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextMonth}
            className="w-6 h-6 p-0 hover:bg-gray-100"
          >
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="text-xs text-gray-500 text-center py-1 font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isCurrentDay = isToday(day);
          const isSelected = isSameDay(day, currentDate);
          const hasEvents = hasEventsOnDay(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              className={`
                relative w-8 h-8 text-xs rounded-full transition-all hover:bg-gray-100
                ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                ${isCurrentDay ? 'bg-[#1a73e8] text-white hover:bg-[#1557b0]' : ''}
                ${isSelected && !isCurrentDay ? 'bg-gray-200' : ''}
              `}
            >
              {format(day, 'd')}
              {hasEvents && !isCurrentDay && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#1a73e8] rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}