import { Hono } from "hono";

const app = new Hono();

let prosjekter = []; // Tom liste for prosjekter

app.get("/prosjekter", (c) => {
  return c.json({ prosjekter });
});

app.post("/opprett-prosjekt", async (c) => {
  const prosjekt = await c.req.json();
  prosjekt.id = prosjekter.length + 1; // Enkel ID-generering
  prosjekter.push(prosjekt);
  return c.json(prosjekt, 201);
});

app.listen(3000);
