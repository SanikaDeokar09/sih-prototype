import { useEffect, useState } from "react";
import {
  FolderX,
  Folder,
  FolderOpen,
  File,
  X,
  Trash2,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  FileText,
} from "lucide-react";

type FileEraserProps = {
  onCancel: () => void;
  onReport?: () => void;
};

type SelectedItem = {
  name: string;
  path: string;
};

const initialSelected: SelectedItem[] = [
  {
    name: "Confidential_Documents",
    path: "C:\\Users\\user\\Documents\\Confidential",
  },
  {
    name: "Password_Backups",
    path: "C:\\Users\\user\\Desktop\\Notes.txt",
  },
  {
    name: "Old_Project_Files",
    path: "C:\\Users\\user\\Downloads\\Old_Project",
  },
];

const tree = [
  {
    name: "This PC",
    children: [
      {
        name: "Desktop",
        children: [
          { name: "Confidential_Documents", checked: true },
          { name: "Notes.txt", checked: false },
        ],
      },
      {
        name: "Documents",
        children: [
          { name: "Password_Backups", checked: true },
          { name: "Work_Reports", checked: false },
        ],
      },
      {
        name: "Downloads",
        children: [
          { name: "Old_Project_Files", checked: true },
          { name: "Installer.exe", checked: false },
        ],
      },
      {
        name: "Pictures",
        children: [],
      },
      {
        name: "Videos",
        children: [],
      },
    ],
  },
];

export default function FileEraser({
  onCancel,
  onReport,
}: FileEraserProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "This PC": true,
    Desktop: true,
    Documents: true,
    Downloads: true,
  });

  const [tab, setTab] = useState<"files" | "batch">("files");

  const [showModal, setShowModal] = useState(false);

  const [opts, setOpts] = useState({
    meta: true,
    traces: true,
    verify: true,
    audit: true,
  });

  const [selected, setSelected] =
    useState<SelectedItem[]>(initialSelected);

