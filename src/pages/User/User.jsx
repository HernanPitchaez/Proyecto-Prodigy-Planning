import {
  Box,
  Avatar,
  List,
  ListItem,
  ListIcon,
  Button,
  Center,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react';

import { StarIcon } from '@chakra-ui/icons';
import { fetchUser, fetchUserLevel, fetchUserEventsCount, getOwnedEvents } from '../../apiConection';
import React, { useState, useEffect } from 'react';

export default function User() {
  const [user, setUser] = useState({ name: '', surname: '', email: '', userLevel: '', totalEvents: '', eventsByCategory: {} });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchUser();
        const UserData = response.userProfile.data;
        const responseLevel = await fetchUserLevel();
        const UserLevel = responseLevel.userLevel.data;
        const responseEvents = await fetchUserEventsCount();
        const UserEvents = responseEvents.totalEvents;
        const EventsByCategory = responseEvents.eventsByCategory;
        const allUserData = { ...UserData, userLevel: UserLevel, totalEvents: UserEvents, eventsByCategory: EventsByCategory }

        setUser(allUserData);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };
    getUser();
  }, []);

  const [eventCounts, setEventCounts] = useState({});
  
  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await getOwnedEvents();
        console.log('Eventos obtenidos:', events);
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      }
    };
    getEvents();
  }, []);

  if (!user || !user.name) {
    return <div>Cargando usuario...</div>;
  }

  return (
    <Box>
      <Box mt="4">
        <Center>
          <VStack spacing='1' >
            <Avatar size="md" bg='#000000' />
            <Heading as="h2" size="lg" fontWeight="bold">
              {user.name} {user.surname}
            </Heading>
            <Text fontSize="md" color="gray.600">
              {user.email}
            </Text>
          </VStack>
        </Center>
      </Box>
      <Box mt='7'>
        <Center>
          <VStack spacing='2'>
            <Heading as="h3" size="md" fontWeight="semibold">
              Actividades
            </Heading>

            <List spacing="3" mt='3'>
              <ListItem>
                <ListIcon as={StarIcon} color="yellow.300" />
                Eventos creados: {user.totalEvents}
              </ListItem>
              {Object.entries(user.eventsByCategory).map(([category, count]) => (
                <ListItem key={category}>
                  <ListIcon as={StarIcon} color="yellow.300" />
                  {category}: {count}
                </ListItem>
              ))}
              <ListItem>
                <ListIcon as={StarIcon} color="yellow.300" />
                Nivel de usuario: {user.userLevel === 'true' ? 'Premium' : 'Free'}
              </ListItem>
            </List>

            <Button
              as='a'
              href='/changepassword'
              variant='link'
              size='ms'
              color='#0969da'
              fontWeight='500'
              mt='5'
            >
              ¿Olvidates tu clave?
            </Button>

          </VStack>
        </Center>
      </Box>
    </Box>
  );
}



