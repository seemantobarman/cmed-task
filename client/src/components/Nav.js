import React from "react";
import { withRouter } from "react-router-dom";
import { Box, Button, Text, Heading } from "@chakra-ui/react";
import { logout } from "../helpers/helper";

function Nav({ history }) {
  const getName = () => {
    if (window !== "undefined") {
      if (sessionStorage.getItem("user")) {
        return sessionStorage.getItem("user");
      } else {
        return false;
      }
    }
  };

  const handleLogout = () => {
    logout(function() {
      return history.push("/");
    });
  };

  return (
    <Box
      width="100vw"
      padding="20px"
      shadow="md"
      mb="20px"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box>
        <Heading
          as="h2"
          size="lg"
          cursor="pointer"
          onClick={() => history.push("/")}
        >
          CMED
        </Heading>
      </Box>

      <Text fontSize="xl" display={{ sm: "none", md: "block" }}>
        Hello,{" "}
        <span style={{ color: "red" }}>{getName() ? getName() : "Guest"}</span>
      </Text>

      <div>
        {getName() && (
          <Box>
            <Button
              colorScheme="red"
              variant="ghost"
              onClick={() => history.push("/add")}
              mr="5px"
            >
              ADD
            </Button>

            <Button
              colorScheme="red"
              variant="ghost"
              onClick={() => history.push("/consume")}
              mr="5px"
            >
              API
            </Button>

            <Button colorScheme="red" variant="ghost" onClick={handleLogout}>
              LOGOUT
            </Button>
          </Box>
        )}
      </div>
    </Box>
  );
}

export default withRouter(Nav);
