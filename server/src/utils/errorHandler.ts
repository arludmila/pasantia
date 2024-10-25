export const handleError = (error: Error, res: any) => {
  if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};
