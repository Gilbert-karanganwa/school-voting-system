const express=require('express');
const port=3000;

const app=express();
app.use(require('cors')());

const advertiserRoutes=require("./routes/adviterserRoutes");
const electionRoutes=require("./routes/electionRoutes");
const candidateRoutes=require("./routes/candidateRoutes");
const winnercandidateRoutes = require("./routes/winnercandidateRoutes");

app.use(express.json());
app.use("/api/add",advertiserRoutes);
app.use("/api/add",electionRoutes);
app.use("/api/add",candidateRoutes);
app.use("/api/add", winnercandidateRoutes);


app.listen(port, () => {
  console.log(`SecureVote server running on http://localhost:${port}`);
});
