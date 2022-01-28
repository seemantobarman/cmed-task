import React, { useState } from "react";
import {
    SimpleGrid,
    Box,
    Text,
    Input,
    Button,
    Stack,
    Center,
    useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();
    const history = useHistory();

    const userCred = {
        username: "admin",
        password: "admin12345",
    };

    const handelSubmit = () => {
        if (username === userCred.username && password === userCred.password) {
            setUsername("");
            setPassword("");

            sessionStorage.setItem("user", userCred.username);

            toast({
                title: "Success",
                description: "You have logged in successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            history.push("/");
        } else {
            setUsername("");
            setPassword("");

            toast({
                title: "Failed",
                description: "Login faild, Incorrect Credentials",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <div>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="40px">
                <Box
                    bg="white"
                    height="80px"
                    display={{ sm: "none", md: "block" }}
                ></Box>
                <Box bg="gray.100" mt="10vh">
                    <div
                        style={{
                            display: "flex",
                            border: "1px solid #c2c2c2",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ padding: "30px" }}>
                            <Stack spacing={4}>
                                <Center>
                                    <Text
                                        mb="8px"
                                        fontSize="2xl"
                                        fontWeight="bold"
                                    >
                                        Login Page
                                    </Text>
                                </Center>
                                <Input
                                    bg="white"
                                    variant="outline"
                                    placeholder="Username"
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                                <Input
                                    bg="white"
                                    variant="outline"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <Center>
                                    <Button
                                        colorScheme="blue"
                                        w="50%"
                                        onClick={handelSubmit}
                                    >
                                        Login
                                    </Button>
                                </Center>
                            </Stack>
                        </div>
                    </div>
                </Box>
                <Box
                    bg="white"
                    height="80px"
                    display={{ sm: "none", md: "block" }}
                ></Box>
            </SimpleGrid>
        </div>
    );
}

export default Login;
