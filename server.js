var express = require("express");
const connectDB  = require('./config/db');
app = express();
app.use(express.json({extended: false}));
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("welcome to the adjustement sheet API");
});
app.use("/api/employee", require("./routes/api/employee"));
app.use("/api/adjustment", require("./routes/api/adjustment"));
app.use("/api/user", require("./routes/api/user"));

 connectDB();
app.listen(PORT, () => {
  console.log(`Server started on port` + PORT);
});

