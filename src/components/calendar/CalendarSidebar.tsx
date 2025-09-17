"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useCalendar } from "@/components/calendar/CalendarProvider";
import { MiniCalendar } from "@/components/calendar/MiniCalendar";
import { EventFilters } from "@/components/calendar/EventFilters";

export function CalendarSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { setSelectedEvent, setSelectedDate, setIsEventDialogOpen } =
    useCalendar();

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setSelectedDate(new Date());
    setIsEventDialogOpen(true);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 justify-center border-b">
        {/* Create button */}
        <Button onClick={handleCreateEvent}>
          <PlusIcon /> Create
        </Button>
      </SidebarHeader>
      <SidebarContent className="px-4">
        {/* Mini Calendar */}
        <MiniCalendar />
        {/* Event Filters */}
        <EventFilters />
      </SidebarContent>
    </Sidebar>
  );
}
