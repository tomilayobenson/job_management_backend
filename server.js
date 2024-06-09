const express = require('express');
const jobsRouter = require('./routes/jobs')
const app = express();
const port = 3000;


//parse JSON bodies
app.use(express.json());
app.use('/jobs',jobsRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
