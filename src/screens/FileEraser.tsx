import { useState } from "react";
import { FolderX, Folder, FolderOpen, File, X, Trash2, AlertTriangle, ChevronRight, ChevronDown } from "lucide-react";

interface FileEraserProps {
  onCancel: () => void;
}

const tree = [
  {
    name: "This PC",
    children: [
      { name: "Desktop", children: [{ name: "Confidential_Documents", checked: true }, { name: "Notes.txt" }] },
      { name: "Documents", children: [{ name: "Password_Backups", checked: true }, { name: "Work_Reports" }] },
      { name: "Downloads", children: [{ name: "Old_Project_Files", checked: true }, { name: "Installer.exe" }] },
      { name: "Pictures", children: [] },
      { name: "Videos", children: [] },
    ],
  },
];

const selected = [
  { name: "Confidential_Documents", path: "C:\\Users\\user\\Documents\\Confidential" },
  { name: "Password_Backups", path: "C:\\Users\\user\\Desktop\\Notes.txt" },
  { name: "Old_Project_Files", path: "C:\\Users\\user\\Downloads\\Old_Project" },
];

export default function FileEraser({ onCancel }: FileEraserProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "This PC": true, Desktop: true, Documents: true, Downloads: true });
  const [tab, setTab] = useState<"files" | "batch">("files");
  const [showModal, setShowModal] = useState(false);
  const [opts, setOpts] = useState({ meta: true, traces: true, verify: true, audit: true });

  const toggleExpand = (name: string) =>
    setExpanded((e) => ({ ...e, [name]: !e[name] }));

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
        <header className="bg-white border-b px-8 py-4" style={{ borderColor: "#e2e8f0" }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "#f0fdf4" }}>
              <FolderX size={20} style={{ color: "#16a34a" }} />
            </div>
            <div>
              <h1 className="font-bold text-xl" style={{ color: "#0f172a" }}>File & Folder Eraser</h1>
              <p className="text-sm" style={{ color: "#64748b" }}>Select files or folders to securely delete</p>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-white border-b px-8" style={{ borderColor: "#e2e8f0" }}>
          <div className="flex gap-0">
            {[{ id: "files", label: "Select Files / Folders" }, { id: "batch", label: "Batch Erase" }].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as "files" | "batch")}
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

        <div className="flex-1 overflow-hidden flex">
          {/* Left: file tree */}
          <div className="w-72 bg-white border-r overflow-y-auto p-4" style={{ borderColor: "#e2e8f0" }}>
            <div className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: "#94a3b8" }}>
              File Explorer
            </div>
            {tree.map((root) => (
              <div key={root.name}>
                <button
                  onClick={() => toggleExpand(root.name)}
                  className="flex items-center gap-1.5 w-full py-1.5 text-sm font-medium"
                  style={{ color: "#0f172a" }}
                >
                  {expanded[root.name] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <FolderOpen size={15} style={{ color: "#2563eb" }} />
                  {root.name}
                </button>
                {expanded[root.name] &&
                  root.children.map((folder) => (
                    <div key={folder.name} className="ml-4">
                      <button
                        onClick={() => toggleExpand(folder.name)}
                        className="flex items-center gap-1.5 w-full py-1.5 text-sm"
                        style={{ color: "#374151" }}
                      >
                        {expanded[folder.name] ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                        {expanded[folder.name]
                          ? <FolderOpen size={14} style={{ color: "#f59e0b" }} />
                          : <Folder size={14} style={{ color: "#f59e0b" }} />}
                        {folder.name}
                      </button>
                      {expanded[folder.name] &&
                        folder.children?.map((child: any) => (
                          <div key={child.name} className="ml-6 flex items-center gap-2 py-1">
                            <input type="checkbox" defaultChecked={child.checked} style={{ accentColor: "#2563eb" }} />
                            <File size={13} style={{ color: "#94a3b8" }} />
                            <span className="text-xs" style={{ color: "#374151" }}>{child.name}</span>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Right: selected + options */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Selected items */}
            <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "#f1f5f9" }}>
                <h3 className="font-semibold text-sm" style={{ color: "#0f172a" }}>
                  Selected Items ({selected.length})
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {selected.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 p-3 rounded-xl border"
                    style={{ background: "#fef2f2", borderColor: "#fecaca" }}
                  >
                    <Folder size={16} style={{ color: "#dc2626" }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium" style={{ color: "#0f172a" }}>{item.name}</div>
                      <div className="text-xs truncate mono" style={{ color: "#94a3b8" }}>{item.path}</div>
                    </div>
                    <button>
                      <X size={14} style={{ color: "#dc2626" }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Erasure options */}
            <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="px-5 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
                <h3 className="font-semibold text-sm" style={{ color: "#0f172a" }}>Erasure Options</h3>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { key: "meta", label: "Remove metadata where applicable (EXIF, timestamps, etc.)" },
                  { key: "traces", label: "Remove traces from Recycle Bin" },
                  { key: "verify", label: "Verify erasure after completion" },
                  { key: "audit", label: "Create audit log" },
                ].map((opt) => (
                  <label key={opt.key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={opts[opt.key as keyof typeof opts]}
                      onChange={(e) => setOpts((o) => ({ ...o, [opt.key]: e.target.checked }))}
                      style={{ accentColor: "#2563eb" }}
                    />
                    <span className="text-sm" style={{ color: "#374151" }}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ background: "#fef2f2", borderColor: "#fecaca" }}>
              <AlertTriangle size={16} style={{ color: "#dc2626" }} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm" style={{ color: "#7f1d1d" }}>
                Selected files will be <strong>permanently destroyed</strong> and cannot be recovered after secure deletion.
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={onCancel}
                className="px-5 py-2.5 rounded-lg border text-sm font-medium"
                style={{ borderColor: "#e2e8f0", color: "#374151" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold"
                style={{ background: "#dc2626" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b91c1c")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#dc2626")}
              >
                <Trash2 size={15} />
                Secure Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-center mb-5">
              <div className="flex items-center justify-center w-14 h-14 rounded-full" style={{ background: "#fef2f2" }}>
                <Trash2 size={28} style={{ color: "#dc2626" }} />
              </div>
            </div>
            <h3 className="font-bold text-xl text-center mb-2" style={{ color: "#0f172a" }}>
              Confirm Secure Delete
            </h3>
            <p className="text-sm text-center mb-6" style={{ color: "#64748b" }}>
              Are you sure you want to permanently erase these selected files? This action <strong>cannot be undone</strong>.
            </p>
            <div className="rounded-xl p-4 mb-5 space-y-1.5" style={{ background: "#f8fafc" }}>
              {selected.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <Folder size={13} style={{ color: "#dc2626" }} />
                  <span style={{ color: "#374151" }}>{item.name}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-lg border text-sm font-medium"
                style={{ borderColor: "#e2e8f0", color: "#374151" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-lg text-white text-sm font-semibold"
                style={{ background: "#dc2626" }}
              >
                Confirm Secure Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
