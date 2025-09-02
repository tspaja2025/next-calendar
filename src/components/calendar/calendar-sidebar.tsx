'use client';

import React from 'react';
import { useCalendar } from '@/components/calendar/calendar-provider';
import { MiniCalendar } from '@/components/calendar/mini-calendar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { EventFilters } from '@/components/calendar/event-filters';

export function CalendarSidebar() {
  const { setSelectedEvent, setSelectedDate, setIsEventDialogOpen } = useCalendar();

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setSelectedDate(new Date());
    setIsEventDialogOpen(true);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Create button */}
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={handleCreateEvent}
          className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white flex items-center gap-2 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Create
        </Button>
      </div>

      {/* Mini Calendar */}
      <div className="p-4 border-b border-gray-200">
        <MiniCalendar />
      </div>

      {/* Event Filters */}
      <div className="flex-1 p-4">
        <EventFilters />
      </div>
    </div>
  );
}