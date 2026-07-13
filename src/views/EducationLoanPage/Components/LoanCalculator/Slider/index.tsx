'use client'

// Native range input replacing @material-ui/core/Slider
// MUI v4 uses findDOMNode which was removed in React 18 — native APIs only per CLAUDE.md

interface DiscreteSliderLabelProps {
    ariaLabel: string;
    defaultValue: number;
    getAriaValueText: (value: number) => string;
    step: number;
    marks: { value: number; label: string }[];
    min: number;
    max: number;
    value: number;
    onChange: (event: any, value: number | number[]) => void;
    className?: string;
    valueLabelDisplay: 'auto' | 'on' | 'off';
}

const DiscreteSliderLabel = (props: DiscreteSliderLabelProps) => {
    return (
        <div className={`${props.className ?? ''} w-100`}>
            <input
                type="range"
                aria-label={props.ariaLabel}
                min={props.min}
                max={props.max}
                step={props.step}
                value={props.value}
                onChange={(e) => props.onChange(e, Number(e.target.value))}
                className="form-range w-100"
                style={{ accentColor: '#1e3a8a' }}
            />
            {/* Min / Max labels */}
            <div className="d-flex justify-content-between" style={{ fontSize: '0.7rem', color: '#555' }}>
                <span>{props.marks[0]?.label ?? props.min}</span>
                <span>{props.marks[props.marks.length - 1]?.label ?? props.max}</span>
            </div>
        </div>
    );
};

export default DiscreteSliderLabel;
