import express from "express"
import cors from "cors"
import { readFileSync, existsSync, writeFileSync } from "fs"

const port = 9000
const server = express()

const guestBookUrl = "/api/guestbook"
const dataGuestBook = "./guestbook.json"

if (!existsSync(dataGuestBook)) {
  writeFileSync(dataGuestBook, "[]", "utf8")
}
const guestBookEntries = JSON.parse(readFileSync(dataGuestBook))

server.use(cors())
server.use(express.json())
server.use((req, res, next) => {
  console.log(req.url)
  next()
})

// guestBookEntrie Example = {firstName: "Ulrike", surName: "Schmidt", email: "mike@ekim.de", message: "Hallo.", id: crypto.randomUUID()}

server.get(guestBookUrl, (_, res) => {
  console.log(guestBookEntries)
  return res.end(JSON.stringify(guestBookEntries))
})
server.post(guestBookUrl, (req, res) => {
  guestBookEntries.push(req.body)
  console.log(guestBookEntries)
  writeFileSync(dataGuestBook, JSON.stringify(guestBookEntries), "utf8")
  res.end()
})

server.listen(port, () => console.log("Server is running at port", port))
