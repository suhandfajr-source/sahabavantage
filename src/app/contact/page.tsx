'use client';

import React, { useState } from 'react';
import { brandDetails } from '@/data/brandContent';
import { developments } from '@/data/developments';
import { submitInquiry } from '@/lib/storage';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [developmentSlug, setDevelopmentSlug] = useState('vantage-residence');
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
    const devName = dev ? dev.name : 'General Consultation';

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

      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#C7A66A', '#E5C992', '#0B1D3A']
        });
      } catch {
        // Fallback
      }
    }
  };

  const waUrl = `https://wa.me/${brandDetails.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Halo Sahaba Vantage Estates, saya ingin berkonsultasi mengenai portofolio hunian dan Private Viewing.'
  )}`;

  return (
    <div className="pt-32 pb-28 bg-[#F8F6F1] text-[#0B1D3A] min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0B1D3A]/10 text-[#0B1D3A] text-[10px] uppercase tracking-[0.25em] font-semibold">
            <Sparkles size={12} className="text-[#C7A66A]" />
            <span>PRIVATE CONCIERGE & BOOKING</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-normal leading-tight text-[#0B1D3A]">
            Schedule Your Private Experience.
          </h1>

          <p className="text-sm sm:text-base text-[#6B6B6B] font-sans-luxury leading-relaxed">
            Untuk memastikan privasi dan kenyamanan maksimal, kunjungan lokasi dan konsultasi arsitektur diselenggarakan secara privat dengan pendampingan Senior Property Advisor.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[36px] bg-white border border-[#C7A66A]/30 p-8 sm:p-12 shadow-xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-[#C7A66A]/10 border border-[#C7A66A] flex items-center justify-center mx-auto text-[#C7A66A]">
                    <CheckCircle2 size={44} />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.3em] text-[#C7A66A] font-semibold">
                      PERMOHONAN DITERIMA
                    </span>
                    <h2 className="text-3xl font-serif-luxury text-[#0B1D3A]">
                      Jadwal Kunjungan Sedang Diproses
                    </h2>
                    <p className="text-sm text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
                      Terima kasih Bapak/Ibu <strong className="text-[#0B1D3A]">{fullName}</strong>. Tim Concierge kami akan menghubungi WhatsApp Anda di nomor <strong className="text-[#0B1D3A]">{whatsapp}</strong> untuk finalisasi pass gerbang masuk dan konfirmasi waktu.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3.5 rounded-full bg-[#0B1D3A] hover:bg-[#132B52] text-[#F8F6F1] font-semibold text-xs uppercase tracking-widest transition-all"
                  >
                    Kirim Permohonan Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif-luxury text-[#0B1D3A]">
                      Formulir Reservasi Private Visit
                    </h3>
                    <p className="text-xs text-[#6B6B6B]">
                      Silakan lengkapi data di bawah ini untuk menerima kartu akses privat.
                    </p>
                  </div>

                  {/* Development Select */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#0B1D3A] font-semibold mb-2">
                      Pilih Properti Sahaba Vantage
                    </label>
                    <select
                      value={developmentSlug}
                      onChange={(e) => setDevelopmentSlug(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F1] border border-[#0B1D3A]/15 text-xs text-[#0B1D3A] focus:outline-none focus:border-[#C7A66A]"
                      required
                    >
                      {developments.map((dev) => (
                        <option key={dev.slug} value={dev.slug}>
                          {dev.name} — {dev.location.city} ({dev.stats.totalUnits} Units)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0B1D3A] font-semibold mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Bapak / Ibu Hendra"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F1] border border-[#0B1D3A]/15 text-xs text-[#0B1D3A] focus:outline-none focus:border-[#C7A66A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0B1D3A] font-semibold mb-2">
                        Nomor WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="e.g. +62 812 3456 7890"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F1] border border-[#0B1D3A]/15 text-xs text-[#0B1D3A] focus:outline-none focus:border-[#C7A66A]"
                      />
                    </div>
                  </div>

                  {/* Email & Visitors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0B1D3A] font-semibold mb-2">
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F1] border border-[#0B1D3A]/15 text-xs text-[#0B1D3A] focus:outline-none focus:border-[#C7A66A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0B1D3A] font-semibold mb-2">
                        Jumlah Pengunjung
                      </label>
                      <select
                        value={visitorCount}
                        onChange={(e) => setVisitorCount(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F1] border border-[#0B1D3A]/15 text-xs text-[#0B1D3A] focus:outline-none focus:border-[#C7A66A]"
                      >
                        <option value={1}>1 Tamu (Individual)</option>
                        <option value={2}>2 Tamu (Pasangan)</option>
                        <option value={4}>3–4 Tamu (Keluarga)</option>
                        <option value={6}>5+ Tamu (Rombongan Private)</option>
                      </select>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0B1D3A] font-semibold mb-2">
                        Rencana Tanggal Kunjungan
                      </label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F1] border border-[#0B1D3A]/15 text-xs text-[#0B1D3A] focus:outline-none focus:border-[#C7A66A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#0B1D3A] font-semibold mb-2">
                        Sesi Waktu Kunjungan
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F1] border border-[#0B1D3A]/15 text-xs text-[#0B1D3A] focus:outline-none focus:border-[#C7A66A]"
                      >
                        <option value="10:00 AM">10:00 AM (Morning Atmosphere)</option>
                        <option value="02:00 PM">02:00 PM (Afternoon Sun Study)</option>
                        <option value="04:30 PM">04:30 PM (Golden Hour Sunset)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#0B1D3A] font-semibold mb-2">
                      Catatan Tambahan atau Pertanyaan
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Informasi preferensi tipe unit atau kebutuhan khusus saat kunjungan..."
                      className="w-full px-4 py-3 rounded-2xl bg-[#F8F6F1] border border-[#0B1D3A]/15 text-xs text-[#0B1D3A] focus:outline-none focus:border-[#C7A66A] resize-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-[#6B6B6B]">
                    <ShieldCheck size={16} className="text-[#C7A66A]" />
                    <span>Data Anda dijaga dengan standar kerahasiaan institusi privat.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Memproses Reservasi...</span>
                    ) : (
                      <span>Request Private Visit →</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Direct Concierge Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-[36px] bg-[#0B1D3A] text-[#F8F6F1] border border-[#C7A66A]/30 space-y-6 shadow-xl">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
                  DIRECT ADVISORY
                </span>
                <h3 className="text-2xl font-serif-luxury text-[#F8F6F1]">
                  Sahaba Private Concierge
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#F8F6F1]/80 font-sans-luxury">
                <div className="flex items-start space-x-3 pb-3 border-b border-[#C7A66A]/20">
                  <MapPin size={18} className="text-[#C7A66A] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-[#F8F6F1] block">Headquarters:</span>
                    <span>{brandDetails.headquarters}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pb-3 border-b border-[#C7A66A]/20">
                  <Clock size={18} className="text-[#C7A66A] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-[#F8F6F1] block">Operating Hours:</span>
                    <span>{brandDetails.workingHours}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pb-3 border-b border-[#C7A66A]/20">
                  <Phone size={18} className="text-[#C7A66A] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-[#F8F6F1] block">Telephone:</span>
                    <span>{brandDetails.phone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail size={18} className="text-[#C7A66A] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-[#F8F6F1] block">Email Concierge:</span>
                    <span>{brandDetails.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs tracking-widest uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <MessageSquare size={16} />
                  <span>Chat Via WhatsApp Advisor</span>
                </a>
              </div>
            </div>

            {/* Privacy Assurance Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#0B1D3A]/10 shadow-sm space-y-2">
              <h4 className="font-serif-luxury text-base font-semibold text-[#0B1D3A]">
                Protokol Kunjungan Privat
              </h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans-luxury">
                Setiap tamu akan disambut oleh designated advisor, disediakan refreshment lounge privat, dan berkendara di kawasan menggunakan buggy elektrik khusus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
