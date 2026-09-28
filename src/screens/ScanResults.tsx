import { useState } from "react";
import { Search, Filter, CheckCircle, AlertTriangle, XCircle, Eye, HardDrive } from "lucide-react";

interface ScanResultsProps {
  onPreview: () => void;
  onBack: () => void;
}

const results = [
  { name: "photo001.jpg", type: "JPG", size: "2.4 MB", status: "Recoverable", confidence: "High" },
  { name: "document01.pdf", type: "PDF", size: "1.1 MB", status: "Recoverable", confidence: "High" },
  { name: "report.docx", type: "DOCX", size: "856 KB", status: "Recoverable", confidence: "Medium" },
  { name: "video.mp4", type: "MP4", size: "25 MB", status: "Fragmented", confidence: "Medium" },
  { name: "archive.zip", type: "ZIP", size: "4.8 MB", status: "Recoverable", confidence: "High" },
  { name: "image.png", type: "PNG", size: "1.2 MB", status: "Recoverable", confidence: "High" },
  { name: "data.xlsx", type: "XLSX", size: "642 KB", status: "Partial", confidence: "Low" },
  { name: "notes.txt", type: "TXT", size: "12 KB", status: "Recoverable", confidence: "High" },
];

const statusStyle = (status: string) => {
  if (status === "Recoverable") return { bg: "#dcfce7", color: "#15803d", icon: CheckCircle };
  if (status === "Fragmented") return { bg: "#fef3c7", color: "#d97706", icon: AlertTriangle };
  return { bg: "#fee2e2", color: "#dc2626", icon: XCircle };
};

const confidenceBar = (conf: string) => {
  if (conf === "High") return { width: "85%", color: "#16a34a" };
  if (conf === "Medium") return { width: "55%", color: "#d97706" };
  return { width: "25%", color: "#dc2626" };
};

export default function ScanResults({ onPreview, onBack }: ScanResultsProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set([0, 1, 2, 4, 5]));
  const [filterType, setFilterType] = useState("All");
  const [filterConf, setFilterConf] = useState("All");
  const [search, setSearch] = useState("");

  const toggle = (i: number) =>
    setSelected((s) => {
      const next = new Set(s);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const filtered = results.filter((r) => {
    if (filterType !== "All" && r.type !== filterType) return false;
    if (filterConf !== "All" && r.confidence !== filterConf) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f1f5f9" }}>
      <header className="bg-white border-b px-8 py-4" style={{ borderColor: "#e2e8f0" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: "#faf5ff" }}>
              <Search size={20} style={{ color: "#9333ea" }} />
            </div>
            <div>
              <h1 className="font-bold text-xl" style={{ color: "#0f172a" }}>Scan Results</h1>
              <p className="text-sm" style={{ color: "#64748b" }}>
                {results.length} potential files identified — {results.filter((r) => r.status === "Recoverable").length} recoverable
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "#64748b" }}>
            <HardDrive size={14} />
            USB Drive (E:) · Deep Scan
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b px-8 py-3 flex items-center gap-4" style={{ borderColor: "#e2e8f0" }}>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: "#e2e8f0", width: 200 }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} style={{ color: "#94a3b8" }} />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: "#e2e8f0" }}
          >
            {["All", "JPG", "PDF", "DOCX", "MP4", "ZIP", "PNG", "XLSX", "TXT"].map((t) => (
              <option key={t}>{t === "All" ? "All Types" : t}</option>
            ))}
          </select>
          <select
            value={filterConf}
            onChange={(e) => setFilterConf(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: "#e2e8f0" }}
          >
            {["All", "High", "Medium", "Low"].map((c) => (
              <option key={c}>{c === "All" ? "All Confidence" : c}</option>
            ))}
          </select>
        </div>
        <span className="ml-auto text-sm" style={{ color: "#64748b" }}>
          {selected.size} selected
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white mx-6 my-5 rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" style={{ accentColor: "#9333ea" }} />
                </th>
                {["File Name", "Type", "Size", "Recovery Status", "Confidence", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "#94a3b8" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => {
                const ss = statusStyle(row.status);
                const cb = confidenceBar(row.confidence);
                const Icon = ss.icon;
                return (
                  <tr key={i} className="border-t" style={{ borderColor: "#f1f5f9", background: selected.has(i) ? "#faf5ff" : "transparent" }}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(i)}
                        onChange={() => toggle(i)}
                        style={{ accentColor: "#9333ea" }}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium mono" style={{ color: "#0f172a" }}>{row.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-bold" style={{ background: "#f1f5f9", color: "#64748b" }}>
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm mono" style={{ color: "#64748b" }}>{row.size}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: ss.bg, color: ss.color }}>
                        <Icon size={11} />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
                          <div className="h-full rounded-full" style={{ width: cb.width, background: cb.color }} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: cb.color }}>{row.confidence}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={onPreview} className="p-1.5 rounded-lg transition-colors" style={{ color: "#9333ea" }}>
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t px-8 py-4 flex items-center justify-between" style={{ borderColor: "#e2e8f0" }}>
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-lg border text-sm font-medium"
          style={{ borderColor: "#e2e8f0", color: "#374151" }}
        >
          Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={onPreview}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium"
            style={{ borderColor: "#9333ea", color: "#9333ea" }}
          >
            <Eye size={15} />
            Preview
          </button>
          <button
            onClick={onPreview}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold"
            style={{ background: "#9333ea" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#7e22ce")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#9333ea")}
          >
            <HardDrive size={15} />
            Recover Selected ({selected.size})
          </button>
        </div>
      </div>
    </div>
  );
}
