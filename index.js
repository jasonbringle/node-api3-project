const server = require("./server.js")

const port = 5000;

server.listen(port, () => {
  console.log('\n*** Server Running on http://localhost:5000 ***\n');
});