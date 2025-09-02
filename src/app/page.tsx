import { CalendarDialog } from "@/components/calendar/calendar-dialog";
import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { CalendarProvider } from "@/components/calendar/calendar-provider";
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";

export default function Home() {
  return (
    <CalendarProvider>
      <div className="flex flex-col h-screen">
        <CalendarHeader />
        <div className="flex flex-1 overflow-hidden">
          <CalendarSidebar />
          <div className="flex-1 overflow-hidden">
            <CalendarGrid />
          </div>
        </div>
        <CalendarDialog />
      </div>
    </CalendarProvider>
  );
}
