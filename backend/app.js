const express = require("express")
const bodyParser = require("body-parser")
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose")
const app = express()
const port = 9000

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  next()
})

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: graphqlSchema,
//     rootValue: graphqlResolvers,
//     graphiql: true,
//   })
// )

app.listen(port, () => {
  console.log("Server is running 🔥 ...")
})
