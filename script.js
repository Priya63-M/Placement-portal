/* ========= DATA MODULE ========= */

const companies = [
  { name: "TCS", role: "Developer", package: 4, eligibility: 60, applied: false },
  { name: "Infosys", role: "Tester", package: 3.6, eligibility: 65, applied: false },
  { name: "Zoho", role: "Frontend Developer", package: 6, eligibility: 70, applied: false },
  { name: "Wipro", role: "Tester", package: 5, eligibility: 60, applied: false },
  { name: "Accenture", role: "Analyst", package: 4.5, eligibility: 65, applied: false },
  { name: "Cognizant", role: "Support Engineer", package: 4, eligibility: 60, applied: false },
  { name: "HCL", role: "Cloud Engineer", package: 6.5, eligibility: 70, applied: false },
  { name: "Capgemini", role: "Java Developer", package: 5.5, eligibility: 65, applied: false },
  { name: "IBM", role: "Data Analyst", package: 7, eligibility: 75, applied: false },
  { name: "Amazon", role: "Frontend Developer", package: 12, eligibility: 80, applied: false },
  { name: "Google", role: "Software Engineer", package: 18, eligibility: 85, applied: false }
];

/* ========= GLOBAL STATE ========= */

let studentPercent = 0;
let showAppliedOnly = false;

/* ========= INIT MODULE ========= */

function initRoles() {
  const roleFilter = document.getElementById("roleFilter");
  const roles = [...new Set(companies.map(c => c.role))];

  roleFilter.innerHTML = `<option value="all">All Roles</option>`;
  roles.forEach(role => {
    roleFilter.innerHTML += `<option value="${role}">${role}</option>`;
  });
}

/* ========= ELIGIBILITY MODULE ========= */

function checkEligibility() {
  studentPercent = Number(document.getElementById("studentPercent").value);
  renderCompanies();
}

/* ========= APPLY MODULE ========= */

function applyCompany(index) {
  companies[index].applied = true;
  showToast(`${companies[index].name} applied successfully`);
  renderCompanies();
}

/* ========= TOAST MODULE ========= */

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.opacity = 1;
  setTimeout(() => toast.style.opacity = 0, 2000);
}

/* ========= TAB MODULE ========= */

function showAll() {
  showAppliedOnly = false;
  setActiveTab(0);
  renderCompanies();
}

function showApplied() {
  showAppliedOnly = true;
  setActiveTab(1);
  renderCompanies();
}

function setActiveTab(i) {
  document.querySelectorAll(".tabs button")
    .forEach((btn, index) =>
      btn.classList.toggle("active", index === i)
    );
}

/* ========= RENDER MODULE ========= */

function renderCompanies() {
  const cards = document.getElementById("companyCards");
  const search = document.getElementById("search").value.toLowerCase();
  const role = document.getElementById("roleFilter").value;

  cards.innerHTML = "";

  companies.forEach((c, i) => {
    if (showAppliedOnly && !c.applied) return;
    if (role !== "all" && c.role !== role) return;
    if (!c.name.toLowerCase().includes(search)) return;

    let status = "Not Eligible";
    let badgeClass = "not-eligible";

    if (studentPercent >= c.eligibility) {
      status = "Eligible";
      badgeClass = "eligible";
    }

    if (c.applied) {
      status = "Applied";
      badgeClass = "applied";
    }

    cards.innerHTML += `
      <div class="card">
        <span class="badge ${badgeClass}">${status}</span>
        <h3>${c.name}</h3>
        <p><b>Role:</b> ${c.role}</p>
        <p><b>Package:</b> ${c.package} LPA</p>
        <p><b>Eligibility:</b> ${c.eligibility}%</p>
        ${
          !c.applied && studentPercent >= c.eligibility
            ? `<button class="apply-btn" onclick="applyCompany(${i})">Apply</button>`
            : ""
        }
      </div>
    `;
  });
}

/* ========= START ========= */
initRoles();
renderCompanies();