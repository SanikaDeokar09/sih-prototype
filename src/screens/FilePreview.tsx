import { CheckCircle, AlertTriangle, HardDrive, ArrowLeft, Image } from "lucide-react";

interface FilePreviewProps {
  onBack: () => void;
  onRecover: () => void;
}

export default function FilePreview({ onBack, onRecover }: FilePreviewProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      <header className="bg-white border-b px-8 py-4" style={{ borderColor: "#e2e8f0" }}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-lg" style={{ color: "#64748b" }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-bold text-xl" style={{ color: "#0f172a" }}>File Preview</h1>
            <p className="text-sm" style={{ color: "#64748b" }}>photo001.jpg — Forensic Analysis</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-4 gap-5 h-full">
          {/* File info */}
          <div className="bg-white rounded-2xl p-5 space-y-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <h3 className="font-semibold text-sm" style={{ color: "#0f172a" }}>File Information</h3>
            <div className="space-y-3">
              {[
                { label: "Filename", value: "photo001.jpg" },
                { label: "File Type", value: "JPEG Image" },
                { label: "File Size", value: "2.4 MB" },
                { label: "Original Location", value: "C:\\Users\\user\\Pictures" },
                { label: "Recovery Method", value: "Signature Carving" },
                { label: "Recovery Confidence", value: "High (87%)" },
                { label: "Fragmentation", value: "None" },
              ].map((r) => (
                <div key={r.label}>
                  <div className="text-xs mb-0.5" style={{ color: "#94a3b8" }}>{r.label}</div>
                  <div className="text-sm font-medium mono" style={{ color: "#0f172a" }}>{r.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview center */}
          <div className="col-span-2 bg-white rounded-2xl overflow-hidden flex flex-col" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
              <span className="text-sm font-semibold" style={{ color: "#0f172a" }}>Preview</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-6" style={{ background: "#0f172a" }}>
              {/* Placeholder image preview with gradient */}
              <div
                className="w-full max-h-72 rounded-xl flex flex-col items-center justify-center gap-3"
                style={{
                  aspectRatio: "4/3",
                  background: "linear-gradient(135deg, #1e3a5f 0%, #0d2240 50%, #1a1a2e 100%)",
                }}
              >
                <Image size={48} style={{ color: "#2563eb", opacity: 0.5 }} />
                <div className="text-center">
                  <div className="text-sm font-medium" style={{ color: "#94a3b8" }}>photo001.jpg</div>
                  <div className="text-xs" style={{ color: "#475569" }}>JPEG · 2.4 MB · 3840×2160</div>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 border-t flex items-center justify-between" style={{ borderColor: "#f1f5f9" }}>
              <span className="text-xs mono" style={{ color: "#94a3b8" }}>FFD8FFE0 00104A46 49460001 01000048</span>
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: "#dcfce7", color: "#15803d" }}>Valid Signature</span>
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-white rounded-2xl p-5 flex flex-col" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <h3 className="font-semibold text-sm mb-4" style={{ color: "#0f172a" }}>Recovery Analysis</h3>
            <div className="space-y-2.5 flex-1">
              {[
                { label: "File signature valid", ok: true },
                { label: "File structure valid", ok: true },
                { label: "Metadata detected", ok: true },
                { label: "Fragment detected", ok: false, warn: true },
                { label: "Recoverable content identified", ok: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  {item.ok ? (
                    <CheckCircle size={15} style={{ color: "#16a34a" }} />
                  ) : (
                    <AlertTriangle size={15} style={{ color: "#d97706" }} />
                  )}
                  <span className="text-sm" style={{ color: "#374151" }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 p-4 rounded-xl" style={{ background: "#f8fafc" }}>
              <div className="text-xs font-medium mb-2" style={{ color: "#94a3b8" }}>Recovery Confidence</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
                  <div className="h-full rounded-full" style={{ width: "87%", background: "#16a34a" }} />
                </div>
                <span className="font-bold text-lg" style={{ color: "#16a34a" }}>87%</span>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              <button
                onClick={onRecover}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-semibold"
                style={{ background: "#9333ea" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#7e22ce")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#9333ea")}
              >
                <HardDrive size={14} />
                Recover File
              </button>
              <button
                onClick={onBack}
                className="w-full py-2.5 rounded-lg border text-sm font-medium"
                style={{ borderColor: "#e2e8f0", color: "#374151" }}
              >
                Back to Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
