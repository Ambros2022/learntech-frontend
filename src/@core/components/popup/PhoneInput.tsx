import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useField } from 'formik';

const PhoneInputField = ({ name, ...props }: { name: string }) => {
  const [field, , helpers] = useField({ name, ...props });


  const formatPhoneNumber = (phoneNumber: string, country: any) => {
  
    
    if (country.dialCode === "91") {
      const numberWithoutDialCode = phoneNumber.replace(/^91/, ""); // Remove leading "91" if present
      const formattedNumber = numberWithoutDialCode.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1$2$3"); // Ensure only digits remain
      return "+" + country.dialCode + "-" + formattedNumber;
    } else {
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
        const formattedPhoneNumber = formatPhoneNumber(value, country);
        helpers.setValue(formattedPhoneNumber); 
      }}

    />
  );
};

export default PhoneInputField;
