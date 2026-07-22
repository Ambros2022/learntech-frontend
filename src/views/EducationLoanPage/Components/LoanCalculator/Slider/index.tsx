'use client'



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
                style={{ accentColor: '#254692' }}
            />
            {/* Scale marks and labels */}
            <div className="position-relative mt-2" style={{ height: '20px', fontSize: '0.75rem', color: '#555869' }}>
                {props.marks.map((mark) => {
                    const pct = ((mark.value - props.min) / (props.max - props.min)) * 100;
                    return (
                        <span
                            key={mark.value}
                            className="position-absolute"
                            style={{
                                left: `${pct}%`,
                                transform: 'translateX(-50%)',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {mark.label}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default DiscreteSliderLabel;
