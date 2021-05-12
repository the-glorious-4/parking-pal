const express = require("express");

// const { ApolloServer } = require('apollo-server-express');
const path = require("path");
const { send } = require("process");

// const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');
const db = require("./config/connection");

const { sendEmail, EMAIL_TEMPLATE } = require("./utils/mailer");

const PORT = process.env.PORT || 3001;
const app = express();
// const server = new ApolloServer({
// //   typeDefs,
// //   resolvers,
// //   context: authMiddleware
// });

// server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dummyData = {
  name: "Yulduz",
  lastName: "Test",
  email: "yulduz83@gmail.com",
  reservationDetails: {
    date: "11/14/2021",
    address: "123 Pine Street, NY, 12345",
  },
};
// sendEmail(EMAIL_TEMPLATE.BOOKING_CONFIRMATION_CONSUMER, dummyData);

// Serve up static assets
// app.use(
//   "/images",
//   express.static(path.join(__dirname, "../client/public/images"))
// );

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
