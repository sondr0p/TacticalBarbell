import React, { useState } from 'react';
import responsiveStyles from './InputForm.styles';

function InputForm() {
    // Helper to calculate plate breakdown for a given weight (assume 45 lb bar)
    const getPlateBreakdown = (weight) => {
        const plates = [45, 35, 25, 10, 5, 2.5];
        let perSide = (weight - 45) / 2;
        if (perSide < 0) return [];
        const result = [];
        for (let p of plates) {
            let count = Math.floor(perSide / p);
            if (count > 0) {
                for (let i = 0; i < count; i++) result.push(p);
                perSide -= count * p;
            }
        }
        // If any fractional plate remains, round to nearest 0.5
        if (perSide > 0.25) result.push(Math.round(perSide * 2) / 2);
        return result;
    };
    // Operator program week structure
    const operatorWeeks = [
        { sets: '3-5', reps: '5', pct: 0.7 },
        { sets: '3-5', reps: '5', pct: 0.8 },
        { sets: '3-4', reps: '3', pct: 0.9 },
        { sets: '3-5', reps: '5', pct: 0.75 },
        { sets: '3-5', reps: '3', pct: 0.85 },
        { sets: '3-4', reps: '1-2', pct: 0.95 },
    ];

    // Helper to get grid cell content for Operator
    const getOperatorCell = (dayIdx, weekIdx) => {
        if (![1, 3, 5].includes(dayIdx)) return '';
        const week = operatorWeeks[weekIdx];
        const lifts = getLiftFields();
        return (
            <div style={{ paddingLeft: 8, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {lifts.map((lift, idx) => {
                    const oneRM = calculate1RM(lift.name);
                    if (!oneRM) return null;
                    const pctVal = Math.round(oneRM * week.pct / 5) * 5;
                    return (
                        <div key={lift.name} style={{ marginBottom: 4 }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.97rem' }}>{lift.label}</div>
                            <div style={{ fontSize: '0.95rem', marginLeft: 8 }}>
                                {week.sets} × {pctVal}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };
    const [input, setInput] = useState('');
    const [strengthProgram, setStrengthProgram] = useState('Operator');
    const [conditioningProgram, setConditioningProgram] = useState('Black');
    const [cluster, setCluster] = useState('Standard');
    const [submitted, setSubmitted] = useState(null);
    const [liftInputs, setLiftInputs] = useState({
        Squat: 225,
        Bench: 135,
        'Weighted Pull-up': 45,
        Deadlift: 315,
    });
    const [repSetInputs, setRepSetInputs] = useState({
        Squat_reps: 5,
        Bench_reps: 5,
        'Weighted Pull-up_reps': 5,
        Deadlift_reps: 5,
    });
    const getLiftFields = () => {
        if (cluster === 'Standard') {
            return [
                { label: 'Squat', name: 'Squat' },
                { label: 'Bench', name: 'Bench' },
                { label: 'Weighted Pull-up', name: 'Weighted Pull-up' },
                { label: 'Deadlift', name: 'Deadlift' },
            ];
        } else if (cluster === 'Grunt') {
            return [
                { label: 'Front Squat', name: 'Front Squat' },
                { label: 'Overhead Press', name: 'Overhead Press' },
                { label: 'Weighted Pull-up', name: 'Weighted Pull-up' },
                { label: 'Deadlift', name: 'Deadlift' },
            ];
        }
        return [];
    };

    const handleRepSetInputChange = (e) => {
        setRepSetInputs({
            ...repSetInputs,
            [e.target.name]: e.target.value,
        });
    };

    // Epley formula: 1RM = weight * (1 + reps/30), rounded to nearest 5
    const calculate1RM = (liftName) => {
        const weight = parseFloat(liftInputs[liftName]);
        const reps = parseInt(repSetInputs[`${liftName}_reps`], 10);
        if (!isNaN(weight) && !isNaN(reps) && reps > 0) {
            const raw1RM = weight * (1 + reps / 30);
            // Round to nearest 5
            return Math.round(raw1RM / 5) * 5;
        }
        return '';
    };
    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleStrengthChange = (e) => {
        setStrengthProgram(e.target.value);
    };

    const handleConditioningChange = (e) => {
        setConditioningProgram(e.target.value);
    };

    const handleClusterChange = (e) => {
        setCluster(e.target.value);
    };

    const [showGrid, setShowGrid] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted({ input, strengthProgram, conditioningProgram, cluster });
        setShowGrid(true);
    };

    const handleLiftInputChange = (e) => {
        setLiftInputs({
            ...liftInputs,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div style={responsiveStyles.container}>
            <form onSubmit={handleSubmit} style={responsiveStyles.form}>
                {/* ...existing form code... */}
                <label htmlFor="cluster-program" style={{ display: 'block', marginBottom: 8 }}>
                    Cluster:
                </label>
                <select
                    id="cluster-program"
                    value={cluster}
                    onChange={handleClusterChange}
                    style={{ width: '100%', padding: 8, marginBottom: 12 }}
                    required
                >
                    <option value="" disabled>Select a cluster</option>
                    <option value="Standard">Standard</option>
                    <option value="Grunt">Grunt</option>
                </select>
                <label htmlFor="strength-program" style={{ display: 'block', marginBottom: 8 }}>
                    Strength Program:
                </label>
                <select
                    id="strength-program"
                    value={strengthProgram}
                    onChange={handleStrengthChange}
                    style={{ width: '100%', padding: 8, marginBottom: 12 }}
                    required
                >
                    <option value="" disabled>Select a program</option>
                    <option value="Operator">Operator</option>
                    <option value="Zulu">Zulu</option>
                    <option value="Fighter">Fighter</option>
                    <option value="FighterIA">Fighter I/A (Bangkok)</option>
                </select>
                <label htmlFor="conditioning-program" style={{ display: 'block', marginBottom: 8 }}>
                    Conditioning Program:
                </label>
                <select
                    id="conditioning-program"
                    value={conditioningProgram}
                    onChange={handleConditioningChange}
                    style={{ width: '100%', padding: 8, marginBottom: 12 }}
                    required
                >
                    <option value="" disabled>Select a program</option>
                    <option value="Black">Black</option>
                    <option value="Green">Green</option>
                </select>
                {/* Add lift textboxes dynamically based on cluster selection */}
                {getLiftFields().length > 0 && (
                    <div style={{ marginTop: 24 }}>
                        {getLiftFields().map((field) => (
                            <div key={field.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 16, gap: 12 }}>
                                <label htmlFor={field.name} style={{ minWidth: 120 }}>{field.label}:</label>
                                <input
                                    type="number"
                                    name={field.name}
                                    id={field.name}
                                    value={liftInputs[field.name] || ''}
                                    onChange={handleLiftInputChange}
                                    style={{ width: 100, padding: 8 }}
                                    placeholder="Weight"
                                />
                                <input
                                    type="number"
                                    name={`${field.name}_reps`}
                                    value={repSetInputs[`${field.name}_reps`] || ''}
                                    onChange={handleRepSetInputChange}
                                    style={{ width: 80, padding: 8 }}
                                    placeholder="Reps"
                                />
                                {/* Show 1RM if weight and reps are filled */}
                                {liftInputs[field.name] && repSetInputs[`${field.name}_reps`] && (
                                    <span style={{ fontSize: '0.95rem', color: '#1976d2', marginLeft: 12 }}>
                                        1RM: {calculate1RM(field.name)}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <button type="submit" style={{ padding: '8px 16px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', marginTop: 16 }}>
                    Submit
                </button>
            </form>
            {/* Show grid after submit */}
            {showGrid && (
                <div style={{ marginTop: 32, width: '100%', maxWidth: 1400, overflowX: 'auto' }}>
                    <strong style={{ marginBottom: 8, display: 'block' }}>6-Week Program Grid</strong>
                    <table style={{ ...responsiveStyles.table, minWidth: 1200 }}>
                        <thead>
                            <tr>
                                <th style={{ ...responsiveStyles.th, minWidth: 100 }}>Week</th>
                                <th style={{ ...responsiveStyles.th, minWidth: 180 }}>Sunday</th>
                                <th style={{ ...responsiveStyles.th, minWidth: 180 }}>Monday</th>
                                <th style={{ ...responsiveStyles.th, minWidth: 180 }}>Tuesday</th>
                                <th style={{ ...responsiveStyles.th, minWidth: 180 }}>Wednesday</th>
                                <th style={{ ...responsiveStyles.th, minWidth: 180 }}>Thursday</th>
                                <th style={{ ...responsiveStyles.th, minWidth: 180 }}>Friday</th>
                                <th style={{ ...responsiveStyles.th, minWidth: 180 }}>Saturday</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(6)].map((_, weekIdx) => (
                                <tr key={weekIdx}>
                                    <td style={{ ...responsiveStyles.weekTd, minWidth: 100 }}>{weekIdx + 1}</td>
                                    {[...Array(7)].map((_, dayIdx) => (
                                        <td key={dayIdx} style={{ ...responsiveStyles.td, minWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {strengthProgram === 'Operator' ? getOperatorCell(dayIdx, weekIdx) : ''}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default InputForm;
