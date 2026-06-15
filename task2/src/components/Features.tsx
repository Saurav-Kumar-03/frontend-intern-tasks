"use client";

import { motion } from "framer-motion";
import { Zap, BarChart2, Shield } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-indigo-400" />,
      title: "Lightning Fast",
      description: "Experience unparalleled speed and performance optimized for modern workflows.",
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-purple-400" />,
      title: "Real-time Analytics",
      description: "Monitor your operations and get actionable insights with our powerful dashboard.",
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-400" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols keep your data safe and compliant.",
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Everything you need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Powerful features designed to help you focus on what matters most. No complex setup, just results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-colors group"
            >
              <div className="w-16 h-16 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
