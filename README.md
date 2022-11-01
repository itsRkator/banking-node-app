# NodeJs Banking App

- This project was generated with [Node.Js](https://github.com/nodejs/node) version v16.18.0 and MongoDB.

## Application setup
Install [Node.Js](https://nodejs.org/en/) v16+
Connect mongodb database and replace `<MONGODB_CONNECTION_URL>` in the app.js with your mongodb connection url.
Open Terminal/cmd and navigate to the root directory where the project is cloned.
Run `npm install` command to install all the dependencies.

## Development server

Run `npm run start:dev` for a dev server. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.



## Check API Call

Test api calls using Postman:

Create user:
  - Hit post api call at `localhost:3000/api/transactions/create` and pass the required body i.e.
    {
      "userId": "xyz@gmail.com",
      "userName": "abc xyz",
      "userDOB": "2000-02-06"
    }

Deposit Amount:
  - Hit put api call at `localhost:3000/api/transactions/deposit` and pass the required body i.e.
    {
      "userId": "xyz@gmail.com",
      "amount": 1000.88
    }

Withdraw Amount:
  - Hit put api call at `localhost:3000/api/transactions/withdraw` and pass the required body i.e.
    {
      "userId": "xyz@gmail.com",
      "amount": 110.67
    }

Get all account details:
  - Hit put api call at `localhost:3000/api/transactions`


### Note: For more clarity  please see the demo screenshots available in the images folder.
