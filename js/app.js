const STORAGE_KEY = 'mediflow_emr_state';
let activePatientId = null;
const LOCALE_KEY = 'mediflow_locale';
const TRANSLATIONS = {
  lo: {
    'nav.dashboard': 'ແຜນຄວບຄຸມ',
    'nav.patients': 'ທະບຽນ',
    'nav.opd': 'OPD',
    'nav.ipd': 'IPD',
    'nav.pharmacy': 'ຮ້ານຢາ',
    'nav.lab': 'ຫ້ອງວິເຄາະ',
    'nav.xray': 'X-ray',
    'nav.billing': 'ການຈ່າຍເງິນ',
    'nav.logout': 'ອອກຈາກລະບົບ',
    'patients.title': 'ທະບຽນຜູ້ປ່ວຍ',
    'patients.subtitle': 'ທະບຽນຜູ້ປ່ວຍສໍາລັບແຕ່ລະແຜ່ນການ',
    'patients.add_new': 'ເພີ່ມຜູ້ປ່ວຍໃໝ່',
    'patients.form.hn': 'HN',
    'patients.form.name': 'ຊື່ຜູ້ປ່ວຍ',
    'patients.form.age': 'ອາຍຸ',
    'patients.form.gender': 'ເພດ',
    'patients.form.diagnosis': ' ອາການ/ການວິນິຈາກ',
    'patients.form.status': 'ສະຖານະ',
    'patients.save': 'ບັນທຶກ',
    'patients.list': 'ລາຍການຜູ້ປ່ວຍ',
    'table.hn': 'HN',
    'table.name': 'ຊື່',
    'table.age': 'ອາຍຸ',
    'table.gender': 'ເພດ',
    'table.diagnosis': 'ວິນິຈາກ',
    'table.admit_date': 'ວັນທີ່ Admit',
    'table.status': 'ສະຖານະ',
    'dashboard.title': 'ແຜນຄວບຄຸມ',
    'dashboard.subtitle': 'ພາຍລວມຜູ້ປ່ວຍແລະແຜ່ນການ',
    'dashboard.live': 'Live sync',
    'dashboard.department_status': 'ສະຖານະແຜ່ນການ',
    'dashboard.patients': 'ຜູ້ປ່ວຍໃນລະບົບ',
    'opd.title': 'OPD',
    'opd.subtitle': 'ຂໍ້ມູນຜູ້ປ່ວຍແຜນການຜູ້ປ່ວຍນອກ',
    'opd.select_patient': 'ເລືອກຜູ້ປ່ວຍ',
    'opd.record': 'ບັນທຶກ OPD',
    'opd.form.note': 'ບັນທຶກອາການແລະແຜນການຮັກສາ',
    'opd.save': 'ບັນທຶກ',
    'ipd.title': 'IPD',
    'ipd.subtitle': 'ຂໍ້ມູນຜູ້ປ່ວຍແຜ່ນການຜູ້ປ່ວຍໃນ',
    'ipd.record': 'ບັນທຶກ IPD',
    'ipd.form.bed': 'ຫ້ອງ/ເລກເຕີງ',
    'ipd.form.status': 'ສະຖານະ',
    'ipd.update': 'ອັບເເດດ',
    'pharmacy.title': 'Pharmacy',
    'pharmacy.subtitle': 'ລະບົບສັ່ງຢາ',
    'pharmacy.order': 'ສັ່ງຢາ',
    'pharmacy.form.name': 'ຊື່ຢາ',
    'pharmacy.form.dose': 'ຂະໜາດຢາ',
    'pharmacy.form.freq': 'ຄວາມຖືກ',
    'pharmacy.submit': 'ສັ່ງຢາ',
    'lab.title': 'Lab',
    'lab.subtitle': 'ຄໍາສັ່ງການທົດສອບ',
    'lab.order': 'ສົ່ງຄໍາສັ່ງ Lab',
    'lab.form.test': 'ປະເພດການທົດສອບ',
    'lab.submit': 'ສົ່ງຄໍາສັ່ງ',
    'xray.title': 'X-ray',
    'xray.subtitle': 'ຄໍາສັ່ງການຢ່າງຮັບຮູ້',
    'xray.order': 'ສົ່ງຄໍາສັ່ງ X-ray',
    'xray.form.test': 'ປະເພດການທົດສອບ',
    'xray.submit': 'ສົ່ງຄໍາສັ່ງ',
    'billing.title': 'Billing',
    'billing.subtitle': 'ຂໍ້ມູນຄ່າໃຊ້ຈ່າຍ',
    'billing.create': 'ສ້າງບິນ',
    'billing.form.amount': 'ຈໍານວນເງິນ',
    'billing.form.type': 'ປະເພດ',
    'billing.submit': 'ສ້າງ',
    'login.title': 'MediFlow AI',
    'login.subtitle': 'ລະບົບ EMR ທີ່ເຊື່ອມແຜ່ນທຸກແຜ່ນ',
    'login.form.username': 'Username',
    'login.form.password': 'Password',
    'login.submit': 'ເຂົ້າສູ່ລະບົບ',
    'login.hint': 'ຕົວຢ່າງ: ໃສ່ຊື່ຜູ້ໃຊ້ແລະລະຫັດ',
  },
  th: {
    'nav.dashboard': 'แดชบอร์ด',
    'nav.patients': 'ทะเบียน',
    'nav.opd': 'OPD',
    'nav.ipd': 'IPD',
    'nav.pharmacy': 'ร้านยา',
    'nav.lab': 'Lab',
    'nav.xray': 'X-ray',
    'nav.billing': 'Billing',
    'nav.logout': 'ออกจากระบบ',
    'patients.title': 'ทะเบียนผู้ป่วย',
    'patients.subtitle': 'ทะเบียนผู้ป่วยกลางสำหรับทุกแผนก',
    'patients.add_new': 'เพิ่มผู้ป่วยใหม่',
    'patients.form.hn': 'HN',
    'patients.form.name': 'ชื่อผู้ป่วย',
    'patients.form.age': 'อายุ',
    'patients.form.gender': 'เพศ',
    'patients.form.diagnosis': 'โรค/วินิจฉัย',
    'patients.form.status': 'สถานะ',
    'patients.save': 'บันทึกข้อมูล',
    'patients.list': 'รายการผู้ป่วย',
    'table.hn': 'HN',
    'table.name': 'ชื่อ',
    'table.age': 'อายุ',
    'table.gender': 'เพศ',
    'table.diagnosis': 'วินิจฉัย',
    'table.admit_date': 'วันที่ Admit',
    'table.status': 'สถานะ',
    'dashboard.title': 'แดชบอร์ด',
    'dashboard.subtitle': 'ภาพรวมผู้ป่วยและแผนกต่าง ๆ แบบ real-time',
    'dashboard.live': 'Live sync',
    'dashboard.department_status': 'สถานะแผนก',
    'dashboard.patients': 'ผู้ป่วยในระบบ',
    'opd.title': 'OPD',
    'opd.subtitle': 'ข้อมูลผู้ป่วยสำหรับแผนกผู้ป่วยนอก',
    'opd.select_patient': 'เลือกผู้ป่วย',
    'opd.record': 'บันทึก OPD',
    'opd.form.note': 'บันทึกอาการและแผนการรักษา',
    'opd.save': 'บันทึกข้อมูล',
    'ipd.title': 'IPD',
    'ipd.subtitle': 'ข้อมูลผู้ป่วยสำหรับแผนกผู้ป่วยใน',
    'ipd.record': 'บันทึก IPD',
    'ipd.form.bed': 'เลขเตียง',
    'ipd.form.status': 'สถานะ',
    'ipd.update': 'อัปเดตข้อมูล',
    'pharmacy.title': 'Pharmacy',
    'pharmacy.subtitle': 'ระบบสั่งยาและ Clinical Alert',
    'pharmacy.order': 'สั่งยา',
    'pharmacy.form.name': 'ชื่อยา',
    'pharmacy.form.dose': 'ขนาดยา',
    'pharmacy.form.freq': 'ความถี่',
    'pharmacy.submit': 'สั่งยา',
    'lab.title': 'Lab',
    'lab.subtitle': 'คำสั่งตรวจทางห้องปฏิบัติการ',
    'lab.order': 'ส่งคำสั่ง Lab',
    'lab.form.test': 'ประเภทการตรวจ',
    'lab.submit': 'ส่งคำสั่ง',
    'xray.title': 'X-ray',
    'xray.subtitle': 'คำสั่งตรวจภาพรังสี',
    'xray.order': 'ส่งคำสั่ง X-ray',
    'xray.form.test': 'ประเภทการตรวจ',
    'xray.submit': 'ส่งคำสั่ง',
    'billing.title': 'Billing',
    'billing.subtitle': 'ข้อมูลค่าใช้จ่ายและการเรียกเก็บ',
    'billing.create': 'สร้างบิล',
    'billing.form.amount': 'จำนวนเงิน',
    'billing.form.type': 'ประเภท',
    'billing.submit': 'สร้างบิล',
    'login.title': 'MediFlow AI',
    'login.subtitle': 'ระบบ EMR ที่เชื่อมทุกแผนกในเวลาเดียวกัน',
    'login.form.username': 'Username',
    'login.form.password': 'Password',
    'login.submit': 'เข้าสู่ระบบ',
    'login.hint': 'ตัวอย่าง: ใส่ชื่อผู้ใช้และรหัสผ่านใดก็ได้'
  },
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.patients': 'Patient Registry',
    'nav.opd': 'OPD',
    'nav.ipd': 'IPD',
    'nav.pharmacy': 'Pharmacy',
    'nav.lab': 'Lab',
    'nav.xray': 'X-ray',
    'nav.billing': 'Billing',
    'nav.logout': 'Logout',
    'patients.title': 'Patient Registry',
    'patients.subtitle': 'Central patient registry for all departments',
    'patients.add_new': 'Add New Patient',
    'patients.form.hn': 'HN',
    'patients.form.name': 'Patient Name',
    'patients.form.age': 'Age',
    'patients.form.gender': 'Gender',
    'patients.form.diagnosis': 'Diagnosis',
    'patients.form.status': 'Status',
    'patients.save': 'Save',
    'patients.list': 'Patient List',
    'table.hn': 'HN',
    'table.name': 'Name',
    'table.age': 'Age',
    'table.gender': 'Gender',
    'table.diagnosis': 'Diagnosis',
    'table.admit_date': 'Admit Date',
    'table.status': 'Status',
    'dashboard.title': 'Executive Dashboard',
    'dashboard.subtitle': 'Overview of patients and departments in real-time',
    'dashboard.live': 'Live sync',
    'dashboard.department_status': 'Department status',
    'dashboard.patients': 'Patients in system',
    'opd.title': 'OPD',
    'opd.subtitle': 'Outpatient department patient data',
    'opd.select_patient': 'Select patient',
    'opd.record': 'OPD Record',
    'opd.form.note': 'Notes and treatment plan',
    'opd.save': 'Save',
    'ipd.title': 'IPD',
    'ipd.subtitle': 'Inpatient department patient data',
    'ipd.record': 'IPD Record',
    'ipd.form.bed': 'Bed/Room',
    'ipd.form.status': 'Status',
    'ipd.update': 'Update',
    'pharmacy.title': 'Pharmacy',
    'pharmacy.subtitle': 'Medication orders and clinical alerts',
    'pharmacy.order': 'Order Medication',
    'pharmacy.form.name': 'Drug name',
    'pharmacy.form.dose': 'Dose',
    'pharmacy.form.freq': 'Frequency',
    'pharmacy.submit': 'Order',
    'lab.title': 'Lab',
    'lab.subtitle': 'Laboratory orders',
    'lab.order': 'Send Lab Order',
    'lab.form.test': 'Test type',
    'lab.submit': 'Send Order',
    'xray.title': 'X-ray',
    'xray.subtitle': 'Imaging orders',
    'xray.order': 'Send X-ray Order',
    'xray.form.test': 'Test type',
    'xray.submit': 'Send Order',
    'billing.title': 'Billing',
    'billing.subtitle': 'Charges and invoicing',
    'billing.create': 'Create Invoice',
    'billing.form.amount': 'Amount',
    'billing.form.type': 'Type',
    'billing.submit': 'Create',
    'login.title': 'MediFlow AI',
    'login.subtitle': 'EMR connecting departments in one place',
    'login.form.username': 'Username',
    'login.form.password': 'Password',
    'login.submit': 'Sign in',
    'login.hint': 'Example: enter any username and password'
  }
};

