import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./Routes";

ReactDOM.render(
    <ChakraProvider>
        <Routes />
    </ChakraProvider>,
    document.getElementById("root")
);
