import { app } from "./app";
import dbconnect from "./db/dbconnect";

const port = process.env.PORT || 3000;

dbconnect();
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);