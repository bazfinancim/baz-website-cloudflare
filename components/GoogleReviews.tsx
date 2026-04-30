"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const reviews = [
  {
    name: "מירב ישועה",
    rating: 5,
    text: "צוות מקצועי. חסכו לי סכום משמעותי לפנסיה וארגנו את התיק שלי לקראת פרישה.",
    date: "ספטמבר 2023",
  },
  {
    name: "ימית כתרה",
    rating: 5,
    text: "מאוד מקצועיים. אחרי שנים של בלבול בביטוחים, הם ארגנו הכל - במיוחד המומחיות ההשקעתית של רמי. שירות אישי וחם.",
    date: "אוגוסט 2023",
  },
  {
    name: "גל גלית ממן",
    rating: 5,
    text: "בז פיננסים = שקט נפשי! שירות חם ומכובד עם תשומת לב לפרטים. תודה לרמי על הבדיקות היסודיות.",
    date: "אוגוסט 2023",
  },
  {
    name: "נתי עמור",
    rating: 5,
    text: "אחרי 20 שנה עם סוכן אחר, הם טיפלו בביטוח תוך שבוע. רמי ארגן את הפנסיה והחיסכון בצורה מצוינת.",
    date: "אוגוסט 2023",
  },
  {
    name: "אבנר כהן",
    rating: 5,
    text: "שירות מעולה. הבעלים אבי שומר על תעריפי ביטוח תחרותיים והשיג חיסכון משמעותי בפנסיה.",
    date: "אוגוסט 2023",
  },
  {
    name: "רויד נסי",
    rating: 5,
    text: "שירות מעולה, תשומת לב אישית, מקצועיות. בעיות נפתרו במהירות עם יחס הוגן והסברים.",
    date: "יולי 2023",
  },
  {
    name: "ליאת בוס",
    rating: 5,
    text: "ממליצה בחום! שירות אישי, מקצועי, חם ואותנטי. רמי בסבלנות ומיומנות מרשימות.",
    date: "יולי 2023",
  },
  {
    name: "גל גלית ממן",
    rating: 5,
    text: "שירות מקצועי ואישי ברמה הגבוהה ביותר. ממליצה בחום על בז פיננסים!",
    date: "אוגוסט 2023",
  },
];

export default function GoogleReviews() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              alt="Google"
              className="h-8"
            />
            <span className="text-3xl font-bold text-slate-900">ביקורות</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-slate-900">5.0</span>
          </div>
          <p className="text-slate-600 text-lg">מבוסס על 94 ביקורות (62 ב-Google, 32 ב-Facebook)</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full border-2 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{review.name}</h3>
                    <p className="text-sm text-slate-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed">{review.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
