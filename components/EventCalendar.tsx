"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CalendarEvent {
  date: Date;
  name: string;
  time?: string;
  color?: "red" | "blue" | "green" | "purple" | "orange";
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  events?: CalendarEvent[];
}

interface EventCalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  events?: CalendarEvent[];
}

export default function EventCalendar({ onDateSelect, selectedDate, minDate, maxDate, events = [] }: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ];

  const weekDays = ["ראש", "שני", "שלי", "רבי", "חמי", "שיש", "שבת"];

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: CalendarDay[] = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true,
      });
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDay = new Date(year, month, i);
      const isToday = currentDay.toDateString() === today.toDateString();
      const isSelected = selectedDate ? currentDay.toDateString() === selectedDate.toDateString() : false;

      let isDisabled = false;
      if (minDate || maxDate) {
        const dayStart = new Date(year, month, i);
        dayStart.setHours(0, 0, 0, 0);

        if (minDate) {
          const min = new Date(minDate);
          min.setHours(0, 0, 0, 0);
          isDisabled = dayStart < min;
        }

        if (maxDate && !isDisabled) {
          const max = new Date(maxDate);
          max.setHours(23, 59, 59, 999);
          isDisabled = dayStart > max;
        }
      }

      // Find events for this day
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === i &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        );
      });

      // If there are events, mark the day as disabled (taken)
      const hasEvents = dayEvents.length > 0;

      days.push({
        date: i,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isDisabled: isDisabled || hasEvents, // Disable if already booked
        events: dayEvents.length > 0 ? dayEvents : undefined,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true,
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth || day.isDisabled) return;

    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day.date
    );

    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border-2 border-red-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-200">
          <div className="flex items-center gap-4">
            <h5 className="text-2xl font-bold text-slate-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h5>
            <div className="flex items-center gap-1">
              <button
                onClick={previousMonth}
                className="text-red-600 p-2 rounded-lg transition-all duration-300 hover:text-white hover:bg-red-600"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="text-red-600 p-2 rounded-lg transition-all duration-300 hover:text-white hover:bg-red-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border border-red-200">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-red-200 bg-red-50">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={`py-3 text-center text-sm font-bold text-red-600 ${
                  index < 6 ? "border-l border-red-200" : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const isLastInRow = (index + 1) % 7 === 0;
              const isLastRow = index >= 35;

              const colorClasses = {
                red: "bg-red-50 border-red-200",
                blue: "bg-blue-50 border-blue-200",
                green: "bg-emerald-50 border-emerald-200",
                purple: "bg-purple-50 border-purple-200",
                orange: "bg-orange-50 border-orange-200",
              };

              const textColorClasses = {
                red: "text-red-700",
                blue: "text-blue-700",
                green: "text-emerald-700",
                purple: "text-purple-700",
                orange: "text-orange-700",
              };

              const hasEvents = day.events && day.events.length > 0;

              return (
                <div
                  key={index}
                  onClick={() => handleDayClick(day)}
                  className={`
                    flex flex-col min-h-[100px] p-2 relative
                    ${
                      hasEvents
                        ? "bg-gray-100 cursor-not-allowed opacity-75"
                        : day.isCurrentMonth && !day.isDisabled
                        ? "bg-white cursor-pointer"
                        : "bg-gray-50"
                    }
                    ${!isLastInRow ? "border-l border-red-200" : ""}
                    ${!isLastRow ? "border-b border-red-200" : ""}
                    ${day.isCurrentMonth && !day.isDisabled && !hasEvents ? "transition-all duration-300 hover:bg-red-50" : ""}
                    ${day.isDisabled ? "cursor-not-allowed" : ""}
                  `}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`
                        text-sm font-semibold
                        ${
                          day.isSelected
                            ? "text-white w-6 h-6 rounded-full flex items-center justify-center bg-red-600"
                            : day.isDisabled || hasEvents
                            ? "text-gray-400"
                            : day.isToday
                            ? "text-red-600"
                            : day.isCurrentMonth
                            ? "text-gray-900"
                            : "text-gray-400"
                        }
                      `}
                    >
                      {day.date}
                    </span>
                    {hasEvents && (
                      <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-0.5 rounded">
                        תפוס
                      </span>
                    )}
                  </div>

                  {/* Event Labels */}
                  {day.events && day.events.length > 0 && (
                    <div className="flex-1 flex flex-col gap-1">
                      {day.events.slice(0, 2).map((event, eventIndex) => {
                        const color = event.color || "red";
                        return (
                          <div
                            key={eventIndex}
                            className={`
                              px-1.5 py-1 rounded text-xs font-medium border
                              ${colorClasses[color]} ${textColorClasses[color]}
                              truncate
                            `}
                            title={`${event.name}${event.time ? ` - ${event.time}` : ""}`}
                          >
                            <div className="truncate">{event.name}</div>
                            {event.time && (
                              <div className="text-xs opacity-75">{event.time}</div>
                            )}
                          </div>
                        );
                      })}
                      {day.events.length > 2 && (
                        <div className="text-xs text-gray-600 font-medium bg-gray-200 px-1.5 py-0.5 rounded">
                          +{day.events.length - 2} נוספים
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
