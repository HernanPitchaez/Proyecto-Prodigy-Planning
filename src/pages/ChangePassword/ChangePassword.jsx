import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    FormControl,
    FormLabel,
    Input,
    Stack
} from '@chakra-ui/react';
import { useState } from 'react';
import { updatePassword, logout } from '/src/apiConection.js';
import { useNavigate } from 'react-router-dom';


export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (oldPassword !== confirmPassword) {
            alert('La confirmación de la clave actual no coincide.');
            return;
        }
        try {
            await updatePassword(oldPassword, confirmPassword, newPassword);
            alert('Contraseña actualizada con éxito, por favor ingrese nuevamente.');
            await logout();
            navigate('/');
        } catch (error) {
            alert('Error al actualizar la contraseña: ' + error.message);
        }
    };

    return (
        <Box>
            <Center>
                <Stack spacing='4' mt='7'>
                    <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='22em'>
                        <CardBody>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing='4'>
                                    <FormControl>
                                        <FormLabel size='sm'>Clave Actual</FormLabel>
                                        <Input
                                            type='password'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='Ingrese la Clave Actual'
                                            autoComplete='off'
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Confirmacion de Clave Actual</FormLabel>
                                        <Input
                                            type='password'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='Ingrese Nuevamente la Clave Actual'
                                            autoComplete='off'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Nueva Clave</FormLabel>
                                        <Input
                                            type='password'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='Inrese la Nueva Clave'
                                            autoComplete='off'
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </FormControl>
                                    <Button
                                        bg='#63b3ed'
                                        color='white'
                                        size='sm'
                                        _hover={{ bg: '#4299e1' }}
                                        _active={{ bg: '#2b6cb0' }}
                                        mt='2'
                                        type='submit'
                                    >
                                        Cambiar Clave
                                    </Button>
                                </Stack>
                            </form>
                        </CardBody>
                    </Card>
                </Stack>
            </Center>
        </Box>
    );
}