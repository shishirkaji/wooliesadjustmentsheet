var express = require("express");
const connectDB = require("./config/db");
app = express();
const path = require('path');

app.use(express.json({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.send("welcome to the adjustement sheet API");
});
app.use("/api/comments" , require("./routes/api/comments"));
app.use("/api/employee", require("./routes/api/employee"));
app.use("/api/adjustment", require("./routes/api/adjustment"));
app.use("/api/user", require("./routes/api/user"));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// connect to db and listen on port
connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port` + PORT);
});
