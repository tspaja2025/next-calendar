"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    color: string;
    allDay: boolean;
}

export type CalendarView = 'month' | 'week' | 'day';

interface CalendarContextType {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    view: CalendarView;
    setView: (view: CalendarView) => void;
    events: CalendarEvent[];
    setEvents: (events: CalendarEvent[]) => void;
    hiddenColors: string[];
    setHiddenColors: (colors: string[]) => void;
    selectedEvent: CalendarEvent | null;
    setSelectedEvent: (event: CalendarEvent | null) => void;
    isEventDialogOpen: boolean;
    setIsEventDialogOpen: (open: boolean) => void;
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
    updateEvent: (event: CalendarEvent) => void;
    deleteEvent: (id: string) => void;
    getVisibleEvents: () => CalendarEvent[];
}

const calendarContext = createContext<CalendarContextType | undefined>(undefined);

const eventColors = [
    '#1a73e8', // Google Blue
    '#137333', // Green
    '#d50000', // Red
    '#f9ab00', // Yellow
    '#9c27b0', // Purple
    '#ff6d01', // Orange
    '#795548', // Brown
    '#607d8b', // Blue Grey
]

export function CalendarProvider({ children }: { children: ReactNode }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<CalendarView>('month');
    const [events, setEvents] = useState<CalendarEvent[]>([
        {
            id: '1',
            title: 'Team Meeting',
            description: 'Weekly team sync',
            startDate: new Date(2025, 0, 15, 10, 0),
            endDate: new Date(2025, 0, 15, 11, 0),
            color: '#1a73e8',
            allDay: false,
        },
        {
            id: '2',
            title: 'Project Deadline',
            description: 'Submit final project',
            startDate: new Date(2025, 0, 20, 9, 0),
            endDate: new Date(2025, 0, 20, 17, 0),
            color: '#d50000',
            allDay: false,
        },
    ]);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [hiddenColors, setHiddenColors] = useState<string[]>([]);

    const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
        const newEvent: CalendarEvent = {
            ...eventData,
            id: Math.random().toString(36).substr(2, 9),
            color: eventData.color || eventColors[Math.floor(Math.random() * eventColors.length)],
        };
        setEvents(prev => [...prev, newEvent]);
    };

    const updateEvent = (updatedEvent: CalendarEvent) => {
        setEvents(prev => prev.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
        ));
    };

    const deleteEvent = (id: string) => {
        setEvents(prev => prev.filter(event => event.id !== id));
    };

    const getVisibleEvents = () => {
        return events.filter(event => !hiddenColors.includes(event.color));
    };

    return (
        <calendarContext.Provider value={{
            currentDate,
            setCurrentDate,
            view,
            setView,
            events,
            setEvents,
            hiddenColors,
            setHiddenColors,
            selectedEvent,
            setSelectedEvent,
            isEventDialogOpen,
            setIsEventDialogOpen,
            selectedDate,
            setSelectedDate,
            addEvent,
            updateEvent,
            deleteEvent,
            getVisibleEvents,
        }}>
            {children}
        </calendarContext.Provider>
    )
}

export function useCalendar() {
    const context = useContext(calendarContext);

    if (context === undefined) {
        throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
}