function initializeApp() {
  bindLogin();
  bindPatientForm();
  bindDepartmentForms();
  bindPatientSelection();
  attachStateListeners();
  bindLanguageSwitcher();
  renderApp();
}

function currentLocale() {
  const stored = localStorage.getItem(LOCALE_KEY);
  if (stored) return stored;
  if (navigator.language && navigator.language.startsWith('th')) return 'th';
  return 'en';
}

function bindLanguageSwitcher() {
  const sel = document.getElementById('langSelect');
  if (!sel) return;
  const saved = localStorage.getItem(LOCALE_KEY) || currentLocale();
  sel.value = saved;
  applyTranslations(saved);
  sel.addEventListener('change', () => {
    const newLocale = sel.value;
    localStorage.setItem(LOCALE_KEY, newLocale);
    applyTranslations(newLocale);
  });
}

function applyTranslations(locale) {
  const dict = TRANSLATIONS[locale] || {};
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seedState();
  } catch (error) {
    console.error('Unable to load state', error);
    return seedState();
  }
}

function seedState() {
  const today = new Date().toISOString().slice(0, 10);
  const state = {
    patients: [
      {
        id: 1,
        hn: 'HN1001',
        name: 'John Smith',
        age: 48,
        gender: 'ชาย',
        diagnosis: 'Diabetes',
        admissionDate: today,
        status: 'Stable',
        department: 'OPD',
        bed: '-',
        allergies: ['Penicillin'],
        renalImpairment: false,
        hepaticImpairment: false,
        waitTime: 18,
        notes: 'Triage completed',
        priority: 'Normal'
      },
      {
        id: 2,
        hn: 'HN1002',
        name: 'Suda Chen',
        age: 31,
        gender: 'หญิง',
        diagnosis: 'Pneumonia',
        admissionDate: today,
        status: 'Critical',
        department: 'IPD',
        bed: 'Ward A-12',
        allergies: ['Sulfa'],
        renalImpairment: true,
        hepaticImpairment: false,
        waitTime: 32,
        notes: 'Needs oxygen support',
        priority: 'High'
      },
      {
        id: 3,
        hn: 'HN1003',
        name: 'Anna Lee',
        age: 37,
        gender: 'หญิง',
        diagnosis: 'Hypertension',
        admissionDate: today,
        status: 'Stable',
        department: 'OPD',
        bed: '-',
        allergies: [],
        renalImpairment: false,
        hepaticImpairment: false,
        waitTime: 12,
        notes: 'Routine follow-up',
        priority: 'Normal'
      }
    ],
    medications: [
      { id: 1, patientId: 1, name: 'Metformin', dose: 500, unit: 'mg', frequency: 'BID', status: 'Ordered' },
      { id: 2, patientId: 2, name: 'Amoxicillin', dose: 500, unit: 'mg', frequency: 'TID', status: 'Ordered' }
    ],
    labOrders: [
      { id: 1, patientId: 1, test: 'CBC', status: 'Completed', result: 'Normal' },
      { id: 2, patientId: 2, test: 'CRP', status: 'Pending', result: '-' }
    ],
    xrayOrders: [
      { id: 1, patientId: 2, test: 'Chest X-ray', status: 'Completed', result: 'Infiltrate noted' }
    ],
    billing: [
      { id: 1, patientId: 1, amount: 1200, status: 'Pending' },
      { id: 2, patientId: 2, amount: 2800, status: 'Pending' }
    ],
    stock: [
      { name: 'Paracetamol', qty: 8 },
      { name: 'Insulin', qty: 12 },
      { name: 'Oxygen', qty: 6 },
      { name: 'Amoxicillin', qty: 4 }
    ],
    alerts: []
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event('mediflow:updated'));
}

