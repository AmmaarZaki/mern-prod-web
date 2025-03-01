import { Box, Button, Container, Heading, Input, InputGroup, InputLeftElement, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';
import { LiaPoundSignSolid } from "react-icons/lia";
import { CiImageOn } from "react-icons/ci";
import { BiBasket } from "react-icons/bi";

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({

    name: "",
    price: "",
    image: ""
  });

  const { createProduct } = useProductStore();
  const toast = useToast();

  const handleAddProduct = async () => {

    const { success, message } = await createProduct(newProduct);

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

    setNewProduct({
      name: "",
      price: "",
      image: ""
    });
  }

  return (
    <Container
      maxW={"container.sm"}
    >
      <VStack
        spacing={4}
        mt={4}
      >
        <Heading
          as={"h2"}
          size={"xl"}
          textAlign={"center"}
          mb={8}
          bgGradient={"linear(to-r, blue.700, blue.400)"}
          bgClip={"text"}
        >
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("gray.400", "gray.700")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
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
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
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
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
            </InputGroup>

            <Button
              colorScheme='blue'
              onClick={handleAddProduct}
              w={"full"}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage