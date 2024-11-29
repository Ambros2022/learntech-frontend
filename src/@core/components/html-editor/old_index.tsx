'use client';
import React, { useState, useRef, useMemo, ChangeEvent, useEffect } from 'react';
// import JoditEditor from 'jodit-react';
import dynamic from 'next/dynamic';
interface ExampleProps {
	placeholder?: string;
	intaialvalue?: string;
	onChange?: any;
}
const DynamicJoditEditor = dynamic<any>(() => import('jodit-react'), { ssr: false });

const Example: React.FC<ExampleProps> = ({ placeholder, intaialvalue = '', onChange }) => {
	const editor = useRef(null);
	const [values, setValues] = useState(intaialvalue);
	function onChanges(content) {
		setValues(content)
		onChange(content);
	}
	useEffect(() => {
		onChanges(values);
	}, [values]);
	return (
		<DynamicJoditEditor
			ref={editor}
			value={values}
			onChange={onChanges}
		// config={config}
		// tabIndex={1} // tabIndex of textarea
		// onBlur={handleBlur} // preferred to use only this option to update the content for performance reasons
		// onChange={handleChange}
		/>
	);
}
export default Example;