const express = require('express');

const port = 8080;
const app = express();




app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
