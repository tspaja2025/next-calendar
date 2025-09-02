"use client";

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCalendar } from "@/components/calendar/calendar-provider";
import { format, startOfToday, subMonths } from 'date-fns';

export function CalendarHeader() {
    const {
        currentDate,
        setCurrentDate,
        view,
        setView,
    } = useCalendar();

    const handlePrevious = () => {
        if (view === 'month') {
            setCurrentDate(subMonths(currentDate, 1));
        } else if (view === 'week') {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() - 7);
            setCurrentDate(newDate);
        } else {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() - 1);
            setCurrentDate(newDate);
        }
    }

    const handleNext = () => {
        if (view === 'month') {
            setCurrentDate(subMonths(currentDate, 1));
        } else if (view === 'week') {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() + 7);
            setCurrentDate(newDate);
        } else {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() + 1);
            setCurrentDate(newDate);
        }
    }

    const handleToday = () => {
        setCurrentDate(startOfToday());
    }

    const getDateTitle = () => {
        if (view === 'month') {
            return format(currentDate, 'MMMM yyyy')
        } else if (view === 'week') {
            return format(currentDate, 'MMMM yyyy')
        } else {
            return format(currentDate, 'EEEE, MMMM d, yyyy')
        }
    }

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-2">
                <CalendarIcon />
                <h1 className="text-xl font-medium text-gray-900">Calendar</h1>
            </div>
            <div className="flex items-center">
                <Button variant="outline" size="sm" onClick={handlePrevious}>
                    <ChevronLeftIcon />
                </Button>
                <h2 className="text-xl font-medium text-gray-900 min-w-[200px] text-center">
                    {getDateTitle()}
                </h2>
                <Button variant="outline" size="sm" onClick={handleNext}>
                    <ChevronRightIcon />
                </Button>
            </div>
            <div className="flex items-center h-full gap-2">
                <Button variant="outline" size="sm" onClick={handleToday}>Today</Button>
                <Separator orientation="vertical" />
                <Button variant={view === 'month' ? 'default' : 'ghost'} size="sm" onClick={() => setView('month')}>Month</Button>
                <Button variant={view === 'week' ? 'default' : 'ghost'} size="sm" onClick={() => setView('week')}>Week</Button>
                <Button variant={view === 'day' ? 'default' : 'ghost'} size="sm" onClick={() => setView('day')}>Day</Button>
            </div>
        </header>
    )
}