<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>replit</title>
  <link href="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

  <style>
    #loading {
      display: none;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  </style>

</head>

<body>

  <header>

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Student Management</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link " aria-current="page" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="studentList.html">Student List</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " href="addStudent.html">Add Student</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>

  </header>


  <main>

    <section class="py-4">
      <div class="container">
        <h2 class="display-5 fw-medium">Student List</h2>

        <div id="loading" class="bg-primary-subtle fs-6 fw-medium p-2 rounded text-center">Loading...</div>

        <div class="mt-3">
          <form>
            <label class="form-label fs-6 fw-normal">Filter by Gender:</label>
            <select id="selectGender" class="form-select">
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </form>
        </div>


        <div>
          <ul id="studentsList" class="list-group my-3">

          </ul>
        </div>

      </div>
    </section>

  </main>



  <script>

    const studentsList = document.querySelector('#studentsList')
    const apiUrl = 'https://student-management-Student-neog.replit.app/students'
    const loading = document.querySelector('#loading')
    const selectGender = document.querySelector('#selectGender')

    function getStudentList() {
      studentsList.innerHTML = ""
      loading.style.display = "block"

      fetch(apiUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          if (data) {

            generateStudentList(data)

          } else {
            studentsList.textContent = "Failed to load student list"
            studentsList.style.color = "red"
          }
        })
        .catch(function (error) {
          studentsList.textContent = "Error!! Not Getting Response."
          studentsList.style.color = "red"
        })

    }



    function generateStudentList(data) {
      loading.style.display = "none"
      for (let i = 0; i < data.length; i++) {

        const liElement = document.createElement('li')
        liElement.className = "list-group-item p-3 "

        liElement.innerHTML = `${data[i].name} - Grade: ${data[i].grade} - Age: ${data[i].age} - Attendence: ${data[i].attendence} - Gender: ${data[i].gender} - Marks: ${data[i].marks} <button class="btn btn-danger float-end" id="deleteBtn" data-id ="${data[i]._id}">Delete</button>`

        studentsList.appendChild(liElement)
      }

      const deleteButtons = document.querySelectorAll('#deleteBtn')
      for (let i = 0; i < deleteButtons.length; i++) {

        deleteButtons[i].addEventListener('click', function (event) {

          const studentId = event.target.getAttribute('data-id')
          const apiDeleteUrl = `https://student-management-Student-neog.replit.app/students/${studentId}`

          fetch(apiDeleteUrl, {
            method: 'DELETE'
          })
            .then(function (response) {
              return response.json()
            })
            .then(function (data) {
              if (data) {
                getStudentList()
              }
            })

        })
      }
    }


    selectGender.addEventListener('change', function () {

      const selectedGender = selectGender.value;

      loading.style.display = "block"

      studentsList.innerHTML = ""

      fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {

          if (data) {
            if (selectedGender == "All") {
              loading.style.display = "none"
              generateStudentList(data);
            }
            else {
              const filteredData = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].gender === selectedGender) {
                  filteredData.push(data[i]);
                }
              }

              loading.style.display = "none"
              generateStudentList(filteredData);

            }
          }

        })

        .catch(function (error) {
          studentsList.textContent = "Error!! in filtering data.";
        });
    });


    getStudentList()

  </script>

  <script src="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
