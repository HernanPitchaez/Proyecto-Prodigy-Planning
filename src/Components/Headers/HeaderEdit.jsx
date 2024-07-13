import React from 'react';
import { Center, VStack, Heading } from '@chakra-ui/react';

function HeaderEdit() {

  return (
    <Center>
      <VStack as='header' spacing='1'>
        <Heading
          as='h1'
          fontWeight='500'
          fontSize='35px'
          borderColor='#63171B'
          letterSpacing='-0.5px'
        >
          Editar Evento
        </Heading>
      </VStack>
    </Center>
  );
}

export default HeaderEdit;