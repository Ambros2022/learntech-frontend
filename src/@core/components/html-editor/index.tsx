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
  const editor = useRef<any>(null);
  const [values, setValues] = useState(intaialvalue);

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
      // Only update if content has actually changed to avoid unnecessary re-renders
      if (content !== values) {
        setValues(content);
        if (onChange) {
          onChange(content);
        }
      }
    },
    [onChange, values]
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
