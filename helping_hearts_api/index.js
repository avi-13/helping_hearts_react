const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multiparty = require("connect-multiparty");
const cloudinary = require("cloudinary");
const connectDB = require("./database/db");

const app = express();
dotenv.config();


connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running!! on ${PORT}`);
});

const corsPolicy = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsPolicy));
app.use(multiparty());

// user routes
app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/admin", require("./routes/"))

// bloodBank routes
app.use("/api/org", require("./routes/organizationRoutes"));

// bloodBank routes
app.use("/api/hospital", require("./routes/hospitalRoutes"));

// add request server
app.use("/api/donation", require("./routes/donationRoute"));

app.use("/api/req_bb", require("./routes/requestForBBRoute"));

app.use("/api/contact", require("./routes/contactRoutes"));

app.use("/api/campaign", require("./routes/campaignRoutes"));

app.use("/api/registered_users", require("./routes/registeredUsersRoutes"));

module.exports = {
  connectDB,
};
module.exports = app;
