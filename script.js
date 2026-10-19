// ===============================
// TOPEX STUDENT MANAGEMENT SYSTEM
// ===============================

// O'QITUVCHILAR — 80 TA ISM-FAMILIYA
const teacherNames = [
  "Egamberdiyev Bahodir", "Valiyev Jamshidbek",
  "Abdullayev Azizbek", "Karimova Madina",
  "Ismoilov Sardor", "Rasulova Dilnoza",
  "Tursunov Bekzod", "Qodirova Sevara",
  "Nazarov Shoxrux", "Yusupova Malika",
  "Aliyev Doston", "Sobirova Nilufar",
  "Xolmatov Jasur", "Ergasheva Mohira",
  "Usmonov Akmal", "Saidova Zilola",
  "Mamatqulov Bobur", "Olimova Shahnoza",
  "Rahimov Oybek", "Toirova Maftuna",
  "Mirzayev Sanjar", "Hasanova Gulnoza",
  "Karimova Aziza", "Abdullayev Ibrohim",
  "Sattorov Umid", "Raximova Munisa",
  "Jo'rayev Asadbek", "Nazarova Durdona",
  "Toshmatov Farrux", "Qosimova Sabina",
  "Bekmurodov Miraziz", "Soliyeva Rayhona",
  "Mahmudov Temurbek", "Yuldasheva Sitora",
  "Oripov Muhammadali", "Iskandarova Mubina",
  "Saidov Abdulloh", "Norboyeva Farangiz",
  "Eshonqulov Javohir", "Tursunova Shahzoda",
  "Abduqodirov Islom", "Xudoyberdiyeva Aziza",
  "Rasulov Sanjar", "Murodova Muslima",
  "Sobirov Asadbek", "Hamidova Durdona",
  "Qurbonov Ibrohim", "Toxtayeva Gulnoza",
  "Mirzayev Bekzod", "Yoldosheva Maftuna",
  "Ismoilov Javohir", "Karimova Sitora",
  "Abdullayev Farrux", "Saidova Rayhona",
  "Nazarov Muhammadali", "Olimova Munisa",
  "Tursunov Miraziz", "Rahimova Shahnoza",
  "Aliyev Temurbek", "Qodirova Farangiz",
  "Usmonov Ibrohim", "Sobirova Aziza",
  "Xolmatov Sanjar", "Ergasheva Malika",
  "Mamatqulov Islom", "Yusupova Durdona",
  "Toirov Akmal", "Sattorova Nilufar",
  "Mahmudov Bobur", "Hasanova Sevara",
  "Oripov Oybek", "Iskandarova Mohira",
  "Jorayev Doston", "Norboyeva Zilola",
  "Bekmurodov Asadbek", "Soliyeva Shahzoda",
  "Qosimov Umid", "Hamidova Madina",
  "Abduqodirov Sardor", "Xudoyberdiyeva Maftuna"
];

// TALABALAR UCHUN ISM VA FAMILIYALAR
const studentFirstNames = [
  "Azizbek", "Madina", "Jasurbek", "Dilnoza",
  "Sardor", "Sevara", "Bekzod", "Malika",
  "Doston", "Nilufar", "Shoxrux", "Mohira",
  "Javohir", "Zilola", "Muhammadali", "Shahnoza",
  "Oybek", "Maftuna", "Bobur", "Muslima",
  "Akmal", "Gulnoza", "Islom", "Rayhona",
  "Abdulloh", "Durdona", "Temurbek", "Shahzoda",
  "Asadbek", "Mubina", "Farrux", "Farangiz",
  "Ibrohim", "Munisa", "Miraziz", "Aziza",
  "Sanjar", "Sabina", "Umid", "Sitora"
];

const studentLastNames = [
  "Abdullayev", "Karimova", "Ismoilov", "Rasulova",
  "Tursunov", "Qodirova", "Nazarov", "Yusupova",
  "Aliyev", "Sobirova", "Xolmatov", "Ergasheva",
  "Usmonov", "Saidova", "Mamatqulov", "Olimova",
  "Rahimov", "Toirova", "Mirzayev", "Hasanova",
  "Sattorov", "Jorayeva", "Mahmudov", "Yuldasheva",
  "Oripov", "Iskandarova", "Norboyev", "Bekmurodova",
  "Soliyev", "Hamidova"
];

