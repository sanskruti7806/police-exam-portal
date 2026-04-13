const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Load student data
const dataPath = path.join(__dirname, "students.json");

function loadStudents() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// Login API
app.post("/login", (req, res) => {
  const { id, password } = req.body;
  const students = loadStudents();

  const student = students.find(
    s => s.id === id && s.password === password
  );

  if (!student) {
    return res.json({ success: false });
  }

  const map_link = `https://www.google.com/maps?q=${student.lat},${student.lng}`;

  res.json({
  success: true,
  name: student.name,
  seat_no: student.seat_no,
  dob: student.dob,
  exam_date: student.exam_date,
  center_name: student.center_name,
  address: student.address,
  timing: student.timing,
  map_link
});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});