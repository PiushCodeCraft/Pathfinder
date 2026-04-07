import React, { useState, useRef, useEffect, useMemo } from "react";
import "../styles/app.css";
import { getJobRecommendations } from "../api";
import { ALL_SKILLS } from "../data/skills";
import ResultCard from "../components/ResultCard";

// const QUICK_SKILLS = [
//     'c#', 'vb.net', 'Android Studio', '.net', 'Kotlin', '.net core fundamentals', 'asp.net', 'mvc', 'html', 'css', 'java',
//     'javascript', 'sql server', 'entity Framework', 'MVVM', 'visualstudio', 'git', 'unit testing', 'Clean Architecture',
//     'Firebase', 'rest', 'apis', 'docker', 'azure', 'microservices', 'Room', 'patterns', 'solid', 'principles', 'devops',
//     'f#', 'kubernetes', 'webapi', 'signalr', 'nosql', 'blazor', 'angular', 'dapper', 'grpc', 'xunit', 'moq', 'ci/cd'
// ];
const QUICK_SKILLS = [...ALL_SKILLS]
    .sort(() => 0.5 - Math.random())
    .slice(0, 20);

const EDUCATION_LEVELS = [
    "B.Tech / B.E.", "M.Tech / M.S.", "BCA / MCA",
    "Diploma", "Self-taught / Bootcamp", "Other",
];

const STEPS = ["Profile", "Skills", "Results"];

