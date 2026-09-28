import { useState } from "react";
import { Search, HardDrive, ChevronRight } from "lucide-react";

interface FileRecoveryProps {
  onStartScan: () => void;
  onCancel: () => void;
}

const devices = [
  { name: "Local Disk (C:)", type: "HDD", size: "500 GB", status: "Ready" },
  { name: "External HDD", type: "HDD", size: "1 TB", status: "Ready" },
  { name: "USB Drive (E:)", type: "USB", size: "32 GB", status: "Ready" },
  { name: "SD Card (F:)", type: "Removable", size: "64 GB", status: "Ready" },
];

const scanMethods = [
  { id: "quick", label: "Quick Scan", desc: "Scans for recently deleted files" },
  { id: "deep", label: "Deep Scan", desc: "Scans formatted or corrupted media" },
  { id: "raw", label: "Raw File Carving", desc: "Low-level sector analysis for maximum recovery" },
];

export default function FileRecovery({ onStartScan, onCancel }: FileRecoveryProps) {
  const [selectedDevice, setSelectedDevice] = useState(2);
  const [scanMethod, setScanMethod] = useState("deep");
  const [fragmented, setFragmented] = useState(true);
  const [fileType, setFileType] = useState("All File Types");

  const steps = ["Select Device", "Scan", "Preview & Recover"];

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      <header className="bg-white border-b px-8 py-4" style={{ borderColor: "#e2e8f0" }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "#faf5ff" }}>
            <Search size={20} style={{ color: "#9333ea" }} />
          </div>
          <div>
            <h1 className="font-bold text-xl" style={{ color: "#0f172a" }}>Advanced File Carving & Recovery</h1>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Recover deleted files from formatted, damaged, or corrupted storage media.
            </p>
          </div>
        </div>
      </header>

      {/* Step indicator */}
      <div className="bg-white border-b px-8 py-4" style={{ borderColor: "#e2e8f0" }}>
        <div className="flex items-center gap-0 max-w-md">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
                  style={{
                    background: i === 0 ? "#9333ea" : "#e2e8f0",
                    color: i === 0 ? "#fff" : "#94a3b8",
                  }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: i === 0 ? "#9333ea" : "#94a3b8" }}
                >
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight size={16} className="mx-3" style={{ color: "#cbd5e1" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Device selection */}
        <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
            <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>Select Storage Device</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Device Name", "Type", "Size", "Status", "Select"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold" style={{ color: "#94a3b8" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {devices.map((d, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedDevice(i)}
                    className="border-t cursor-pointer"
                    style={{
                      borderColor: "#f1f5f9",
                      background: selectedDevice === i ? "#faf5ff" : "transparent",
                    }}
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <HardDrive size={15} style={{ color: selectedDevice === i ? "#9333ea" : "#94a3b8" }} />
                        <span className="text-sm font-medium" style={{ color: "#0f172a" }}>{d.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-sm" style={{ color: "#64748b" }}>{d.type}</td>
                    <td className="px-6 py-3.5 text-sm mono" style={{ color: "#374151" }}>{d.size}</td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#dcfce7", color: "#15803d" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#16a34a" }} />
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <input type="radio" checked={selectedDevice === i} onChange={() => setSelectedDevice(i)} style={{ accentColor: "#9333ea" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scan options */}
        <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
            <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>Scan Options</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {scanMethods.map((m) => (
                <label
                  key={m.id}
                  className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all"
                  style={{
                    borderColor: scanMethod === m.id ? "#9333ea" : "#e2e8f0",
                    background: scanMethod === m.id ? "#faf5ff" : "#f8fafc",
                  }}
                >
                  <input
                    type="radio"
                    name="scan"
                    value={m.id}
                    checked={scanMethod === m.id}
                    onChange={() => setScanMethod(m.id)}
                    style={{ accentColor: "#9333ea" }}
                  />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#0f172a" }}>{m.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>{m.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={fragmented}
                onChange={(e) => setFragmented(e.target.checked)}
                style={{ accentColor: "#9333ea" }}
              />
              <span className="text-sm" style={{ color: "#374151" }}>Recover fragmented files where possible</span>
            </label>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium" style={{ color: "#374151" }}>File Type Filter:</span>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ borderColor: "#e2e8f0", color: "#374151" }}
              >
                {["All File Types", "Images (JPG, PNG, BMP)", "Documents (PDF, DOCX, XLSX)", "Videos (MP4, AVI)", "Archives (ZIP, RAR)", "Audio (MP3, WAV)"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg border text-sm font-medium"
            style={{ borderColor: "#e2e8f0", color: "#374151" }}
          >
            Cancel
          </button>
          <button
            onClick={onStartScan}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold"
            style={{ background: "#9333ea" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#7e22ce")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#9333ea")}
          >
            <Search size={15} />
            Start Recovery Scan
          </button>
        </div>
      </div>
    </div>
  );
}
