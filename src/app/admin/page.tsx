'use client';

import React, { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus } from '@/lib/storage';
import { developments } from '@/data/developments';
import { journalArticles } from '@/data/articles';
import { PrivateVisitInquiry } from '@/types';
import { formatDate } from '@/lib/utils';
import {
  Building2,
  CalendarCheck,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Shield,
  Phone,
  Mail,
  User,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'developments' | 'journal'>('inquiries');
  const [inquiries, setInquiries] = useState<PrivateVisitInquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<PrivateVisitInquiry | null>(null);
  const [advisorNote, setAdvisorNote] = useState('');

  useEffect(() => {
    setInquiries(getInquiries());
  }, []);

  const handleStatusChange = (id: string, newStatus: PrivateVisitInquiry['status']) => {
    updateInquiryStatus(id, newStatus, advisorNote || undefined);
    setInquiries(getInquiries());
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({
        ...selectedInquiry,
        status: newStatus,
        advisorNotes: advisorNote || selectedInquiry.advisorNotes
      });
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.whatsapp.includes(searchTerm) ||
      inq.developmentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="pt-32 pb-28 bg-[#F4F1EA] text-[#0B1D3A] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#0B1D3A]/10 gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
              <Shield size={14} />
              <span>SUPER ADMIN & CMS CONTROL CENTER</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-luxury text-[#0B1D3A] mt-1">
              Sahaba Vantage Console
            </h1>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 rounded-2xl bg-[#0B1D3A] text-[#F8F6F1] text-xs space-y-0.5">
              <span className="text-[10px] uppercase text-[#C7A66A]">Pending Inquiries</span>
              <p className="font-bold text-lg leading-none">
                {inquiries.filter((i) => i.status === 'pending').length}
              </p>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white border border-[#0B1D3A]/10 text-xs space-y-0.5">
              <span className="text-[10px] uppercase text-[#6B6B6B]">Total Developments</span>
              <p className="font-bold text-lg leading-none text-[#0B1D3A]">
                {developments.length}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-[#0B1D3A]/10 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'inquiries'
                ? 'bg-[#0B1D3A] text-[#F8F6F1] shadow-md'
                : 'text-[#6B6B6B] hover:text-[#0B1D3A]'
            }`}
          >
            <CalendarCheck size={14} className={activeTab === 'inquiries' ? 'text-[#C7A66A]' : ''} />
            <span>Private Visit Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('developments')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'developments'
                ? 'bg-[#0B1D3A] text-[#F8F6F1] shadow-md'
                : 'text-[#6B6B6B] hover:text-[#0B1D3A]'
            }`}
          >
            <Building2 size={14} className={activeTab === 'developments' ? 'text-[#C7A66A]' : ''} />
            <span>Developments CMS ({developments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('journal')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'journal'
                ? 'bg-[#0B1D3A] text-[#F8F6F1] shadow-md'
                : 'text-[#6B6B6B] hover:text-[#0B1D3A]'
            }`}
          >
            <FileText size={14} className={activeTab === 'journal' ? 'text-[#C7A66A]' : ''} />
            <span>Journal Articles ({journalArticles.length})</span>
          </button>
        </div>

        {/* TAB 1: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#0B1D3A]/10 shadow-sm">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-[#6B6B6B]">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#F8F6F1] border border-[#0B1D3A]/10 text-xs text-[#0B1D3A] focus:outline-none"
                >
                  <option value="all">All Inquiries</option>
                  <option value="pending">Pending Review</option>
                  <option value="confirmed">Confirmed Appointments</option>
                  <option value="completed">Completed Visits</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
                <input
                  type="text"
                  placeholder="Search guest or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#F8F6F1] border border-[#0B1D3A]/10 text-xs text-[#0B1D3A] focus:outline-none"
                />
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white rounded-3xl border border-[#0B1D3A]/10 shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans-luxury">
                    <thead className="bg-[#0B1D3A] text-[#F8F6F1] text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Guest Name</th>
                        <th className="py-3.5 px-4">Development</th>
                        <th className="py-3.5 px-4">Preferred Slot</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-[#6B6B6B]">
                            No private visit inquiries match the selected criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr
                            key={inq.id}
                            onClick={() => {
                              setSelectedInquiry(inq);
                              setAdvisorNote(inq.advisorNotes || '');
                            }}
                            className={`cursor-pointer transition-colors ${
                              selectedInquiry?.id === inq.id ? 'bg-[#C7A66A]/15' : 'hover:bg-gray-50'
                            }`}
                          >
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-[#0B1D3A] block">{inq.fullName}</span>
                              <span className="text-[10px] text-[#6B6B6B]">{inq.whatsapp}</span>
                            </td>
                            <td className="py-3.5 px-4 text-[#0B1D3A]">
                              <span className="font-medium">{inq.developmentName}</span>
                            </td>
                            <td className="py-3.5 px-4 text-[#6B6B6B]">
                              <span>{inq.preferredDate}</span>
                              <span className="text-[10px] block">{inq.preferredTime}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                                  inq.status === 'confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : inq.status === 'pending'
                                    ? 'bg-amber-100 text-amber-800'
                                    : inq.status === 'completed'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {inq.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://wa.me/${inq.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
                                }}
                                className="px-3 py-1 rounded-lg bg-[#0B1D3A] hover:bg-[#132B52] text-[#C7A66A] text-[10px] font-semibold uppercase tracking-wider"
                              >
                                WhatsApp ↗
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inquiry Inspection Card */}
              <div className="lg:col-span-4">
                {selectedInquiry ? (
                  <div className="bg-white rounded-3xl border border-[#C7A66A]/40 p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#0B1D3A]/10">
                      <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold">
                        Inquiry Details
                      </span>
                      <span className="text-[10px] text-[#6B6B6B]">{formatDate(selectedInquiry.createdAt)}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif-luxury text-xl font-bold text-[#0B1D3A]">
                        {selectedInquiry.fullName}
                      </h3>
                      <div className="text-xs space-y-1 text-[#6B6B6B]">
                        <p className="flex items-center space-x-2">
                          <Phone size={13} className="text-[#C7A66A]" />
                          <span>{selectedInquiry.whatsapp}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Mail size={13} className="text-[#C7A66A]" />
                          <span>{selectedInquiry.email}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <User size={13} className="text-[#C7A66A]" />
                          <span>Party Size: {selectedInquiry.visitorCount} Guests</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#F8F6F1] text-xs space-y-1">
                      <span className="font-semibold text-[#0B1D3A]">Target Estate:</span>
                      <p className="text-[#6B6B6B]">{selectedInquiry.developmentName}</p>
                      <span className="font-semibold text-[#0B1D3A] block pt-1">Requested Slot:</span>
                      <p className="text-[#6B6B6B]">{selectedInquiry.preferredDate} • {selectedInquiry.preferredTime}</p>
                      {selectedInquiry.message && (
                        <div className="pt-2 border-t border-[#0B1D3A]/10">
                          <span className="font-semibold text-[#0B1D3A] block">Guest Message:</span>
                          <p className="italic text-[#6B6B6B]">“{selectedInquiry.message}”</p>
                        </div>
                      )}
                    </div>

                    {/* Advisor Notes & Actions */}
                    <div className="space-y-3 pt-2">
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#6B6B6B]">
                        Advisor Internal Notes
                      </label>
                      <textarea
                        rows={2}
                        value={advisorNote}
                        onChange={(e) => setAdvisorNote(e.target.value)}
                        placeholder="Catatan penugasan advisor atau permintaan khusus..."
                        className="w-full px-3 py-2 rounded-xl bg-[#F8F6F1] border border-[#0B1D3A]/10 text-xs focus:outline-none focus:border-[#C7A66A]"
                      />

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleStatusChange(selectedInquiry.id, 'confirmed')}
                          className="flex-1 py-2 px-3 rounded-xl bg-green-700 hover:bg-green-800 text-white text-[11px] font-semibold uppercase tracking-wider"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedInquiry.id, 'completed')}
                          className="flex-1 py-2 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-semibold uppercase tracking-wider"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedInquiry.id, 'cancelled')}
                          className="py-2 px-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-[11px] font-semibold uppercase"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-3xl bg-white border border-[#0B1D3A]/10 text-center text-xs text-[#6B6B6B] space-y-2">
                    <p>Pilih baris pada tabel untuk melihat detail tamu dan memperbarui status reservasi.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DEVELOPMENTS MANAGEMENT */}
        {activeTab === 'developments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {developments.map((dev) => (
                <div
                  key={dev.id}
                  className="rounded-3xl bg-white border border-[#0B1D3A]/10 overflow-hidden shadow-md space-y-4 p-6 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="h-44 rounded-2xl overflow-hidden relative">
                      <img src={dev.heroImage} alt={dev.name} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B1D3A]/80 text-[#C7A66A] text-[10px] font-semibold uppercase">
                        {dev.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif-luxury text-xl font-bold text-[#0B1D3A]">{dev.name}</h3>
                      <p className="text-xs text-[#C7A66A] font-semibold">{dev.location.city}, {dev.location.province}</p>
                    </div>

                    <p className="text-xs text-[#6B6B6B] line-clamp-2">{dev.shortDescription}</p>

                    <div className="pt-2 border-t border-[#0B1D3A]/10 text-xs text-[#6B6B6B] space-y-1">
                      <div className="flex justify-between">
                        <span>Total Units:</span>
                        <span className="font-bold text-[#0B1D3A]">{dev.stats.totalUnits} Units</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unit Types:</span>
                        <span className="font-bold text-[#0B1D3A]">{dev.unitTypes.length} Types</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Masterplan Lots:</span>
                        <span className="font-bold text-[#0B1D3A]">{dev.masterplanLots.length} Lots</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`/developments/${dev.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#0B1D3A] hover:bg-[#132B52] text-[#F8F6F1] text-xs font-semibold uppercase tracking-wider text-center block transition-all"
                  >
                    View Live Page ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: JOURNAL CMS */}
        {activeTab === 'journal' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {journalArticles.map((art) => (
                <div
                  key={art.id}
                  className="rounded-3xl bg-white border border-[#0B1D3A]/10 overflow-hidden shadow-md p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="h-40 rounded-2xl overflow-hidden relative">
                      <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B1D3A]/85 text-[#C7A66A] text-[10px] font-semibold uppercase">
                        {art.category}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-lg font-bold text-[#0B1D3A] leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#6B6B6B] line-clamp-2">{art.excerpt}</p>
                  </div>

                  <a
                    href={`/journal/${art.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#0B1D3A] hover:bg-[#132B52] text-[#F8F6F1] text-xs font-semibold uppercase tracking-wider text-center block transition-all"
                  >
                    Read Article ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