// 80 TA O'QITUVCHI YARATISH
const teachers = Array.from({ length: 80 }, (_, i) => ({
  id: i + 1,
  name: teacherNames[i],
  login:
    i === 0 ? "bahodir" :
    i === 1 ? "jamshid" :
    `teacher${String(i + 1).padStart(2, "0")}`,
  group: (i % 8) + 1
}));

// 160 TA TALABA YARATISH
const students = Array.from({ length: 160 }, (_, i) => ({
  id: i + 1,
  name: `${studentLastNames[i % studentLastNames.length]} ${
    studentFirstNames[
      (i * 7 + Math.floor(i / studentLastNames.length) * 3) %
      studentFirstNames.length
    ]
  }`,
  login: `talaba${String(i + 1).padStart(3, "0")}`,
  group: Math.floor(i / 20) + 1,
  attendance: "Keldi",
  participation: "Qatnashdi",
  grade: 4,
  active: "Faol",
  paid: false
}));

// TAKRORLANUVCHI ISM-FAMILIYALARNI OLDINI OLISH
const usedNames = new Set();

students.forEach((student, i) => {
  let attempt = 0;

  while (usedNames.has(student.name)) {
    attempt++;

    student.name =
      `${studentLastNames[(i + attempt * 11) % studentLastNames.length]} ` +
      `${studentFirstNames[(i * 7 + attempt * 13) % studentFirstNames.length]}`;
  }

  usedNames.add(student.name);
});

// TIZIM HOLATI
let role = "";
let currentLogin = "";
let section = "overview";
let selectedGroup = 1;

const stateKey = "topex-demo-state-v2";

// OLDINGI SAQLANGAN BAHO VA TO'LOVLARNI TIKLASH
try {
  const saved = JSON.parse(localStorage.getItem(stateKey) || "{}");

  if (saved.students) {
    students.forEach((student, i) => {
      const old = saved.students[i];

      if (old) {
        ["attendance", "participation", "grade", "active", "paid"]
          .forEach(key => {
            if (old[key] !== undefined) {
              student[key] = old[key];
            }
          });
      }
    });
  }
} catch (error) {
  console.log("Saqlangan ma'lumot topilmadi.");
}

const $ = id => document.getElementById(id);

// MA'LUMOTLARNI SAQLASH
function save() {
  localStorage.setItem(stateKey, JSON.stringify({ students }));
  updateStats();
}

// TO'LOV HISOBI
function updateStats() {
  const unpaidCount = $("unpaidCount");

  if (unpaidCount) {
    unpaidCount.textContent =
      students.filter(student => !student.paid).length;
  }
}

// XABAR CHIQARISH
function toast(message) {
  const element = $("toast");

  element.textContent = message;
  element.classList.remove("hidden");

  clearTimeout(window.topexToastTimer);

  window.topexToastTimer = setTimeout(() => {
    element.classList.add("hidden");
  }, 2500);
}

// DEMO LOGINLARNI TO'LDIRISH
function demoFill() {
  const selectedRole = $("loginRole").value;

  const login =
    selectedRole === "admin" ? "jadra" :
    selectedRole === "teacher" ? "bahodir" :
    "talaba001";

  $("loginName").value = login;
  $("loginPass").value = login;
}

// TIZIMGA KIRISH
function login() {
  const selectedRole = $("loginRole").value;
  const loginValue = $("loginName").value.trim().toLowerCase();
  const password = $("loginPass").value.trim();

  let valid = false;

  if (selectedRole === "admin") {
    valid = loginValue === "jadra" && password === "jadra";
  }

  if (selectedRole === "teacher") {
    const teacher = teachers.find(t => t.login === loginValue);
    valid = !!teacher && password === teacher.login;
  }

  if (selectedRole === "student") {
    const student = students.find(s => s.login === loginValue);
    valid = !!student && password === student.login;
  }

  if (!valid) {
    toast("Login yoki parol noto‘g‘ri!");
    return;
  }

  role = selectedRole;
  currentLogin = loginValue;
  section = "overview";

  $("loginView").classList.add("hidden");
  $("dashboard").classList.remove("hidden");

  $("who").textContent =
    (role === "admin" ? "ADMIN" :
     role === "teacher" ? "O‘QITUVCHI" : "TALABA") +
    " · " + currentLogin;

  buildNav();
  render();
}

