"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Phone, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Formspree - free form service, no server needed
      const response = await fetch("https://formspree.io/f/xnnpvwna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("שגיאה בשליחת הטופס. אנא נסו שוב.");
      }
    } catch (error) {
      alert("שגיאה בשליחת הטופס. אנא נסו שוב.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 lg:p-12 shadow-2xl border-2 border-red-100 bg-white">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              ההודעה נשלחה בהצלחה!
            </h3>
            <p className="text-lg text-slate-600">
              תודה שפניתם אלינו. ניצור אתכם קשר בהקדם.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3">
                צרו קשר
              </h3>
              <p className="text-lg text-slate-600">
                מלאו את הפרטים ונחזור אליכם בהקדם
              </p>
            </div>

            <div>
              <label className="block text-right text-slate-700 font-medium mb-2">
                שם מלא <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full pr-12 pl-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:outline-none text-right transition-colors"
                  placeholder="הזינו את שמכם המלא" />
              </div>
            </div>

            <div>
              <label className="block text-right text-slate-700 font-medium mb-2">
                טלפון <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                  className="w-full pr-12 pl-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:outline-none text-right transition-colors"
                  placeholder="05X-XXXXXXX" />
              </div>
            </div>

            <div>
              <label className="block text-right text-slate-700 font-medium mb-2">
                אימייל <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full pr-12 pl-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:outline-none text-right transition-colors"
                  placeholder="example@email.com" dir="ltr" />
              </div>
            </div>

            <div>
              <label className="block text-right text-slate-700 font-medium mb-2">
                הודעה <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                  className="w-full pr-12 pl-4 py-3 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:outline-none text-right resize-none transition-colors"
                  placeholder="ספרו לנו איך נוכל לעזור לכם..." />
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} size="lg"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              {isSubmitting ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-3" />שולח...</>
              ) : (
                <><Send className="w-6 h-6 ml-3" />שלח הודעה</>
              )}
            </Button>

            <p className="text-center text-sm text-slate-500">
              או התקשרו אלינו ישירות:{" "}
              <a href="tel:+972123456789" className="text-red-600 font-bold hover:underline">123-456-789</a>
            </p>
          </form>
        )}
      </Card>
    </div>
  );
}
