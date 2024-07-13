import {
    Box,
    Center,
    VStack,
    Flex,
    Heading,
    Text
} from '@chakra-ui/react';
import { fetchUser } from '../../apiConection';
import React, { useState, useEffect } from 'react';

function HeaderChangePassword() {
    const [user, setUser] = useState({ name: '', surname: '', email: '' });

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetchUser();
                const UserData = response.userProfile.data;
                setUser(UserData);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        };

        getUser();
    }, []);

    return (
        <Center>
            <VStack as='header' spacing='3'>
                <Heading
                    as='h1'
                    fontWeight='500'
                    fontSize='35px'
                    borderColor='#63171B'
                    letterSpacing='-0.5px'
                >
                    {user.name} {user.surname}
                </Heading>
                <Text
                    fontWeight='400'
                    fontSize='17px'
                    borderColor='#CBD5E0'
                    letterSpacing='-0.5px'
                >{user.email}
                </Text>
            </VStack>
        </Center>
    )
}
export default HeaderChangePassword;