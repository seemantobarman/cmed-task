import {
    Box,
    Button,
    Center,
    Container,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import axios from "axios";

function AddPrescription() {
    const [gender, setGender] = useState("male");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [medications, setMedications] = useState("");
    const [prescriptionDate, setPrescriptionDate] = useState("");
    const [nextVisitDate, setNextVisitDate] = useState("");

    const handleSave = () => {
        console.log(name);
        console.log(age);
        console.log(diagnosis);
        console.log(gender);
        console.log(medications);

        const FormattedPD = moment(prescriptionDate, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
        );
        const FormattedNVD = moment(nextVisitDate, "YYYY-MM-DD").format(
            "DD-MM-YYYY"
        );

        console.log(FormattedPD);
        console.log(FormattedNVD);

        axios
            .post(`http://localhost:8080/api/create`, {
                name,
                age,
                gender,
                diagnosis,
                medications,
                prescriptionDate: FormattedPD,
                nextVisitDate: FormattedNVD,
            })
            .then(function(response) {
                console.log(response);
                alert("Success");
            })
            .catch(function(error) {
                console.log(error);
                alert("Error");
            });
    };

    return (
        <Container maxW={{ sm: "container.md" }}>
            <Box shadow="lg" padding="40px">
                <Input
                    placeholder="Paitent Name"
                    size="md"
                    mt="5px"
                    mb="5px"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    placeholder="Paitent Age"
                    size="md"
                    mt="5px"
                    mb="5px"
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <RadioGroup
                    onChange={setGender}
                    value={gender}
                    mt="5px"
                    mb="5px"
                    size="md"
                    required
                >
                    <Stack direction="row">
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="other">Other</Radio>
                    </Stack>
                </RadioGroup>
                <Input
                    placeholder="Diagnosis"
                    size="md"
                    mt="5px"
                    mb="5px"
                    required
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                />
                <Input
                    placeholder="Medications"
                    size="md"
                    mt="5px"
                    mb="5px"
                    required
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                />

                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Text mr="50px">Prescription Date: </Text>
                    <Input
                        placeholder="Date"
                        size="md"
                        mt="5px"
                        mb="5px"
                        type="date"
                        w="70%"
                        required
                        value={prescriptionDate}
                        onChange={(e) => setPrescriptionDate(e.target.value)}
                    />
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Text mr="50px">Next Visit: </Text>
                    <Input
                        placeholder="Date"
                        size="md"
                        mt="5px"
                        mb="5px"
                        type="date"
                        w="70%"
                        required
                        value={nextVisitDate}
                        onChange={(e) => setNextVisitDate(e.target.value)}
                    />
                </Box>

                <Center>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        w="200px"
                        onClick={handleSave}
                        isDisabled={
                            !name ||
                            !age ||
                            !diagnosis ||
                            !gender ||
                            !medications ||
                            !prescriptionDate ||
                            !nextVisitDate
                        }
                    >
                        Save
                    </Button>
                </Center>
            </Box>
        </Container>
    );
}

export default AddPrescription;
