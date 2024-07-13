import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  Checkbox
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { signup } from '/src/apiConection.js';
import  ModalLogin from '/src/Components/Modals/ModalLogin.jsx';

export default function SignUp() {
  
  const [isOpen, SetIsOpen] = useState(false);
  const openModal = () => SetIsOpen(true);
  const closeModal = () => SetIsOpen(false);

  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [error, setError] = useState('');
  
  const UserQuestionId = 1;
  const UserQuestionAnswer = 'Lolo';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Roles = isOrganizer ? 'Organizador' : '';
    try {
      const data = await signup(Name, Surname, Email, Password, Roles, UserQuestionId, UserQuestionAnswer);
      console.log('Registro exitoso', data);
      alert('Se ah registrado con exito!! Puede Iniciar Sesion.');
      navigate('/');
    } catch (error) { 
      const errorMessage = error.response?.data?.message || 'Error al registrar usuario, intente nuevamente';
      setError(errorMessage);
      console.error('Error en el registro', error);
    }
  };

  return (
    <Box>
      <Center>
        <Stack spacing='4' mt='3' w='22em'>
          <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='22em'>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing='4'>
                  <FormControl>
                    <FormLabel size='sm'>Nombre/s</FormLabel>
                    <Input
                      type='text'
                      bg='white'
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                      placeholder='Ingrese su Nombre'
                      autoComplete='off'
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel size='sm'>Apellido</FormLabel>
                    <Input
                      type='text'
                      bg='white'
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                      placeholder='Ingrese su Apellido'
                      autoComplete='off'
                      value={Surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel size='sm'>Correo Electronico</FormLabel>
                    <Input
                      type='text'
                      bg='white'
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                      placeholder='Ingrese el Email'
                      autoComplete='off'
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel size='sm'>Clave</FormLabel>
                    <Input
                      type='password'
                      bg='white'
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                      placeholder='Ingrese la Clave'
                      autoComplete='off'
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <Checkbox 
                    isChecked={isOrganizer} 
                    onChange={(e) => setIsOrganizer(e.target.checked)}
                    defaultChecked 
                    size='sm'>
                      Administrar y Difundir Eventos</Checkbox>
                  </FormControl>
                  <Button
                    type='submit'
                    bg='#63b3ed'
                    color='white'
                    size='sm'
                    _hover={{ bg: '#4299e1' }}
                    _active={{ bg: '#2b6cb0' }}
                  >
                    Registrar
                  </Button>
                </Stack>
                {error && <div style={{ color: 'red' }}>{error}</div>}
              </form>
            </CardBody>
          </Card>
          <Card variant='outline' borderColor='#d0d7de'>
            <CardBody>
              <Center>
                <HStack fontSize='sm' spacing='1'>
                  <Text>¿Ya tienes una Cuenta?</Text>
                  <a href="#" onClick={openModal} style={{ color: '#0969da' }}>
                    Ingresa Aquí!
                  </a>
                  <ModalLogin isOpen={isOpen} onClose={closeModal} />
                </HStack>
              </Center>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
}