import React, { useState } from 'react';
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
    Link
  } from '@chakra-ui/react';

  const EventCard = ({ event, filteredEvents }) => {
    const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);


      console.log(`Filtered events: ${filteredEvents}`);
      console.log(filteredEvents); 
      const banner = event.banner ? event.banner : 'No banner available';
      console.log(`Event banner: ${banner}`);
      console.log('Event banner:', event.banner);
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
            {filteredEvents.result && filteredEvents.result.length > 0
              ? filteredEvents.result.map((event, index) => (
                  <Flex key={event.id} direction={index % 2 === 0 ? "row" : "row-reverse"} alignItems="center"><Box
                      bg={'white'}
                      borderRadius="md"
                      boxShadow="md"
                      p={4}
                      w="500px"
                    >
                      <Box h="300px" w="300px" mb={4}>
                        {event.banner !== null && event.banner !== undefined ? (
                          <Image
                            src={URL.createObjectURL(event.banner)}
                            alt={event.title}
                            borderRadius="md"
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            onLoad={() => console.log('Image loaded')}
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
                        <Link onClick={onOpen} href="#" color="blue.500" _hover={{ textDecor: 'underline' }}>
                          Ver evento
                        </Link>
                      </Box>
                    )}
                  </Flex>
                )):
                <Text>Eventos no encontrados</Text>}
              </VStack>
            </Grid>
          </Box>
          <Box bg="blue.500" color="white" py={4} px={4} textAlign="left">
            <Stack spacing={1}>
              <chakra.a href="#" color="white" _hover={{ textDecor: 'underline' }}>
                Contact
              </chakra.a>
              <chakra.a href="#" color="white" _hover={{ textDecor: 'underline' }}>
                Acerca de
              </chakra.a>
              <chakra.a href="#" color="white" _hover={{ textDecor: 'underline' }}>
                Terminos y Condiciones
              </chakra.a>
            </Stack>
          </Box>
        </Box>
      );
      }

      export default EventCard;