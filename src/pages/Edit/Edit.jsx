import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    FormControl,
    FormLabel,
    Input,
    Stack,
    VStack,
} from '@chakra-ui/react';
import UserPlus from '../../Image/Others/UserPlus';

export default function Edit() {

    return (
        <Box>
            <Box>
                <Center>
                    <VStack as='header' spacing='1' mt='3'>
                        <UserPlus />
                    </VStack>
                </Center>
            </Box>
            <Center>
                <Stack spacing='4' mt='3' w='22em'>
                    <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='22em'>
                        <CardBody>
                            <form>
                                <Stack spacing='4'>
                                    <FormControl>
                                        <FormLabel size='sm'>Titulo del evento</FormLabel>
                                        <Input
                                            type='text'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='Ingrese Nombre'
                                            autoComplete='off'
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Fecha/Hora</FormLabel>
                                        <Input
                                            type='datetime-local'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='time'
                                            autoComplete='off'
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Duracion</FormLabel>
                                        <Input
                                            type='number'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='Ingrese cantidad de horas'
                                            autoComplete='off'
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Ubicacion</FormLabel>
                                        <Input
                                            type='text'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='Ingrese la ubicacion'
                                            autoComplete='off'
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Categoria</FormLabel>
                                        <select >
                                            <option>Otras</option>
                                            <option>Charlas</option>
                                            <option>Musica</option>
                                            <option>Tecnologia</option>
                                            <option>Gastronomia</option>
                                            <option>Entretenimiento</option>
                                            <option>Deportes</option>
                                        </select>

                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Clasificacion</FormLabel>
                                        <select>
                                            <option>Libre</option>
                                            <option>+18</option>
                                        </select>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Portada</FormLabel>
                                        <Input
                                            type='text'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='Imagen'
                                            autoComplete='off'
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Imagenes</FormLabel>
                                        <Input
                                            type='text'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='Imagenes'
                                            autoComplete='off'
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Descripcion</FormLabel>
                                        <Input
                                            type='text'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='lg'
                                            borderRadius='6px'
                                            placeholder='Ingrese la descripcion'
                                            autoComplete='off'
                                        />
                                    </FormControl>
                                    <Button
                                        bg='#63b3ed'
                                        color='white'
                                        size='sm'
                                        _hover={{ bg: '#4299e1' }}
                                        _active={{ bg: '#2b6cb0' }}
                                    >
                                        Guardar
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