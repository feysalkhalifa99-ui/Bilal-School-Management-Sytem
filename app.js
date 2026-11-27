
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const today = () => new Date().toISOString().slice(0, 10);

const blank = () => ({
  students: [],
  teachers: [],
  attendance: [],
  exams: [],
  fees: [],
  homework: [],
  submissions: []
});

let db = JSON.parse(localStorage.getItem('bilalSchoolData') || 'null') || blank();

db.students ||= [];
db.teachers ||= [];
db.attendance ||= [];
db.exams ||= [];
db.fees ||= [];
db.homework ||= [];
db.submissions ||= [];

let lang = localStorage.getItem('bilalLang') || 'en';

const words = {
  en: {
    subtitle: 'Management System · KG 1–3 & Grades 1–12',
    install: 'Install App',
    workspace: 'SCHOOL WORKSPACE',
    dashboard: 'Dashboard',
    students: 'Students',
    teachers: 'Teachers',
    attendance: 'Attendance',
    exams: 'Examinations',
    fees: 'School Fees',
    reports: 'Reports',
    homework: 'Homework & Exercises',
    gradeRange: 'KG 1 to Grade 12',
    overview: 'OVERVIEW',
    welcome: 'Welcome to your school management workspace.',
    pwaReady: 'PWA ready',
    totalStudents: 'Total Students',
    totalTeachers: 'Total Teachers',
    attendanceToday: 'Attendance Today',
    feeRecords: 'Fee Records',
    grade12: 'Across KG 1–3 and Grades 1–12',
    teachingStaff: 'Teaching staff',
    recordsToday: 'Records entered today',
    paymentsLogged: 'Payments logged',
    gettingStarted: 'GETTING STARTED',
    manageSchool: 'Manage your school in one place',
    quickStart: 'Register students and teachers, record daily attendance, enter exam marks and track school fees.',
    recentStudents: 'Recently Added Students',
    viewAll: 'View all',
    studentRegistration: 'Student Registration',
    studentHelp: 'Add and manage learners from KG 1 to Grade 12.',
    exportCsv: 'Export CSV',
    fullName: 'Full name',
    grade: 'Grade',
    gender: 'Gender',
    parentPhone: 'Parent phone',
    studentId: 'Student ID (optional)',
    addStudent: 'Add Student',
    studentList: 'Student List',
    teacherManagement: 'Teacher Management',
    teacherHelp: 'Maintain teacher contact and subject details.',
    subject: 'Subject',
    phone: 'Phone',
    assignedGrade: 'Assigned grade',
    addTeacher: 'Add Teacher',
    teacherList: 'Teacher List',
    dailyAttendance: 'Daily Attendance',
    attendanceHelp: "Choose a grade and mark each learner's attendance.",
    date: 'Date',
    saveAttendance: 'Save Attendance',
    examMarks: 'Examination Marks',
    examHelp: "Record a student's subject score out of 100.",
    student: 'Student',
    examName: 'Exam name',
    score: 'Score (0–100)',
    saveMark: 'Save Mark',
    marksRegister: 'Marks Register',
    feeTracking: 'Fee Tracking',
    feeHelp: 'Record payments received from students.',
    amountBirr: 'Amount (ETB)',
    paymentDate: 'Payment date',
    reference: 'Receipt / reference',
    recordPayment: 'Record Payment',
    paymentHistory: 'Payment History',
    schoolReports: 'School Reports',
    reportsHelp: 'Download a simple CSV report for backup or spreadsheet analysis.',
    downloadBackup: 'Download Full Data Backup',
    studentReport: 'Student Report CSV',
    feeReport: 'Fee Report CSV',
    examReport: 'Exam Report CSV',
    important: 'Important:',
    localStorageNote: 'This version saves data in this browser on this device. It does not yet synchronize between different users or devices.',
    restoreBackup: 'Restore backup JSON',
    homeworkHelp: 'Teachers create assignments and students submit their answers.',
    createHomework: 'Create Homework / Exercise',
    homeworkTitle: 'Assignment title',
    homeworkType: 'Assignment type',
    dueDate: 'Due date',
    instructions: 'Instructions',
    publishHomework: 'Send Assignment',
    homeworkList: 'Assignments',
    submitAnswer: 'Submit Answer',
    answer: 'Your answer',
    submissions: 'Student Submissions',
    feedback: 'Teacher feedback',
    saveGrade: 'Save Grade'
  },

  om: {
    subtitle: 'Sirna Bulchiinsaa · KG 1–3 fi Kutaa 1–12',
    install: 'App fe’i',
    workspace: 'IDDOO HOJII MANAA BARUMSAA',
    dashboard: 'Gabatee',
    students: 'Barattoota',
    teachers: 'Barsiisota',
    attendance: 'Argama',
    exams: 'Qormaata',
    fees: 'Kaffaltii',
    reports: 'Gabaasa',
    homework: 'Hojii Manaa fi Gilgaala',
    gradeRange: 'KG 1 hanga Kutaa 12',
    overview: 'CUUNFAA',
    welcome: 'Baga gara sirna bulchiinsa mana barumsaa dhuftan.',
    pwaReady: 'App qophaa’e',
    totalStudents: 'Barattoota Waliigalaa',
    totalTeachers: 'Barsiisota Waliigalaa',
    attendanceToday: 'Argama Har’aa',
    feeRecords: 'Galmee Kaffaltii',
    grade12: 'KG 1–3 fi Kutaa 1–12 hunda',
    teachingStaff: 'Hojjettoota barsiisotaa',
    recordsToday: 'Galmee har’a galmaa’e',
    paymentsLogged: 'Kaffaltii galmaa’e',
    gettingStarted: 'JALQABI',
    manageSchool: 'Mana barumsaa bakka tokkotti bulchi',
    quickStart: 'Barattootaa fi barsiisota galmeessi, argama guyyaa guyyaa, qabxii qormaataa fi kaffaltii hordofi.',
    recentStudents: 'Barattoota Dhiheenya Galmaa’an',
    viewAll: 'Hunda ilaali',
    studentRegistration: 'Galmee Barataa',
    studentHelp: 'Barattoota KG 1 hanga Kutaa 12 galmeessi fi bulchi.',
    exportCsv: 'CSV buusi',
    fullName: 'Maqaa guutuu',
    grade: 'Kutaa',
    gender: 'Saala',
    parentPhone: 'Bilbila maatii',
    studentId: 'Lakkoofsa barataa (filannoo)',
    addStudent: 'Barataa galmeessi',
    studentList: 'Tarree Barattootaa',
    teacherManagement: 'Bulchiinsa Barsiisotaa',
    teacherHelp: 'Odeeffannoo qunnamtii fi barnoota barsiisotaa kuusi.',
    subject: 'Barnoota',
    phone: 'Bilbila',
    assignedGrade: 'Kutaa ramadame',
    addTeacher: 'Barsiisaa galmeessi',
    teacherList: 'Tarree Barsiisotaa',
    dailyAttendance: 'Argama Guyyaa Guyyaa',
    attendanceHelp: 'Kutaa filadhuutii argama barataa mallatteessi.',
    date: 'Guyyaa',
    saveAttendance: 'Argama kuusi',
    examMarks: 'Qabxii Qormaataa',
    examHelp: 'Qabxii barataa barnoota tokko irratti 100 keessaa galmeessi.',
    student: 'Barataa',
    examName: 'Maqaa qormaataa',
    score: 'Qabxii (0–100)',
    saveMark: 'Qabxii kuusi',
    marksRegister: 'Galmee Qabxii',
    feeTracking: 'Hordoffii Kaffaltii',
    feeHelp: 'Kaffaltii barattoota irraa argame galmeessi.',
    amountBirr: 'Maallaqa (ETB)',
    paymentDate: 'Guyyaa kaffaltii',
    reference: 'Lakkoofsa nagahee',
    recordPayment: 'Kaffaltii galmeessi',
    paymentHistory: 'Seenaa Kaffaltii',
    schoolReports: 'Gabaasa Mana Barumsaa',
    reportsHelp: 'Gabaasa CSV buufadhu.',
    downloadBackup: 'Backup guutuu buusi',
    studentReport: 'Gabaasa Barataa CSV',
    feeReport: 'Gabaasa Kaffaltii CSV',
    examReport: 'Gabaasa Qormaataa CSV',
    important: 'Barbaachisaa:',
    localStorageNote: 'Version kun odeeffannoo browser meeshaa kana keessatti kuusa. Meeshaalee adda addaa gidduutti hin wal-simsiisu.',
    restoreBackup: 'Backup JSON deebisi',
    homeworkHelp: 'Barsiisaan hojii erga; barataan deebii isaa galcha.',
    createHomework: 'Hojii Manaa / Gilgaala Uumi',
    homeworkTitle: 'Mata duree hojii',
    homeworkType: 'Gosa hojii',
    dueDate: 'Guyyaa itti dhiyaatu',
    instructions: 'Qajeelfama',
    publishHomework: 'Hojii Ergi',
    homeworkList: 'Hojiiwwan Ergame',
    submitAnswer: 'Deebii Ergi',
    answer: 'Deebii kee',
    submissions: 'Deebii Barattootaa',
    feedback: 'Yaada barsiisaa',
    saveGrade: 'Qabxii Kuusi'
  }
};

