"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-6", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-6 w-full",
        caption: "flex justify-between items-center px-2 mb-6 relative",
        caption_label: "text-3xl font-black text-slate-900",
        nav: "flex gap-2",
        nav_button: cn(
          "h-10 w-10 bg-transparent p-0 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors border-0"
        ),
        nav_button_previous: "order-1",
        nav_button_next: "order-2",
        table: "w-full border-collapse",
        head_row: "flex w-full",
        head_cell:
          "text-slate-900 font-bold text-lg w-full text-center py-4",
        row: "flex w-full border-b border-slate-200",
        cell: "relative p-0 text-center text-lg w-full border-r border-slate-200 last:border-r-0 h-20 focus-within:relative focus-within:z-20",
        day: cn(
          "h-full w-full p-0 font-semibold text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-center"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white focus:bg-indigo-600 focus:text-white font-bold",
        day_today: "bg-slate-100 font-black",
        day_outside:
          "day-outside text-slate-300 opacity-50",
        day_disabled: "text-slate-200 opacity-40 hover:bg-transparent cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === "left") {
            return <ChevronRight className="h-6 w-6" />
          }
          return <ChevronLeft className="h-6 w-6" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
