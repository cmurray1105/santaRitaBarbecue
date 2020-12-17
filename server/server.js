const express = require('express');
const app = express();
const path = require('path');
const PORT = '8008'


app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json())


app.listen(PORT, () => {
  console.log(`server is CONNECTED on PORT:${PORT}`);
});
