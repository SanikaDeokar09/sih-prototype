import { Shield, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: "#0f1623" }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-center px-16 w-1/2 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f1623 0%, #0d2240 100%)" }}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #2563eb 0%, transparent 60%),
              radial-gradient(circle at 70% 80%, #1d4ed8 0%, transparent 50%)`,
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div
              className="flex items-center justify-center w-14 h-14 rounded-2xl"
              style={{ background: "#2563eb" }}
            >
              <Shield size={30} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-3xl tracking-tight">ForenSecure</div>
              <div style={{ color: "#60a5fa" }} className="text-sm font-medium">
                Secure Today. Recover Tomorrow.
              </div>
            </div>
          </div>

          <h1 className="text-white text-4xl font-bold leading-tight mb-4">
            Integrated Data Erasure<br />
            <span style={{ color: "#60a5fa" }}>& Digital Forensics</span><br />
            Platform
          </h1>
          <p className="mb-12 text-base leading-relaxed" style={{ color: "#94a3b8" }}>
            Professional-grade data sanitization and forensic recovery tools trusted by investigators, organizations, and security teams.
          </p>

          <div className="flex flex-col gap-4">
            {[
              { icon: "🔒", label: "Secure Processing", desc: "AES-256 encrypted operations" },
              { icon: "📋", label: "Audit Logging", desc: "Full chain-of-custody records" },
              { icon: "🔬", label: "Forensic Integrity", desc: "NIST-compliant methods" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl text-lg flex-shrink-0"
                  style={{ background: "#1e3a5f" }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{item.label}</div>
                  <div style={{ color: "#64748b" }} className="text-xs">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-8" style={{ background: "#f8fafc" }}>
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "#2563eb" }}>
              <Shield size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl" style={{ color: "#0f172a" }}>ForenSecure</span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <div className="mb-6">
              <h2 className="font-bold text-2xl mb-1" style={{ color: "#0f172a" }}>Welcome back</h2>
              <p className="text-sm" style={{ color: "#64748b" }}>Sign in to your ForenSecure account</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                  Email / Username
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investigator@agency.gov"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                  style={{
                    borderColor: "#e2e8f0",
                    background: "#f8fafc",
                    color: "#0f172a",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full px-4 py-2.5 pr-10 rounded-lg border text-sm outline-none transition-all"
                    style={{ borderColor: "#e2e8f0", background: "#f8fafc", color: "#0f172a" }}
                    onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#94a3b8" }}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: "#2563eb" }}
                  />
                  <span className="text-sm" style={{ color: "#64748b" }}>Remember me</span>
                </label>
                <button className="text-sm font-medium" style={{ color: "#2563eb" }}>
                  Forgot password?
                </button>
              </div>

              <button
                onClick={onLogin}
                className="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all duration-150 mt-2"
                style={{ background: "#2563eb" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#2563eb")}
              >
                <Lock size={14} className="inline mr-2" />
                Sign In Securely
              </button>
            </div>
          </div>

          {/* Security indicators */}
          <div className="flex justify-center gap-6 mt-6">
            {["Secure Processing", "Audit Logging", "Forensic Integrity"].map((label) => (
              <div key={label} className="flex items-center gap-1.5">
                <CheckCircle size={12} style={{ color: "#16a34a" }} />
                <span className="text-xs" style={{ color: "#64748b" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
