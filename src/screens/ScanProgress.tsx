import { useEffect, useState } from "react";
import { Search, Pause, Image, FileText, Video, Archive, Music, File } from "lucide-react";

interface ScanProgressProps {
  onComplete: () => void;
}

const liveLog = [
  "JPEG signature detected at sector 0x4A2F00",
  "PDF structure identified (version 1.7)",
  "Fragmented DOCX detected — carving...",
  "MP4 header found at sector 0x8B1C00",
  "ZIP local file header detected",
  "PNG IHDR chunk validated",
  "XLSX workbook structure identified",
  "AVI RIFF header found",
];

export default function ScanProgress({ onComplete }: ScanProgressProps) {
  const [progress, setProgress] = useState(72);
  const [files, setFiles] = useState(1248);
  const [recoverable, setRecoverable] = useState(937);
  const [logIdx, setLogIdx] = useState(0);
  const [logLines, setLogLines] = useState([liveLog[0]]);

  useEffect(() => {
    const prog = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(prog);
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + 1;
      });
      setFiles((f) => f + Math.floor(Math.random() * 8));
      setRecoverable((r) => r + Math.floor(Math.random() * 6));
    }, 200);

    const log = setInterval(() => {
      setLogIdx((i) => {
        const next = (i + 1) % liveLog.length;
        setLogLines((lines) => [...lines.slice(-4), liveLog[next]]);
        return next;
      });
    }, 1200);

    return () => { clearInterval(prog); clearInterval(log); };
  }, [onComplete]);

  const circ = 2 * Math.PI * 54;
  const offset = circ * (1 - progress / 100);

  const categories = [
    { label: "Images", count: 412, icon: Image, color: "#2563eb" },
    { label: "Documents", count: 287, icon: FileText, color: "#16a34a" },
    { label: "Videos", count: 95, icon: Video, color: "#9333ea" },
    { label: "Archives", count: 63, icon: Archive, color: "#ea580c" },
    { label: "Audio", count: 48, icon: Music, color: "#0891b2" },
    { label: "Other", count: 32, icon: File, color: "#64748b" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      <header className="bg-white border-b px-8 py-4" style={{ borderColor: "#e2e8f0" }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "#faf5ff" }}>
            <Search size={20} style={{ color: "#9333ea" }} />
          </div>
          <div>
            <h1 className="font-bold text-xl" style={{ color: "#0f172a" }}>Scanning Storage Device</h1>
            <p className="text-sm" style={{ color: "#64748b" }}>USB Drive (E:) — Do not disconnect the device</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Main progress */}
          <div className="col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-7" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-10">
                <div className="relative w-36 h-36 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="54" fill="none"
                      stroke="#9333ea" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={circ} strokeDashoffset={offset}
                      style={{ transition: "stroke-dashoffset 0.3s ease" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-bold text-3xl" style={{ color: "#0f172a" }}>{progress}%</span>
                    <span className="text-xs" style={{ color: "#64748b" }}>scanned</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm" style={{ color: "#64748b" }}>Scan Progress</span>
                      <span className="text-sm font-semibold mono" style={{ color: "#9333ea" }}>{progress}%</span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%`, background: "linear-gradient(90deg, #9333ea, #c084fc)" }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Files Discovered", value: files.toLocaleString() },
                      { label: "Recoverable Files", value: recoverable.toLocaleString() },
                      { label: "Time Elapsed", value: "04:12:36" },
                      { label: "Est. Remaining", value: "01:36:48" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-lg p-3" style={{ background: "#f8fafc" }}>
                        <div className="text-xs mb-0.5" style={{ color: "#94a3b8" }}>{stat.label}</div>
                        <div className="font-bold text-lg mono" style={{ color: "#0f172a" }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live log */}
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="live-dot w-2 h-2 rounded-full" style={{ background: "#9333ea" }} />
                <span className="text-sm font-semibold" style={{ color: "#0f172a" }}>Live Activity</span>
              </div>
              <div className="space-y-1.5 font-mono text-xs" style={{ color: "#64748b" }}>
                {logLines.map((line, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: "#9333ea" }}>▶</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border text-sm font-medium"
                style={{ borderColor: "#9333ea", color: "#9333ea" }}
              >
                <Pause size={15} />
                Pause Scan
              </button>
            </div>
          </div>

          {/* Categories panel */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <h3 className="font-semibold text-sm mb-4" style={{ color: "#0f172a" }}>File Categories Detected</h3>
              <div className="space-y-3">
                {categories.map(({ label, count, icon: Icon, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0" style={{ background: `${color}18` }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium" style={{ color: "#374151" }}>{label}</span>
                        <span className="text-xs font-semibold mono" style={{ color }}>{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, (count / 420) * 100)}%`, background: color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
