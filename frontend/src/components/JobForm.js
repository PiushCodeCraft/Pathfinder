import React, { useState } from 'react';

const SKILL_SUGGESTIONS = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'SQL', 'Machine Learning',
    'Data Analysis', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'GraphQL', 'MongoDB',
    'PostgreSQL', 'Django', 'Flask', 'Spring Boot', 'Vue.js', 'Angular', 'Go', 'Rust',
    'Swift', 'Kotlin', 'TensorFlow', 'PyTorch', 'DevOps', 'CI/CD', 'Git',
];

const EXPERIENCE_LEVELS = [
    { value: 'fresher', label: 'Fresher (0 years)', icon: '🌱' },
    { value: '1-2', label: '1 – 2 years', icon: '🚀' },
    { value: '3-5', label: '3 – 5 years', icon: '⚡' },
    { value: '5-8', label: '5 – 8 years', icon: '🔥' },
    { value: '8+', label: '8+ years', icon: '👑' },
];

export default function JobForm({ onSubmit, loading }) {
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    const [experience, setExperience] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [errors, setErrors] = useState({});

    const handleSkillInput = (e) => {
        const val = e.target.value;
        setSkillInput(val);
        if (val.trim().length > 0) {
            const filtered = SKILL_SUGGESTIONS.filter(
                (s) => s.toLowerCase().includes(val.toLowerCase()) && !skills.includes(s)
            );
            setSuggestions(filtered.slice(0, 6));
        } else {
            setSuggestions([]);
        }
    };

    const addSkill = (skill) => {
        const trimmed = skill.trim();
        if (trimmed && !skills.includes(trimmed)) {
            setSkills([...skills, trimmed]);
        }
        setSkillInput('');
        setSuggestions([]);
        setErrors((prev) => ({ ...prev, skills: '' }));
    };

    const handleSkillKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
            e.preventDefault();
            addSkill(skillInput);
        } else if (e.key === 'Backspace' && !skillInput && skills.length > 0) {
            setSkills(skills.slice(0, -1));
        }
    };

    const removeSkill = (skill) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    const validate = () => {
        const newErrors = {};
        if (skills.length === 0) newErrors.skills = 'Please add at least one skill.';
        if (!experience) newErrors.experience = 'Please select your experience level.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({ skills, experience });
        }
    };

    return (
        <form className="job-form" onSubmit={handleSubmit} noValidate>
            {/* Skills Field */}
            <div className={`form-group ${errors.skills ? 'has-error' : ''}`}>
                <label className="form-label" htmlFor="skills-input">
                    <span className="label-icon">💼</span>
                    Your Skills
                </label>
                <p className="form-hint">Type a skill and press Enter or comma to add it</p>

                <div className="skills-input-wrapper" onClick={() => document.getElementById('skills-input').focus()}>
                    <div className="skills-tags">
                        {skills.map((skill) => (
                            <span key={skill} className="skill-tag">
                                {skill}
                                <button
                                    type="button"
                                    className="skill-tag-remove"
                                    onClick={(e) => { e.stopPropagation(); removeSkill(skill); }}
                                    aria-label={`Remove ${skill}`}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        <input
                            id="skills-input"
                            type="text"
                            className="skills-text-input"
                            value={skillInput}
                            onChange={handleSkillInput}
                            onKeyDown={handleSkillKeyDown}
                            placeholder={skills.length === 0 ? 'e.g. React, Python, SQL…' : ''}
                            autoComplete="off"
                        />
                    </div>
                </div>

                {/* Autocomplete suggestions */}
                {suggestions.length > 0 && (
                    <ul className="suggestions-list" role="listbox">
                        {suggestions.map((s) => (
                            <li
                                key={s}
                                className="suggestion-item"
                                role="option"
                                onMouseDown={(e) => { e.preventDefault(); addSkill(s); }}
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                )}
                {errors.skills && <p className="form-error">{errors.skills}</p>}
            </div>

            {/* Experience Level */}
            <div className={`form-group ${errors.experience ? 'has-error' : ''}`}>
                <label className="form-label">
                    <span className="label-icon">📈</span>
                    Experience Level
                </label>
                <p className="form-hint">Select how many years of professional experience you have</p>

                <div className="experience-grid">
                    {EXPERIENCE_LEVELS.map((level) => (
                        <button
                            key={level.value}
                            type="button"
                            id={`exp-${level.value}`}
                            className={`experience-card ${experience === level.value ? 'selected' : ''}`}
                            onClick={() => {
                                setExperience(level.value);
                                setErrors((prev) => ({ ...prev, experience: '' }));
                            }}
                        >
                            <span className="exp-icon">{level.icon}</span>
                            <span className="exp-label">{level.label}</span>
                        </button>
                    ))}
                </div>
                {errors.experience && <p className="form-error">{errors.experience}</p>}
            </div>

            {/* Submit */}
            <button
                id="find-jobs-btn"
                type="submit"
                className={`submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="spinner" />
                        Analyzing your profile…
                    </>
                ) : (
                    <>
                        <span>🔍</span>
                        Find My Career Paths
                    </>
                )}
            </button>
        </form>
    );
}