import React, { forwardRef, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Pagination from "@choc-ui/paginator";

function ConsumeApi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const offset = (current - 1) * pageSize;
  const posts = data.slice(offset, offset + pageSize);

  useEffect(() => {
    axios
      .get(
        "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=341248"
      )
      .then((resp) => {
        const reformattedArr = [];

        const [a] = resp.data.interactionTypeGroup;
        const [b] = a.interactionType;

        b.interactionPair.map((item, index) => {
          const [c, d] = item.interactionConcept;
          console.log(d);

          const { minConceptItem, sourceConceptItem } = c;
          const { name, rxcui, tty } = minConceptItem;
          const { id, name: name2 } = sourceConceptItem;

          const tempObj = {
            description: item.description,
            severity: item.severity,
            name,
            rxcui,
            tty,
            id,
            sourceName: name2,
          };

          reformattedArr.push(tempObj);
        });

        console.log(reformattedArr);

        setData(reformattedArr);
        setLoading(false);
      });
  }, []);

  const Prev = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Prev
    </Button>
  ));
  const Next = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Next
    </Button>
  ));

  const itemRender = (_, type) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
  };
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Table maxW="98%" m={15} mt={20} rounded="lg" variant="simple">
        <TableCaption>
          <Pagination
            current={current}
            onChange={(page) => {
              setCurrent(page);
            }}
            pageSize={pageSize}
            total={data.length}
            itemRender={itemRender}
            paginationProps={{
              display: "flex",
              pos: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            colorScheme="red"
          />
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>rxcui</Th>
            <Th>severity</Th>
            <Th>sourceName</Th>
            <Th>tty</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((post, index) => (
            <Tr key={index}>
              <Td>{post.description}</Td>
              <Td>{post.id}</Td>
              <Td>{post.name}</Td>
              <Td>{post.rxcui}</Td>
              <Td>{post.severity}</Td>
              <Td>{post.sourceName}</Td>
              <Td>{post.tty}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default ConsumeApi;
