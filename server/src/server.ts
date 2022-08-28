import { app } from "./app";
import dbconnect from "./db/dbconnect";

const port = process.env.PORT || 7070;

dbconnect();
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);