import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, VStack, IconButton, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider, InputGroup, Input, InputRightElement, Select, HStack, Spacer, Button, useDisclosure } from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SearchIcon, CalendarIcon } from '@chakra-ui/icons';
import { ModalLogin } from '..'
import { isLoggedIn, fetchUser, fetchUserRole, fetchCategories, fetchEventsByFilters } from '/src/apiConection.js';
import { HeaderPerfil, HeaderRegister, HeaderChangePassword, HeaderCreateEvent, HeaderEdit } from '..';
import bgImage from '/src/Image/Logo.png';
import bnImage from '/src/Image/Baner.jpg';
import CalendarioIcon from '../../Image/Others/CalendarioIcon';
import UserMenu from '../../Image/Others/UserMenu';
import { useEvents } from '/src/Components/AuthContext/EventContext.jsx';
import { useAuth } from '/src/Components/AuthContext/AuthContext.jsx';


export default function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState({ name: '', surname: '' });
  const [userRole, setUserRole] = useState({ role: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { setFilteredEvents } = useEvents();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        const categoriesWithId = response.result.map(
          (categoria) => ({ id: categoria.id, name: categoria.name })
        )
        setCategories(categoriesWithId);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };
  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return ''; 
    const parts = dateString.split('-'); 
    if (parts.length < 3) return 'cadena vacia'; 
    return `${parts[0]}${parts[1]}${parts[2]}`; 
  };

  const handleSearch = async () => {
    try {
      
      const formattedFromDate = formatDate(fromDate); 
      const formattedToDate = formatDate(toDate); 
      console.log(fromDate);
      console.log(formattedFromDate);
      const events = await fetchEventsByFilters({
        Name: eventTitle,
        Category: selectedCategoryId,
        FromDate: formattedFromDate,
        ToDate: formattedToDate,
      });
      setFilteredEvents(events);
      console.log(events);
    } catch (error) {
      console.error('Error al buscar eventos:', error);
    }
  };

  useEffect(() => {
    const checkSessionAndgetUser = async () => {
      setIsLoadingUser(true);
      let sessionIsActive = false;
      try {
        sessionIsActive = await isLoggedIn();
        setUserIsLoggedIn(sessionIsActive);
        if (sessionIsActive) {
          const response = await fetchUser();
          const roleResponse = await fetchUserRole();
          const UserData = response.userProfile.data;
          const userRole = roleResponse.roles.data;
          setUser(UserData);
          setUserRole(userRole);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      } finally {
        if (sessionIsActive) {
          setIsLoadingUser(false);
        }
      }
      if (!sessionIsActive) {
        setIsLoadingUser(false);
      }
    };
    checkSessionAndgetUser();
  }, []);

  if (isLoadingUser) {
    return <div>Cargando...</div>;
  }

  if (location.pathname === '/Event') {
    return null;
  }
  const handleLogout = async () => {
    await logout();
    setUserIsLoggedIn(false);
    setUser({ name: '', surname: '' });
    navigate('/');
  }

  return (
    <Box bgImage={`url(${bnImage})`} h='20vh' bgRepeat='no-repeat' bgPosition='center' bgSize='cover'>
      <Flex
        px={4}
        py={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <a href="/">
            <Image src={bgImage} borderRadius="50" w='40%' />
          </a>
        </Flex>
        {!isAuthenticated && location.pathname === "/SignUp" && (
          <Flex alignItems="center" justifyContent="" width="32%">
            <HeaderRegister />
          </Flex>
        )}
        {isAuthenticated && location.pathname === "/User" && (
          <Flex justifyContent="space-between" width="29%" alignItems="center">
            <HeaderPerfil />
          </Flex>
        )}
        {isAuthenticated && location.pathname === "/Create" && (
          <Flex justifyContent="space-between" width="30%" alignItems="center">
            <HeaderCreateEvent />
          </Flex>
        )}
        {isAuthenticated && location.pathname === "/Edit" && (
          <Flex justifyContent="space-between" width="30%" alignItems="center">
            <HeaderEdit />
          </Flex>
        )}
        {isAuthenticated && location.pathname === "/changepassword" && (
          <Flex justifyContent="space-between" width="40%" alignItems="center">
            <HeaderChangePassword />
          </Flex>
        )}
        <Flex alignItems="center" gap={4}>
          {isAuthenticated && userRole !== '[ROLE_USER]' && (
            <VStack spacing={0} alignItems="center">
              <Link to="/Create">
              <IconButton colorScheme="black" icon={<CalendarIcon />} isRound={true} variant="ghost" fontSize='23px' _hover={{ bg: '#90cdf4' }}
                _active={{ bg: '#63b3ed' }} />
                </Link>
              <Text>Crear Eventos</Text>
            </VStack>
          )}
          <VStack spacing={0} alignItems="center">
            <Link to="/calendar">
              <IconButton colorScheme="black" icon={<CalendarioIcon />} isRound={true} variant="ghost" fontSize='23px' _hover={{ bg: '#90cdf4' }}
                _active={{ bg: '#63b3ed' }} />
            </Link>
            <Text>Calendario</Text>
          </VStack>
          <Menu>
            <MenuButton>
              {isAuthenticated ? (<Avatar name={`${user.name} ${user.surname}`} src={UserMenu} />) : (<Avatar name='' src={UserMenu} />)}
            </MenuButton>
            <MenuList>
              {isAuthenticated && userRole !== '[ROLE_USER]' && (<MenuItem as={Link} to="/User" color="black">Perfil de Usuario</MenuItem>)}
              {!isAuthenticated && location.pathname !== "/SignUp" && (<MenuItem as={Link} to="/SignUp" color="black">Registrar</MenuItem>)}
              <MenuDivider />
              {isAuthenticated ? (
                <MenuItem onClick={handleLogout} color="black">Cerrar Sesión</MenuItem>

              ) : (
                <MenuItem onClick={onOpen} color="black">Ingresar</MenuItem>
              )}
            </MenuList>
          </Menu>
          <ModalLogin isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Flex>
      {location.pathname === "/" && (
        <Flex px={4}
          py={4}
          alignItems="center"
        >
          <HStack>
            <InputGroup size="sm">
              <Input
                placeholder="Titulo de evento"
                fontSize='md'
                bg="white"
                value={eventTitle}
                onChange={handleTitleChange}
              />
              <InputRightElement children={<SearchIcon />} />
            </InputGroup>
            <Select
              placeholder="Categoria"
              fontSize='md'
              bg="white"
              size="sm"
              name='categoryId'
              onChange={handleChange}
            >
              {categories.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </Select>
          </HStack>
          <Spacer />
          <Flex gap="15px" alignItems="Center">
            <Text fontSize="lg">Desde</Text>
            <Input
              type='date'
              placeholder='Desde'
              bg="white"
              size="sm"
              w="50%"
              value={fromDate}
              onChange={handleFromDateChange}
            />
            <Text fontSize="lg">Hasta</Text>
            <Input
              type='date'
              placeholder='Hasta'
              bg="white"
              size="sm"
              w="50%"
              value={toDate}
              onChange={handleToDateChange}
            />
            <Button bg='#63b3ed'
              color='white'
              size='sm'
              fontSize='md'
              _hover={{ bg: '#4299e1' }}
              _active={{ bg: '#2b6cb0' }}
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
