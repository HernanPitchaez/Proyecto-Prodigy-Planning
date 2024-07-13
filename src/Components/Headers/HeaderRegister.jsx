import React from 'react';
import { Center, VStack, Heading } from '@chakra-ui/react';
import UserPlus from '../../Image/Others/UserPlus';

function HeaderRegister() {
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
                    Registrar
                </Heading>
                <UserPlus />
            </VStack>
        </Center>
    );
}

export default HeaderRegister;