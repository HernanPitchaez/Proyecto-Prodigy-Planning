import { chakra } from '@chakra-ui/react'
import {
  Box,
  Button,
  HStack,
  Stack,
  Container
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getEventBanner } from '/src/apiConection.js'; 
import Baner from '/src/Image/Baner.jpg';


export default function Event() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const eventData = params.get('event');
    const [bannerUrl, setBannerUrl] = useState('');

    const event = JSON.parse(eventData);
      console.log(event);

    if (eventData) {
      const event = JSON.parse(eventData);
      console.log(event);
      const id = event.id;
      const name = event.name;
      const time = event.time;
      const description = event.description;
      const location = event.location;
      const date = event.date;

      useEffect(() => {
        async function fetchBanner() {
          try {
            const url = await getEventBanner(id);
            setBannerUrl(url);
          } catch (error) {
            console.error('Error al obtener el banner del evento:', error);
          }
        }
    
        fetchBanner();
      }, [id]);

  return (
    <Box>
      <Box bgImage={Baner} h='20vh' bgRepeat='no-repeat' bgPosition='center' bgSize='cover'>
        <Button 
        bg={'blue.300'} 
        size='sm' 
        textColor={'white'} 
        mt='3' 
        ml='3'  
        _hover={{ bg: '#4299e1' }}
        _active={{ bg: '#2b6cb0' }}
        as={RouterLink}
        to="/"
        >
          Volver
        </Button>
      </Box>

      <Box  as='h1'
              fontWeight='500'
              fontSize='40px'
              textColor={'Black'} 
              borderColor='#63171B'
              letterSpacing='-0.5px'>
             <center>
             {name}
             </center>
      </Box>
      <HStack justifyContent='space-between' mt='3' mb='3' spacing='10'>
        <Box  fontWeight='500'
              fontSize='17px'
              textColor={'Black'} 
              borderColor='#63171B'
              letterSpacing='-0.5px'>
          {date}                                           
        </Box>
        <Box h="500px" w="800px" mb={4}>
          <div>
            {bannerUrl ? <img src={bannerUrl} alt="Banner del evento" /> : <p>Cargando banner...</p>}
          </div>
        </Box>
        <Box fontWeight='500'
            fontSize='17px'
            textColor={'Black'} 
            borderColor='#63171B'
            letterSpacing='-0.5px'>
          {time} hs.
        </Box>
      </HStack>
      <Container maxW='3xl' padding='55'>
        <Box>
          {description}
        </Box>
     </Container>
     <Box bg="blue.500" color="white" py={4} px={4} textAlign="left">
        <Stack>
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
}
