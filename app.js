const express = require("express");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "60ea33ea37840f6b1d850f0795982230-us21",
  server: "us21",
});

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const response = await client.lists.addListMember("1e369a79bd", {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
  });
  res.render("response", { response: `You have successfully subscribed !!` });
});

app.listen(port, () => {
  console.log("App Started On : http://localhost:3000");
});
