
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

// Allow cross origin requests
app.use(cors());


mongoose.connect('mongodb+srv://kartikeya:dl3cb3544@cluster-1-innqm.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open',()=>{
    console.log("Connected to the DB");
})


app.use("/graphql",graphqlHTTP({
    schema : schema,
    graphiql : true
}))


app.listen(4000,()=>{
    console.log("App started on port 4000...");
});
