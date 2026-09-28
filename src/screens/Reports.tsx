import { useState } from "react";
import { FileText, Download, CheckCircle } from "lucide-react";

const opLogs = [
  { date: "12 Sep 2026 10:21", op: "Drive Erasure", target: "USB Drive (E:)", status: "Success" },
  { date: "11 Sep 2026 16:45", op: "File Recovery", target: "External HDD", status: "Success" },
  { date: "11 Sep 2026 14:10", op: "File Erasure", target: "Confidential_Files", status: "Success" },
  { date: "10 Sep 2026 09:30", op: "Deep Scan", target: "SSD (D:)", status: "Success" },
  { date: "09 Sep 2026 15:00", op: "Drive Erasure", target: "Local Disk (C:)", status: "Success" },
];

export default function Reports() {
  const [tab, setTab] = useState<"ops" | "recovery" | "erasure">("ops");
  const [selected, setSelected] = useState(0);

  const report = opLogs[selected];

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      <header className="bg-white border-b px-8 py-4" style={{ borderColor: "#e2e8f0" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "#fff7ed" }}>
              <FileText size={20} style={{ color: "#ea580c" }} />
            </div>
            <div>
              <h1 className="font-bold text-xl" style={{ color: "#0f172a" }}>Reports & Audit Logs</h1>
              <p className="text-sm" style={{ color: "#64748b" }}>View operations and generate forensic reports</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold"
            style={{ background: "#2563eb" }}
          >
            <Download size={15} />
            Generate PDF Report
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b px-8" style={{ borderColor: "#e2e8f0" }}>
        <div className="flex gap-0">
          {[
            { id: "ops", label: "Operation Logs" },
            { id: "recovery", label: "Recovery Reports" },
            { id: "erasure", label: "Erasure Reports" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as "ops" | "recovery" | "erasure")}
              className="px-5 py-3 text-sm font-medium border-b-2 transition-all"
              style={{
                borderColor: tab === t.id ? "#2563eb" : "transparent",
                color: tab === t.id ? "#2563eb" : "#64748b",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex gap-5 p-6">
        {/* Table */}
        <div className="flex-1 bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "#f1f5f9" }}>
            <h3 className="font-semibold text-sm" style={{ color: "#0f172a" }}>Operation History</h3>
            <button
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border"
              style={{ borderColor: "#e2e8f0", color: "#374151" }}
            >
              <Download size={13} />
              Export Audit Log
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Date & Time", "Operation", "Target", "Status", "Details"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold" style={{ color: "#94a3b8" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {opLogs.map((row, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelected(i)}
                    className="border-t cursor-pointer transition-colors"
                    style={{
                      borderColor: "#f1f5f9",
                      background: selected === i ? "#eff6ff" : "transparent",
                    }}
                  >
                    <td className="px-5 py-3.5 text-sm mono" style={{ color: "#64748b" }}>{row.date}</td>
                    <td className="px-5 py-3.5 text-sm font-medium" style={{ color: "#0f172a" }}>{row.op}</td>
                    <td className="px-5 py-3.5 text-sm" style={{ color: "#374151" }}>{row.target}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#dcfce7", color: "#15803d" }}>
                        <CheckCircle size={11} />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button className="text-sm font-medium" style={{ color: "#2563eb" }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report preview */}
        <div className="w-72 bg-white rounded-2xl flex flex-col" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
            <h3 className="font-semibold text-sm" style={{ color: "#0f172a" }}>Report Preview</h3>
          </div>
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-2 pb-4 border-b" style={{ borderColor: "#f1f5f9" }}>
              <FileText size={24} style={{ color: "#2563eb" }} />
              <div>
                <div className="font-bold text-sm" style={{ color: "#0f172a" }}>ForenSecure</div>
                <div className="text-xs" style={{ color: "#64748b" }}>Forensic Report</div>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { label: "Case ID", value: "FS-2026-09-1201" },
                { label: "Operation", value: report.op },
                { label: "Device", value: report.target },
                { label: "Date", value: report.date },
                { label: "Method", value: "DoD 5220.22-M" },
                { label: "Verification", value: "Completed" },
                { label: "Result", value: "Successfully Completed" },
              ].map((r) => (
                <div key={r.label}>
                  <div className="text-xs" style={{ color: "#94a3b8" }}>{r.label}</div>
                  <div className="text-sm font-medium" style={{ color: "#0f172a" }}>{r.value}</div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t" style={{ borderColor: "#f1f5f9" }}>
              <div className="text-xs font-medium mb-2" style={{ color: "#374151" }}>Evidence Information</div>
              <div className="text-xs" style={{ color: "#64748b" }}>
                SHA-256: a3f2b8c1d4e9f0a1...
                <br />
                MD5: 5d41402abc4b2a76...
                <br />
                Chain of custody maintained.
              </div>
            </div>
          </div>

          <div className="px-5 pb-5 space-y-2">
            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-semibold"
              style={{ background: "#2563eb" }}
            >
              <Download size={14} />
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