function getState() {
  return loadState();
}

function bindLogin() {
  const loginButton = document.getElementById('loginBtn');
  if (!loginButton) return;

  loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
      window.location.href = 'dashboard.html';
    } else {
      alert('กรุณากรอกข้อมูลก่อนเข้าสู่ระบบ');
    }
  });
}

function bindPatientForm() {
  const form = document.getElementById('patientForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const state = getState();
    const formData = new FormData(form);
    const patient = {
      id: Date.now(),
      hn: formData.get('hn')?.toString().trim() || `HN${Date.now().toString().slice(-4)}`,
      name: formData.get('name')?.toString().trim(),
      age: formData.get('age')?.toString().trim(),
      gender: formData.get('gender')?.toString().trim(),
      diagnosis: formData.get('diagnosis')?.toString().trim(),
      admissionDate: formData.get('admissionDate')?.toString().trim() || new Date().toISOString().slice(0, 10),
      status: formData.get('status')?.toString().trim() || 'Stable',
      department: 'OPD',
      bed: '-',
      allergies: [],
      renalImpairment: false,
      hepaticImpairment: false,
      waitTime: 10,
      notes: 'Newly registered',
      priority: 'Normal'
    };

    state.patients.unshift(patient);
    saveState(state);
    form.reset();
    const messageBox = document.getElementById('formMessage');
    if (messageBox) messageBox.textContent = 'บันทึกผู้ป่วยเรียบร้อยแล้ว';
  });
}

