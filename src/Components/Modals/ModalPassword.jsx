import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'

export default function ModalPassword({isOpen, onClose}){
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Restabler Contraseña</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Se envio una contraseña provisoria a su casilla de mail para que pueda cambiar la contraseña.
          </ModalBody>
          <ModalFooter>
            <Button 
            bg='#63b3ed'
            color='white'
            size='sm'
            _hover={{ bg: '#4299e1' }}
            _active={{ bg: '#2b6cb0' }}
            onClick={onClose}>
              Continuar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
 }

 