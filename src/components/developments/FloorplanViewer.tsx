'use client';

import React, { useState } from 'react';
import { UnitType } from '@/types';
import { Layers, Check } from 'lucide-react';

interface FloorplanViewerProps {
  unitType: UnitType;
}

export default function FloorplanViewer({ unitType }: FloorplanViewerProps) {
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [hoveredRoom, setHoveredRoom] = useState<UnitType['interactiveRooms'][0] | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<UnitType['interactiveRooms'][0] | null>(null);

  // Group rooms by floor level
  const floorRooms = unitType.interactiveRooms.filter((r) => r.level === activeLevel);
  const totalLevels = unitType.floors;

  return (
    <div className="space-y-6">
      {/* Floor Level Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0B1D3A] border border-[#C7A66A]/20 text-[#F8F6F1]">
        <div className="flex items-center space-x-2">
          <Layers size={16} className="text-[#C7A66A]" />
          <span className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold">
            Floorplan Level:
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {Array.from({ length: totalLevels }, (_, i) => i + 1).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setActiveLevel(lvl);
                setSelectedRoom(null);
                setHoveredRoom(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                activeLevel === lvl
                  ? 'bg-[#C7A66A] text-[#0B1D3A] shadow-md'
                  : 'bg-[#132B52] text-[#F8F6F1]/70 hover:text-[#F8F6F1]'
              }`}
            >
              Level 0{lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Floorplan Architectural Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-[#C7A66A]/30 bg-[#071326] shadow-2xl p-6 sm:p-10">
          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            {/* SVG Architectural Blueprint Canvas */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full select-none"
            >
              {/* Outer Wall Boundary */}
              <rect
                x="60"
                y="50"
                width="680"
                height="500"
                rx="8"
                fill="rgba(19, 43, 82, 0.3)"
                stroke="#C7A66A"
                strokeWidth="2.5"
              />

              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(199, 166, 106, 0.08)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="60" y="50" width="680" height="500" fill="url(#grid)" />

              {/* Interactive Rooms */}
              {floorRooms.map((room, idx) => {
                const isHovered = hoveredRoom?.name === room.name;
                const isSelected = selectedRoom?.name === room.name;

                // Scale coords percentage to SVG 800x600 coordinate system
                const rx = (room.coords.x / 100) * 800;
                const ry = (room.coords.y / 100) * 600;
                const rw = (room.coords.width / 100) * 800;
                const rh = (room.coords.height / 100) * 600;

                return (
                  <g
                    key={idx}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedRoom(room)}
                    onMouseEnter={() => setHoveredRoom(room)}
                    onMouseLeave={() => setHoveredRoom(null)}
                  >
                    <rect
                      x={rx}
                      y={ry}
                      width={rw}
                      height={rh}
                      rx="4"
                      fill={isSelected ? '#C7A66A' : isHovered ? '#C7A66A' : 'rgba(11, 29, 58, 0.85)'}
                      fillOpacity={isSelected ? 0.4 : isHovered ? 0.25 : 0.6}
                      stroke={isSelected ? '#C7A66A' : isHovered ? '#E5C992' : 'rgba(199, 166, 106, 0.4)'}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="transition-all duration-300"
                    />

                    {/* Room Label */}
                    <text
                      x={rx + rw / 2}
                      y={ry + rh / 2 - 6}
                      textAnchor="middle"
                      fill={isSelected ? '#C7A66A' : '#F8F6F1'}
                      fontSize="13"
                      fontWeight="600"
                      fontFamily="serif"
                      className="pointer-events-none"
                    >
                      {room.name}
                    </text>
                    <text
                      x={rx + rw / 2}
                      y={ry + rh / 2 + 14}
                      textAnchor="middle"
                      fill="rgba(199, 166, 106, 0.85)"
                      fontSize="11"
                      fontFamily="sans-serif"
                      className="pointer-events-none"
                    >
                      {room.area} m²
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-[#0B1D3A] border border-[#C7A66A]/30 text-[#F8F6F1] space-y-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold">
                Interactive Room Inspector
              </span>
              <h3 className="text-xl font-serif-luxury text-[#F8F6F1]">
                {selectedRoom?.name || hoveredRoom?.name || 'Pilih Ruangan'}
              </h3>
            </div>

            {(selectedRoom || hoveredRoom) ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#C7A66A]/20 text-xs">
                  <span className="text-[#C7A66A]">Luas Ruangan:</span>
                  <span className="font-semibold">{(selectedRoom || hoveredRoom)?.area} m²</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#C7A66A]/20 text-xs">
                  <span className="text-[#C7A66A]">Lantai:</span>
                  <span className="font-semibold">Level 0{(selectedRoom || hoveredRoom)?.level}</span>
                </div>
                <p className="text-xs text-[#F8F6F1]/70 leading-relaxed font-sans-luxury pt-1">
                  {(selectedRoom || hoveredRoom)?.description}
                </p>
              </div>
            ) : (
              <p className="text-xs text-[#F8F6F1]/60 leading-relaxed font-sans-luxury">
                Arahkan kursor atau sentuh bagian denah untuk melihat spesifikasi arsitektur, luas area, dan fitur pencahayaan ruangan.
              </p>
            )}

            {/* Architectural Highlights of this Unit */}
            <div className="pt-4 border-t border-[#C7A66A]/20 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold block">
                Unit Key Features
              </span>
              <ul className="space-y-1.5 text-xs text-[#F8F6F1]/80">
                {unitType.features.map((feat, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <Check size={12} className="text-[#C7A66A]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
