"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventCalendar from "@/components/EventCalendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

interface BookingData {
  date: Date | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
}

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export default function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    date: null,
    time: null,
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDateChange = (date: Date) => {
    // Check if date is in the future and within 3 months
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    if (date >= today && date <= threeMonthsFromNow) {
      setBookingData({ ...bookingData, date });
    }
  };

  const handleTimeSelect = (time: string) => {
    setBookingData({ ...bookingData, time });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setStep(4);
      } else {
        alert("שגיאה בשליחת הטופס. אנא נסו שוב.");
      }
    } catch (error) {
      alert("שגיאה בשליחת הטופס. אנא נסו שוב.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setBookingData({
      date: null,
      time: null,
      name: "",
      phone: "",
      email: "",
    });
    setIsSuccess(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("he-IL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

  // Sample events for demonstration
  const sampleEvents = [
    {
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      name: "קובי אפללו",
      time: "10:00",
      color: "purple" as const,
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      name: "שרה כהן",
      time: "14:30",
      color: "blue" as const,
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 12)),
      name: "דוד לוי",
      time: "11:00",
      color: "green" as const,
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 15)),
      name: "מיכל ברק",
      time: "15:00",
      color: "orange" as const,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-6 lg:p-12 shadow-2xl border-2 border-red-100">
        {/* Progress Indicator */}
        {!isSuccess && (
          <div className="mb-8">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s
                        ? "bg-red-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        step > s ? "bg-red-600" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between max-w-2xl mx-auto mt-2">
              <span className="text-sm font-medium text-slate-600">
                בחירת תאריך
              </span>
              <span className="text-sm font-medium text-slate-600">
                בחירת שעה
              </span>
              <span className="text-sm font-medium text-slate-600">
                פרטים אישיים
              </span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Date Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <CalendarIcon className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                בחרו תאריך לפגישה
              </h3>
              <p className="text-slate-600 mb-8">
                בחרו תאריך נוח עבורכם מהיומן
              </p>

              <div className="mb-8">
                <EventCalendar
                  selectedDate={bookingData.date}
                  onDateSelect={handleDateChange}
                  minDate={today}
                  maxDate={threeMonthsFromNow}
                  events={sampleEvents}
                />
              </div>

              {bookingData.date && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-lg text-slate-700 mb-6">
                    תאריך נבחר: <strong>{formatDate(bookingData.date)}</strong>
                  </p>
                  <Button
                    onClick={() => setStep(2)}
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg font-bold rounded-xl"
                  >
                    המשך לבחירת שעה
                    <ArrowLeft className="mr-2 w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <Clock className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                בחרו שעה לפגישה
              </h3>
              <p className="text-slate-600 mb-2">
                {bookingData.date && formatDate(bookingData.date)}
              </p>
              <p className="text-slate-500 mb-8">בחרו שעה נוחה עבורכם</p>

              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-8 max-w-2xl mx-auto">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      bookingData.time === time
                        ? "bg-red-600 text-white shadow-lg scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border-2 border-transparent"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg"
                >
                  <ArrowRight className="ml-2 w-5 h-5" />
                  חזרה
                </Button>
                {bookingData.time && (
                  <Button
                    onClick={() => setStep(3)}
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg font-bold rounded-xl"
                  >
                    המשך למילוי פרטים
                    <ArrowLeft className="mr-2 w-5 h-5" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Form */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl mx-auto"
            >
              <User className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-slate-900 mb-2 text-center">
                פרטים אישיים
              </h3>
              <p className="text-slate-600 mb-2 text-center">
                {bookingData.date && formatDate(bookingData.date)} בשעה{" "}
                {bookingData.time}
              </p>
              <p className="text-slate-500 mb-8 text-center">
                אנא מלאו את הפרטים שלכם
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-right text-slate-700 font-medium mb-2">
                    שם מלא <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full pr-12 pl-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:outline-none text-right"
                      placeholder="הזינו את שמכם המלא"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-right text-slate-700 font-medium mb-2">
                    טלפון <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleFormChange}
                      required
                      className="w-full pr-12 pl-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:outline-none text-right"
                      placeholder="05X-XXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-right text-slate-700 font-medium mb-2">
                    אימייל <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full pr-12 pl-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:outline-none text-right"
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    variant="outline"
                    size="lg"
                    className="flex-1 py-6 text-lg"
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                    חזרה
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold rounded-xl"
                  >
                    {isSubmitting ? "שולח..." : "אישור וקביעת פגישה"}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && isSuccess && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
              </motion.div>
              <h3 className="text-4xl font-black text-slate-900 mb-4">
                הפגישה נקבעה בהצלחה!
              </h3>
              <p className="text-xl text-slate-600 mb-2">
                תודה {bookingData.name}!
              </p>
              <p className="text-lg text-slate-600 mb-8">
                הפגישה שלכם נקבעה ל
                <strong>
                  {bookingData.date && formatDate(bookingData.date)}
                </strong>{" "}
                בשעה <strong>{bookingData.time}</strong>
              </p>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-md mx-auto mb-8">
                <p className="text-slate-700">
                  נשלח אליכם אישור בדוא"ל לכתובת:
                  <br />
                  <strong className="text-slate-900">{bookingData.email}</strong>
                </p>
                <p className="text-slate-600 mt-4">
                  ניצור אתכם קשר בקרוב בטלפון: <strong>{bookingData.phone}</strong>
                </p>
              </div>
              <Button
                onClick={resetBooking}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg font-bold rounded-xl"
              >
                קבעו פגישה נוספת
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
