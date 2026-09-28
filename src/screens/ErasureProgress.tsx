import { useEffect, useState } from "react";
import { HardDrive, StopCircle } from "lucide-react";

interface ErasureProgressProps {
  onComplete: () => void;
}

export default function ErasureProgress({ onComplete }: ErasureProgressProps) {
  const [progress, setProgress] = useState(63);
  const [pass, setPass] = useState(2);
  const [elapsed, setElapsed] = useState("00:12:36");
  const [remaining, setRemaining] = useState("00:07:24");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + 1;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [onComplete]);

  const circumference = 2 * Math.PI * 54;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      <header className="bg-white border-b px-8 py-4" style={{ borderColor: "#e2e8f0" }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "#eff6ff" }}>
            <HardDrive size={20} style={{ color: "#2563eb" }} />
          </div>
          <div>
            <h1 className="font-bold text-xl" style={{ color: "#0f172a" }}>Secure Erasure in Progress</h1>
            <p className="text-sm" style={{ color: "#64748b" }}>Do not disconnect the device during operation</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress card */}
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 0.3s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-bold text-4xl" style={{ color: "#0f172a" }}>{progress}%</span>
                  <span className="text-xs font-medium mt-0.5" style={{ color: "#64748b" }}>complete</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full">
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%`, background: "linear-gradient(90deg, #2563eb, #60a5fa)" }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs" style={{ color: "#64748b" }}>Writing sanitization data...</span>
                  <span className="text-xs font-medium mono" style={{ color: "#2563eb" }}>{progress}%</span>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Device", value: "USB Drive (E:)" },
                { label: "Capacity", value: "32 GB" },
                { label: "Method", value: "DoD 5220.22-M (3 Passes)" },
                { label: "Current Pass", value: `Pass ${pass} of 3` },
                { label: "Time Elapsed", value: elapsed },
                { label: "Estimated Remaining", value: remaining },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2.5 border-b" style={{ borderColor: "#f1f5f9" }}>
                  <span className="text-sm" style={{ color: "#64748b" }}>{row.label}</span>
                  <span className="text-sm font-semibold mono" style={{ color: "#0f172a" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live status */}
          <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="live-dot w-2 h-2 rounded-full" style={{ background: "#16a34a" }} />
              <span className="text-sm font-semibold" style={{ color: "#0f172a" }}>Live Status</span>
            </div>
            <p className="text-sm mono" style={{ color: "#2563eb" }}>
              ▶ Writing random data to sectors 0x{(progress * 1000 + 8192).toString(16).toUpperCase()}–0x{(progress * 1000 + 16384).toString(16).toUpperCase()}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg border text-sm font-medium transition-all"
              style={{ borderColor: "#dc2626", color: "#dc2626" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#fef2f2"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              <StopCircle size={16} />
              Cancel Operation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
