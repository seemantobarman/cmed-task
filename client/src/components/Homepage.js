import React, { useState, useEffect } from "react";
import {
  Container,
  Text,
  Button,
  Center,
  Heading,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import moment from "moment";
import { fakeData } from "../fakeData";
import { Link } from "react-router-dom";

function Homepage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dataItems, setDataItems] = useState([]);

  const handelSearch = () => {
    const FormattedFromDate = moment(fromDate, "YYYY-MM-DD").format(
      "DD-MM-YYYY"
    );
    const FormattedToDate = moment(toDate, "YYYY-MM-DD").format("DD-MM-YYYY");

    const dateRange = dateRangeArr(fromDate, toDate);
    const filteredData = filterItemsBasedOnDate(dateRange, fakeData);
    setDataItems(filteredData);
  };

  const dateRangeArr = (from, to) => {
    const date = [];

    for (var m = moment(from); m.isBefore(to); m.add(1, "days")) {
      date.push(m.format("DD-MM-YYYY"));
    }

    return date;
  };

  const filterItemsBasedOnDate = (range, data) => {
    const matchedItems = [];
    range.map((date, index) => {
      data.map((item, index) => {
        if (date === item.prescriptionDate) {
          matchedItems.push(item);
        }
      });
    });

    return matchedItems;
  };

  const handleDelete = (id) => {
    const answer = window.confirm("Confirm Delete?");
    if (answer) {
      console.log("ID---->", id);
    }
  };

  useEffect(() => {
    const startOfMonth = moment()
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = moment()
      .endOf("month")
      .format("YYYY-MM-DD");

    setFromDate(startOfMonth);
    setToDate(endOfMonth);

    const dateRange = dateRangeArr(startOfMonth, endOfMonth);
    const data = filterItemsBasedOnDate(dateRange, fakeData);

    setDataItems(data);
  }, []);

  return (
    <>
      <Container maxW={{ md: "container.xl", sm: "container.sm" }}>
        <Center>
          <Heading as="h1" size="xl" mb="10px">
            Search Prescriptions
          </Heading>
        </Center>

        <Center flexWrap="wrap">
          <div
            style={{
              display: "flex",
              width: "fit-content",
              padding: "10px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Text mr="10px">From: </Text>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={{
                  border: "1px solid grey",
                  borderRadius: "10px",
                  textAlign: "center",
                  marginRight: "10px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text mr="10px">To: </Text>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={{
                  border: "1px solid grey",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              />
            </div>
          </div>

          <Button
            colorScheme="teal"
            variant="outline"
            onClick={handelSearch}
            isDisabled={!fromDate || !toDate}
          >
            Search
          </Button>
        </Center>

        {/* Table */}
        {dataItems.length > 0 && (
          <Table variant="simple" bg="gray.50" borderRadius="20px" mt="50px">
            <TableCaption>All Prescriptions Matched</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Gender</Th>
                <Th>Diagnosis</Th>
                <Th>Medications</Th>
                <Th>Prescription Date</Th>
                <Th>Next Visit</Th>
                <Th>Update | Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataItems.map((item) => {
                return (
                  <Tr key={`${item.id}`}>
                    <Td>{item.name}</Td>
                    <Td>{item.age}</Td>
                    <Td>{item.gender}</Td>
                    <Td>{item.diagnosis}</Td>
                    <Td>{item.medications}</Td>
                    <Td>{item.prescriptionDate}</Td>
                    <Td>{item.nextVisitDate}</Td>
                    <Td>
                      <Link
                        style={{ color: "blue", marginRight: "10px" }}
                        to={`/update/${item.id}`}
                      >
                        Update
                      </Link>

                      <Link
                        style={{ color: "red", margin: "0px" }}
                        onClick={() => handleDelete(item.id)}
                        to={`#`}
                      >
                        Delete
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default Homepage;
