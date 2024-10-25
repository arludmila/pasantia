import React, { useState } from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

interface PhoneNumberInputArgProps {
  telRef: React.RefObject<HTMLInputElement>;
}

const PhoneNumberInputArg = ({ telRef }: PhoneNumberInputArgProps) => {
  const [telError, setTelError] = useState<string>('');

  const handleValidation = () => {
    if (telRef.current) {
      const phoneNumber = telRef.current.value.trim(); 
      const regex = /^\+54[0-9]{10}$/;

      
      if (phoneNumber === '') {
        setTelError(''); 
      } else if (!regex.test(phoneNumber)) {
        setTelError('El teléfono debe tener el formato +54XXXXXXXXXX (número argentino).');
      } else {
        setTelError('');
      }
    }
  };

  return (
    <FormControl id="tel" isInvalid={!!telError}>
      <FormLabel>Teléfono</FormLabel>
      <Input
        type="text"
        ref={telRef}
        defaultValue=""
        onBlur={handleValidation}
      />
      {telError && <FormErrorMessage>{telError}</FormErrorMessage>}
    </FormControl>
  );
};

export default PhoneNumberInputArg;
