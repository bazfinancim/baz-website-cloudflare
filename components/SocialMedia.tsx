"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// TikTok videos and Facebook Reels mixed
const socialPosts = [
  {
    platform: "tiktok",
    videoId: "7355158916436610305",
    embedUrl: "https://www.tiktok.com/embed/v2/7355158916436610305",
  },
  {
    platform: "facebook",
    videoId: "955547502585461",
    embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F955547502585461&show_text=false&mute=0",
  },
  {
    platform: "tiktok",
    videoId: "7305734450388700424",
    embedUrl: "https://www.tiktok.com/embed/v2/7305734450388700424",
  },
  {
    platform: "facebook",
    videoId: "1122154505789414",
    embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1122154505789414&show_text=false&mute=0",
  },
  {
    platform: "tiktok",
    videoId: "7356251986683038992",
    embedUrl: "https://www.tiktok.com/embed/v2/7356251986683038992",
  },
  {
    platform: "facebook",
    videoId: "1456035501978207",
    embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1456035501978207&show_text=false&mute=0",
  },
  {
    platform: "tiktok",
    videoId: "7278666198298955010",
    embedUrl: "https://www.tiktok.com/embed/v2/7278666198298955010",
  },
  {
    platform: "facebook",
    videoId: "1686928928400430",
    embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1686928928400430&show_text=false&mute=0",
  },
  {
    platform: "tiktok",
    videoId: "7341027600749448455",
    embedUrl: "https://www.tiktok.com/embed/v2/7341027600749448455",
  },
];

export default function SocialMedia() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const postsPerSlide = 4;
  const totalSlides = Math.ceil(socialPosts.length / postsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentPosts = socialPosts.slice(
    currentSlide * postsPerSlide,
    (currentSlide + 1) * postsPerSlide
  );

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-red-100 to-rose-100 text-red-900 rounded-full text-sm font-bold mb-6">
            עקבו אחרינו ברשתות
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6">
            הקהילה שלנו ברשתות
          </h2>
          <p className="text-xl text-slate-600">
            תכנים, טיפים וייעוץ פיננסי ב-TikTok וב-Facebook
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {currentPosts.map((post, index) => (
                <motion.div
                  key={currentSlide * postsPerSlide + index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-[9/16] bg-slate-900 relative">
                      <iframe
                        src={post.embedUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {totalSlides > 1 && (
            <>
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button
                  onClick={prevSlide}
                  variant="outline"
                  size="icon"
                  className="rounded-full w-14 h-14 border-2 bg-white hover:bg-red-50 hover:border-red-600 transition-all shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                <div className="flex gap-2">
                  {[...Array(totalSlides)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-10 bg-red-600"
                          : "w-3 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextSlide}
                  variant="outline"
                  size="icon"
                  className="rounded-full w-14 h-14 border-2 bg-white hover:bg-red-50 hover:border-red-600 transition-all shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
              </div>

              {/* Slide Counter */}
              <div className="text-center mt-6">
                <p className="text-slate-600 font-medium">
                  {currentSlide + 1} מתוך {totalSlides}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
