import React from "react";

export default function ResultCard({ job, rank, userSkills }) {
    const matchScore = Math.round(job.match_score || 0);
    const missingSkills = (job.required_skills || []).filter(
        (s) => !userSkills.map((u) => u.toLowerCase()).includes(s.toLowerCase())
    );
    const matchedSkills = (job.required_skills || []).filter(
        (s) => userSkills.map((u) => u.toLowerCase()).includes(s.toLowerCase())
    );

    const scoreColor =
        matchScore >= 80 ? "#1D9E75"
            : matchScore >= 60 ? "#EF9F27"
                : "#D85A30";

    return (
        <div className="rc-card">
            <div className="rc-header">
                <div className="rc-rank">{rank}</div>
                <div className="rc-info">
                    <h3 className="rc-title">{job.title}</h3>
                    {job.category && <span className="rc-category">{job.category}</span>}
                </div>
                <div className="rc-score" style={{ color: scoreColor }}>
                    <span className="rc-score-num">{matchScore}</span>
                    <span className="rc-score-pct">%</span>
                </div>
            </div>

            <div className="rc-bar-track">
                <div
                    className="rc-bar-fill"
                    style={{
                        width: matchScore + "%",
                        background: scoreColor,
                    }}
                />
            </div>

            {matchedSkills.length > 0 && (
                <div className="rc-skill-row">
                    <span className="rc-skill-label rc-skill-match">You have</span>
                    <div className="rc-skill-tags">
                        {matchedSkills.slice(0, 5).map((s) => (
                            <span key={s} className="rc-tag rc-tag-match">{s}</span>
                        ))}
                        {matchedSkills.length > 5 && (
                            <span className="rc-tag rc-tag-match">+{matchedSkills.length - 5}</span>
                        )}
                    </div>
                </div>
            )}

            {missingSkills.length > 0 && (
                <div className="rc-skill-row">
                    <span className="rc-skill-label rc-skill-gap">Skill gap</span>
                    <div className="rc-skill-tags">
                        {missingSkills.slice(0, 4).map((s) => (
                            <span key={s} className="rc-tag rc-tag-gap">{s}</span>
                        ))}
                        {missingSkills.length > 4 && (
                            <span className="rc-tag rc-tag-gap">+{missingSkills.length - 4} more</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── ResultCard styles (inject into app.css or keep here as a CSS-in-JS approach) ── */
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
  margin-bottom: 12px;
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
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rc-category {
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.rc-score {
  display: flex;
  align-items: baseline;
  gap: 1px;
  flex-shrink: 0;
}
.rc-score-num { font-size: 22px; font-weight: 600; }
.rc-score-pct { font-size: 12px; opacity: 0.7; }
.rc-bar-track {
  height: 3px;
  background: rgba(255,255,255,0.08);
  border-radius: 2px;
  margin-bottom: 12px;
  overflow: hidden;
}
.rc-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.6s ease;
}
.rc-skill-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.rc-skill-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  flex-shrink: 0;
  width: 64px;
}
.rc-skill-match { color: #5DCAA5; }
.rc-skill-gap   { color: #EF9F27; }
.rc-skill-tags  { display: flex; flex-wrap: wrap; gap: 6px; }
.rc-tag {
  font-size: 11px;
  padding: 2px 9px;
  border-radius: 999px;
}
.rc-tag-match {
  background: rgba(29,158,117,0.12);
  border: 1px solid rgba(29,158,117,0.25);
  color: #5DCAA5;
}
.rc-tag-gap {
  background: rgba(239,159,39,0.1);
  border: 1px solid rgba(239,159,39,0.25);
  color: #EF9F27;
}
`;
if (typeof document !== "undefined" && !document.getElementById("rc-styles")) {
    style.id = "rc-styles";
    document.head.appendChild(style);
}