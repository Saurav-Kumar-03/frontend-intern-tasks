"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Floating Background Blobs */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[100px] -z-10"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] -z-10"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="mb-6 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
            Trusted by 10,000+ Teams
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            Build faster with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">AI-powered workflows</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
          >
            The most powerful AI-driven platform to streamline your workflow, boost productivity, and unlock new creative possibilities.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center"
            >
              Start Free Trial
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 font-semibold text-base transition-all flex items-center justify-center"
            >
              Book Demo
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-20 relative mx-auto w-full max-w-5xl"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl border border-white/10 glass-card p-2 md:p-4"
          >
            <div className="rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 aspect-video relative flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
              <div className="text-gray-500 flex flex-col items-center gap-4">
                <span className="text-xl font-medium">Dashboard Preview</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
