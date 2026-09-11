'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseCsv, csvRowsToRecords } from '@/lib/csv';
import {
  IMPORT_ENTITIES,
  validateRecord,
  buildTemplateCsv,
  type ImportEntity,
  type ImportMode,
  type RowValidationResult
} from '@/lib/importSpec';
import { useSiteData } from '@/components/DataProvider';
import { Upload, Download, CheckCircle2, AlertTriangle, FileSpreadsheet, Loader2 } from 'lucide-react';

export default function CsvImportPanel() {
  const router = useRouter();
  const { developments, articles } = useSiteData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [entity, setEntity] = useState<ImportEntity>('developments');
  const [mode, setMode] = useState<ImportMode>('append');
  const [records, setRecords] = useState<Record<string, string>[]>([]);
  const [fileName, setFileName] = useState('');
  const [rowErrors, setRowErrors] = useState<RowValidationResult[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const existingSlugs = new Set(
    (entity === 'developments' ? developments : articles).map((item) => item.slug)
  );

  const resetFileState = () => {
    setRecords([]);
    setRowErrors([]);
    setFileName('');
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEntityChange = (next: ImportEntity) => {
    setEntity(next);
    resetFileState();
  };

  const handleModeChange = (next: ImportMode) => {
    setMode(next);
    // Re-validate already loaded rows against the new mode
    if (records.length > 0) revalidateRows(records, next);
  };

  const revalidateRows = (recs: Record<string, string>[], m: ImportMode) => {
    const errors: RowValidationResult[] = [];
    recs.forEach((record, idx) => {
      const errs = validateRecord(entity, record, existingSlugs, m);
      if (Object.keys(errs).length > 0) errors.push({ row: idx + 1, errors: errs });
    });
    setRowErrors(errors);
  };

  const handleFile = async (file: File) => {
    setResult(null);
    const text = await file.text();
    const parsed = parseCsv(text);

    if (parsed.length < 2) {
      setResult({ ok: false, message: 'File CSV kosong atau hanya berisi header.' });
      setRecords([]);
      setRowErrors([]);
      return;
    }

    const recs = csvRowsToRecords(parsed);
    setRecords(recs);
    setFileName(file.name);

    const errors: RowValidationResult[] = [];
    recs.forEach((record, idx) => {
      const errs = validateRecord(entity, record, existingSlugs, mode);
      if (Object.keys(errs).length > 0) errors.push({ row: idx + 1, errors: errs });
    });
    setRowErrors(errors);
  };

  const downloadTemplate = () => {
    const csv = buildTemplateCsv(entity);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template-import-${entity}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    setImporting(true);
    setResult(null);
    try {
      const res = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity, mode, rows: records })
      });
      const data = await res.json();

      if (res.ok) {
        setResult({
          ok: true,
          message: `Berhasil mengimpor ${data.imported} baris ke ${IMPORT_ENTITIES[entity].label}. Halaman publik akan diperbarui otomatis.`
        });
        resetFileState();
        router.refresh();
      } else {
        const first = data.errors?.[0];
        setResult({
          ok: false,
          message:
            data.error ||
            `${data.failed} baris gagal validasi. Contoh: baris ${first?.row} — ${Object.values(first?.errors || {})[0] || 'error tidak diketahui'}`
        });
      }
    } catch (err) {
      console.error('Import failed', err);
      setResult({ ok: false, message: 'Gagal menghubungi server import.' });
    } finally {
      setImporting(false);
    }
  };

  const validCount = records.length - rowErrors.length;
  const columns = IMPORT_ENTITIES[entity].columns;
  const previewRecords = records.slice(0, 30);

  return (
    <div className="space-y-6">
      {/* Entity & Mode */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 p-4 rounded-2xl bg-white border border-[#0B1D3A]/10 shadow-sm">
        <div className="space-y-2 w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#6B6B6B] block">
            Jenis Data
          </span>
          <div className="flex items-center gap-2">
            {(Object.keys(IMPORT_ENTITIES) as ImportEntity[]).map((key) => (
              <button
                key={key}
                onClick={() => handleEntityChange(key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  entity === key
                    ? 'bg-[#0B1D3A] text-[#F8F6F1]'
                    : 'bg-[#F8F6F1] text-[#6B6B6B] hover:text-[#0B1D3A]'
                }`}
              >
                {IMPORT_ENTITIES[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 w-full sm:w-auto">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#6B6B6B] block">
            Mode
          </span>
          <select
            value={mode}
            onChange={(e) => handleModeChange(e.target.value as ImportMode)}
            className="px-3 py-2 rounded-xl bg-[#F8F6F1] border border-[#0B1D3A]/10 text-xs text-[#0B1D3A] focus:outline-none"
          >
            <option value="append">Tambah Baru (tolak slug duplikat)</option>
            <option value="upsert">Update / Timpa (berdasarkan slug)</option>
          </select>
        </div>

        <button
          onClick={downloadTemplate}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#C7A66A]/15 hover:bg-[#C7A66A]/25 text-[#9D7D45] text-xs font-semibold uppercase tracking-wider transition-all"
        >
          <Download size={14} />
          <span>Template CSV</span>
        </button>
      </div>

      {/* Upload Zone */}
      <div className="p-8 rounded-3xl bg-white border-2 border-dashed border-[#C7A66A]/40 text-center space-y-4">
        <FileSpreadsheet size={40} className="mx-auto text-[#C7A66A]" />
        <div className="space-y-1">
          <h3 className="font-serif-luxury text-lg text-[#0B1D3A]">
            Upload file CSV {IMPORT_ENTITIES[entity].label}
          </h3>
          <p className="text-xs text-[#6B6B6B]">
            Unduh template di atas agar struktur kolom sesuai. Maksimal 500 baris per import.
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="hidden"
            id="csv-file-input"
          />
          <label
            htmlFor="csv-file-input"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#0B1D3A] hover:bg-[#132B52] text-[#F8F6F1] text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all"
          >
            <Upload size={14} />
            <span>Pilih File CSV</span>
          </label>
        </div>
      </div>

      {/* Result Banner */}
      {result && (
        <div
          className={`flex items-start space-x-3 p-4 rounded-2xl border text-xs ${
            result.ok
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {result.ok ? (
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          )}
          <span>{result.message}</span>
        </div>
      )}

      {/* Preview */}
      {records.length > 0 && (
        <div className="rounded-3xl bg-white border border-[#0B1D3A]/10 shadow-md overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[#0B1D3A]/10 bg-[#F8F6F1]">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#0B1D3A] block">{fileName}</span>
              <span className="text-[11px] text-[#6B6B6B]">
                {records.length} baris terbaca •{' '}
                <span className={rowErrors.length > 0 ? 'text-red-600 font-semibold' : 'text-green-700 font-semibold'}>
                  {validCount} valid
                </span>
                {rowErrors.length > 0 && ` • ${rowErrors.length} error`}
              </span>
            </div>
            <button
              onClick={handleImport}
              disabled={importing || validCount === 0}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#0B1D3A] hover:bg-[#132B52] disabled:opacity-40 disabled:cursor-not-allowed text-[#F8F6F1] text-xs font-semibold uppercase tracking-widest transition-all"
            >
              {importing ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
              <span>
                Import {validCount} Baris{rowErrors.length > 0 ? ' (Valid Saja)' : ''}
              </span>
            </button>
          </div>

          <div className="overflow-x-auto max-h-[480px]">
            <table className="w-full text-left text-[11px] font-sans-luxury">
              <thead className="bg-[#0B1D3A] text-[#F8F6F1] sticky top-0">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  {columns.slice(0, 6).map((col) => (
                    <th key={col.header} className="py-2.5 px-3 uppercase tracking-wider">
                      {col.header}
                    </th>
                  ))}
                  <th className="py-2.5 px-3 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {previewRecords.map((record, idx) => {
                  const rowError = rowErrors.find((e) => e.row === idx + 1);
                  return (
                    <tr key={idx} className={rowError ? 'bg-red-50' : ''}>
                      <td className="py-2 px-3 text-[#6B6B6B]">{idx + 1}</td>
                      {columns.slice(0, 6).map((col) => (
                        <td key={col.header} className="py-2 px-3 text-[#0B1D3A] max-w-[220px] truncate">
                          {record[col.header] || <span className="text-gray-300">—</span>}
                        </td>
                      ))}
                      <td className="py-2 px-3">
                        {rowError ? (
                          <span className="text-red-700">
                            {Object.entries(rowError.errors)
                              .map(([field, msg]) => `${field}: ${msg}`)
                              .join('; ')}
                          </span>
                        ) : (
                          <span className="text-green-700 font-semibold">✓ Siap</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {records.length > 30 && (
            <div className="px-5 py-3 text-[11px] text-[#6B6B6B] border-t border-[#0B1D3A]/10 bg-[#F8F6F1]">
              Menampilkan 30 dari {records.length} baris. Semua baris tetap divalidasi & diimpor.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