const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
  "Confidential_Documents": true,
  "Notes.txt": false,
  "Password_Backups": true,
  "Work_Reports": false,
  "Old_Project_Files": true,
  "Installer.exe": false,
});
  const [stage, setStage] = useState<
    "idle" | "progress" | "success"
  >("idle");

  const [progress, setProgress] = useState(0);

  const toggleExpand = (name: string) => {
    setExpanded((e) => ({
      ...e,
      [name]: !e[name],
    }));
  };

  const toggleItem = (name: string) => {
    const newValue = !checkedItems[name];

    setCheckedItems((items) => ({
      ...items,
      [name]: newValue,
    }));

    if (newValue) {
      const existing = selected.find((item) => item.name === name);

      if (!existing) {
        setSelected((items) => [
          ...items,
          {
            name,
            path: `C:\\Users\\user\\${name}`,
          },
        ]);
      }
    } else {
      setSelected((items) =>
        items.filter((item) => item.name !== name)
      );
    }
  };

  const removeSelected = (name: string) => {
    setSelected((items) =>
      items.filter((item) => item.name !== name)
    );

    setCheckedItems((items) => ({
      ...items,
      [name]: false,
    }));
  };

  const startDeletion = () => {
    if (selected.length === 0) return;

    setShowModal(false);
    setStage("progress");
    setProgress(0);
  };

  /*
   * Simulated secure deletion progress.
   * This is a frontend prototype, so it does not actually
   * delete files from the user's computer.
   */
  useEffect(() => {
    if (stage !== "progress") return;

    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(interval);
          return 100;
        }

        return Math.min(current + 10, 100);
      });
    }, 180);

    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    if (stage === "progress" && progress >= 100) {
      const timer = setTimeout(() => {
        setStage("success");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [stage, progress]);

  /* ================= SUCCESS SCREEN ================= */

  if (stage === "success") {
    return (
      <div
        className="flex-1 min-h-full overflow-auto"
        style={{ background: "#f1f5f9" }}
      >
        <div className="min-h-full flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 md:p-10 shadow-sm">
            {/* Success icon */}
            <div className="flex justify-center mb-6">
              <div
                className="flex items-center justify-center w-20 h-20 rounded-full"
                style={{ background: "#dcfce7" }}
              >
                <CheckCircle2
                  size={42}
                  style={{ color: "#16a34a" }}
                />
              </div>
            </div>

            <h1
              className="text-2xl md:text-3xl font-bold text-center"
              style={{ color: "#0f172a" }}
            >
              Secure Deletion Complete
            </h1>

            <p
              className="text-sm md:text-base text-center mt-2"
              style={{ color: "#64748b" }}
            >
              The selected items have been securely erased
              successfully.
            </p>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
              <div
                className="rounded-xl p-4 text-center"
                style={{ background: "#f8fafc" }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{ color: "#0f172a" }}
                >
                  {selected.length}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "#64748b" }}
                >
                  Items Erased
                </div>
              </div>

              <div
                className="rounded-xl p-4 text-center"
                style={{ background: "#f8fafc" }}
              >
                <div className="flex justify-center">
                  <ShieldCheck
                    size={24}
                    style={{ color: "#16a34a" }}
                  />
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "#64748b" }}
                >
                  Verification Passed
                </div>
              </div>

              <div
                className="rounded-xl p-4 text-center"
                style={{ background: "#f8fafc" }}
              >
                <div className="flex justify-center">
                  <FileText
                    size={24}
                    style={{ color: "#2563eb" }}
                  />
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "#64748b" }}
                >
                  Audit Log Created
                </div>
              </div>
            </div>

            {/* Deleted items */}
            <div className="mt-6">
              <h3
                className="font-semibold text-sm mb-3"
                style={{ color: "#0f172a" }}
              >
                Deleted Items
              </h3>

              <div
                className="rounded-xl p-4 space-y-2"
                style={{ background: "#f8fafc" }}
              >
                {selected.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={16}
                      style={{ color: "#16a34a" }}
                    />

                    <div className="min-w-0">
                      <div
                        className="text-sm font-medium"
                        style={{ color: "#374151" }}
                      >
                        {item.name}
                      </div>

                      <div
                        className="text-xs truncate mono"
                        style={{ color: "#94a3b8" }}
                      >
                        {item.path}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div
              className="mt-5 p-4 rounded-xl border"
              style={{
                background: "#f0fdf4",
                borderColor: "#bbf7d0",
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={18}
                  style={{ color: "#16a34a" }}
                />

                <span
                  className="text-sm font-semibold"
                  style={{ color: "#166534" }}
                >
                  Secure deletion verified successfully
                </span>
              </div>

              <p
                className="text-xs mt-1 ml-6"
                style={{ color: "#15803d" }}
              >
                The operation completed according to the selected
                erasure and verification settings.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={onCancel}
                className="flex-1 py-3 rounded-lg text-sm font-semibold border"
                style={{
                  borderColor: "#e2e8f0",
                  color: "#374151",
                }}
              >
                Back to Dashboard
              </button>

              <button
                onClick={() => {
                  if (onReport) {
                    onReport();
                  }
                }}
                className="flex-1 py-3 rounded-lg text-white text-sm font-semibold"
                style={{ background: "#2563eb" }}
              >
                View Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= PROGRESS SCREEN ================= */

  if (stage === "progress") {
    return (
      <div
        className="flex-1 min-h-full overflow-auto"
        style={{ background: "#f1f5f9" }}
      >
        <div className="min-h-full flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 md:p-10 shadow-sm">
            <div className="flex justify-center mb-6">
              <div
                className="flex items-center justify-center w-20 h-20 rounded-full"
                style={{ background: "#eff6ff" }}
              >
                <Trash2
                  size={36}
                  className="animate-pulse"
                  style={{ color: "#2563eb" }}
                />
              </div>
            </div>

            <h1
              className="text-2xl font-bold text-center"
              style={{ color: "#0f172a" }}
            >
              Secure Deletion in Progress
            </h1>

            <p
              className="text-sm text-center mt-2"
              style={{ color: "#64748b" }}
            >
              Securely processing the selected files and folders...
            </p>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span
                  className="text-sm font-medium"
                  style={{ color: "#374151" }}
                >
                  Erasure Progress
                </span>

                <span
                  className="text-sm font-semibold"
                  style={{ color: "#2563eb" }}
                >
                  {progress}%
                </span>
              </div>

              <div
                className="h-3 rounded-full overflow-hidden"
                style={{ background: "#e2e8f0" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${progress}%`,
                    background: "#2563eb",
                  }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="mt-7 space-y-2">
              {selected.map((item, index) => {
                const itemProgress =
                  progress >= ((index + 1) / selected.length) * 100;

                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "#f8fafc" }}
                  >
                    {itemProgress ? (
                      <CheckCircle2
                        size={17}
                        style={{ color: "#16a34a" }}
                      />
                    ) : (
                      <div
                        className="w-4 h-4 rounded-full border-2"
                        style={{ borderColor: "#cbd5e1" }}
                      />
                    )}

                    <span
                      className="text-sm"
                      style={{ color: "#374151" }}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-6 text-center text-xs"
              style={{ color: "#94a3b8" }}
            >
              Please do not close this page while the operation is
              running.
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================= NORMAL FILE ERASER SCREEN ================= */

  return (
    <>
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ background: "#f1f5f9" }}
      >
        {/* Header */}
        <header
          className="bg-white border-b px-4 md:px-8 py-4"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl"
              style={{ background: "#f0fdf4" }}
            >
              <FolderX
                size={20}
                style={{ color: "#16a34a" }}
              />
            </div>

            <div>
              <h1
                className="font-bold text-lg md:text-xl"
                style={{ color: "#0f172a" }}
              >
                File & Folder Eraser
              </h1>

              <p
                className="text-xs md:text-sm"
                style={{ color: "#64748b" }}
              >
                Select files or folders to securely delete
              </p>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div
          className="bg-white border-b px-4 md:px-8"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div className="flex gap-0 overflow-x-auto">
            {[
              {
                id: "files",
                label: "Select Files / Folders",
              },
              {
                id: "batch",
                label: "Batch Erase",
              },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() =>
                  setTab(t.id as "files" | "batch")
                }
                className="px-4 md:px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap"
                style={{
                  borderColor:
                    tab === t.id
                      ? "#2563eb"
                      : "transparent",
                  color:
                    tab === t.id
                      ? "#2563eb"
                      : "#64748b",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* File tree */}
          <div
            className="w-full md:w-72 flex-shrink-0 bg-white border-b md:border-b-0 md:border-r overflow-y-auto p-4 max-h-64 md:max-h-none"
            style={{ borderColor: "#e2e8f0" }}
          >
            <div
              className="text-xs font-semibold mb-3 uppercase tracking-wide"
              style={{ color: "#94a3b8" }}
            >
              File Explorer
            </div>

            {tree.map((root) => (
              <div key={root.name}>
                <button
                  onClick={() => toggleExpand(root.name)}
                  className="flex items-center gap-1.5 w-full py-1.5 text-sm font-medium"
                  style={{ color: "#0f172a" }}
                >
                  {expanded[root.name] ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}

                  <FolderOpen
                    size={15}
                    style={{ color: "#2563eb" }}
                  />

                  {root.name}
                </button>

                {expanded[root.name] &&
                  root.children.map((folder) => (
                    <div
                      key={folder.name}
                      className="ml-4"
                    >
                      <button
                        onClick={() =>
                          toggleExpand(folder.name)
                        }
                        className="flex items-center gap-1.5 w-full py-1.5 text-sm"
                        style={{ color: "#374151" }}
                      >
                        {expanded[folder.name] ? (
                          <ChevronDown size={13} />
                        ) : (
                          <ChevronRight size={13} />
                        )}

                        {expanded[folder.name] ? (
                          <FolderOpen
                            size={14}
                            style={{ color: "#f59e0b" }}
                          />
                        ) : (
                          <Folder
                            size={14}
                            style={{ color: "#f59e0b" }}
                          />
                        )}

                        {folder.name}
                      </button>

                      {expanded[folder.name] &&
                        folder.children?.map(
                          (child: any) => (
                            <label
                              key={child.name}
                              className="ml-6 flex items-center gap-2 py-1 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  !!checkedItems[
                                    child.name
                                  ]
                                }
                                onChange={() =>
                                  toggleItem(
                                    child.name
                                  )
                                }
                                style={{
                                  accentColor:
                                    "#2563eb",
                                }}
                              />

                              <File
                                size={13}
                                style={{
                                  color: "#94a3b8",
                                }}
                              />

                              <span
                                className="text-xs"
                                style={{
                                  color: "#374151",
                                }}
                              >
                                {child.name}
                              </span>
                            </label>
                          )
                        )}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
            {/* Selected items */}
            <div
              className="bg-white rounded-2xl"
              style={{
                boxShadow:
                  "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="px-5 py-4 border-b flex items-center justify-between"
                style={{ borderColor: "#f1f5f9" }}
              >
                <h3
                  className="font-semibold text-sm"
                  style={{ color: "#0f172a" }}
                >
                  Selected Items ({selected.length})
                </h3>
              </div>

              <div className="p-4 space-y-2">
                {selected.length === 0 ? (
                  <div
                    className="text-sm text-center py-8"
                    style={{ color: "#94a3b8" }}
                  >
                    No files or folders selected.
                  </div>
                ) : (
                  selected.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 p-3 rounded-xl border"
                      style={{
                        background: "#fef2f2",
                        borderColor: "#fecaca",
                      }}
                    >
                      <Folder
                        size={16}
                        style={{ color: "#dc2626" }}
                      />

                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-medium"
                          style={{ color: "#0f172a" }}
                        >
                          {item.name}
                        </div>

                        <div
                          className="text-xs truncate mono"
                          style={{ color: "#94a3b8" }}
                        >
                          {item.path}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          removeSelected(item.name)
                        }
                        className="p-1.5 rounded-md hover:bg-red-100"
                        title="Remove"
                      >
                        <X
                          size={14}
                          style={{ color: "#dc2626" }}
                        />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Options */}
            <div
              className="bg-white rounded-2xl"
              style={{
                boxShadow:
                  "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="px-5 py-4 border-b"
                style={{ borderColor: "#f1f5f9" }}
              >
                <h3
                  className="font-semibold text-sm"
                  style={{ color: "#0f172a" }}
                >
                  Erasure Options
                </h3>
              </div>

              <div className="p-5 space-y-3">
                {[
                  {
                    key: "meta",
                    label:
                      "Remove metadata where applicable (EXIF, timestamps, etc.)",
                  },
                  {
                    key: "traces",
                    label:
                      "Remove traces from Recycle Bin",
                  },
                  {
                    key: "verify",
                    label:
                      "Verify erasure after completion",
                  },
                  {
                    key: "audit",
                    label: "Create audit log",
                  },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={
                        opts[
                          opt.key as keyof typeof opts
                        ]
                      }
                      onChange={(e) =>
                        setOpts((o) => ({
                          ...o,
                          [opt.key]:
                            e.target.checked,
                        }))
                      }
                      style={{
                        accentColor: "#2563eb",
                      }}
                    />

                    <span
                      className="text-sm"
                      style={{ color: "#374151" }}
                    >
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl border"
              style={{
                background: "#fef2f2",
                borderColor: "#fecaca",
              }}
            >
              <AlertTriangle
                size={16}
                style={{ color: "#dc2626" }}
                className="flex-shrink-0 mt-0.5"
              />

              <p
                className="text-sm"
                style={{ color: "#7f1d1d" }}
              >
                Selected files will be{" "}
                <strong>permanently destroyed</strong> and
                cannot be recovered after secure deletion.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 items-stretch sm:items-center">
              <button
                onClick={onCancel}
                className="px-5 py-2.5 rounded-lg border text-sm font-medium"
                style={{
                  borderColor: "#e2e8f0",
                  color: "#374151",
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => setShowModal(true)}
                disabled={selected.length === 0}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#dc2626" }}
              >
                <Trash2 size={15} />
                Secure Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONFIRMATION MODAL ================= */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-center mb-5">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full"
                style={{ background: "#fef2f2" }}
              >
                <Trash2
                  size={28}
                  style={{ color: "#dc2626" }}
                />
              </div>
            </div>

            <h3
              className="font-bold text-xl text-center mb-2"
              style={{ color: "#0f172a" }}
            >
              Confirm Secure Delete
            </h3>

            <p
              className="text-sm text-center mb-6"
              style={{ color: "#64748b" }}
            >
              Are you sure you want to permanently erase
              these selected files? This action{" "}
              <strong>cannot be undone</strong>.
            </p>

            <div
              className="rounded-xl p-4 mb-5 space-y-2"
              style={{ background: "#f8fafc" }}
            >
              {selected.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <Folder
                    size={13}
                    style={{ color: "#dc2626" }}
                  />

                  <span style={{ color: "#374151" }}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-lg border text-sm font-medium"
                style={{
                  borderColor: "#e2e8f0",
                  color: "#374151",
                }}
              >
                Cancel
              </button>

              <button
                onClick={startDeletion}
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