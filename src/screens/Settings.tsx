import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0"
      style={{ background: on ? "#2563eb" : "#cbd5e1" }}
    >
      <div
        className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200"
        style={{ left: on ? "calc(100% - 20px)" : "4px" }}
      />
    </button>
  );
}

export default function Settings() {
  const [opts, setOpts] = useState({
    darkMode: false,
    notifications: true,
    twoFactor: true,
    auditLog: true,
    hashVerify: true,
    autoLock: true,
    rememberDevices: false,
  });
  const toggle = (k: keyof typeof opts) => setOpts((o) => ({ ...o, [k]: !o[k] }));

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      <header className="bg-white border-b px-8 py-4" style={{ borderColor: "#e2e8f0" }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "#f8fafc" }}>
            <SettingsIcon size={20} style={{ color: "#64748b" }} />
          </div>
          <div>
            <h1 className="font-bold text-xl" style={{ color: "#0f172a" }}>Settings</h1>
            <p className="text-sm" style={{ color: "#64748b" }}>Application preferences and security configuration</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl space-y-6">
          {/* General */}
          <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
              <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>General</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#374151" }}>Dark Mode</div>
                  <div className="text-xs" style={{ color: "#94a3b8" }}>Switch to dark interface theme</div>
                </div>
                <Toggle on={opts.darkMode} onChange={() => toggle("darkMode")} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#374151" }}>Notifications</div>
                  <div className="text-xs" style={{ color: "#94a3b8" }}>Show operation completion alerts</div>
                </div>
                <Toggle on={opts.notifications} onChange={() => toggle("notifications")} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#374151" }}>Language</div>
                </div>
                <select className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "#e2e8f0" }}>
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Español</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
              <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>Security</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#374151" }}>Two-Factor Authentication</div>
                  <div className="text-xs" style={{ color: "#94a3b8" }}>Require 2FA for login</div>
                </div>
                <Toggle on={opts.twoFactor} onChange={() => toggle("twoFactor")} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#374151" }}>Auto-Lock Session</div>
                  <div className="text-xs" style={{ color: "#94a3b8" }}>Lock after inactivity period</div>
                </div>
                <Toggle on={opts.autoLock} onChange={() => toggle("autoLock")} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#374151" }}>Session Timeout</div>
                </div>
                <select className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "#e2e8f0" }}>
                  {["5 minutes", "15 minutes", "30 minutes", "1 hour"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Forensic Settings */}
          <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
              <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>Forensic Settings</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#374151" }}>Hash Verification</div>
                  <div className="text-xs" style={{ color: "#94a3b8" }}>SHA-256 checksum on all operations</div>
                </div>
                <Toggle on={opts.hashVerify} onChange={() => toggle("hashVerify")} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#374151" }}>Recovery Output Location</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue="C:\\ForenSecure\\Recovery"
                    className="px-3 py-2 rounded-lg border text-sm mono w-52"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                  <button className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "#e2e8f0", color: "#374151" }}>
                    Browse
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Audit */}
          <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
              <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>Audit & Logging</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#374151" }}>Enable Audit Logging</div>
                  <div className="text-xs" style={{ color: "#94a3b8" }}>Record all operations to tamper-evident log</div>
                </div>
                <Toggle on={opts.auditLog} onChange={() => toggle("auditLog")} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "#374151" }}>Log Retention</div>
                </div>
                <select className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "#e2e8f0" }}>
                  {["30 days", "90 days", "1 year", "Indefinite"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-5 py-2.5 rounded-lg border text-sm font-medium" style={{ borderColor: "#e2e8f0", color: "#374151" }}>
              Reset to Defaults
            </button>
            <button className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold" style={{ background: "#2563eb" }}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