// TIZIMDAN CHIQISH
function logout() {
  role = "";
  currentLogin = "";
  section = "overview";

  $("dashboard").classList.add("hidden");
  $("loginView").classList.remove("hidden");
  $("loginPass").value = "";
}

// CHAP MENYU
function buildNav() {
  const items = role === "admin"
    ? [
        ["overview", "◈ Umumiy ko‘rinish"],
        ["payments", "＄ To‘lovlar"],
        ["students", "♙ Talabalar"],
        ["teachers", "♧ O‘qituvchilar"],
        ["groups", "▦ Guruhlar"]
      ]
    : role === "teacher"
    ? [
        ["overview", "◈ Umumiy ko‘rinish"],
        ["students", "♙ Mening guruhim"]
      ]
    : [
        ["overview", "◈ Mening sahifam"]
      ];

  $("nav").innerHTML = items.map(([id, label]) => `
    <button
      class="${section === id ? "active" : ""}"
      data-section="${id}">
      ${label}
    </button>
  `).join("");

  $("nav").querySelectorAll("[data-section]").forEach(button => {
    button.addEventListener("click", () => {
      section = button.dataset.section;
      buildNav();
      render();
    });
  });
}

// ASOSIY SAHIFANI CHIZISH
function render() {
  const content = $("content");

  updateStats();

  // TALABA SHAXSIY KABINETI
  if (role === "student") {
    const student = students.find(s => s.login === currentLogin);

    content.innerHTML = `
      <div class="panel">
        <h2>Salom, ${student.name}!</h2>
        <p>Login: ${student.login}</p>
        <p>Guruh: ${student.group}-guruh</p>

        <div class="stats">
          <div class="stat">
            <span>Davomat</span>
            <strong>${student.attendance}</strong>
          </div>

          <div class="stat">
            <span>Faollik</span>
            <strong>${student.active}</strong>
          </div>

          <div class="stat">
            <span>Baho</span>
            <strong>${student.grade}/5</strong>
          </div>

          <div class="stat">
            <span>To‘lov</span>
            <strong>${student.paid ? "To‘langan" : "To‘lanmagan"}</strong>
          </div>
        </div>
      </div>
    `;

    return;
  }

  // UMUMIY KO'RINISH
  if (section === "overview") {
    content.innerHTML = `
      <div class="panel">
        <h2>
          ${role === "admin" ? "Boshqaruv paneli" : "O‘qituvchi paneli"}
        </h2>

        <p class="muted">
          Qora fon · Oltin neon · 5 ballik baholash
        </p>

        <div class="gold-line"></div>

        <div class="row">
          <span class="pill">8 ta guruh</span>
          <span class="pill">Har guruhda 20 talaba</span>
          <span class="pill">80 o‘qituvchi</span>
        </div>

        <p>Kerakli bo‘limni chap menyudan tanlang.</p>
      </div>

      <div class="panel">
        <h3>Tezkor amallar</h3>

        <div class="row">
          <button id="goStudents">Davomat va baholar</button>

          ${role === "admin"
            ? '<button id="goPayments">To‘lovlarni ko‘rish</button>'
            : ""}
        </div>
      </div>
    `;

    $("goStudents").onclick = () => {
      section = "students";
      buildNav();
      render();
    };

    if ($("goPayments")) {
      $("goPayments").onclick = () => {
        section = "payments";
        buildNav();
        render();
      };
    }

    return;
  }

  // ADMIN TO'LOVLARI
  if (section === "payments" && role === "admin") {
    content.innerHTML = `
      <div class="panel">
        <div class="row space">
          <h2>Talabalar to‘lovlari</h2>

          <input
            class="search"
            id="filter"
            placeholder="Ism-familiya yoki login qidirish">
        </div>

        <p class="note">
          To‘lovlarni faqat admin o‘zgartira oladi.
        </p>

        <div id="tableSlot"></div>
      </div>
    `;

    $("filter").addEventListener("input", renderTable);
    renderTable();
    return;
  }

  // O'QITUVCHILAR RO'YXATI
  if (section === "teachers" && role === "admin") {
    content.innerHTML = `
      <div class="panel">
        <h2>O‘qituvchilar ro‘yxati</h2>

        <div class="tablewrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ism-familiya</th>
                <th>Login</th>
                <th>Guruh</th>
              </tr>
            </thead>

            <tbody>
              ${teachers.map(t => `
                <tr>
                  <td>${t.id}</td>
                  <td>${t.name}</td>
                  <td>${t.login}</td>
                  <td>${t.group}-guruh</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    return;
  }

  // GURUHLAR
  if (section === "groups" && role === "admin") {
    content.innerHTML = `
      <div class="panel">
        <h2>Guruhlar</h2>

        <div class="tabs">
          ${Array.from({ length: 8 }, (_, i) => `
            <button data-group="${i + 1}">
              ${i + 1}-guruh
            </button>
          `).join("")}
        </div>

        <div id="groupSlot"></div>
      </div>
    `;

    content.querySelectorAll("[data-group]").forEach(button => {
      button.addEventListener("click", () => {
        selectedGroup = Number(button.dataset.group);
        renderGroup();
      });
    });

    renderGroup();
    return;
  }

  // TALABALAR VA O'QITUVCHI GURUHI
  if (section === "students") {
    const teacher = teachers.find(t => t.login === currentLogin);

    const group = role === "teacher"
      ? teacher.group
      : selectedGroup;

    content.innerHTML = `
      <div class="panel">
        <div class="row space">
          <div>
            <h2>
              ${role === "teacher"
                ? "Menga biriktirilgan guruh"
                : "Talabalar va natijalar"}
            </h2>

            <p class="muted">${group}-guruh</p>
          </div>

          ${role === "admin" ? `
            <select id="groupSelect">
              ${Array.from({ length: 8 }, (_, i) => `
                <option
                  value="${i + 1}"
                  ${selectedGroup === i + 1 ? "selected" : ""}>
                  ${i + 1}-guruh
                </option>
              `).join("")}
            </select>
          ` : ""}

          <input
            class="search"
            id="studentFilter"
            placeholder="Ism-familiya yoki login qidirish">
        </div>

        <div id="studentSlot"></div>
      </div>
    `;

    if ($("groupSelect")) {
      $("groupSelect").addEventListener("change", () => {
        selectedGroup = Number($("groupSelect").value);
        renderStudentList();
      });
    }

    $("studentFilter").addEventListener("input", renderStudentList);

    renderStudentList();
  }
}

