'use client';

import React from 'react';
import {
    startOfWeek,
    addDays,
    format,
    isSameDay,
    isToday,
    getHours,
} from 'date-fns';
import { CalendarEvent, useCalendar } from '@/components/calendar/calendar-provider';

export function WeekView() {
    const {
        currentDate,
        events,
        setSelectedEvent,
        setIsEventDialogOpen,
        setSelectedDate
    } = useCalendar();

    const weekStart = startOfWeek(currentDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getEventsForDayAndHour = (day: Date, hour: number) => {
        return events.filter(event => {
            if (event.allDay && isSameDay(event.startDate, day)) {
                return true;
            }
            return isSameDay(event.startDate, day) && getHours(event.startDate) === hour;
        });
    };

    const handleTimeSlotClick = (day: Date, hour: number) => {
        const selectedDateTime = new Date(day);
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
            {/* Day headers */}
            <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
                <div className="p-4 border-r border-gray-200"></div>
                {weekDays.map(day => (
                    <div key={day.toISOString()} className="p-4 text-center border-r border-gray-200">
                        <div className="text-sm font-medium text-gray-600">
                            {format(day, 'EEE')}
                        </div>
                        <div className={`
              text-lg font-medium w-8 h-8 flex items-center justify-center rounded-full mx-auto mt-1
              ${isToday(day) ? 'bg-[#1a73e8] text-white' : 'text-gray-900'}
            `}>
                            {format(day, 'd')}
                        </div>
                    </div>
                ))}
            </div>

            {/* Time slots */}
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-8">
                    {hours.map(hour => (
                        <React.Fragment key={hour}>
                            <div className="p-2 border-r border-b border-gray-200 text-right text-sm text-gray-600 bg-gray-50">
                                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                            </div>
                            {weekDays.map(day => {
                                const dayEvents = getEventsForDayAndHour(day, hour);
                                return (
                                    <div
                                        key={`${day.toISOString()}-${hour}`}
                                        onClick={() => handleTimeSlotClick(day, hour)}
                                        className="border-r border-b border-gray-200 min-h-[60px] p-1 hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        {dayEvents.map(event => (
                                            <div
                                                key={event.id}
                                                onClick={(e) => handleEventClick(event, e)}
                                                className="text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 transition-opacity mb-1 truncate"
                                                style={{ backgroundColor: event.color }}
                                            >
                                                {event.allDay ? event.title : `${format(event.startDate, 'HH:mm')} ${event.title}`}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}