import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useField } from 'formik';

const PhoneInputField = ({ name, ...props }: { name: string }) => {
  const [field, , helpers] = useField({ name, ...props });


  const formatPhoneNumber = (phoneNumber: string, country: any) => {
  
    // Check if the country code is 91
    if (country.dialCode === "91") {
      // Ensure phone number starts with the dial code and format it
      const numberWithoutDialCode = phoneNumber.replace(/^91/, ""); // Remove leading "91" if present
      const formattedNumber = numberWithoutDialCode.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1$2$3"); // Ensure only digits remain
      return "+" + country.dialCode + "-" + formattedNumber;
    } else {
      // For other country codes, return the phone number as is with the dial code
      return "+" + phoneNumber;
    }
  };

  return (
    <PhoneInput
      {...field}
      {...props}
      country={'in'}
      value={field.value}
      onChange={(value, country) => {
        const formattedPhoneNumber = formatPhoneNumber(value, country); // Format the phone number
        helpers.setValue(formattedPhoneNumber); // Set the formatted value to Formik field
      }}
     // Mark the field as touched when blurred

    />
  );
};

export default PhoneInputField;

// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { Formik, Form, Field, ErrorMessage, useField } from 'formik';

// const PhoneInputField = ({ name, ...props }: { name: string }) => {
//     const [field, , helpers] = useField({ name, ...props });
//     return (
//         <PhoneInput
//             {...field}
//             {...props}
//             country={'in'}
//             onChange={value => helpers.setValue(value)}
//         />
//     );
// };

// export default PhoneInputField;