// GURUH TALABALARINI CHIQARISH
function renderStudentList() {
  const slot = $("studentSlot");
  if (!slot) return;

  const teacher = teachers.find(t => t.login === currentLogin);

  const group = role === "teacher"
    ? teacher.group
    : selectedGroup;

  const query = ($("studentFilter")?.value || "").toLowerCase();

  const list = students.filter(student =>
    student.group === group &&
    `${student.name} ${student.login}`.toLowerCase().includes(query)
  );

  slot.innerHTML = `
    <div class="studentgrid">
      ${list.map(student => `
        <div class="studentcard">
          <div class="row space">
            <b>${student.name}</b>
            <span class="pill">${student.group}-guruh</span>
          </div>

          <p class="muted">Login: ${student.login}</p>

          <div class="row">
            <select
              aria-label="Davomat"
              data-field="attendance"
              data-id="${student.id}">
              <option ${student.attendance === "Keldi" ? "selected" : ""}>
                Keldi
              </option>
              <option ${student.attendance === "Kelmadi" ? "selected" : ""}>
                Kelmadi
              </option>
            </select>

            <select
              aria-label="Qatnashish"
              data-field="participation"
              data-id="${student.id}">
              <option ${student.participation === "Qatnashdi" ? "selected" : ""}>
                Qatnashdi
              </option>
              <option ${student.participation === "Qatnashmadi" ? "selected" : ""}>
                Qatnashmadi
              </option>
            </select>
          </div>

          <div class="row">
            <select
              aria-label="Baho"
              data-field="grade"
              data-id="${student.id}">
              ${[1, 2, 3, 4, 5].map(number => `
                <option
                  value="${number}"
                  ${student.grade === number ? "selected" : ""}>
                  Baho: ${number}
                </option>
              `).join("")}
            </select>

            <select
              aria-label="Faollik"
              data-field="active"
              data-id="${student.id}">
              <option ${student.active === "Faol" ? "selected" : ""}>
                Faol
              </option>
              <option ${student.active === "Faol emas" ? "selected" : ""}>
                Faol emas
              </option>
            </select>
          </div>

          ${role === "admin" ? `
            <div class="row">
              <span class="pill">
                To‘lov: ${student.paid ? "To‘langan" : "To‘lanmagan"}
              </span>

              <button
                class="tiny"
                data-pay="${student.id}">
                To‘lov holatini almashtirish
              </button>
            </div>
          ` : ""}
        </div>
      `).join("")}
    </div>
  `;

  slot.querySelectorAll("[data-field]").forEach(element => {
    element.addEventListener("change", () => {
      const id = Number(element.dataset.id);
      const field = element.dataset.field;

      const value = field === "grade"
        ? Number(element.value)
        : element.value;

      changeStudent(id, field, value);
    });
  });

  slot.querySelectorAll("[data-pay]").forEach(button => {
    button.addEventListener("click", () => {
      const student = students.find(
        s => s.id === Number(button.dataset.pay)
      );

      changeStudent(student.id, "paid", !student.paid);
    });
  });
}