function bindDepartmentForms() {
  const opdForm = document.getElementById('opdForm');
  if (opdForm) {
    opdForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const state = getState();
      const patient = getActivePatient(state);
      const note = document.getElementById('opdNote').value;
      if (!patient) return;
      patient.notes = note || 'OPD triage completed';
      patient.department = 'OPD';
      saveState(state);
      showDepartmentMessage(opdForm, 'บันทึกข้อมูล OPD แล้ว');
    });
  }

  const ipdForm = document.getElementById('ipdForm');
  if (ipdForm) {
    ipdForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const state = getState();
      const patient = getActivePatient(state);
      const bed = document.getElementById('bedNumber').value;
      const status = document.getElementById('ipdStatus').value;
      if (!patient) return;
      patient.bed = bed || 'Ward A-01';
      patient.status = status || 'Stable';
      patient.department = 'IPD';
      saveState(state);
      showDepartmentMessage(ipdForm, 'อัปเดตข้อมูล IPD แล้ว');
    });
  }

  const pharmacyForm = document.getElementById('pharmacyForm');
  if (pharmacyForm) {
    pharmacyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const state = getState();
      const patient = getActivePatient(state);
      const name = document.getElementById('drugName').value;
      const dose = Number(document.getElementById('drugDose').value || 0);
      const frequency = document.getElementById('drugFreq').value;
      if (!patient || !name) return;

      const alerts = [];
      if (patient.allergies.includes(name)) alerts.push('ผู้ป่วยแพ้ยา');
      if (state.medications.some((item) => item.patientId === patient.id && item.name === name)) alerts.push('ยาซ้ำ');
      if (dose > 1000) alerts.push('ขนาดยาเกิน');
      if (patient.renalImpairment) alerts.push('ไตทำงานผิดปกติ');
      if (patient.hepaticImpairment) alerts.push('ตับผิดปกติ');

      state.medications.unshift({ id: Date.now(), patientId: patient.id, name, dose, unit: 'mg', frequency, status: 'Ordered' });
      state.alerts = alerts.map((message, index) => ({ id: Date.now() + index, patientId: patient.id, message, severity: message === 'ผู้ป่วยแพ้ยา' ? 'High' : 'Medium' }));
      saveState(state);
      showDepartmentMessage(pharmacyForm, alerts.length ? `พบ Clinical Alert: ${alerts.join(', ')}` : 'สั่งยาเรียบร้อยแล้ว');
    });
  }

  const labForm = document.getElementById('labForm');
  if (labForm) {
    labForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const state = getState();
      const patient = getActivePatient(state);
      const test = document.getElementById('labTest').value;
      if (!patient || !test) return;
      state.labOrders.unshift({ id: Date.now(), patientId: patient.id, test, status: 'Pending', result: '-' });
      saveState(state);
      showDepartmentMessage(labForm, 'ส่งคำสั่ง Lab แล้ว');
    });
  }

  const xrayForm = document.getElementById('xrayForm');
  if (xrayForm) {
    xrayForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const state = getState();
      const patient = getActivePatient(state);
      const test = document.getElementById('xrayTest').value;
      if (!patient || !test) return;
      state.xrayOrders.unshift({ id: Date.now(), patientId: patient.id, test, status: 'Pending', result: '-' });
      saveState(state);
      showDepartmentMessage(xrayForm, 'ส่งคำสั่ง X-ray แล้ว');
    });
  }

  const billingForm = document.getElementById('billingForm');
  if (billingForm) {
    billingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const state = getState();
      const patient = getActivePatient(state);
      const amount = Number(document.getElementById('billingAmount').value || 0);
      const type = document.getElementById('billingType').value;
      if (!patient || !amount) return;
      state.billing.unshift({ id: Date.now(), patientId: patient.id, amount, type, status: 'Pending' });
      saveState(state);
      showDepartmentMessage(billingForm, 'สร้างบิลเรียบร้อยแล้ว');
    });
  }
}

