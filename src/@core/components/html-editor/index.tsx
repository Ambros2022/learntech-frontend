'use client';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';

interface ExampleProps {
	placeholder?: string;
	intaialvalue?: string;
	onChange?: (content: string) => void;
}

const DynamicJoditEditor = dynamic<any>(() => import('jodit-pro-react'), { ssr: false });

const Example: React.FC<ExampleProps> = ({ placeholder, intaialvalue = '', onChange }) => {
	const editor = useRef(null);
	const [values, setValues] = useState(intaialvalue);

	// Editor configuration with Poppins font
	const config = useMemo(
		() => ({
			controls: {
				font: {
					list: { 'Poppins,Arial,sans-serif': 'Poppins' }
				}
			},
			placeholder: placeholder || 'Start typing...'
		}),
		[placeholder]
	);

	const handleChange = useCallback(
		(content: string) => {
			setValues(content);
			if (onChange) {
				onChange(content);
			}
		},
		[onChange]
	);

	useEffect(() => {
		setValues(intaialvalue);
	}, [intaialvalue]);

	return (
		<DynamicJoditEditor
			ref={editor}
			value={values}
			config={config}
			onChange={handleChange}
			tabIndex={1} // tabIndex for focus control
		/>
	);
};

export default Example;
