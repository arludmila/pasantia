import { UseToastOptions, ToastId } from "@chakra-ui/react";
import { ApiValidationResponse } from "../services/models/ApiValidationResponse";

export const handleApiError = (error: ApiValidationResponse, toast: (options?: UseToastOptions) => ToastId) => {
  const { message, errors } = error;

  toast({
    title: message,
    description: errors
      .map(err => `${Object.values(err.constraints).join(', ')}`)
      .join('\n'),
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
};

export default handleApiError;
