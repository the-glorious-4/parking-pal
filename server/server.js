const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { sendEmail, EmailTemplate } = require("./utils/mailer");

const stripe = require("stripe")(
  "sk_test_51InyxjLzbTTaQxk5V8hslPv0OK11QrVYOShDVOw38xxfhglJU3lIVxwbeq1Ogagc975c3tkzJNJzAScBA1HRE7xP00x5Jue5LM"
);

// const YOUR_DOMAIN = "http://localhost:3000/checkout"

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use(
  "/images",
  express.static(path.join(__dirname, "../client/src/images"))
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.post("/checkout", async (req, res) => {
  const formData = {
    name: "Yulduz",
    lastName: "Test",
    email: "yulduz83@gmail.com",
    reservationDetails: {
      date: "11/14/2021",
      address: "123 Pine Street, NY, 12345",
      stripeTransactionId: "ipi_1GtFmN2eZvKYlo2CBramsMXt",
      price: 2000,
    },
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Reservation Details",
            images: ["https://i.imgur.com/UfRvNq5.jpg"],
          },
          // todo: retrieve from request.body
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // Redirect to reservations page
    success_url: `http://localhost:3000/checkout?success=true`,
    // Redirect to search page
    cancel_url: `http://localhost:3000/checkout?canceled=true`,
  });

  sendEmail(EmailTemplate.BOOKING_CONFIRMATION_CONSUMER, formData);

  res.json({
    id: session.id,
  });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
