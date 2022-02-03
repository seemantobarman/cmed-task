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
import axios from "axios";

function Homepage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dataItems, setDataItems] = useState([]);
  const [allPrescriptions, setAllPrescriptions] = useState([]);
  const [deleted, setDeleted] = useState(1);

  const handelSearch = () => {
    const dateRange = dateRangeArr(fromDate, toDate);
    const filteredData = filterItemsBasedOnDate(dateRange, allPrescriptions);
    setDataItems(filteredData);
  };

  const GenerateReport = () => {
    const result = {};
    const results = [];

    allPrescriptions.forEach(function(o) {
      Object.keys(o).forEach(function(k) {
        result[k] = result[k] || {};
        result[k][o[k]] = (result[k][o[k]] || 0) + 1;
      });
    });

    if (allPrescriptions.length > 0) {
      for (const [key, value] of Object.entries(result.prescriptionDate)) {
        results.push({ [key]: value });
      }
    }

    // return result?.prescriptionDate;

    console.log(results);

    return (
      <div>
        {allPrescriptions.length > 0 && (
          <Table variant="striped" bgColor="gray.50" mt="50px">
            <TableCaption>Date wise prescription count</TableCaption>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Count</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((item, index) => {
                for (const [key, value] of Object.entries(item)) {
                  return (
                    <Tr key={index}>
                      <Td>{key}</Td>
                      <Td>{value}</Td>
                    </Tr>
                  );
                }
              })}
            </Tbody>
          </Table>
        )}
      </div>
    );
  };

  const getAllPrescriptions = () => {
    axios
      .get(`http://localhost:8080/api/v1/prescription`)
      .then((response) => {
        setAllPrescriptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(allPrescriptions);
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
    range.forEach((date, index) => {
      data.forEach((item, index) => {
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

      axios
        .delete(`http://localhost:8080/api/delete/${id}`)
        .then((response) => {
          console.log(response);
          getAllPrescriptions();
        })
        .catch((error) => {
          alert("Error");
          console.log(error);
        });

      var x = deleted + 1;
      setDeleted(x);
    }
  };

  useEffect(() => {
    console.log("---Component Mounted---");
    axios
      .get(`http://localhost:8080/api/v1/prescription`)
      .then((response) => {
        setAllPrescriptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const startOfMonth = moment()
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = moment()
      .endOf("month")
      .format("YYYY-MM-DD");
    setFromDate(startOfMonth);
    setToDate(endOfMonth);
    const dateRange = dateRangeArr(startOfMonth, endOfMonth);

    axios
      .get(`http://localhost:8080/api/v1/prescription`)
      .then((response) => {
        const allData = response.data;
        const data = filterItemsBasedOnDate(dateRange, allData);
        setDataItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleted]);

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
                    <Td>
                      {item.nextVisitDate === "Invalid date"
                        ? "(-)"
                        : item.nextVisitDate}
                    </Td>
                    <Td>
                      <Link
                        style={{
                          color: "blue",
                          marginRight: "10px",
                        }}
                        to={`/update/${item.id}`}
                      >
                        Update
                      </Link>

                      <Link
                        style={{
                          color: "red",
                          margin: "0px",
                        }}
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

        <Center mt="10px">{GenerateReport()}</Center>
      </Container>
    </>
  );
}

export default Homepage;
