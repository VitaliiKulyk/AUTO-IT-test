import express from "express";
const app = express();
const port = 3006;

app.get("/test", (req, res) => {
  res.send("GET. Test endpoint. OK.");
});

app.post("/test", (req, res) => {
  res.send("POST. Test endpoint. OK.");
});

app.post("/invoice/process", (req, res) => {
  console.log(req);
  res.send("POST. processprocessprocessprocessprocessprocessprocess");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