function save() {
  localStorage.setItem('bilalSchoolData', JSON.stringify(db));
  renderDashboard();
}

function t(k) {
  return words[lang][k] || words.en[k] || k;
}

function applyLang() {
  document.documentElement.lang = lang === 'om' ? 'om' : 'en';
  $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  if ($('#language')) $('#language').value = lang;
  renderAll();
}

function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2300);
}

/* KG 1–3 AND GRADE 1–12 */

function grades() {
  return [
    'KG 1',
    'KG 2',
    'KG 3',
    ...Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`)
  ];
}

function fillGrades() {
  const allGrades = grades();

  function updateSelect(select) {
    if (!select) return;

    const previousValue = select.value;

    select.innerHTML = allGrades.map(g =>
      `<option value="${g}">${g}</option>`
    ).join('');

    if (allGrades.includes(previousValue)) {
      select.value = previousValue;
    }
  }

  updateSelect($('#studentGrade'));
  updateSelect($('#attendanceGrade'));

  $$('.grade-select').forEach(updateSelect);
}

function escapeHTML(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function table(headers, rows) {
  if (!rows.length) return '<div class="empty">No records yet / Galmeen hin jiru</div>';
  return `<table>
    <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.join('')}</tbody>
  </table>`;
}

function renderDashboard() {
  $('#studentCount').textContent = db.students.length;
  $('#teacherCount').textContent = db.teachers.length;
  $('#attendanceCount').textContent = db.attendance.filter(a => a.date === today()).length;
  $('#feeCount').textContent = db.fees.length;

  $('#gradeGrid').innerHTML = grades().map(g =>
    `<div class="grade-chip">${escapeHTML(g)}</div>`
  ).join('');

  $('#recentStudents').innerHTML = table(
    ['ID', 'Name', 'Grade'],
    db.students.slice(-5).reverse().map(s =>
      `<tr>
        <td>${escapeHTML(s.id)}</td>
        <td>${escapeHTML(s.name)}</td>
        <td>${escapeHTML(s.grade)}</td>
      </tr>`
    )
  );
}

function renderStudents() {
  const q = $('#studentSearch').value.toLowerCase();

  const list = db.students.filter(s =>
    [s.name, s.id, s.grade].join(' ').toLowerCase().includes(q)
  );

  $('#studentsTable').innerHTML = table(
    ['ID', 'Name', 'Grade', 'Gender', 'Parent phone', ''],
    list.map(s => `<tr>
      <td>${escapeHTML(s.id)}</td>
      <td>${escapeHTML(s.name)}</td>
      <td>${escapeHTML(s.grade)}</td>
      <td>${escapeHTML(s.gender)}</td>
      <td>${escapeHTML(s.phone)}</td>
      <td><button class="delete-btn" data-delete-student="${escapeHTML(s.id)}">Delete</button></td>
    </tr>`)
  );
}

function renderTeachers() {
  $('#teachersTable').innerHTML = table(
    ['Name', 'Subject', 'Phone', 'Grade', ''],
    db.teachers.map(x => `<tr>
      <td>${escapeHTML(x.name)}</td>
      <td>${escapeHTML(x.subject)}</td>
      <td>${escapeHTML(x.phone)}</td>
      <td>${escapeHTML(x.grade)}</td>
      <td><button class="delete-btn" data-delete-teacher="${escapeHTML(x.id)}">Delete</button></td>
    </tr>`)
  );
}

function fillStudentOptions() {
  const opts = db.students.map(s =>
    `<option value="${escapeHTML(s.id)}">${escapeHTML(s.name)} — ${escapeHTML(s.grade)} (${escapeHTML(s.id)})</option>`
  ).join('');

  if ($('#examStudent')) $('#examStudent').innerHTML = opts;
  if ($('#feeStudent')) $('#feeStudent').innerHTML = opts;
}

function renderAttendance() {
  const g = $('#attendanceGrade')?.value || 'KG 1';
  const date = $('#attendanceDate')?.value || today();

  const students = db.students.filter(s => s.grade === g);

  $('#attendanceList').innerHTML = table(
    ['Student', 'Status'],
    students.map(s => {
      const old = db.attendance.find(a =>
        a.studentId === s.id && a.date === date
      );

      return `<tr>
        <td>${escapeHTML(s.name)} <small>(${escapeHTML(s.id)})</small></td>
        <td>
          <select data-attendance="${escapeHTML(s.id)}">
            <option ${old?.status === 'Present' ? 'selected' : ''}>Present</option>
            <option ${old?.status === 'Absent' ? 'selected' : ''}>Absent</option>
            <option ${old?.status === 'Late' ? 'selected' : ''}>Late</option>
          </select>
        </td>
      </tr>`;
    })
  );
}

function renderExams() {
  $('#examsTable').innerHTML = table(
    ['Student', 'Subject', 'Exam', 'Score', 'Grade'],
    db.exams.map(x => {
      const s = db.students.find(a => a.id === x.studentId);

      return `<tr>
        <td>${escapeHTML(s?.name || x.studentId)}</td>
        <td>${escapeHTML(x.subject)}</td>
        <td>${escapeHTML(x.exam)}</td>
        <td>${x.score}/100</td>
        <td>${x.score >= 90 ? 'A' : x.score >= 80 ? 'B' : x.score >= 70 ? 'C' : x.score >= 50 ? 'D' : 'F'}</td>
      </tr>`;
    })
  );
}

function renderFees() {
  $('#feesTable').innerHTML = table(
    ['Student', 'Amount (ETB)', 'Date', 'Reference'],
    db.fees.map(x => {
      const s = db.students.find(a => a.id === x.studentId);

      return `<tr>
        <td>${escapeHTML(s?.name || x.studentId)}</td>
        <td>${Number(x.amount).toFixed(2)}</td>
        <td>${escapeHTML(x.date)}</td>
        <td>${escapeHTML(x.reference)}</td>
      </tr>`;
    })
  );
}

/* HOMEWORK AND EXERCISES */

function updateHomeworkOptions() {
  const studentId = $('#submissionStudent')?.value;
  const student = db.students.find(s => s.id === studentId);

  const available = db.homework.filter(h =>
    !student || h.grade === student.grade
  );

  if ($('#submissionHomework')) {
    $('#submissionHomework').innerHTML =
      '<option value="">Select assignment</option>' +
      available.map(h => `
        <option value="${escapeHTML(h.id)}">
          ${escapeHTML(h.title)} — ${escapeHTML(h.subject)}
        </option>
      `).join('');
  }
}

function renderHomework() {
  const homeworkList = $('#homeworkList');
  const submissionList = $('#submissionList');
  const studentSelect = $('#submissionStudent');
  const homeworkSelect = $('#submissionHomework');

  if (!homeworkList || !submissionList || !studentSelect || !homeworkSelect) return;

  homeworkList.innerHTML = table(
    ['Title', 'Grade', 'Subject', 'Type', 'Due Date', 'Instructions'],
    db.homework.map(h => `<tr>
      <td>${escapeHTML(h.title)}</td>
      <td>${escapeHTML(h.grade)}</td>
      <td>${escapeHTML(h.subject)}</td>
      <td>${escapeHTML(h.type)}</td>
      <td>${escapeHTML(h.dueDate)}</td>
      <td>${escapeHTML(h.instructions)}</td>
    </tr>`)
  );

  const previousStudent = studentSelect.value;

  studentSelect.innerHTML =
    '<option value="">Select student</option>' +
    db.students.map(s => `
      <option value="${escapeHTML(s.id)}">
        ${escapeHTML(s.name)} — ${escapeHTML(s.grade)}
      </option>
    `).join('');

  if (db.students.some(s => s.id === previousStudent)) {
    studentSelect.value = previousStudent;
  }

  updateHomeworkOptions();

  submissionList.innerHTML = table(
    ['Student', 'Assignment', 'Answer', 'Date', 'Score', 'Feedback'],
    db.submissions.map(s => `<tr>
      <td>${escapeHTML(s.studentName)}</td>
      <td>${escapeHTML(s.homeworkTitle)}</td>
      <td>${escapeHTML(s.answer)}</td>
      <td>${escapeHTML(s.date)}</td>
      <td>
        <input type="number" min="0" max="100"
          value="${s.score ?? ''}"
          data-grade-score="${escapeHTML(s.id)}"
          placeholder="0–100">
      </td>
      <td>
        <input type="text"
          value="${escapeHTML(s.feedback || '')}"
          data-grade-feedback="${escapeHTML(s.id)}"
          placeholder="Feedback">
        <button type="button" data-save-grade="${escapeHTML(s.id)}">
          Save
        </button>
      </td>
    </tr>`)
  );
}

function renderAll() {
  renderDashboard();
  renderStudents();
  renderTeachers();
  fillStudentOptions();
  renderAttendance();
  renderExams();
  renderFees();
  renderHomework();
}

function showPage(name) {
  $$('.page').forEach(p => p.hidden = p.id !== name + 'Page');
  $$('.nav').forEach(b => b.classList.toggle('active', b.dataset.page === name));

  $('#pageTitle').textContent =
    name === 'homework' ? t('homework') : t(name);

  if (name === 'attendance') renderAttendance();
  if (name === 'homework') renderHomework();
}

$$('.nav').forEach(b =>
  b.addEventListener('click', () => showPage(b.dataset.page))
);

$$('[data-goto]').forEach(b =>
  b.addEventListener('click', () => showPage(b.dataset.goto))
);

$('#studentForm')?.addEventListener('submit', e => {
  e.preventDefault();

  let d = Object.fromEntries(new FormData(e.target));
  d.id = d.studentId.trim() || 'BIL-' + String(Date.now()).slice(-7);

  if (db.students.some(s => s.id === d.id)) {
    toast('Student ID already exists');
    return;
  }

  delete d.studentId;
  db.students.push(d);

  save();
  renderAll();
  e.target.reset();
  toast('Student registered successfully');
});

$('#teacherForm')?.addEventListener('submit', e => {
  e.preventDefault();

  let d = Object.fromEntries(new FormData(e.target));
  d.id = 'T-' + Date.now();

  db.teachers.push(d);
  save();
  renderAll();
  e.target.reset();
  toast('Teacher added');
});

$('#studentSearch')?.addEventListener('input', renderStudents);

document.addEventListener('click', e => {
  if (e.target.dataset.deleteStudent) {
    db.students = db.students.filter(s => s.id !== e.target.dataset.deleteStudent);
    save();
    renderAll();
    toast('Student deleted');
  }

  if (e.target.dataset.deleteTeacher) {
    db.teachers = db.teachers.filter(s => s.id !== e.target.dataset.deleteTeacher);
    save();
    renderAll();
    toast('Teacher deleted');
  }

  const id = e.target.dataset.saveGrade;

  if (id) {
    const scoreInput = document.querySelector(`[data-grade-score="${id}"]`);
    const feedbackInput = document.querySelector(`[data-grade-feedback="${id}"]`);

    const score = scoreInput.value.trim();

    if (score !== '' && (!Number.isFinite(Number(score)) || Number(score) < 0 || Number(score) > 100)) {
      toast('Score must be between 0 and 100');
      return;
    }

    const submission = db.submissions.find(s => s.id === id);
    if (!submission) return;

    submission.score = score === '' ? null : Number(score);
    submission.feedback = feedbackInput.value;

    save();
    renderHomework();
    toast('Grade and feedback saved');
  }
});

$('#attendanceGrade')?.addEventListener('change', renderAttendance);
$('#attendanceDate')?.addEventListener('change', renderAttendance);

$('#saveAttendance')?.addEventListener('click', () => {
  const date = $('#attendanceDate').value || today();

  $$('[data-attendance]').forEach(el => {
    db.attendance = db.attendance.filter(a =>
      !(a.studentId === el.dataset.attendance && a.date === date)
    );

    db.attendance.push({
      studentId: el.dataset.attendance,
      date,
      status: el.value
    });
  });

  save();
  toast('Attendance saved');
});

$('#examForm')?.addEventListener('submit', e => {
  e.preventDefault();

  let d = Object.fromEntries(new FormData(e.target));
  d.score = Number(d.score);

  db.exams.push(d);
  save();
  renderExams();
  e.target.reset();
  toast('Exam mark saved');
});

$('#feeForm')?.addEventListener('submit', e => {
  e.preventDefault();

  let d = Object.fromEntries(new FormData(e.target));
  d.amount = Number(d.amount);

  db.fees.push(d);
  save();
  renderFees();
  e.target.reset();
  $('#feeDate').value = today();
  toast('Payment recorded');
});

/* CREATE HOMEWORK */

if ($('#homeworkForm')) {
  $('#homeworkForm').addEventListener('submit', e => {
    e.preventDefault();

    const d = Object.fromEntries(new FormData(e.target));

    if (!d.title || !d.grade || !d.subject) {
      toast('Complete the required fields');
      return;
    }

    db.homework.push({
      id: 'HW-' + Date.now(),
      title: d.title,
      grade: d.grade,
      subject: d.subject,
      type: d.type,
      dueDate: d.dueDate,
      instructions: d.instructions,
      createdAt: today()
    });

    save();
    renderHomework();
    e.target.reset();
    toast('Assignment sent successfully');
  });
}

/* STUDENT SUBMISSION */

if ($('#submissionStudent')) {
  $('#submissionStudent').addEventListener('change', updateHomeworkOptions);
}

if ($('#submissionForm')) {
  $('#submissionForm').addEventListener('submit', e => {
    e.preventDefault();

    const d = Object.fromEntries(new FormData(e.target));
    const student = db.students.find(s => s.id === d.student);
    const homework = db.homework.find(h => h.id === d.homework);

    if (!student || !homework || !d.answer?.trim()) {
      toast('Select student, assignment and enter your answer');
      return;
    }

    db.submissions.push({
      id: 'SUB-' + Date.now(),
      studentId: student.id,
      studentName: student.name,
      homeworkId: homework.id,
      homeworkTitle: homework.title,
      answer: d.answer,
      date: today(),
      score: null,
      feedback: ''
    });

    save();
    renderHomework();
    e.target.reset();
    updateHomeworkOptions();
    toast('Answer submitted successfully');
  });
}

/* DOWNLOAD AND REPORTS */

function download(name, content, type = 'text/csv') {
  const blob = new Blob([content], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

function csv(rows) {
  return rows.map(r =>
    r.map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(',')
  ).join('\n');
}

$('#exportStudents')?.addEventListener('click', () =>
  download('bilal-students.csv', csv([
    ['ID', 'Name', 'Grade', 'Gender', 'Parent phone'],
    ...db.students.map(s => [s.id, s.name, s.grade, s.gender, s.phone])
  ]))
);

$('#reportStudents')?.addEventListener('click', () => $('#exportStudents')?.click());

$('#reportFees')?.addEventListener('click', () =>
  download('bilal-fees.csv', csv([
    ['Student ID', 'Amount ETB', 'Date', 'Reference'],
    ...db.fees.map(x => [x.studentId, x.amount, x.date, x.reference])
  ]))
);

$('#reportExams')?.addEventListener('click', () =>
  download('bilal-exams.csv', csv([
    ['Student ID', 'Subject', 'Exam', 'Score'],
    ...db.exams.map(x => [x.studentId, x.subject, x.exam, x.score])
  ]))
);

$('#backupBtn')?.addEventListener('click', () =>
  download('bilal-school-backup.json', JSON.stringify(db, null, 2), 'application/json')
);

$('#restoreFile')?.addEventListener('change', async e => {
  const f = e.target.files[0];
  if (!f) return;

  try {
    const data = JSON.parse(await f.text());

    if (!data.students || !data.teachers) throw Error();

    db = { ...blank(), ...data };
    db.homework ||= [];
    db.submissions ||= [];

    save();
    renderAll();
    toast('Backup restored');
  } catch {
    toast('Invalid backup file');
  }
});

$('#language')?.addEventListener('change', e => {
  lang = e.target.value;
  localStorage.setItem('bilalLang', lang);
  applyLang();
});

/* APP INSTALLATION */

let installPrompt;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  installPrompt = e;
  if ($('#installBtn')) $('#installBtn').hidden = false;
});

$('#installBtn')?.addEventListener('click', async () => {
  if (!installPrompt) return;

  installPrompt.prompt();
  await installPrompt.userChoice;

  installPrompt = null;
  $('#installBtn').hidden = true;
});

/* SERVICE WORKER */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('./service-worker.js').catch(console.error)
  );
}

/* INITIALIZE APP */

if ($('#year')) $('#year').textContent = new Date().getFullYear();
if ($('#attendanceDate')) $('#attendanceDate').value = today();
if ($('#feeDate')) $('#feeDate').value = today();

fillGrades();
applyLang();
showPage('dashboard');
