import { HardDrive, FolderX, Search, FileText, Bell, User, ArrowRight, CheckCircle } from "lucide-react";

type Screen = "drive-eraser" | "file-eraser" | "file-recovery" | "reports";

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

const recentOps = [
  { date: "12 Sep 2026 10:21", op: "Drive Erasure", device: "USB Drive (E:)", status: "Completed" },
  { date: "11 Sep 2026 16:45", op: "File Recovery", device: "External HDD", status: "Completed" },
  { date: "11 Sep 2026 14:10", op: "File Erasure", device: "Confidential_Files", status: "Completed" },
  { date: "10 Sep 2026 09:30", op: "Deep Scan", device: "SSD (D:)", status: "Completed" },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      {/* Top bar */}
      <header className="bg-white border-b px-8 py-4 flex items-center justify-between" style={{ borderColor: "#e2e8f0" }}>
        <div>
          <h1 className="font-bold text-xl" style={{ color: "#0f172a" }}>Dashboard</h1>
          <p className="text-sm" style={{ color: "#64748b" }}>
            Overview of your data sanitization and forensic recovery operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#f1f5f9" }}>
            <Bell size={17} style={{ color: "#64748b" }} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#2563eb" }} />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#f1f5f9" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#2563eb" }}>
              <User size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium" style={{ color: "#0f172a" }}>Admin</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {[
            {
              screen: "drive-eraser" as Screen,
              title: "Secure Drive Eraser",
              desc: "Completely sanitize storage devices",
              icon: HardDrive,
              color: "#2563eb",
              bg: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            },
            {
              screen: "file-eraser" as Screen,
              title: "File & Folder Eraser",
              desc: "Securely delete files and folders",
              icon: FolderX,
              color: "#16a34a",
              bg: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
            },
            {
              screen: "file-recovery" as Screen,
              title: "File Recovery",
              desc: "Recover deleted files from any storage device",
              icon: Search,
              color: "#9333ea",
              bg: "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)",
            },
            {
              screen: "reports" as Screen,
              title: "Reports & Logs",
              desc: "View audit logs and generate forensic reports",
              icon: FileText,
              color: "#ea580c",
              bg: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
            },
          ].map(({ screen, title, desc, icon: Icon, bg }) => (
            <button
              key={screen}
              onClick={() => onNavigate(screen)}
              className="relative overflow-hidden rounded-2xl p-6 text-left group transition-all duration-200"
              style={{ background: bg, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>
              <h3 className="text-white font-bold text-lg leading-tight mb-1">{title}</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{desc}</p>
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Connected Devices", value: "4", sub: "2 active" },
            { label: "Total Storage", value: "852 GB", sub: "Across all devices" },
            { label: "Devices Ready", value: "3", sub: "1 in use" },
            { label: "Last Operation", value: "2h ago", sub: "Drive Erasure" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl px-5 py-4" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="text-xs font-medium mb-1" style={{ color: "#94a3b8" }}>{stat.label}</div>
              <div className="font-bold text-2xl mb-0.5" style={{ color: "#0f172a" }}>{stat.value}</div>
              <div className="text-xs" style={{ color: "#64748b" }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Recent operations */}
        <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "#f1f5f9" }}>
            <h2 className="font-semibold text-base" style={{ color: "#0f172a" }}>Recent Operations</h2>
            <button className="text-sm font-medium" style={{ color: "#2563eb" }}>View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Date & Time", "Operation", "Device / File", "Status", "Details"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold" style={{ color: "#94a3b8" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOps.map((row, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "#f1f5f9" }}>
                    <td className="px-6 py-3.5 text-sm mono" style={{ color: "#64748b" }}>{row.date}</td>
                    <td className="px-6 py-3.5 text-sm font-medium" style={{ color: "#0f172a" }}>{row.op}</td>
                    <td className="px-6 py-3.5 text-sm" style={{ color: "#374151" }}>{row.device}</td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#dcfce7", color: "#15803d" }}>
                        <CheckCircle size={11} />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <button className="text-sm font-medium" style={{ color: "#2563eb" }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
