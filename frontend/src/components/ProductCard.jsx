import {
    Box,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
    InputGroup,
    InputLeftElement,
    ModalFooter,
    Button
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product';
import { LiaPoundSignSolid } from "react-icons/lia";
import { CiImageOn } from "react-icons/ci";
import { BiBasket } from "react-icons/bi";

const ProductCard = ({ product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (productId) => {
        try {
            const { success, message } = await deleteProduct(productId);

            if (!success) {
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    duration: 2000,
                    isClosable: true
                });

            } else {

                toast({
                    title: "Success",
                    description: message,
                    status: "success",
                    duration: 2000,
                    isClosable: true
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true
            });
        }
    };

    const handleUpdateProduct = async (productId, updatedProduct) => {
        try {
            const { success, message } = await updateProduct(productId, updatedProduct);

            if (!success) {
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    duration: 2000,
                    isClosable: true
                });

            } else {

                toast({
                    title: "Success",
                    description: message,
                    status: "success",
                    duration: 2000,
                    isClosable: true
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true
            });
        }

        onClose();
    }

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{
                transform: "translateY(-5px)",
                shadow: 'xl'
            }}
            bg={bg}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={48}
                w='full'
                objectFit='cover'
            />

            <Box
                p={4}
            >
                <Heading
                    as='h3'
                    size='md'
                    mb={2}
                >
                    {product.name}
                </Heading>

                <Text
                    fontWeight='bold'
                    fontSize='xl'
                    mb={4}
                    color={textColor}
                >
                    £ {product.price}
                </Text>

                <HStack
                    spacing={2}
                >
                    <IconButton
                        icon={<EditIcon />}
                        colorScheme='blue'
                        onClick={onOpen}
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        colorScheme='red'
                        onClick={() => handleDeleteProduct(product._id)}
                    />
                </HStack>
            </Box>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Update Product
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack
                            spacing={4}
                        >
                            <InputGroup>
                                <InputLeftElement>
                                    <BiBasket />
                                </InputLeftElement>
                                <Input
                                    variant='flushed'
                                    focusBorderColor='black'
                                    placeholder='Name'
                                    _placeholder={{
                                        opacity: 1,
                                        color: "black"
                                    }}
                                    name='name'
                                    value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement>
                                    <LiaPoundSignSolid />
                                </InputLeftElement>
                                <Input
                                    variant='flushed'
                                    focusBorderColor='black'
                                    placeholder='Price'
                                    _placeholder={{
                                        opacity: 1,
                                        color: "black"
                                    }}
                                    name='price'
                                    value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement>
                                    <CiImageOn />
                                </InputLeftElement>
                                <Input
                                    variant='flushed'
                                    focusBorderColor='black'
                                    placeholder='Image'
                                    _placeholder={{
                                        opacity: 1,
                                        color: "black"
                                    }}
                                    name='image'
                                    value={updatedProduct.image}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                />
                            </InputGroup>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button
                            variant='ghost'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default ProductCard