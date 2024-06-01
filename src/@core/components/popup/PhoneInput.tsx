import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';

const PhoneInputField = ({ name, ...props }: { name: string }) => {
    const [field, , helpers] = useField({ name, ...props });
    return (
        <PhoneInput
            {...field}
            {...props}
            country={'in'}
            onChange={value => helpers.setValue(value)}
        />
    );
};

export default PhoneInputField;