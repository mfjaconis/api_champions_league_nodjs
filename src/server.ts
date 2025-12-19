import createApp from "./app";

const app = createApp();
const port = process.env.PORT;

app.listen(port || 3001, () => {
  console.log(`🚀 Server running at port http://localhost:${port}!`);
});