function bindPatientSelection() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-patient-id]');
    if (!button) return;
    activePatientId = Number(button.dataset.patientId);
    localStorage.setItem('mediflow_active_patient', activePatientId);
    renderApp();
  });
}

function attachStateListeners() {
  window.addEventListener('storage', () => renderApp());
  window.addEventListener('mediflow:updated', () => renderApp());
}

function showDepartmentMessage(form, message) {
  const box = form.querySelector('.message');
  if (box) box.textContent = message;
}

function renderApp() {
  const page = document.body.dataset.page;
  const state = getState();
  const patients = state.patients || [];
  if (!activePatientId && patients.length) {
    activePatientId = Number(localStorage.getItem('mediflow_active_patient') || patients[0].id);
  }
  if (!patients.some((patient) => patient.id === activePatientId)) {
    activePatientId = patients[0]?.id || null;
  }

  if (page === 'dashboard') renderDashboard(state, patients);
  if (page === 'patients') renderPatientsPage(state, patients);
  if (page === 'opd') renderDepartmentPage(state, 'OPD', 'OPD Triage', patients);
  if (page === 'ipd') renderDepartmentPage(state, 'IPD', 'IPD Admission', patients);
  if (page === 'pharmacy') renderDepartmentPage(state, 'Pharmacy', 'Pharmacy', patients);
  if (page === 'lab') renderDepartmentPage(state, 'Lab', 'Lab', patients);
  if (page === 'xray') renderDepartmentPage(state, 'X-ray', 'X-ray', patients);
  if (page === 'billing') renderDepartmentPage(state, 'Billing', 'Billing', patients);
}

