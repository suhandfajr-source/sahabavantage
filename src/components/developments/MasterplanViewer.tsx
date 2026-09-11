'use client';

import React, { useState } from 'react';
import { MasterplanLot } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info, CheckCircle, Clock, Ban, X, ArrowUpRight } from 'lucide-react';

interface MasterplanViewerProps {
  lots: MasterplanLot[];
  projectName: string;
  onSelectLotForVisit?: (lot: MasterplanLot) => void;
}

export default function MasterplanViewer({
  lots,
  projectName,
  onSelectLotForVisit
}: MasterplanViewerProps) {
  const [selectedLot, setSelectedLot] = useState<MasterplanLot | null>(null);
  const [hoveredLot, setHoveredLot] = useState<MasterplanLot | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: MasterplanLot['status']) => {
    switch (status) {
      case 'available':
        return { fill: '#C7A66A', stroke: '#E5C992', label: 'Available', dot: 'bg-[#C7A66A]' };
      case 'limited':
        return { fill: '#3B82F6', stroke: '#93C5FD', label: 'Limited Release', dot: 'bg-blue-400' };
      case 'sold':
        return { fill: '#4B5563', stroke: '#6B7280', label: 'Reserved / Sold', dot: 'bg-gray-500' };
      case 'upcoming':
        return { fill: '#8B5CF6', stroke: '#C4B5FD', label: 'Upcoming Phase', dot: 'bg-purple-400' };
    }
  };

  const filteredLots = filterStatus === 'all'
    ? lots
    : lots.filter((l) => l.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Filter and Legend Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0B1D3A] border border-[#C7A66A]/20 text-[#F8F6F1]">
        <div className="flex items-center space-x-2">
          <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
            Status Filter:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#132B52] border border-[#C7A66A]/30 text-xs text-[#F8F6F1] focus:outline-none"
          >
            <option value="all">All Lots ({lots.length})</option>
            <option value="available">Available Only</option>
            <option value="limited">Limited Release</option>
            <option value="sold">Reserved / Sold</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#F8F6F1]/80 font-sans-luxury">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7A66A]" />
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span>Limited</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />
            <span>Sold</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span>Upcoming</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative rounded-3xl overflow-hidden border border-[#C7A66A]/30 bg-[#071326] shadow-2xl p-4 sm:p-8">
        {/* Background Architectural Grid Lines */}
        <div className="absolute inset-0 monogram-watermark opacity-30 pointer-events-none" />

        <div className="relative w-full aspect-[16/10] max-h-[550px] flex items-center justify-center">
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-full select-none"
          >
            {/* Masterplan Site Outline / Contours */}
            <path
              d="M 100,80 Q 500,40 900,100 T 880,520 Q 500,560 120,480 Z"
              fill="rgba(19, 43, 82, 0.4)"
              stroke="#C7A66A"
              strokeWidth="2"
              strokeDasharray="6 6"
            />

            {/* Internal Estate Roads */}
            <path
              d="M 120,300 C 350,280 650,320 880,300"
              fill="none"
              stroke="rgba(199, 166, 106, 0.3)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M 480,100 L 480,500"
              fill="none"
              stroke="rgba(199, 166, 106, 0.25)"
              strokeWidth="12"
              strokeLinecap="round"
            />

            {/* Central Conserved Forest / Green Zone */}
            <circle
              cx="500"
              cy="300"
              r="70"
              fill="rgba(40, 90, 60, 0.3)"
              stroke="#4ADE80"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text
              x="500"
              y="305"
              textAnchor="middle"
              fill="#86EFAC"
              fontSize="12"
              fontFamily="sans-serif"
              letterSpacing="2"
              className="uppercase font-semibold pointer-events-none"
            >
              Conserved Pine Core
            </text>

            {/* Interactive Lots */}
            {filteredLots.map((lot) => {
              const statusCfg = getStatusColor(lot.status);
              const isHovered = hoveredLot?.id === lot.id;
              const isSelected = selectedLot?.id === lot.id;

              // Convert percentage coords to SVG 1000x600 coordinates
              const cx = (lot.coords.x / 100) * 1000;
              const cy = (lot.coords.y / 100) * 600;
              const r = lot.coords.radius ? (lot.coords.radius / 100) * 200 : 26;

              return (
                <g
                  key={lot.id}
                  className="cursor-pointer transition-transform duration-300"
                  onClick={() => setSelectedLot(lot)}
                  onMouseEnter={() => setHoveredLot(lot)}
                  onMouseLeave={() => setHoveredLot(null)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? r + 6 : isHovered ? r + 3 : r}
                    fill={statusCfg.fill}
                    fillOpacity={isSelected ? 0.95 : isHovered ? 0.85 : 0.65}
                    stroke={statusCfg.stroke}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-300"
                  />
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fill="#0B1D3A"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                    className="pointer-events-none select-none"
                  >
                    {lot.lotNumber}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip Overlay */}
          {hoveredLot && !selectedLot && (
            <div
              className="absolute pointer-events-none p-3 rounded-xl bg-[#0B1D3A]/95 border border-[#C7A66A]/40 text-[#F8F6F1] shadow-2xl text-xs space-y-1 z-20"
              style={{
                left: `${hoveredLot.coords.x}%`,
                top: `${hoveredLot.coords.y}%`,
                transform: 'translate(-50%, -120%)'
              }}
            >
              <div className="flex items-center justify-between space-x-2">
                <span className="font-bold text-[#C7A66A]">{hoveredLot.lotNumber}</span>
                <span className="text-[10px] uppercase font-semibold text-[#F8F6F1]/70">
                  {hoveredLot.status}
                </span>
              </div>
              <p className="font-serif-luxury">{hoveredLot.unitTypeName}</p>
              <p className="text-[10px] text-[#F8F6F1]/60">
                Land: {hoveredLot.landArea} m² • Build: {hoveredLot.buildingArea} m²
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Lot Detail Card / Drawer */}
      <AnimatePresence>
        {selectedLot && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#0B1D3A] border border-[#C7A66A]/40 text-[#F8F6F1] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full bg-[#C7A66A] text-[#0B1D3A] font-bold text-xs">
                  LOT {selectedLot.lotNumber}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
                  {selectedLot.status.toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-serif-luxury text-[#F8F6F1]">
                {selectedLot.unitTypeName}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#F8F6F1]/75 font-sans-luxury pt-1">
                <span>Land Area: <strong className="text-[#F8F6F1]">{selectedLot.landArea} m²</strong></span>
                <span>•</span>
                <span>Building: <strong className="text-[#F8F6F1]">{selectedLot.buildingArea} m²</strong></span>
                <span>•</span>
                <span>Orientation: <strong className="text-[#F8F6F1]">{selectedLot.facing}</strong></span>
              </div>
              {selectedLot.priceEstimate && (
                <p className="text-sm font-semibold text-[#C7A66A] pt-1">
                  Starting from {selectedLot.priceEstimate}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              {onSelectLotForVisit && selectedLot.status === 'available' && (
                <button
                  onClick={() => onSelectLotForVisit(selectedLot)}
                  className="flex-1 md:flex-initial px-6 py-3 rounded-full bg-[#C7A66A] hover:bg-[#E5C992] text-[#0B1D3A] font-semibold text-xs uppercase tracking-widest transition-all shadow-md"
                >
                  Book Private Viewing →
                </button>
              )}
              <button
                onClick={() => setSelectedLot(null)}
                className="p-3 rounded-full border border-white/20 hover:border-[#C7A66A] text-[#F8F6F1] hover:text-[#C7A66A] transition-colors"
                aria-label="Close lot preview"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
