import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';

interface FileInputProps {
  logoRef: React.RefObject<HTMLInputElement>; 
}

const LogoFileInput = ({ logoRef }: FileInputProps) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleClick = () => {
    if (logoRef.current) {
      logoRef.current.click();
    }
  };

  return (
    <FormControl id="logo" isRequired>
      <FormLabel>Logo</FormLabel>
      <Input
        type="file"
        ref={logoRef}
        onChange={handleFileChange}
        accept="image/*"
        display="none"
      />
      <Button onClick={handleClick} colorScheme="blue">
        {fileName ? "Cambiar archivo" : "Seleccionar archivo"}
      </Button>
      {fileName && <Text mt={2}>{fileName}</Text>}
    </FormControl>
  );
};

export default LogoFileInput;