function renderDashboard(state, patients) {
  const today = new Date().toISOString().slice(0, 10);
  const totalToday = patients.filter((patient) => patient.admissionDate === today).length;
  const availableBeds = Math.max(20 - patients.filter((patient) => patient.bed && patient.bed !== '-').length, 0);
  const lowStock = state.stock.filter((item) => item.qty <= 10).length;
  const avgWait = patients.length ? Math.round(patients.reduce((sum, patient) => sum + Number(patient.waitTime || 0), 0) / patients.length) : 0;
  const commonDiagnoses = [...patients.reduce((map, patient) => {
    const count = map.get(patient.diagnosis) || 0;
    map.set(patient.diagnosis, count + 1);
    return map;
  }, new Map())].sort((a, b) => b[1] - a[1]).slice(0, 3);

  document.getElementById('todayPatients').textContent = totalToday;
  document.getElementById('availableBeds').textContent = availableBeds;
  document.getElementById('lowStock').textContent = lowStock;
  document.getElementById('avgWait').textContent = `${avgWait} min`;

  const departmentStatus = document.getElementById('departmentStatus');
  if (departmentStatus) {
    departmentStatus.innerHTML = [
      { name: 'OPD', count: patients.filter((p) => p.department === 'OPD').length },
      { name: 'IPD', count: patients.filter((p) => p.department === 'IPD').length },
      { name: 'Pharmacy', count: state.medications.length },
      { name: 'Lab', count: state.labOrders.length },
      { name: 'X-ray', count: state.xrayOrders.length },
      { name: 'Billing', count: state.billing.length }
    ].map((item) => `<div class="status-item"><strong>${item.name}</strong><div>${item.count} items</div></div>`).join('');
  }

  renderPatientSelector(patients);
  renderAiPanel(getActivePatient(state));
  renderCommonDiseases(commonDiagnoses);
}

