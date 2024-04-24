import React, { useState, useRef, useEffect, forwardRef, ForwardedRef, PropsWithoutRef } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js

// Import JoditEditor type from 'jodit-react'
import type { IJoditEditorProps } from 'jodit-react';

interface ExampleComponentProps {
    placeholder?: string;
    initialValue?: string;
    onChange: (newContent: string) => void;
}

// Define a custom type for the config prop
interface CustomConfig extends IJoditEditorProps {
    config?: {
        placeholderText?: string;
        readonly?: boolean;
        
    };
}

// Dynamically import JoditEditor to ensure it's only used in the browser
const DynamicJoditEditor = dynamic<CustomConfig>(() => import('jodit-react'), { ssr: false });

// Define props interface for the JoditEditor component, excluding 'ref'
interface JoditEditorProps extends PropsWithoutRef<CustomConfig> {
    value: string;
    onBlur: (newContent: string) => void;
    onChange: (newContent: string) => void;
}

// Forward the ref to the DynamicJoditEditor component
const ForwardedDynamicJoditEditor = forwardRef((props: JoditEditorProps, ref: ForwardedRef<any>) => (
    <DynamicJoditEditor {...props} ref={ref} />
));

const ExampleComponent: React.FC<ExampleComponentProps> = ({ placeholder, initialValue, onChange }) => {
    const editor = useRef<any>(null); // Use 'any' temporarily
    const [content, setContent] = useState<string>(initialValue || '');

    useEffect(() => {
        setContent(initialValue || '');
    }, [initialValue]);

    return (
        <ForwardedDynamicJoditEditor
            ref={editor}
            value={content}
            config={{
                readonly: false,
                placeholderText: placeholder || 'Start typing...',
                // Add other config options as needed
            }}
            onBlur={(newContent) => onChange(newContent)}
            onChange={(newContent) => setContent(newContent)}
        />
    );
};

export default ExampleComponent;
