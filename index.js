import app from "./app.js";

const hostname = "0.0.0.0"
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port:${hostname}:${PORT}`)
);

export default app;
