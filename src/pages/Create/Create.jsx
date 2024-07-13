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
    Select,
    Textarea,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { fetchCategories, addEvent, addEventBanner } from '/src/apiConection.js';

export default function Create() {

    const [categories, setCategories] = useState([]);

    const [dateTime, setDateTime] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const [eventData, setEventData] = useState({
        name: '',
        location: '',
        duration: '',
        description: '',
        categoryId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Fecha:", date);
            console.log("Hora:", time);
            console.log(eventData);

            const response = await addEvent(
                eventData.name,
                eventData.location,
                date,
                time,
                eventData.duration,
                eventData.description,
                eventData.categoryId
            );

            if (response.success) {
                const eventId = response.data.id;
                console.log("Evento creado con ID:", eventId);

                const bannerResponse = await addEventBanner(eventId, banner);

                console.log(bannerResponse);
            } else {

                console.error('La creación del evento falló');
            }
        } catch (error) {
            console.error('Error al crear el evento:', error);
            alert(error);

        }
    };

    useEffect(() => {
        const Categorias = async () => {
            try {
                const response = await fetchCategories();
                const categoriesWithId = response.result.map(
                    (categoria) => ({ id: categoria.id, name: categoria.name })
                )
                setCategories(categoriesWithId);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        }
        Categorias();
    }, []);


    const handleDateTimeChange = (e) => {
        const fullDateTime = e.target.value;
        setDateTime(fullDateTime);

        const [extractedDate, extractedTime] = fullDateTime.split('T');

        const [year, month, day] = extractedDate.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        setDate(formattedDate);

        const formattedTime = `${extractedTime}:00`;
        setTime(formattedTime);
    };

    const currentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${year}-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}`;
    };

    const [banner, setBanner] = useState(null);
    const handleFileChangeBanner = (event) => {
        setBanner(event.target.files[0]);
    };
    const handleCancelBanner = () => {
        setBanner(null);
        document.getElementById('Inputbanner').value = '';
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
                                        <FormLabel size='sm'>Titulo del evento</FormLabel>
                                        <Input
                                            type='text'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='Ingrese Nombre'
                                            autoComplete='off'
                                            name='name' onChange={handleChange}
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
                                            min={currentDateTime()}
                                            value={dateTime}
                                            onChange={handleDateTimeChange}
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
                                            name='duration' onChange={handleChange}
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
                                            name='location' onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Categorias</FormLabel>
                                        <Select placeholder='Seleccione la Categoria' size='sm' name='categoryId' onChange={handleChange}>
                                            {categories.map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Portada</FormLabel>
                                        <div
                                            onClick={() => document.getElementById('Inputbanner').click()}
                                            style={{
                                                cursor: 'pointer',
                                                background: 'white',
                                                border: '1px solid #d8dee4',
                                                borderRadius: '6px',
                                                padding: '0.375rem 0.75rem',
                                                fontSize: '0.875rem',
                                                lineHeight: '1.25rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <span>{banner ? banner.name : "Seleccione la Portada"}</span>
                                            <Input
                                                id='Inputbanner'
                                                type='file'
                                                style={{ display: 'none' }}
                                                bg='white'
                                                borderColor='#d8dee4'
                                                size='sm'
                                                borderRadius='6px'
                                                placeholder='Imagen'
                                                autoComplete='off'
                                                accept='image/png, image/jpg'
                                                onChange={handleFileChangeBanner}
                                            />
                                        </div>
                                        {banner && (
                                            <Center>
                                                <Button size='xs' mt='2' colorScheme='red' onClick={handleCancelBanner}>
                                                    Cancelar Portada
                                                </Button>
                                            </Center>
                                        )}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size='sm'>Descripcion</FormLabel>
                                        <Textarea
                                            type='text'
                                            bg='white'
                                            borderColor='#d8dee4'
                                            size='sm'
                                            borderRadius='6px'
                                            placeholder='Ingrese la descripción'
                                            autoComplete='off'
                                            name='description' onChange={handleChange}
                                        />
                                    </FormControl>
                                    <Button
                                        type='submit'
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