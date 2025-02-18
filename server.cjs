const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use('/uploads', express.static('D:/upload'));

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});