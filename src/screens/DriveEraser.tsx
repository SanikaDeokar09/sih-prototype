import { useState } from "react";
import { HardDrive, RefreshCw, AlertTriangle, Info, ShieldAlert } from "lucide-react";

interface DriveEraserProps {
  onStart: () => void;
  onCancel: () => void;
}

const devices = [
  { name: "Local Disk (C:)", type: "HDD", capacity: "500 GB", status: "Ready" },
  { name: "New Volume (D:)", type: "SSD", capacity: "256 GB", status: "Ready" },
  { name: "USB Drive (E:)", type: "USB", capacity: "32 GB", status: "Ready" },
  { name: "SD Card (F:)", type: "Removable", capacity: "64 GB", status: "Ready" },
];

const methods = [
  { id: "quick", label: "Quick Erase (1 Pass)", desc: "Faster, basic sanitization" },
  { id: "nist", label: "NIST 800-88 (Clear / Purge)", desc: "High security (for SSD/HDD)" },
  { id: "dod", label: "DoD 5220.22-M (3 Passes)", desc: "High security, 3-pass overwrite" },
  { id: "custom", label: "Custom Passes", desc: "Specify number of passes" },
];

export default function DriveEraser({ onStart, onCancel }: DriveEraserProps) {
  const [selected, setSelected] = useState(2); // USB Drive
  const [method, setMethod] = useState("quick");
  const [customPasses, setCustomPasses] = useState(7);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
        {/* Header */}
        <header className="bg-white border-b px-8 py-4" style={{ borderColor: "#e2e8f0" }}>
          <div className="flex items-center gap-3 mb-0.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "#eff6ff" }}>
              <HardDrive size={20} style={{ color: "#2563eb" }} />
            </div>
            <div>
              <h1 className="font-bold text-xl" style={{ color: "#0f172a" }}>Secure Drive Eraser</h1>
              <p className="text-sm" style={{ color: "#64748b" }}>
                Securely sanitize an entire storage device and verify the result.
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Step 1: Select Device */}
          <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "#f1f5f9" }}>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ background: "#2563eb" }}>1</span>
                <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>Select Storage Device</h2>
              </div>
              <button className="flex items-center gap-1.5 text-sm" style={{ color: "#2563eb" }}>
                <RefreshCw size={14} /> Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["Device Name", "Type", "Capacity", "Status", "Select"].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold" style={{ color: "#94a3b8" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {devices.map((d, i) => (
                    <tr
                      key={i}
                      onClick={() => setSelected(i)}
                      className="border-t cursor-pointer transition-colors"
                      style={{
                        borderColor: "#f1f5f9",
                        background: selected === i ? "#eff6ff" : "transparent",
                      }}
                    >
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <HardDrive size={15} style={{ color: selected === i ? "#2563eb" : "#94a3b8" }} />
                          <span className="text-sm font-medium" style={{ color: "#0f172a" }}>{d.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm" style={{ color: "#64748b" }}>{d.type}</td>
                      <td className="px-6 py-3.5 text-sm mono" style={{ color: "#374151" }}>{d.capacity}</td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#dcfce7", color: "#15803d" }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#16a34a" }} />
                          {d.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <input
                          type="radio"
                          checked={selected === i}
                          onChange={() => setSelected(i)}
                          style={{ accentColor: "#2563eb" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Step 2: Erasure Method */}
          <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="px-6 py-4 border-b flex items-center gap-2" style={{ borderColor: "#f1f5f9" }}>
              <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ background: "#2563eb" }}>2</span>
              <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>Select Erasure Method</h2>
              <button title="The selected method determines how sanitization is performed. Higher pass counts provide greater security.">
                <Info size={15} style={{ color: "#94a3b8" }} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {methods.map((m) => (
                  <label
                    key={m.id}
                    className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all"
                    style={{
                      borderColor: method === m.id ? "#2563eb" : "#e2e8f0",
                      background: method === m.id ? "#eff6ff" : "#f8fafc",
                    }}
                  >
                    <input
                      type="radio"
                      name="method"
                      value={m.id}
                      checked={method === m.id}
                      onChange={() => setMethod(m.id)}
                      className="mt-0.5"
                      style={{ accentColor: "#2563eb" }}
                    />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "#0f172a" }}>{m.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>{m.desc}</div>
                      {m.id === "custom" && method === "custom" && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs" style={{ color: "#64748b" }}>Passes:</span>
                          <input
                            type="number"
                            value={customPasses}
                            onChange={(e) => setCustomPasses(Number(e.target.value))}
                            min={1}
                            max={35}
                            className="w-14 px-2 py-1 rounded border text-sm text-center"
                            style={{ borderColor: "#2563eb" }}
                          />
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ background: "#fefce8", borderColor: "#fde047" }}>
                <AlertTriangle size={18} style={{ color: "#d97706" }} className="flex-shrink-0 mt-0.5" />
                <p className="text-sm" style={{ color: "#92400e" }}>
                  <strong>Warning:</strong> Secure erasure permanently destroys data. This operation cannot be undone.
                  Ensure you have selected the correct device before proceeding.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-white border-t px-8 py-4 flex items-center justify-between" style={{ borderColor: "#e2e8f0" }}>
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-all"
            style={{ borderColor: "#e2e8f0", color: "#374151" }}
          >
            Cancel
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-all"
            style={{ background: "#2563eb" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")}
          >
            <ShieldAlert size={15} />
            Start Secure Erasure
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ background: "#fef2f2" }}>
                <ShieldAlert size={24} style={{ color: "#dc2626" }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: "#0f172a" }}>Permanent Data Destruction</h3>
                <p className="text-sm" style={{ color: "#dc2626" }}>This action cannot be undone</p>
              </div>
            </div>

            <p className="text-sm mb-5" style={{ color: "#374151" }}>
              This operation will permanently erase the selected storage device. Data may not be recoverable after completion.
            </p>

            <div className="rounded-xl p-4 mb-5 space-y-2" style={{ background: "#f8fafc" }}>
              {[
                { label: "Device", value: devices[selected].name },
                { label: "Capacity", value: devices[selected].capacity },
                { label: "Method", value: methods.find((m) => m.id === method)?.label || "" },
              ].map((r) => (
                <div key={r.label} className="flex justify-between text-sm">
                  <span style={{ color: "#64748b" }}>{r.label}</span>
                  <span className="font-medium" style={{ color: "#0f172a" }}>{r.value}</span>
                </div>
              ))}
            </div>

            <label className="flex items-center gap-2.5 mb-5 cursor-pointer">
              <input type="checkbox" style={{ accentColor: "#dc2626" }} />
              <span className="text-sm font-medium" style={{ color: "#374151" }}>
                I understand that this operation is irreversible.
              </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-lg border text-sm font-medium"
                style={{ borderColor: "#e2e8f0", color: "#374151" }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowModal(false); onStart(); }}
                className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold"
                style={{ background: "#dc2626" }}
              >
                Proceed with Secure Erasure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
