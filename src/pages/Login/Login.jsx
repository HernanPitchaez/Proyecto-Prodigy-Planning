import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react';

import bgImage from '/src/Image/Baner.jpg'
import {ModalPassword} from '../../Components'
import {LockIcon} from '@chakra-ui/icons'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import { useAuth } from '/src/Components/AuthContext/AuthContext.jsx';

export default function Login({onLoginSuccess}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      onLoginSuccess();
      navigate('/');
    } catch (error) {
      setError('Falló el inicio de sesión. Por favor, verifica tus credenciales.');
    }
  }

  return (  
    <Box>
      <Box bgImage={`url(${bgImage})`} h='20vh' bgRepeat='no-repeat' bgPosition='center' bgSize='cover'>
        <Link as={RouterLink} to="/ ">
        </Link>
        <Center>
          <VStack as='header' spacing='2' mt='3'>
            <Heading
              as='h1'
              fontWeight='500'
              fontSize='35px'
              borderColor='#63171B'
              letterSpacing='-0.5px'
            >
              Iniciar Sesion
            </Heading>
            <LockIcon boxSize={9}/>
          </VStack>
        </Center>
      </Box>
      <Center>
        <Stack spacing='4' mt='3'>
          <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='22em'>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing='4'>
                  <FormControl>
                    <FormLabel size='sm'>Usuario</FormLabel>
                    <Input
                      type='email'
                      value={email}
                      bg='white'
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                      placeholder='Ingrese el Email'
                      autoComplete='off'
                      onChange={(e) => setEmail(e.target.value)} required
                    />
                  </FormControl>
                  <FormControl>
                    <HStack justify='space-between'>
                      <FormLabel size='sm'>Clave</FormLabel>
                      <Button
                        as='a'
                        href='#'
                        variant='link'
                        size='xs'
                        color='#0969da'
                        fontWeight='500'
                        onClick={onOpen}
                      >
                        ¿Olvidates tu clave?
                      </Button>
                      <ModalPassword isOpen={isOpen} onClose={onClose} />
                    </HStack>
                    <Input
                      type='password'
                      value={password}
                      bg='white'
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                      placeholder='Ingrese la Clave'
                      autoComplete='off'
                      onChange={(e) => setPassword(e.target.value)} required 
                    />
                  </FormControl>

                  <Button
                    bg='#63b3ed'
                    color='white'
                    size='sm'
                    _hover={{ bg: '#4299e1' }}
                    _active={{ bg: '#2b6cb0' }}
                    type='submit'
                    >
                    Ingresar
                  </Button>
                </Stack>
              </form>
              {error && <p>{error}</p>}
            </CardBody>
          </Card>

          <Card variant='outline' borderColor='#d0d7de'>
            <CardBody>
              <Center>
                <HStack fontSize='sm' spacing='1'>
                  <Text>¿No tienes Cuenta?</Text>
                  <Link color='#0969da' href='/SignUp'>
                    Registrate
                  </Link>
                </HStack>
              </Center>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
}