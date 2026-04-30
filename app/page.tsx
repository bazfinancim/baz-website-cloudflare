"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Shield, Users, TrendingUp, Phone, Mail, Calendar, ArrowLeft, Loader2, Star, CheckCircle2, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GoogleReviews from "../components/GoogleReviews";
import SocialMedia from "../components/SocialMedia";
import BookingCalendar from "../components/BookingCalendar";
import ContactForm from "../components/ContactForm";

export default function HomeV3() {
  const [activeTestimonial, setActiveTestimonial] = useState(0); // This state is no longer directly used for the slider but keeping it for other potential uses or previous code parts.
  const [currentTestimonialVideo, setCurrentTestimonialVideo] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
  { video: "https://www.youtube.com/embed/GZHxlYVEPwo" },
  { video: "https://www.youtube.com/embed/hAQrCbk0XQw" },
  { video: "https://www.youtube.com/embed/J826y4W2VLs" },
  { video: "https://www.youtube.com/embed/K07G523iNnE" },
  { video: "https://www.youtube.com/embed/6TaJEZzSgUw" },
  { video: "https://www.youtube.com/embed/NsqCMlj1eoU" },
  { video: "https://www.youtube.com/embed/XGNRGDnJXrE" },
  { video: "https://www.youtube.com/embed/9se36j0ZZK0" },
  { video: "https://www.youtube.com/embed/O91WLn0y6fk" },
  { video: "https://www.youtube.com/embed/QM7LB1oZM3s" }];


  const videosPerSlide = 4;
  const totalSlides = Math.ceil(testimonials.length / videosPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentVideos = testimonials.slice(
    currentSlide * videosPerSlide,
    (currentSlide + 1) * videosPerSlide
  );

  const features = [
  {
    icon: Shield,
    title: "ניסיון מוכח",
    description: "עשרות שנות ניסיון בתחום הפיננסים והפנסיה"
  },
  {
    icon: Users,
    title: "שירות אישי",
    description: "ליווי צמוד ואישי לאורך כל התהליך"
  },
  {
    icon: TrendingUp,
    title: "תוצאות מוכחות",
    description: "מאות לקוחות חסכו מיליונים עם הייעוץ שלנו"
  },
  {
    icon: CheckCircle2,
    title: "שקיפות מלאה",
    description: "עבודה בשקיפות ומקצועיות מוחלטת"
  }];

  const services = [
  { title: "תכנון פיננסי מקיף - CFP", icon: TrendingUp },
  { title: "תכנוני פרישה", icon: Calendar },
  { title: "השקעות פנסיה ופיננסים", icon: TrendingUp },
  { title: "מעטפת ביטוחית", icon: Shield },
  { title: "ייעוץ משכנתאות", icon: Award },
  { title: "מסורבי הלוואות", icon: Users },
  { title: "העברה בן דורית", icon: Users },
  { title: "ליווי וייעוץ עסקי ואישי", icon: Award },
  { title: "ליווי כלכלי ובניית מודלים", icon: TrendingUp },
  { title: "ניהול וליווי תביעות מול חברות ביטוח גופי מדינה", icon: Shield },
  { title: "ניתוח תיק פנסיוני", icon: TrendingUp },
  { title: "תוכנית הריסטארט לליווי כלכלי פנסיוני מקיף", icon: Award },
  { title: "קורסים כלכליים ופיננסים", icon: Users }];



  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <style>{`
        @keyframes slowPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        .animate-slow-pulse {
          animation: slowPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes borderGlow {
          0% {
            box-shadow: inset 0 0 0 0 rgba(220, 38, 38, 0);
          }
          50% {
            box-shadow: inset 0 0 0 3px rgba(220, 38, 38, 0.8);
          }
          100% {
            box-shadow: inset 0 0 0 0 rgba(220, 38, 38, 0);
          }
        }

        .button-inner-glow {
          animation: borderGlow 3s ease-in-out infinite;
        }

        @keyframes lightSweep {
          0%, 100% {
            background-position: 100%;
          }
          50% {
            background-position: 0%;
          }
        }

        .button-light {
          background: linear-gradient(135deg, #dc2626 0%, #dc2626 40%, #ffffff 50%, #dc2626 60%, #dc2626 100%);
          background-repeat: no-repeat;
          background-position: 100%;
          background-size: 300%;
          animation: lightSweep 3s ease-in-out infinite;
        }

        .button-light:hover {
          animation-play-state: paused;
          background-position: 0%;
        }
      `}</style>

      {/* Hero Section - Modern Split Design */}
      <section className="relative overflow-hidden bg-gradient-to-l from-red-900 via-red-800 to-slate-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Bottom Shadow for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-900 to-transparent z-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-end min-h-[600px] lg:min-h-[700px]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="py-20 lg:py-24">

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8">

                <img
                  src="https://baz-f.co.il/images/logo01.png"
                  alt="בז פיננסים"
                  className="h-24 lg:h-32 w-auto brightness-0 invert" />

              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
                הפתרון הפיננסי
                <span className="block text-red-400">שחיפשתם</span>
              </h1>

              <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed">
                תאגיד פנסיוני-פיננסי מוביל עם עשרות שנות ניסיון בליווי אישי ומקצועי לאורך כל חייכם הכלכליים
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="button-light text-white text-xl px-12 py-8 rounded-2xl font-bold shadow-2xl hover:shadow-red-600/50 transform hover:scale-105 transition-all duration-300 group">

                  קבעו פגישה עכשיו
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="!bg-transparent border-2 border-white !text-white hover:!bg-white hover:!text-red-900 text-xl px-12 py-8 rounded-2xl font-bold transition-all duration-300">

                  <Phone className="w-7 h-7 ml-3" />
                  צרו קשר
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center">

                  <div className="text-4xl font-black text-red-400 mb-2">20+</div>
                  <div className="text-sm text-slate-400">שנות ניסיון</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center">

                  <div className="text-4xl font-black text-red-400 mb-2">3000+</div>
                  <div className="text-sm text-slate-400">לקוחות מרוצים</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-center">

                  <div className="text-4xl font-black text-red-400 mb-2">37M₪</div>
                  <div className="text-sm text-slate-400">נחסכו ללקוחות</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Image - Bottom Aligned */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-full flex items-end">

              <img
                src="https://baz-f.co.il/images/img13.avif"
                alt="בז פיננסים"
                className="w-full h-auto object-contain object-bottom"
                style={{ maxHeight: '700px' }} />

            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2">

          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white rounded-full mt-2" />

          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">

            <h2 className="text-slate-900 mb-6 text-4xl font-black lg:text-6xl">היתרונות שלנו
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}>

                <Card className="p-8 h-full border-2 border-red-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white hover:border-red-400">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 text-lg">{feature.description}</p>
                </Card>
              </motion.div>
            )}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16">

            <Button
              size="lg"
              className="button-light !text-white px-12 py-8 text-xl font-bold rounded-2xl shadow-xl hover:shadow-red-600/50 transform hover:scale-105 transition-all duration-300">

              <Calendar className="w-7 h-7 ml-3" />
              קבעו פגישת ייעוץ עוד היום
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">

            <span className="inline-block px-6 py-3 bg-gradient-to-r from-red-100 to-rose-100 text-red-900 rounded-full text-sm font-bold mb-6">
              השירותים שלנו
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6">
              פתרונות פיננסיים מקיפים
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              מתן שירות לפרטיים, חברות ותאגידים
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}>

                <Card className="p-6 h-full border-2 border-red-200 hover:border-red-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16">

            <Button
              size="lg"
              className="button-light !text-white px-12 py-8 text-xl font-bold rounded-2xl shadow-xl hover:shadow-red-600/50 transform hover:scale-105 transition-all duration-300">

              <Phone className="w-7 h-7 ml-3" />
              בואו נדבר על הצרכים שלכם
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Booking Calendar Section - Hebrew Support */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12">

            <h2 className="text-neutral-900 mb-4 text-4xl font-black lg:text-6xl">בואו נתחיל</h2>
            <p className="text-red-600 text-2xl font-bold animate-slow-pulse">קבעו פגישת ייעוץ עוד היום</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}>

            <BookingCalendar />
          </motion.div>
        </div>
      </section>

      {/* About Section - Card Style */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>

              <Card className="p-12 lg:p-16 border-0 shadow-2xl bg-gradient-to-br from-slate-50 to-white">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-1 w-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-full" />
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-900">אודותינו</h2>
                </div>

                <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                  <p className="text-xl font-semibold text-slate-900">
                    בז פיננסים הינו תאגיד פנסיוני-פיננסי שהוקם על ידי שלושה שותפים בעלי ניסיון מצטבר של עשרות שנים בעולם ההשקעות, הביטוח והפיננסים.
                  </p>
                  <p>
                    החזון שלנו בבז פיננסים ללוות אתכם ואת בני משפחתכם לאורך חייכם בכל התחומים הכלכליים, הפיננסיים והביטוחים, להיות לכם כגורם המקצועי והמוסמך.
                  </p>
                  <p>
                    מעבר להיותנו אנשי מקצוע, אנו שואפים לייצר הרגשת ביתיות ומשפחתיות בכל הנוגע לעולמכם הביטוחי והפיננסי מתחילת דרככם ועד ליציאתכם לגמלאות.
                  </p>
                  <p className="text-red-600 pt-4 text-xl font-bold">אנו רואים באחדותנו צוות מנצח ומוביל עם מומחיות בכל תחום ותחום בכדי להביא לכם את הפתרונות הטובים ביותר והליווי המקצועי הטוב ביותר.

                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">

            <span className="inline-block px-6 py-3 bg-red-100 text-red-900 rounded-full text-sm font-bold mb-6">
              מדברים עלינו
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6">
              בז פיננסים בתקשורת
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto">

            <Card className="overflow-hidden border-0 shadow-2xl">
              <div className="aspect-video bg-slate-900">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/rV30C09UWSk"
                  title="בז פיננסים בחדשות"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full" />

              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA - Book Appointment */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-rose-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center">

            <h3 className="text-5xl lg:text-6xl font-black text-white mb-10">
              קבעו פגישה היום
            </h3>
            <Button
              size="lg"
              className="button-inner-glow bg-white text-red-600 hover:bg-slate-100 text-xl px-16 py-9 rounded-2xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slow-pulse">

              קבעו פגישת ייעוץ עוד היום
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">

            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-4">
              לקוחות שחסכו
            </h2>
            <div className="text-5xl lg:text-7xl font-black text-red-600 mb-6">
              מאות אלפי ₪
            </div>
            <p className="text-2xl text-slate-600">תקשיבו לסיפור שלהם</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto">

            <Card className="overflow-hidden border-0 shadow-2xl">
              <div className="aspect-[9/16] bg-slate-900">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Yl_CFFTujc4"
                  title="המלצת לקוח"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full" />

              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid Slider */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6">עוד המלצות

            </h2>
            <p className="text-xl text-slate-600">לקוחות מרוצים משתפים את החוויה שלהם</p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {currentVideos.map((testimonial, index) =>
                <motion.div
                  key={currentSlide * videosPerSlide + index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}>

                    <Card className="overflow-hidden border-0 shadow-xl bg-white">
                      <div className="aspect-[9/16] bg-slate-900">
                        <iframe
                        width="100%"
                        height="100%"
                        src={testimonial.video}
                        title={`המלצה ${currentSlide * videosPerSlide + index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full" />

                      </div>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="rounded-full w-14 h-14 border-2 bg-white hover:bg-red-50 hover:border-red-600 transition-all shadow-lg">

                <ChevronRight className="w-6 h-6" />
              </Button>

              <div className="flex gap-2">
                {[...Array(totalSlides)].map((_, index) =>
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ?
                  "w-10 bg-red-600" :
                  "w-3 bg-slate-300 hover:bg-slate-400"}`
                  } />

                )}
              </div>

              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="rounded-full w-14 h-14 border-2 bg-white hover:bg-red-50 hover:border-red-600 transition-all shadow-lg">

                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-6">
              <p className="text-slate-600 font-medium">
                {currentSlide + 1} מתוך {totalSlides}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* Social Media - TikTok & Facebook Reels */}
      <SocialMedia />

      {/* Contact Form Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">

            <span className="inline-block px-6 py-3 bg-gradient-to-r from-red-100 to-rose-100 text-red-900 rounded-full text-sm font-bold mb-6">
              יש לכם שאלה?
            </span>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6">
              נשמח לעזור
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              השאירו פרטים ונחזור אליכם בהקדם
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}>

            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <h2 className="text-5xl lg:text-7xl font-black mb-12">
              מוכנים להתחיל?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="button-inner-glow bg-white !text-red-900 hover:bg-slate-100 text-xl px-12 py-8 rounded-2xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 animate-slow-pulse">

                קבעו פגישה עכשיו
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="!bg-transparent border-2 border-white !text-white hover:!bg-white hover:!text-red-900 text-xl px-12 py-8 rounded-2xl font-bold transition-all duration-300">

                <Phone className="w-7 h-7 ml-3" />
                צרו קשר
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>);

}
