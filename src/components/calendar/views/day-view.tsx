'use client';

import React from 'react';
import {
    format,
    isSameDay,
    isToday,
    getHours
} from 'date-fns';
import { CalendarEvent, useCalendar } from '@/components/calendar/calendar-provider';

export function DayView() {
    const {
        currentDate,
        events,
        setSelectedEvent,
        setIsEventDialogOpen,
        setSelectedDate
    } = useCalendar();

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getEventsForHour = (hour: number) => {
        return events.filter(event => {
            if (event.allDay && isSameDay(event.startDate, currentDate)) {
                return true;
            }
            return isSameDay(event.startDate, currentDate) && getHours(event.startDate) === hour;
        });
    };

    const handleTimeSlotClick = (hour: number) => {
        const selectedDateTime = new Date(currentDate);
        selectedDateTime.setHours(hour, 0, 0, 0);
        setSelectedDate(selectedDateTime);
        setSelectedEvent(null);
        setIsEventDialogOpen(true);
    };

    const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedEvent(event);
        setIsEventDialogOpen(true);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Day header */}
            <div className="border-b border-gray-200 bg-gray-50 p-4">
                <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">
                        {format(currentDate, 'EEEE')}
                    </div>
                    <div className={`
            text-2xl font-medium w-12 h-12 flex items-center justify-center rounded-full mx-auto mt-1
            ${isToday(currentDate) ? 'bg-[#1a73e8] text-white' : 'text-gray-900'}
          `}>
                        {format(currentDate, 'd')}
                    </div>
                </div>
            </div>

            {/* All-day events */}
            <div className="border-b border-gray-200 bg-gray-50 p-4">
                <div className="text-sm font-medium text-gray-600 mb-2">All day</div>
                <div className="space-y-1">
                    {events.filter(event => event.allDay && isSameDay(event.startDate, currentDate)).map(event => (
                        <div
                            key={event.id}
                            onClick={(e) => handleEventClick(event, e)}
                            className="text-sm p-2 rounded text-white cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ backgroundColor: event.color }}
                        >
                            {event.title}
                        </div>
                    ))}
                </div>
            </div>

            {/* Time slots */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2">
                    {hours.map(hour => {
                        const hourEvents = getEventsForHour(hour);
                        return (
                            <React.Fragment key={hour}>
                                <div className="p-2 border-r border-b border-gray-200 text-right text-sm text-gray-600 bg-gray-50">
                                    {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                                </div>
                                <div
                                    onClick={() => handleTimeSlotClick(hour)}
                                    className="border-b border-gray-200 min-h-[60px] p-2 hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    {hourEvents.map(event => (
                                        <div
                                            key={event.id}
                                            onClick={(e) => handleEventClick(event, e)}
                                            className="text-sm p-2 rounded text-white cursor-pointer hover:opacity-80 transition-opacity mb-1"
                                            style={{ backgroundColor: event.color }}
                                        >
                                            {format(event.startDate, 'HH:mm')} {event.title}
                                        </div>
                                    ))}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}