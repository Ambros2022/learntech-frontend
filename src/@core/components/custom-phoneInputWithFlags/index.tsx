import React, { useEffect, useRef } from 'react';
import 'intl-tel-input/build/css/intlTelInput.css';

const PhoneInput = ({ onChange, ariaDescribedby, id }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const loadUtils = async () => {
      await import('intl-tel-input/build/js/utils');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const intlTelInput = require('intl-tel-input');
      intlTelInput(inputRef.current, {
        initialCountry: 'in', // Set auto to automatically select the user's country
        preferredCountries: ['in'],
        hideDialCode: true,   // Hide country flag icon after selection
        nationalMode: true,   // Show only the national number part
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js'
      });
    };

    if (inputRef.current) {
      loadUtils();
    }
  }, []);

  return <span className='phoneInput'><input type="tel" ref={inputRef} className="form-control" placeholder="" id={id}
    aria-describedby={ariaDescribedby} onChange={onChange} value="" /></span>;
};

export default PhoneInput;
