const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const sql = require("./db.js");

const path = "COM5";

const port = new SerialPort(path, {
  baudRate: 115200,
});
const parser = port.pipe(new Readline());

var latestTimes = [1.02, 2.55, 9.87];
var raceId = "abc";
var racers = Array(3).fill(null);

async function generateRaceId() {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let generatedRaceId = Array(8)
    .fill(42)
    .reduce((acc) => {
      return acc + charset[Math.floor(Math.random() * charset.length)];
    }, "");
  if (
    sql.query("SELECT `id`, `time` FROM `times` WHERE raceId=?", [
      generatedRaceId,
    ]).length
  )
    return generatedRaceId();
  return generatedRaceId;
}

port.on("error", () => console.log("Couldn't open serial port"));
parser.on("data", async (line) => {
  // Send raceId to arduino when asked
  if (line === "*") port.write((await generateRaceId()) + "\n");

  let splitString = line.split(",");
  [raceId] = splitString;
  latestTimes = splitString.slice(1).map((x) => parseFloat(x));

  await Promise.all(
    racers.map(async (studentMail, index) => {
      if (!studentMail || latestTimes[index] === null) return;
      await sql.query(
        "INSERT INTO `times` (`student_mail`,`time`,`raceId`) VALUES (?,?,?);",
        [studentMail, assignedTimes[index], raceId]
      );
      latestTimes[index] = null;
    })
  );
  racers = racers.fill(null);
});

function getLatestTimes() {
  return latestTimes;
}

function clearLatestTime(index) {
  latestTimes[index] = null;
}

function getRaceId() {
  return raceId;
}

function joinRace(index, email) {
  if (racers[index]) return false;
  racers[index] = email;
  return true;
}

module.exports = {
  getLatestTimes,
  clearLatestTime,
  getRaceId,
  joinRace,
};
