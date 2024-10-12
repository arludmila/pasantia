'use client';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Link,
  Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircle } from "react-icons/io5";

interface NavLink {
  name: string;
  path: string;
}

interface Props {
  links: NavLink[];
}

const NavLinks = ({ name, path }: NavLink) => {
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

export default function NavbarDashboard({ links }: Props) { 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };
  

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <img src="/goya-escudo-municipal.png" alt="Logo Goya" width="40" height="40" />
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {links.map((link) => (
              <NavLinks key={link.name} name={link.name} path={link.path} />
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
             <IoPersonCircle size={45}/>
            </MenuButton>
            <MenuList>
              <MenuItem>Ajustes</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout} color="red">Cerrar Sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
