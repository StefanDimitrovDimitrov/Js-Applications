function start() {
  document.getElementById("form").addEventListener("submit", createStudent);
}
start();

async function request(url, option) {
  const response = await fetch(url, option);
  if (response.ok != true) {
    const error = await response.json();
    alert(error.message);
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
}

async function getAllStudents() {
  const students = await request(
    "http://localhost:3030/jsonstore/collections/students"
  );

  const rows = Object.entries(students).map(createRow).join("");
  document.querySelector("tbody").innerHTML = rows;

  function createRow([id, students]) {
    const result = `
        <tr data-id="${students._id}">
            <td>${students.firstName}</td>
            <td>${students.lastName}</td>
            <td>${students.facultyNumber}</td>
            <td>${students.grade}</td>
        </tr>`;
    return result;
  }
}

async function createStudent(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const student = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    facultyNumber: formData.get("facultyNumber"),
    grade: Number(formData.get("grade")),
  };

  validateData(student);

  function validateData(student) {
    if (Object.values(student).includes("")) {
      alert("You should fill in all fields.");
      return;
    } else if (
      !isNaN(Number(student.firstName) && typeof student.firstName != "string")
    ) {
      alert("FirstName has to be a string.");
      return;
    } else if (
      !isNaN(Number(student.lastName) && typeof student.lastName != "string")
    ) {
      alert("LastName has to be a string.");
      return;
    } else if (
      isNaN(
        Number(student.facultyNumber) &&
          typeof student.facultyNumber != "string"
      )
    ) {
      alert("FacultyNumber has to be a number.");
      return;
    } else if (isNaN(student.grade)) {
      alert("Grade has to be a score.");
      return;
    }
  }

  await request("http://localhost:3030/jsonstore/collections/students", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  event.target.reset();
  getAllStudents();
}
