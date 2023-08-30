import http, { IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs/promises";
import redirects from "./redirects";

const host = "localhost";
const port = 8000;
const faviconPaths = [
  "/apple-touch-icon-precomposed.png",
  "/apple-touch-icon.png",
];

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const [id] = url.hostname.split(".");
  console.log(url.toString());

  // serve custom favicon
  if (faviconPaths.includes(url.pathname)) {
    const favicon = await readFile(`favicons/${id}.png`);
    res.writeHead(200);
    res.end(favicon);
    return;
  }

  if (redirects.has(id)) {
    res.writeHead(302, {
      Location: redirects.get(id),
    });
    res.end();
    return;
  }

  res.writeHead(404);
  res.end();
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
