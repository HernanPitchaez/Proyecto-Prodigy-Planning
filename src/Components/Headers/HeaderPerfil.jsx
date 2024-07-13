import React, { useState, useEffect } from 'react';
import { Center, VStack, Heading } from '@chakra-ui/react';
import { fetchUserRole } from '../../apiConection';

function HeaderPerfil() {
    const [user, setUser] = useState({role: ''});
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const responseRole = await fetchUserRole();
        const UserRole = responseRole.roles.data;
        setUser(prevState => ({ ...prevState, role: UserRole }));
        //console.log(UserRole);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    getUser();
  }, []);

  return (
    <Center>
      <VStack as='header' spacing='2'>
        <Heading
          as='h1'
          fontWeight='500'
          fontSize='35px'
          borderColor='#63171B'
          letterSpacing='-0.5px'
        >
          Perfil
        </Heading>
        <Heading
          as='h1'
          fontWeight='500'
          fontSize='35px'
          borderColor='#63171B'
          letterSpacing='-0.5px'
        >
          {user.role === '[ROLE_ORGANIZER]' ? 'Organizador' : 'Usuario'}
        </Heading>
      </VStack>
    </Center>
  );
}

export default HeaderPerfil;