import React from 'react'
import {
    Container,
    Flex,
    Text,
    HStack,
    Button,
    useColorMode
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {
    FiPlusSquare,
    FiMoon,
    FiSun
} from "react-icons/fi";

const NavigationBar = () => {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container
            maxW={"1140px"}
            px={4}
        >
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, blue.700, blue.400)"}
                    bgClip={"text"}
                >
                    <Link to={"/"}>Madibbun Product Store</Link>
                </Text>
                <HStack
                    spacing={2}
                    alignItems={"center"}
                >
                    <Link
                        to={"/createPage"}
                    >
                        <Button>
                            <FiPlusSquare fontSize={20} />
                        </Button>
                    </Link>
                    <Button
                        onClick={toggleColorMode}
                    >
                        {colorMode === "light" ? <FiMoon /> : <FiSun />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default NavigationBar