function renderPatientsPage(state, patients) {
  const tableBody = document.getElementById('patientTableBody');
  if (!tableBody) return;
  tableBody.innerHTML = patients.length
    ? patients.map((patient) => `
        <tr>
          <td>${patient.hn}</td>
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.gender}</td>
          <td>${patient.diagnosis}</td>
          <td>${patient.admissionDate}</td>
          <td>${patient.status}</td>
        </tr>`).join('')
    : '<tr><td colspan="7">ยังไม่มีข้อมูลผู้ป่วย</td></tr>';
}

function renderDepartmentPage(state, departmentName, title, patients) {
  renderPatientSelector(patients);
  renderAiPanel(getActivePatient(state));
  const heading = document.querySelector('.topbar h1');
  if (heading) heading.textContent = title;
  const summary = document.querySelector('.topbar p');
  if (summary) summary.textContent = `${departmentName} workflow shared across all departments`;
}

function renderPatientSelector(patients) {
  const container = document.getElementById('patientList');
  if (!container) return;
  container.className = 'patient-list';
  container.innerHTML = patients.map((patient) => `
    <button type="button" class="${patient.id === activePatientId ? 'active' : ''}" data-patient-id="${patient.id}">
      ${patient.name} • ${patient.hn} • ${patient.diagnosis}
    </button>`).join('');
}

function renderAiPanel(patient) {
  const panel = document.getElementById('aiPanel');
  if (!panel) return;
  if (!patient) {
    panel.innerHTML = '<p class="muted">ยังไม่มีข้อมูลผู้ป่วยที่เลือก</p>';
    return;
  }

  const probable = inferProbableCondition(patient.diagnosis);
  const allergyMessage = patient.allergies?.length ? `ประวัติแพ้ยา: ${patient.allergies.join(', ')}` : 'ไม่มีประวัติแพ้ยา';
  const interaction = patient.renalImpairment ? 'ควรพิจารณาลดขนาดยาและตรวจระดับ creatinine' : 'ไม่มีสัญญาณ Drug Interaction ที่ชัดเจน';
  const guidance = patient.status === 'Critical' ? 'ให้ติดตามสัญญาณชีพและพิจารณาส่งต่อแผนกที่เกี่ยวข้องทันที' : 'ติดตามอาการและยืนยันตามแนวทางเวชปฏิบัติ';

  panel.innerHTML = `
    <h2>AI Assistant</h2>
    <p><strong>สรุปประวัติ:</strong> ${patient.name} เป็นผู้ป่วย ${patient.diagnosis} ในแผนก ${patient.department}</p>
    <p><strong>โรคที่เป็นไปได้:</strong> ${probable}</p>
    <p><strong>Clinical Alert:</strong> ${allergyMessage}</p>
    <p><strong>Drug Interaction:</strong> ${interaction}</p>
    <p><strong>แนวทางรักษา:</strong> ${guidance}</p>
  `;
}

function renderCommonDiseases(commonDiagnoses) {
  const panel = document.getElementById('commonDiseases');
  if (!panel) return;
  panel.innerHTML = commonDiagnoses.length ? commonDiagnoses.map(([name, count]) => `<div>${name}: ${count}</div>`).join('') : '<div>ไม่มีข้อมูล</div>';
}

function inferProbableCondition(diagnosis) {
  const text = diagnosis.toLowerCase();
  if (text.includes('pneumonia') || text.includes('cough')) return 'ปอดอักเสบหรือการติดเชื้อทางเดินหายใจ';
  if (text.includes('diab')) return 'เบาหวานหรือภาวะแทรกซ้อนจากน้ำตาลในเลือด';
  if (text.includes('hypertension') || text.includes('pressure')) return 'ความดันโลหิตสูง';
  return 'ต้องประเมินเพิ่มเติมตามอาการและผลตรวจ';
}

function getActivePatient(state) {
  return state.patients.find((patient) => patient.id === activePatientId) || state.patients[0] || null;
}

document.addEventListener('DOMContentLoaded', initializeApp);