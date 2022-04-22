const express = require("express")
const config = require("./config.js")
const app = express()
const cors = require("cors")
app.use(cors())
// This is your test secret API key.
const stripe = require("stripe")(config.UK_STRIPE)

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   )
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888")

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   )
//   next()
// })
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT, POST, OPTIONS, DELETE, PATCH",
}

app.use(cors(corsOptions))
app.use(express.static("public"))
app.use(express.json())

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400
}

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})

// app.listen(4242, () => console.log("Node server listening on port 4242!"))
app.listen(config.PORT, config.HOST, function () {
  console.log(`Node server listening on port:${config.PORT}!`)
})