// ADMIN TO'LOVLAR JADVALI
function renderTable() {
  const slot = $("tableSlot");
  if (!slot) return;

  const query = ($("filter")?.value || "").toLowerCase();

  const list = students.filter(student =>
    `${student.name} ${student.login}`.toLowerCase().includes(query)
  );

  slot.innerHTML = `
    <div class="tablewrap">
      <table>
        <thead>
          <tr>
            <th>Talaba ism-familiyasi</th>
            <th>Guruh</th>
            <th>Login</th>
            <th>To‘lov holati</th>
            <th>Amal</th>
          </tr>
        </thead>

        <tbody>
          ${list.map(student => `
            <tr>
              <td>${student.name}</td>
              <td>${student.group}-guruh</td>
              <td>${student.login}</td>
              <td>
                <span class="pill ${student.paid ? "good" : "bad"}">
                  ${student.paid ? "To‘langan" : "To‘lanmagan"}
                </span>
              </td>
              <td>
                <button
                  class="tiny"
                  data-pay="${student.id}">
                  ${student.paid
                    ? "To‘lanmagan qilish"
                    : "To‘langan qilish"}
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  slot.querySelectorAll("[data-pay]").forEach(button => {
    button.addEventListener("click", () => {
      const student = students.find(
        s => s.id === Number(button.dataset.pay)
      );

      changeStudent(student.id, "paid", !student.paid);
    });
  });
}

// GURUH MA'LUMOTLARI
function renderGroup() {
  const slot = $("groupSlot");
  if (!slot) return;

  const list = students.filter(
    student => student.group === selectedGroup
  );

  slot.innerHTML = `
    <h3>${selectedGroup}-guruh · ${list.length} talaba</h3>

    <div class="tablewrap">
      <table>
        <thead>
          <tr>
            <th>Ism-familiya</th>
            <th>Davomat</th>
            <th>Qatnashish</th>
            <th>Baho</th>
            <th>Faollik</th>
            <th>To‘lov</th>
          </tr>
        </thead>

        <tbody>
          ${list.map(student => `
            <tr>
              <td>${student.name}</td>
              <td>${student.attendance}</td>
              <td>${student.participation}</td>
              <td>${student.grade}/5</td>
              <td>${student.active}</td>
              <td>${student.paid ? "To‘langan" : "To‘lanmagan"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// TALABA MA'LUMOTINI O'ZGARTIRISH
function changeStudent(id, key, value) {
  if (role === "teacher" && key === "paid") {
    toast("To‘lovni faqat admin boshqaradi!");
    return;
  }

  if (role !== "admin" && role !== "teacher") {
    toast("Bu amal uchun ruxsat yo‘q!");
    return;
  }

  const student = students.find(s => s.id === id);
  if (!student) return;

  // O'qituvchi faqat o'z guruhini tahrirlay oladi.
  if (role === "teacher") {
    const teacher = teachers.find(t => t.login === currentLogin);

    if (!teacher || student.group !== teacher.group) {
      toast("Faqat o‘zingizga biriktirilgan guruhni tahrirlang!");
      return;
    }
  }

  student[key] = value;

  save();
  render();

  toast("O‘zgarish saqlandi!");
}

// TUGMALARNI ISHLATISH
$("loginButton").addEventListener("click", login);
$("demoButton").addEventListener("click", demoFill);
$("logoutButton").addEventListener("click", logout);

// ENTER BOSILGANDA KIRISH
["loginName", "loginPass"].forEach(id => {
  $(id).addEventListener("keydown", event => {
    if (event.key === "Enter") {
      login();
    }
  });
});

// BOSHLANG'ICH HISOB
updateStats();