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
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      <Link href={path} style={{ textDecoration: 'none' }}>
        {name}
      </Link>
    </Box>
  );
}

export default function NavbarHome() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
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
              <img src="/goya-escudo-municipal.png" alt="Logo Goya" width="40" height="40" />
            </Box>
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
