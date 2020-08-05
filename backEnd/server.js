const express = require("express");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const uri = process.env.DATABASE_URI;
const client = new mongodb.MongoClient(uri, { useUnifiedTopology: true });

client.connect(function () {
  const db = client.db("sample_airbnb");
  const collection = db.collection("listingsAndReviews");

  app.get("/", (req, res) => {
    res.send("<h2>You can search the rooms now!</h2>");
  });

  app.get("/search/room", (req, res, next) => {
    const { name, summary } = req.query;
    if (
      (name === undefined || name === "") &&
      (summary === undefined || summary === "")
    ) {

      return next(`please specify name or summery in your query parameter`);
    }

    const searchObject =
      (name !== undefined && {
        name: new RegExp(` ${name} `),
      }) ||
      (summary !== undefined && {
        summary: new RegExp(` ${summary} `),
      });


    console.log("");
    console.log(searchObject);

    collection.find(searchObject).toArray(function (error, data) {
      res.send(error || data);
    });
  });

  app.get("/search/price", (req, res, next) => {
  
    const { from, to } = req.query;

    if (
      (from === undefined || from === "") &&
      (to === undefined || to === "")
    ) {
      return next(
        `please specify "from" price or "to" price in your query parameter`
      );
    }

    const searchObject = {
      price: {
        $gte: from == undefined ? 0 : Number(from),
        $lt: to == undefined ? 0 : Number(to),
      },
    };


    console.log(searchObject);

    collection.find(searchObject).toArray(function (error, data) {
      res.send(error || data);
    });
  });
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
