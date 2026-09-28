import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import DriveEraser from "./screens/DriveEraser";
import ErasureProgress from "./screens/ErasureProgress";
import ErasureSuccess from "./screens/ErasureSuccess";
import FileEraser from "./screens/FileEraser";
import FileRecovery from "./screens/FileRecovery";
import ScanProgress from "./screens/ScanProgress";
import ScanResults from "./screens/ScanResults";
import FilePreview from "./screens/FilePreview";
import Reports from "./screens/Reports";
import Settings from "./screens/Settings";

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

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");

  const nav = (s: Screen) => setScreen(s);

  // Login screen does not use the sidebar
  if (screen === "login") {
    return <Login onLogin={() => nav("dashboard")} />;
  }

  return (
    <div
      className="flex h-full min-h-0 w-full overflow-hidden"
      style={{ background: "#0f1623" }}
    >
      {/* Sidebar
          Desktop: permanently visible
          Mobile: becomes a slide-out menu
      */}
      <Sidebar
        current={screen}
        onNavigate={(s) => nav(s as Screen)}
      />

      {/* Main application area */}
      <main className="min-w-0 min-h-0 flex-1 overflow-auto pt-14 md:pt-0">
        {screen === "dashboard" && (
          <Dashboard
            onNavigate={(s) => nav(s as Screen)}
          />
        )}

        {screen === "drive-eraser" && (
          <DriveEraser
            onStart={() => nav("drive-progress")}
            onCancel={() => nav("dashboard")}
          />
        )}

        {screen === "drive-progress" && (
          <ErasureProgress
            onComplete={() => nav("drive-success")}
          />
        )}

        {screen === "drive-success" && (
          <ErasureSuccess
            onDashboard={() => nav("dashboard")}
            onReport={() => nav("reports")}
          />
        )}

        {screen === "file-eraser" && (
          <FileEraser
            onCancel={() => nav("dashboard")}
          />
        )}

        {screen === "file-recovery" && (
          <FileRecovery
            onStartScan={() => nav("scan-progress")}
            onCancel={() => nav("dashboard")}
          />
        )}

        {screen === "scan-progress" && (
          <ScanProgress
            onComplete={() => nav("scan-results")}
          />
        )}

        {screen === "scan-results" && (
          <ScanResults
            onPreview={() => nav("file-preview")}
            onBack={() => nav("file-recovery")}
          />
        )}

        {screen === "file-preview" && (
          <FilePreview
            onBack={() => nav("scan-results")}
            onRecover={() => nav("scan-results")}
          />
        )}

        {screen === "reports" && <Reports />}

        {screen === "settings" && <Settings />}
      </main>
    </div>
  );
}