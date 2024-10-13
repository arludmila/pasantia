import { IoClose, IoFilterSharp } from "react-icons/io5";
import { Link } from '@chakra-ui/react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';

const Links = [
  { name: 'Carreras', path: '/carreras' },
  { name: 'Instituciones', path: '/instituciones' },
];

interface NavLinkProps {
  name: string;
  path: string;
}

const NavLinks = ({ name, path }: NavLinkProps) => {
  return (
    <Box
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('green.500', 'gray.700'),
      }}
    >
    

      <Link
        href={path}
        textDecoration="none"
        color="white"
        fontWeight="medium" 
        fontSize="lg" 
        _hover={{ 
          color: 'gray.300', 
        }}
        px={2} 
        py={1} 
        borderRadius="md" 
      >
        {name}
      </Link>

    </Box>
  );
}

export default function NavbarHome() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('green.400', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <IoClose /> : <IoFilterSharp />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
            <Link href={"/"}>
  <img src="/goya-escudo-municipal.png" alt="Logo Goya" width="40" height="40" />
</Link>                     </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLinks key={link.name} name={link.name} path={link.path} />
              ))}
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