export default function Home() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: "",
        currentRole: "",
        experience: 2,
        education: "B.Tech / B.E.",
    });
    const [skills, setSkills] = useState([]);
    const [quickSelected, setQuickSelected] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const skillInputRef = useRef(null);
    const [eduOpen, setEduOpen] = useState(false);
    const eduRef = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (eduRef.current && !eduRef.current.contains(e.target)) setEduOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const allSkills = [...new Set([...skills, ...quickSelected])];

    function updateForm(key, val) {
        setForm((f) => ({ ...f, [key]: val }));
    }

    function handleSkillKeyDown(e) {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const v = skillInput.trim().replace(/,$/, "");
            if (v && !allSkills.includes(v)) setSkills((s) => [...s, v]);
            setSkillInput("");
        }
    }

    function removeSkill(s) {
        setSkills((prev) => prev.filter((x) => x !== s));
        setQuickSelected((prev) => prev.filter((x) => x !== s));
    }

    function toggleQuick(s) {
        setQuickSelected((prev) =>
            prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
        );
    }

    async function handleSubmit() {
        setStep(3);

        // ✅ Frontend validation (before API call)
        if (allSkills.length < 5) {
            setError(`Please add at least ${5 - allSkills.length} more skill(s). Minimum 5 required.`);
            setResults([]);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const data = await getJobRecommendations({
                skills: allSkills.join(", "),
                experience: form.experience,
            });

            // ✅ Handle backend error
            if (data.error) {
                setError(data.error);
                setResults([]);
            } else {
                setResults(data.jobs || []);
            }

        } catch (err) {
            setError("Could not connect to the PathFinder backend. Please try again.");
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    function goTo(n) {
        if (n === 3) { handleSubmit(); return; }
        setStep(n);
    }

    function restart() {
        setStep(1);
        setResults([]);
        setError("");
        setSkills([]);
        setQuickSelected([]);
        setSkillInput("");
        setForm({ name: "", currentRole: "", experience: 2, education: "B.Tech / B.E." });
    }

    return (
        <div className="pf-page">
            <div className="pf-bg-orb pf-orb1" />
            <div className="pf-bg-orb pf-orb2" />
            <div className="pf-bg-orb pf-orb3" />

            <div className="pf-hero">
                <div className="pf-badge">PathFinder</div>
                <h1 className="pf-title">Find your perfect<br />career path</h1>
                <p className="pf-subtitle">
                    Just tell us your skills and experience — PathFinder's AI will surface
                    every role you're suited for, including ones you haven't thought of yet.
                </p>
            </div>

            <div className="pf-card">

                <div className="pf-steps">
                    {STEPS.map((label, i) => {
                        const n = i + 1;
                        const state = n < step ? "done" : n === step ? "active" : "idle";
                        return (
                            <React.Fragment key={n}>
                                <div className="pf-step">
                                    <div className={`pf-step-dot pf-step-${state}`}>
                                        {state === "done" ? (
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2"
                                                    strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : n}
                                    </div>
                                    <span className={`pf-step-label ${state === "active" ? "pf-step-label-active" : ""}`}>
                                        {label}
                                    </span>
                                </div>
                                {n < STEPS.length && (
                                    <div className={`pf-connector ${n < step ? "pf-connector-done" : ""}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {step === 1 && (
                    <div className="pf-panel">
                        <h2 className="pf-panel-title">Your profile</h2>

                        <label className="pf-label">Full name</label>
                        <input
                            className="pf-input"
                            placeholder="e.g. Arjun Sharma"
                            value={form.name}
                            onChange={(e) => updateForm("name", e.target.value)}
                        />

                        <label className="pf-label">Current role or status</label>
                        <input
                            className="pf-input"
                            placeholder="e.g. CS student, Junior Developer, Fresher..."
                            value={form.currentRole}
                            onChange={(e) => updateForm("currentRole", e.target.value)}
                        />

                        <div className="pf-row">
                            <div>
                                <label className="pf-label">
                                    Years of experience &nbsp;
                                    <span className="pf-label-val">
                                        {form.experience} yr{form.experience !== 1 ? "s" : ""}
                                    </span>
                                </label>
                                <input
                                    type="range" min="0" max="15" step="1"
                                    className="pf-slider"
                                    value={form.experience}
                                    onChange={(e) => updateForm("experience", Number(e.target.value))}
                                />
                                <div className="pf-slider-ticks">
                                    <span>0</span><span>5</span><span>10</span><span>15</span>
                                </div>
                            </div>
                            <div ref={eduRef} className="pf-custom-select-wrap">
                                <label className="pf-label">Education level</label>
                                <button
                                    type="button"
                                    className="pf-custom-select-btn"
                                    onClick={() => setEduOpen((o) => !o)}
                                >
                                    <span>{form.education}</span>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                        style={{ transform: eduOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5"
                                            strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                {eduOpen && (
                                    <ul className="pf-custom-select-list">
                                        {EDUCATION_LEVELS.map((lvl) => (
                                            <li
                                                key={lvl}
                                                className={`pf-custom-select-item ${form.education === lvl ? "pf-custom-select-item-active" : ""}`}
                                                onClick={() => { updateForm("education", lvl); setEduOpen(false); }}
                                            >
                                                {lvl}
                                                {form.education === lvl && (
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5"
                                                            strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="pf-btn-row">
                            <button className="pf-btn-next" onClick={() => goTo(2)}>
                                Next: Add your skills →
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="pf-panel">
                        <h2 className="pf-panel-title">Skills &amp; technologies</h2>

                        <label className="pf-label">
                            Type a skill and press Enter
                        </label>
                        <div
                            className="pf-skill-box"
                            onClick={() => skillInputRef.current?.focus()}
                        >
                            {allSkills.map((s) => (
                                <span key={s} className="pf-tag">
                                    {s}
                                    <button
                                        className="pf-tag-remove"
                                        onClick={(e) => { e.stopPropagation(); removeSkill(s); }}
                                    >×</button>
                                </span>
                            ))}
                            <input
                                ref={skillInputRef}
                                className="pf-skill-input"
                                placeholder={allSkills.length === 0 ? "Python, React, SQL..." : "Add more..."}
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleSkillKeyDown}
                            />
                        </div>

                        {allSkills.length > 0 && (
                            <p className="pf-skill-count">
                                {allSkills.length} skill{allSkills.length !== 1 ? "s" : ""} added
                            </p>
                        )}

                        <label className="pf-label" style={{ marginTop: "16px" }}>
                            Quick add popular skills
                        </label>
                        <div className="pf-chip-row">
                            {QUICK_SKILLS.map((s) => (
                                <button
                                    key={s}
                                    className={`pf-chip ${quickSelected.includes(s) ? "pf-chip-sel" : ""}`}
                                    onClick={() => toggleQuick(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        <div className="pf-btn-row">
                            <button className="pf-btn-prev" onClick={() => goTo(1)}>← Back</button>
                            <button
                                className="pf-btn-next pf-btn-find"
                                onClick={() => goTo(3)}
                                disabled={allSkills.length === 0}
                                style={{ opacity: allSkills.length === 0 ? 0.45 : 1 }}
                            >
                                Find my matches ✦
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="pf-panel">
                        {loading ? (
                            <div className="pf-loading">
                                <div className="pf-spinner" />
                                <p className="pf-loading-text">Analyzing your profile...</p>
                                <p className="pf-loading-sub">
                                    Matching {allSkills.length} skills · {form.experience} yrs experience
                                </p>
                            </div>
                        ) : error ? (
                            <div className="pf-error">
                                <p>{error}</p>
                                <div className="pf-btn-row">
                                    <button className="pf-btn-prev" onClick={() => setStep(2)}>← Go back</button>
                                    <button className="pf-btn-next" onClick={handleSubmit}>Retry</button>
                                </div>
                            </div>
                        ) : (
                            <div className="pf-results">
                                <div className="pf-results-header">
                                    <h2 className="pf-panel-title">
                                        Top matches for {form.name || "you"}
                                    </h2>
                                    <span className="pf-results-count">{results.length} roles found</span>
                                </div>
                                <p className="pf-results-sub">
                                    Ranked by skill alignment — including roles you may not have considered.
                                </p>
                                <div className="pf-result-list">
                                    {results.map((job, i) => (
                                        <ResultCard job={job} rank={i + 1} />
                                    ))}
                                </div>
                                <button className="pf-btn-prev pf-btn-restart" onClick={restart}>
                                    ← Start over
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}