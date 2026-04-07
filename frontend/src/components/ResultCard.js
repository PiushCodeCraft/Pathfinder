import React from "react";

export default function ResultCard({ job, rank }) {
  return (
    <div className="rc-card">
      <div className="rc-header">
        <div className="rc-rank">{rank}</div>

        <div className="rc-info">
          <h3 className="rc-title">
            {job?.title || "Unknown Role"}
          </h3>
        </div>

      </div>
    </div>
  );
}

/* ── styles remain unchanged ── */
const style = document.createElement("style");
style.textContent = `
.rc-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px;
  padding: 16px;
  transition: border-color 0.2s, background 0.2s;
}
.rc-card:hover {
  border-color: rgba(127,119,221,0.25);
  background: rgba(127,119,221,0.05);
}
.rc-header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.rc-rank {
  width: 26px;
  height: 26px;
  background: rgba(127,119,221,0.15);
  border: 1px solid rgba(127,119,221,0.25);
  color: #AFA9EC;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  flex-shrink: 0;
}
.rc-info { flex: 1; min-width: 0; }
.rc-title {
  font-size: 15px;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;
if (typeof document !== "undefined" && !document.getElementById("rc-styles")) {
  style.id = "rc-styles";
  document.head.appendChild(style);
}