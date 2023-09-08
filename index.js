import express from "express"
import cors from "cors"

const port = 9000
const server = express()

const guestBookUrl = "/api/guestbook"
const guestBookEntries = []

server.use(cors())
server.use(express.json())
server.use((req, res, next) => {
  console.log(req.url)
  next()
})

// guestBookEntrie Example = {firstName: "Ulrike", surName: "Schmidt", email: "mike@ekim.de", message: "Hallo.", id: crypto.randomUUID()}

server.get(guestBookUrl, (_, res) => {
  return res.end(JSON.stringify(guestBookEntries))
})
server.post(guestBookUrl, (req, res) => {
  guestBookEntries.push(req.body)
  console.log(guestBookEntries)
  res.end()
})

server.listen(port, () => console.log("Server is running at port", port))
