'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, Sparkles } from 'lucide-react';
import { developments } from '@/data/developments';
import { submitInquiry } from '@/lib/storage';
import confetti from 'canvas-confetti';

interface PrivateVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDevelopment?: string;
}

export default function PrivateVisitModal({
  isOpen,
  onClose,
  preselectedDevelopment
}: PrivateVisitModalProps) {
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [developmentSlug, setDevelopmentSlug] = useState(preselectedDevelopment || 'vantage-residence');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [visitorCount, setVisitorCount] = useState(2);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dev = developments.find((d) => d.slug === developmentSlug);
    const devName = dev ? dev.name : 'General Inquiry';

    try {
      await submitInquiry({
        fullName,
        whatsapp,
        email,
        developmentSlug,
        developmentName: devName,
        preferredDate,
        preferredTime,
        visitorCount,
        message
      });
    } catch (err) {
      console.error('Failed to submit inquiry', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory gold confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C7A66A', '#E5C992', '#0B1D3A']
        });
      } catch {
        // Fallback silently if canvas is not available
      }
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#071326]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl rounded-3xl bg-[#0B1D3A] border border-[#C7A66A]/30 p-6 sm:p-8 text-[#F8F6F1] shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Background Monogram Watermark */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-[#C7A66A]/10 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-[#F8F6F1]/60 hover:text-[#C7A66A] p-2 rounded-full hover:bg-white/5 transition-all"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#C7A66A]/10 border border-[#C7A66A] flex items-center justify-center mx-auto text-[#C7A66A]">
                  <CheckCircle2 size={36} />
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#C7A66A] font-semibold">
                    Appointment Received
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-normal text-[#F8F6F1]">
                    Your Private Visit is Scheduled
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F8F6F1]/70 max-w-md mx-auto leading-relaxed">
                    Terima kasih, Bapak/Ibu <strong className="text-[#F8F6F1]">{fullName}</strong>. Senior Property Advisor kami akan menghubungi nomor WhatsApp Anda untuk konfirmasi jadwal dan rincian akses privat.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#132B52]/60 border border-[#C7A66A]/20 text-left max-w-md mx-auto text-xs space-y-1.5 text-[#F8F6F1]/80">
                  <div className="flex justify-between">
                    <span className="text-[#C7A66A]">Properti:</span>
                    <span className="font-semibold">{developments.find((d) => d.slug === developmentSlug)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C7A66A]">Tanggal & Waktu:</span>
                    <span>{preferredDate || 'To be confirmed'} • {preferredTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C7A66A]">Jumlah Tamu:</span>
                    <span>{visitorCount} Orang</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs uppercase tracking-widest transition-all"
                >
                  Selesai
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#C7A66A] font-semibold">
                    <Sparkles size={13} />
                    <span>Private Viewing Invitation</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-normal text-[#F8F6F1]">
                    Schedule a Private Visit
                  </h3>
                  <p className="text-xs text-[#F8F6F1]/70 leading-relaxed">
                    Nikmati presentasi arsitektur personal dan eksplorasi lokasi bersama Senior Property Advisor.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Development Select */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#C7A66A] font-semibold mb-1.5">
                      Proyek yang Dituju
                    </label>
                    <div className="relative">
                      <select
                        value={developmentSlug}
                        onChange={(e) => setDevelopmentSlug(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#132B52]/70 border border-[#C7A66A]/30 text-[#F8F6F1] text-xs focus:outline-none focus:border-[#C7A66A]"
                        required
                      >
                        {developments.map((dev) => (
                          <option key={dev.slug} value={dev.slug} className="bg-[#0B1D3A] text-[#F8F6F1]">
                            {dev.name} ({dev.location.city})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Name & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#C7A66A] font-semibold mb-1.5">
                        Nama Lengkap
                      </label>
                      <div className="relative flex items-center">
                        <User size={14} className="absolute left-3.5 text-[#C7A66A]/70" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ir. Hendra Kusuma"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#132B52]/70 border border-[#C7A66A]/30 text-[#F8F6F1] text-xs focus:outline-none focus:border-[#C7A66A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#C7A66A] font-semibold mb-1.5">
                        Nomor WhatsApp
                      </label>
                      <div className="relative flex items-center">
                        <Phone size={14} className="absolute left-3.5 text-[#C7A66A]/70" />
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="e.g. +62 812 3456 7890"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#132B52]/70 border border-[#C7A66A]/30 text-[#F8F6F1] text-xs focus:outline-none focus:border-[#C7A66A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Visitor Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#C7A66A] font-semibold mb-1.5">
                        Alamat Email
                      </label>
                      <div className="relative flex items-center">
                        <Mail size={14} className="absolute left-3.5 text-[#C7A66A]/70" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#132B52]/70 border border-[#C7A66A]/30 text-[#F8F6F1] text-xs focus:outline-none focus:border-[#C7A66A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#C7A66A] font-semibold mb-1.5">
                        Jumlah Tamu
                      </label>
                      <select
                        value={visitorCount}
                        onChange={(e) => setVisitorCount(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#132B52]/70 border border-[#C7A66A]/30 text-[#F8F6F1] text-xs focus:outline-none focus:border-[#C7A66A]"
                      >
                        <option value={1} className="bg-[#0B1D3A]">1 Tamu</option>
                        <option value={2} className="bg-[#0B1D3A]">2 Tamu (Pasangan)</option>
                        <option value={3} className="bg-[#0B1D3A]">3–4 Tamu (Keluarga)</option>
                        <option value={5} className="bg-[#0B1D3A]">5+ Tamu (Rombongan Private)</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#C7A66A] font-semibold mb-1.5">
                        Rencana Tanggal
                      </label>
                      <div className="relative flex items-center">
                        <Calendar size={14} className="absolute left-3.5 text-[#C7A66A]/70" />
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#132B52]/70 border border-[#C7A66A]/30 text-[#F8F6F1] text-xs focus:outline-none focus:border-[#C7A66A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#C7A66A] font-semibold mb-1.5">
                        Pilihan Waktu
                      </label>
                      <div className="relative flex items-center">
                        <Clock size={14} className="absolute left-3.5 text-[#C7A66A]/70" />
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#132B52]/70 border border-[#C7A66A]/30 text-[#F8F6F1] text-xs focus:outline-none focus:border-[#C7A66A]"
                        >
                          <option value="10:00 AM" className="bg-[#0B1D3A]">10:00 AM (Morning Atmosphere)</option>
                          <option value="02:00 PM" className="bg-[#0B1D3A]">02:00 PM (Afternoon Sunlight)</option>
                          <option value="04:30 PM" className="bg-[#0B1D3A]">04:30 PM (Golden Hour / Sunset)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#C7A66A] font-semibold mb-1.5">
                      Catatan Tambahan (Opsional)
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Informasi preferensi tipe unit atau kebutuhan khusus..."
                      className="w-full px-4 py-2 rounded-xl bg-[#132B52]/70 border border-[#C7A66A]/30 text-[#F8F6F1] text-xs focus:outline-none focus:border-[#C7A66A] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Memproses Reservasi...</span>
                    ) : (
                      <span>Request Private Visit →</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
