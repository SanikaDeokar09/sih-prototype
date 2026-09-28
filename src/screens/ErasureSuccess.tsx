import { CheckCircle, FileText, LayoutDashboard } from "lucide-react";

interface ErasureSuccessProps {
  onDashboard: () => void;
  onReport: () => void;
}

export default function ErasureSuccess({ onDashboard, onReport }: ErasureSuccessProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-10 text-center mb-6" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-full" style={{ background: "#dcfce7" }}>
                <CheckCircle size={44} style={{ color: "#16a34a" }} />
              </div>
            </div>
            <h1 className="font-bold text-2xl mb-2" style={{ color: "#0f172a" }}>Erasure Completed Successfully</h1>
            <p className="text-sm mb-8" style={{ color: "#64748b" }}>
              The storage device has been securely sanitized and verified.
            </p>

            <div className="rounded-xl p-5 text-left mb-8" style={{ background: "#f8fafc" }}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Device", value: "USB Drive (E:)" },
                  { label: "Method", value: "DoD 5220.22-M (3 Passes)" },
                  { label: "Total Time", value: "00:20:14" },
                  { label: "Verification", value: "Completed" },
                  { label: "Status", value: "Data successfully erased" },
                  { label: "Case ID", value: "FS-2026-09-1201" },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col">
                    <span className="text-xs mb-0.5" style={{ color: "#94a3b8" }}>{row.label}</span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: row.label === "Status" ? "#16a34a" : "#0f172a" }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-left mb-8">
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#374151" }}>Verification Summary</h3>
              <div className="space-y-2">
                {[
                  "Device processed",
                  "Erasure completed",
                  "Verification completed",
                  "Audit log created",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle size={16} style={{ color: "#16a34a" }} />
                    <span className="text-sm" style={{ color: "#374151" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={onReport}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all"
                style={{ borderColor: "#2563eb", color: "#2563eb" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#eff6ff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
              >
                <FileText size={15} />
                View Verification Report
              </button>
              <button
                onClick={onDashboard}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold"
                style={{ background: "#2563eb" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")}
              >
                <LayoutDashboard size={15} />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
