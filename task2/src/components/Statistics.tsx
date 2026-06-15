"use client";

import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useRef } from "react";

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const stats = [
    { label: "Active Users", value: 50, suffix: "K+" },
    { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
    { label: "Customer Rating", value: 4.9, suffix: "/5", decimals: 1 },
  ];

  return (
    <section id="statistics" ref={ref} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="glass-card rounded-3xl p-10 md:p-16 relative overflow-hidden bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/5 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 tracking-tight">
                  {isInView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      decimals={stat.decimals || 0}
                      suffix={stat.suffix}
                    />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>
                <div className="text-lg font-medium text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
