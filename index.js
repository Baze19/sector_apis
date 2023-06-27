import app from "./app.js";

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port:${PORT}`)
);

export default app;
