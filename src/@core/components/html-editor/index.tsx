import React, { useEffect, forwardRef, PropsWithoutRef } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js
import type { IJoditEditorProps } from 'jodit-react';

interface ExampleComponentProps {
    placeholder?: string;
    initialValue?: string;
    onChange: (newContent: string) => void;
}

interface CustomConfig extends IJoditEditorProps {
    config?: {
        placeholderText?: string;
        readonly?: boolean;
    };
}

const DynamicJoditEditor = dynamic<CustomConfig>(() => import('jodit-react'), { ssr: false });

interface JoditEditorProps extends PropsWithoutRef<CustomConfig> {
    value: string;
    onBlur: (newContent: string) => void;
    onChange: (newContent: string) => void;
}

const ForwardedDynamicJoditEditor = forwardRef((props: JoditEditorProps, ref: any) => (
    <DynamicJoditEditor {...props} ref={ref} />
));

const ExampleComponent: React.FC<ExampleComponentProps> = ({ placeholder, initialValue = '', onChange }) => {
    useEffect(() => {
        // Update the editor content when initialValue changes
        onChange(initialValue);
    }, [initialValue, onChange]);

    return (
        <ForwardedDynamicJoditEditor
            value={initialValue}
            config={{
                readonly: false,
                placeholderText: placeholder || 'Start typing...',
            }}
            onBlur={(newContent) => onChange(newContent)}
            onChange={(newContent) => onChange(newContent)}
        />
    );
};

export default ExampleComponent;
