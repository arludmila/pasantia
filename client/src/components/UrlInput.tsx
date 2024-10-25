import React, { useState } from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

interface UrlInputProps {
  paginaRef: React.RefObject<HTMLInputElement>;
}

const UrlInput = ({ paginaRef }: UrlInputProps) => {
  const [urlError, setUrlError] = useState<string>('');

  const handleValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const url = input.value;
    const regex = /^(http|https):\/\/[^ "]+$/;

    if (!regex.test(url)) {
      setUrlError('La URL debe comenzar con http:// o https:// y ser válida.');
    } else {
      setUrlError('');
    }
  };

  return (
    <FormControl id="pagina" isInvalid={!!urlError}>
      <FormLabel>Página Web</FormLabel>
      <Input
        type="url" 
        ref={paginaRef}
        defaultValue=""
        onBlur={handleValidation} 
      />
      {urlError && <FormErrorMessage>{urlError}</FormErrorMessage>} 
    </FormControl>
  );
};

export default UrlInput;
