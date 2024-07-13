import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Grid,
  chakra,
  Stack,
  VStack,
  useDisclosure,
  Link
} from '@chakra-ui/react';

import { useEvents } from '/src/Components/AuthContext/EventContext.jsx';
import { getAllEvents, getEventBanner } from '/src/apiConection.js';


function Home() {

  const [events, setEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()//
  const { filteredEvents } = useEvents();

  const fetchAndSetEvents = async (eventsToProcess) => {
    const eventsWithBanner = await Promise.all(
      eventsToProcess.map(async (event) => {
        if (event.hasBanner) {
          try {
            const bannerResponse = await getEventBanner(event.id);
            return { ...event, banner: bannerResponse };
          } catch (error) {
            console.error("Error al obtener el banner del evento:", error);
            return event;
          }
        }
        return event;
      })
    );
    setEvents(eventsWithBanner);
  };


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        if (response.success && Array.isArray(response.result)) { //
          fetchAndSetEvents(response.result);
        } else {
          console.error('La respuesta no es un array:', response);
          setEvents([]);
        }
      } catch (error) {
        console.error("Error al obtener los eventos: ", error);
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (filteredEvents.result && filteredEvents.result.length > 0) {
      fetchAndSetEvents(filteredEvents.result).then((eventsWithBanner) => {
        setEvents(eventsWithBanner);
        console.log(filteredEvents);
      });
    }
  }, [filteredEvents]);

  return (
    <Box>
      <Box px={4} py={4}>
        <Flex alignItems="center" justifyContent="space-between">
        </Flex>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
          gap={4}
          px={4}
          py={4}
          maxWidth="1200px"
          margin="auto"
        >
          <VStack spacing={16} px={4}>
            {(filteredEvents.result && filteredEvents.result.length > 0 ? filteredEvents.result : events).map((event, index) => (
              <Flex key={event.id} direction={index % 2 === 0 ? "row" : "row-reverse"} alignItems="center">
                <Box
                  bg={'white'}
                  borderRadius="md"
                  boxShadow="md"
                  p={4}
                  w="500px"
                >
                  <Box h="300px" w="300px" mb={4}>
                    {event.banner ? (
                      <Image
                        src={event.banner}
                        alt={event.title}
                        borderRadius="md"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      //onLoad={() => console.log('Imagen Cargada')}
                      />
                    ) : (
                      <Text fontSize="lg" color="gray.500" p={4}>
                        Sin Imagen
                      </Text>
                    )}
                  </Box>
                  <Heading size="sm" mb={2}>
                    {event.name}
                  </Heading>
                  <Text fontSize="sm" mb={2}>
                    {event.date} - {event.time}
                  </Text>
                </Box>
                    
                {event.description && (
                    
                  <Box gb="blue" p={4} mt={4} color="black" borderRadius="md">
                    <Text fontSize="xl" mt={2}>
                      {event.description}
                    </Text>
                    <Link as={RouterLink}
                      to={{
                        pathname: "/Event",
                        search: `?event=${JSON.stringify(event)}`,
                      }}
                      href="/Event" color="blue.500" _hover={{ textDecor: 'underline' }}>
                      Ver evento
                    </Link>
                  </Box>
                )}
              </Flex>
            ))}
          </VStack>
        </Grid>
      </Box>
      <Box bg="blue.500" color="white" py={4} px={4} textAlign="left">
        <Stack spacing={1}>
          <chakra.a href="#" color="white" _hover={{ textDecor: 'underline' }}>
            Contact
          </chakra.a>
          <chakra.a href="#" color="white" _hover={{ textDecor: 'underline' }}>
            About Us
          </chakra.a>
          <chakra.a href="#" color="white" _hover={{ textDecor: 'underline' }}>
            Terms & Conditions
          </chakra.a>
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;