## User Credentials

-   username: admin
-   passowrd: admin12345

## Run Client

-   cd client
-   npm i
-   npm start

## Run Server (maven needs to be installed)

-   cd server
-   mvn spring-boot:run

## All endpoints

-   GET /api/v1/prescription
-   POST /api/create
```
    {
        name: "Seemanto",
        age: 25,
        gender: "male",
        diagnosis: "covid",
        medications: "pfizer",
        prescriptionDate: "10-01-2022",
        nextVisitDate: "15-01-2022",
    }
```
-   GET /api/prescription/{id}
-   PUT /api/update/{id}
-   DELETE /api/delete/{id}
