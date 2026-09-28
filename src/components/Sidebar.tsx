import { Shield, LayoutDashboard, HardDrive, FolderX, Search, FileText, Settings, HelpCircle, LogOut } from "lucide-react";

type Screen =
  | "login"
  | "dashboard"
  | "drive-eraser"
  | "drive-progress"
  | "drive-success"
  | "file-eraser"
  | "file-recovery"
  | "scan-progress"
  | "scan-results"
  | "file-preview"
  | "reports"
  | "settings";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "drive-eraser", label: "Drive Eraser", icon: HardDrive },
  { id: "file-eraser", label: "File & Folder Eraser", icon: FolderX },
  { id: "file-recovery", label: "File Recovery", icon: Search },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  current: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function Sidebar({ current, onNavigate }: SidebarProps) {
  const active =
    current === "drive-progress" || current === "drive-success"
      ? "drive-eraser"
      : current === "scan-progress" || current === "scan-results" || current === "file-preview"
      ? "file-recovery"
      : current;

  return (
    <aside
      className="flex flex-col w-56 flex-shrink-0 h-full"
      style={{ background: "#0f1623" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: "#1e2d40" }}>
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ background: "#2563eb" }}
        >
          <Shield size={18} className="text-white" />
        </div>
        <div>
          <div className="text-white font-bold text-base leading-tight tracking-tight">
            ForenSecure
          </div>
          <div className="text-xs leading-tight" style={{ color: "#64748b" }}>
            v2.4.1
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id as Screen)}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left"
              style={{
                background: isActive ? "#2563eb" : "transparent",
                color: isActive ? "#ffffff" : "#94a3b8",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLButtonElement).style.background = "#1e2d40";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5 border-t pt-4" style={{ borderColor: "#1e2d40" }}>
        <button
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
          style={{ color: "#94a3b8" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1e2d40")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
        >
          <HelpCircle size={16} />
          <span>Help</span>
        </button>
        <button
          onClick={() => onNavigate("login")}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
          style={{ color: "#94a3b8" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1e2d40")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
