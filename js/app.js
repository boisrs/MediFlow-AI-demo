const STORAGE_KEY = 'mediflow_emr_state';
let activePatientId = null;
const LOCALE_KEY = 'mediflow_locale';
const TRANSLATIONS = {
  lo: {
    'nav.dashboard': 'ແຜງຄວບຄຸມ',
    'nav.patients': 'ລົງທະບຽນຜູ້ເປັນໄຂ້',
    'nav.opd': 'OPD',
    'nav.ipd': 'IPD',
    'nav.pharmacy': 'ຮ້ານຢາ',
    'nav.lab': 'ໂຮງທົດສອບ',
    'nav.xray': 'X-ray',
    'nav.billing': 'ການຈ່າຍເງິນ',
    'nav.logout': 'ອອກຈາກລະບົບ',
    'common.language': 'ພາສາ',
    'common.language_switcher': 'ປ່ຽນພາສາ',
    'common.select_patient': 'ເລືອກຜູ້ເປັນໄຂ້',
    'common.no_patient_data': 'ຍັງບໍ່ມີຂໍ້ມູນຜູ້ເປັນໄຂ້',
    'common.no_results': 'ຍັງບໍ່ມີຜົນການທົດສອບ',
    'common.unknown': 'ບໍ່ຮູ້',
    'status.stable': 'ສະຖານະດີ',
    'status.critical': 'ສະຖານະຮຸນແຮງ',
    'status.discharged': 'ອອກເຮັດ',
    'status.pending': 'ຍັງລໍຖ້າ',
    'status.completed': 'ສຳເລັດ',
    'patients.gender.male': 'ຊາຍ',
    'patients.gender.female': 'ຍິງ',
    'patients.gender.other': 'ອື່ນໆ',
    'patients.status.stable': 'ສະຖານະດີ',
    'patients.status.critical': 'ສະຖານະຮຸນແຮງ',
    'patients.status.discharged': 'ອອກເຮັດ',
    'billing.type.consultation': 'ການປຶກສາ',
    'billing.type.admission': 'ຮັບຄົນເຈັບ',
    'billing.type.lab': 'Lab',
    'billing.type.imaging': 'X-ray',
    'dashboard.cards.today_patients': 'ຈຳນວນຜູ້ເປັນໄຂ້ໃນມື້ນີ້',
    'dashboard.cards.available_beds': 'ຕຽງວ່າງ',
    'dashboard.cards.low_stock': 'ຢາໃກ້ໝົດ',
    'dashboard.cards.avg_wait': 'ໄລຍະເວລາລໍຖ້າ້ສະເລ່ຍ',
    'dashboard.departments.opd': 'OPD',
    'dashboard.departments.ipd': 'IPD',
    'dashboard.departments.pharmacy': 'ຮ້ານຢາ',
    'dashboard.departments.lab': 'ໂຮງທົດສອບ',
    'dashboard.departments.xray': 'X-ray',
    'dashboard.departments.billing': 'ການຈ່າຍເງິນ',
    'dashboard.ai_assistant': 'ຜູ້ຊ່ວຍອັດສະລິຍະ',
    'dashboard.ai.summary': 'ສະຫຼຸບປະຫວັດ:',
    'dashboard.ai.probable': 'ພະຍາດທີ່ເປັນໄປໄດ້:',
    'dashboard.ai.alert': 'ການແຈ້ງເຕືອນ:',
    'dashboard.ai.interaction': 'ການໂຕ້ຕອບຢາ:',
    'dashboard.ai.guidance': 'ຄຳແນະນຳ:',
    'dashboard.ai.interaction.none': 'ບໍ່ມີສັນຍານການໂຕ້ຕອບຢາທີ່ຈະແນ່ໃຈ',
    'dashboard.ai.interaction.renal': 'ຄວາມຈໍາເປັນຕ້ອງປະຈຸບັນຂະໜາດຢາແລະກວດ creatinine',
    'dashboard.ai.guidance.critical': 'ຕິດຕາມອາການຊີວິດຂອງຄົນເຈັບແລະພິຈາລະນາສົ່ງໄປບໍລິຫານທີ່ກ່ຽວຂ້ອງ',
    'dashboard.ai.guidance.normal': 'ຕິດຕາມອາການແລະຢືນຢັນໂດຍອີງໃສ່ຄູ່ມືທາງການປິ່ນປົວ',
    'messages.patient_saved': 'ບັນທຶກຜູ້ເປັນໄຂ້ສຳເລັດແລ້ວ',
    'messages.opd_saved': 'ບັນທຶກ OPD ແລ້ວ',
    'messages.login_required': 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ແລະລະຫັດຜ່ານກ່ອນເຂົ້າສູ່ລະບົບ',
    'dashboard.ai.no_patient_selected': 'ຍັງບໍ່ມີຜູ້ເປັນໄຂ້ທີ່ເລືອກ',
    'diagnoses.pneumonia': 'ພະຍາດຝັງປະສົມທີ່ມີການຕິດເຊື້ອທາງຫາງເດີມ',
    'diagnoses.diabetes': 'ເບ້າຮາດຫຼືພະຍາດທີ່ກ່ຽວຂ້ອງກັບນ້ໍາຕານໃນເລືອດ',
    'diagnoses.hypertension': 'ຄວາມດັນເລືອດສູງ',
    'diagnoses.general': 'ຕ້ອງປະເມີນເພີ່ມເຕີມອີງໃສ່ອາການແລະຜົນການທົດສອບ',
    'messages.ipd_saved': 'ອັບເດດ IPD ແລ້ວ',
    'messages.pharmacy_saved': 'ສັ່ງຢາສຳເລັດແລ້ວ',
    'messages.lab_saved': 'ສົ່ງຄໍາສັ່ງ Lab ແລ້ວ',
    'messages.lab_result_saved': 'ບັນທຶກຜົນ Lab ແລ້ວ',
    'messages.xray_saved': 'ສົ່ງຄໍາສັ່ງ X-ray ແລ້ວ',
    'messages.xray_result_saved': 'ບັນທຶກຜົນ X-ray ແລ້ວ',
    'messages.billing_saved': 'ສ້າງບິນສຳເລັດແລ້ວ',
    'patients.title': 'ລົງທະບຽນຜູ້ເປັນໄຂ້',
    'patients.subtitle': 'ລະບົບລົງທະບຽນຜູ້ເປັນໄຂ້ສໍາລັບທຸກພາກສ່ວນ',
    'patients.add_new': 'ເພີ່ມຜູ້ເປັນໄຂ້ໃຫມ່',
    'patients.form.hn': 'HN',
    'patients.form.name': 'ຊື່ຜູ້ເປັນໄຂ້',
    'patients.form.age': 'ອາຍຸ',
    'patients.form.gender': 'ເພດ',
    'patients.form.diagnosis': 'ການວິນິຈາກ',
    'patients.form.status': 'ສະຖານະ',
    'patients.save': 'ບັນທຶກ',
    'patients.list': 'ລາຍຊື່ຜູ້ເປັນໄຂ້',
    'table.hn': 'HN',
    'table.name': 'ຊື່',
    'table.age': 'ອາຍຸ',
    'table.gender': 'ເພດ',
    'table.diagnosis': 'ການວິນິຈາກ',
    'table.admit_date': 'ວັນທີ່ຮັບຄົນເຈັບ',
    'table.status': 'ສະຖານະ',
    'dashboard.title': 'ແຜງຄວບຄຸມ',
    'dashboard.subtitle': 'ພາບລວມຜູ້ເປັນໄຂ້ແລະພາກສ່ວນໃນເວລາທີ່ແມ່ນ',
    'dashboard.live': 'ຊິງກັນໄດ້ຕອບສະໜອງ',
    'dashboard.department_status': 'ສະຖານະພາກສ່ວນ',
    'dashboard.patients': 'ຜູ້ເປັນໄຂ້ໃນລະບົບ',
    'opd.title': 'OPD',
    'opd.subtitle': 'ຂໍ້ມູນຜູ້ເປັນໄຂ້ສໍາລັບພາກສ່ວນຜູ້ເປັນໄຂ້ນອກ',
    'opd.select_patient': 'ເລືອກຜູ້ເປັນໄຂ້',
    'opd.record': 'ບັນທຶກ OPD',
    'opd.form.note': 'ບັນທຶກອາການແລະແຜນການຮັກສາ',
    'opd.save': 'ບັນທຶກ',
    'ipd.title': 'IPD',
    'ipd.subtitle': 'ຂໍ້ມູນຜູ້ເປັນໄຂ້ສໍາລັບພາກສ່ວນຜູ້ເປັນໄຂ້ໃນ',
    'ipd.record': 'ບັນທຶກ IPD',
    'ipd.form.bed': 'ຫ້ອງ / ເລກຕຽງ',
    'ipd.form.status': 'ສະຖານະ',
    'ipd.update': 'ອັບເດດ',
    'pharmacy.title': 'ຮ້ານຢາ',
    'pharmacy.subtitle': 'ລະບົບສັ່ງຢາແລະການແຈ້ງເຕືອນດ້ານການປິ່ນປົວ',
    'pharmacy.order': 'ສັ່ງຢາ',
    'pharmacy.form.name': 'ຊື່ຢາ',
    'pharmacy.form.dose': 'ຂະໜາດຢາ',
    'pharmacy.form.freq': 'ຄວາມຖືກ',
    'pharmacy.submit': 'ສັ່ງ',
    'lab.title': 'ໂຮງທົດສອບ',
    'lab.subtitle': 'ຄໍາສັ່ງທົດສອບ',
    'lab.order': 'ສົ່ງຄໍາສັ່ງທົດສອບ',
    'lab.form.test': 'ປະເພດການທົດສອບ',
    'lab.submit': 'ສົ່ງຄໍາສັ່ງ',
    'lab.result.title': 'ໃສ່ຜົນ Lab',
    'lab.result.value': 'ຜົນການທົດສອບ',
    'lab.result.save': 'ບັນທຶກຜົນ',
    'lab.result.list': 'ຜົນ Lab ຫຼ້າສຸດ',
    'xray.title': 'X-ray',
    'xray.subtitle': 'ຄໍາສັ່ງການສະແດງຮູບ',
    'xray.order': 'ສົ່ງຄໍາສັ່ງ X-ray',
    'xray.form.test': 'ປະເພດການທົດສອບ',
    'xray.submit': 'ສົ່ງຄໍາສັ່ງ',
    'xray.result.title': 'ໃສ່ຜົນ X-ray',
    'xray.result.value': 'ຜົນຮູບ',
    'xray.result.save': 'ບັນທຶກຜົນ',
    'xray.result.list': 'ຜົນ X-ray ຫຼ້າສຸດ',
    'billing.title': 'ການຈ່າຍເງິນ',
    'billing.subtitle': 'ຂໍ້ມູນຄ່າໃຊ້ຈ່າຍ',
    'billing.create': 'ສ້າງໃບບິນ',
    'billing.form.amount': 'ຈຳນວນເງິນ',
    'billing.form.type': 'ປະເພດ',
    'billing.submit': 'ສ້າງ',
    'login.title': 'MediFlow AI',
    'login.subtitle': 'ລະບົບ EMR ທີ່ເຊື່ອມທຸກພາກສ່ວນໃນບ່ອນດຽວ',
    'login.form.username': 'ຊື່ຜູ້ໃຊ້',
    'login.form.password': 'ລະຫັດຜ່ານ',
    'login.submit': 'ເຂົ້າສູ່ລະບົບ',
    'login.hint': 'ຕົວຢ່າງ: ໃສ່ຊື່ຜູ້ໃຊ້ແລະລະຫັດຜ່ານໃດກໍໄດ້'
  },
  th: {
    'nav.dashboard': 'แดชบอร์ด',
    'nav.patients': 'ทะเบียนผู้ป่วย',
    'nav.opd': 'OPD',
    'nav.ipd': 'IPD',
    'nav.pharmacy': 'ร้านยา',
    'nav.lab': 'แล็บ',
    'nav.xray': 'เอ็กซเรย์',
    'nav.billing': 'การเงิน',
    'nav.logout': 'ออกจากระบบ',
    'common.language': 'ภาษา',
    'common.language_switcher': 'เปลี่ยนภาษา',
    'common.select_patient': 'เลือกผู้ป่วย',
    'common.no_patient_data': 'ยังไม่มีข้อมูลผู้ป่วย',
    'common.no_results': 'ยังไม่มีผลตรวจ',
    'common.unknown': 'ไม่ทราบ',
    'status.stable': 'เสถียร',
    'status.critical': 'วิกฤต',
    'status.discharged': 'จำหน่าย',
    'status.pending': 'รอดำเนินการ',
    'status.completed': 'เสร็จสิ้น',
    'patients.gender.male': 'ชาย',
    'patients.gender.female': 'หญิง',
    'patients.gender.other': 'อื่น ๆ',
    'patients.status.stable': 'เสถียร',
    'patients.status.critical': 'วิกฤต',
    'patients.status.discharged': 'จำหน่าย',
    'billing.type.consultation': 'ปรึกษา',
    'billing.type.admission': ' admit ',
    'billing.type.lab': 'Lab',
    'billing.type.imaging': 'X-ray',
    'dashboard.cards.today_patients': 'จำนวนผู้ป่วยวันนี้',
    'dashboard.cards.available_beds': 'เตียงว่าง',
    'dashboard.cards.low_stock': 'ยาใกล้หมด',
    'dashboard.cards.avg_wait': 'เวลารอเฉลี่ย',
    'dashboard.departments.opd': 'OPD',
    'dashboard.departments.ipd': 'IPD',
    'dashboard.departments.pharmacy': 'ร้านยา',
    'dashboard.departments.lab': 'แล็บ',
    'dashboard.departments.xray': 'เอ็กซเรย์',
    'dashboard.departments.billing': 'การเงิน',
    'dashboard.ai_assistant': 'ผู้ช่วยแอป',
    'dashboard.ai.summary': 'สรุปประวัติ:',
    'dashboard.ai.probable': 'โรคที่เป็นไปได้:',
    'dashboard.ai.alert': 'Clinical Alert:',
    'dashboard.ai.interaction': 'Drug Interaction:',
    'dashboard.ai.guidance': 'แนวทางรักษา:',
    'dashboard.ai.interaction.none': 'ไม่มีสัญญาณ Drug Interaction ที่ชัดเจน',
    'dashboard.ai.interaction.renal': 'ควรพิจารณาลดขนาดยาและตรวจระดับ creatinine',
    'dashboard.ai.guidance.critical': 'ให้ติดตามสัญญาณชีพและพิจารณาส่งต่อแผนกที่เกี่ยวข้องทันที',
    'dashboard.ai.guidance.normal': 'ติดตามอาการและยืนยันตามแนวทางเวชปฏิบัติ',
    'messages.patient_saved': 'บันทึกผู้ป่วยเรียบร้อยแล้ว',
    'messages.opd_saved': 'บันทึกข้อมูล OPD แล้ว',
    'messages.login_required': 'กรุณากรอกชื่อผู้ใช้และรหัสผ่านก่อนเข้าสู่ระบบ',
    'dashboard.ai.no_patient_selected': 'ยังไม่มีผู้ป่วยที่เลือก',
    'diagnoses.pneumonia': 'ปอดอักเสบหรือการติดเชื้อทางเดินหายใจ',
    'diagnoses.diabetes': 'เบาหวานหรือภาวะแทรกซ้อนจากน้ำตาลในเลือด',
    'diagnoses.hypertension': 'ความดันโลหิตสูง',
    'diagnoses.general': 'ต้องประเมินเพิ่มเติมตามอาการและผลตรวจ',
    'messages.ipd_saved': 'อัปเดตข้อมูล IPD แล้ว',
    'messages.pharmacy_saved': 'สั่งยาเรียบร้อยแล้ว',
    'messages.lab_saved': 'ส่งคำสั่ง Lab แล้ว',
    'messages.lab_result_saved': 'บันทึกผล Lab แล้ว',
    'messages.xray_saved': 'ส่งคำสั่ง X-ray แล้ว',
    'messages.xray_result_saved': 'บันทึกผล X-ray แล้ว',
    'messages.billing_saved': 'สร้างบิลเรียบร้อยแล้ว',
    'patients.title': 'ทะเบียนผู้ป่วย',
    'patients.subtitle': 'ทะเบียนผู้ป่วยกลางสำหรับทุกแผนก',
    'patients.add_new': 'เพิ่มผู้ป่วยใหม่',
    'patients.form.hn': 'HN',
    'patients.form.name': 'ชื่อผู้ป่วย',
    'patients.form.age': 'อายุ',
    'patients.form.gender': 'เพศ',
    'patients.form.diagnosis': 'โรค/วินิจฉัย',
    'patients.form.status': 'สถานะ',
    'patients.save': 'บันทึก',
    'patients.list': 'รายการผู้ป่วย',
    'table.hn': 'HN',
    'table.name': 'ชื่อ',
    'table.age': 'อายุ',
    'table.gender': 'เพศ',
    'table.diagnosis': 'วินิจฉัย',
    'table.admit_date': 'วันที่ Admit',
    'table.status': 'สถานะ',
    'dashboard.title': 'แดชบอร์ด',
    'dashboard.subtitle': 'ภาพรวมผู้ป่วยและแผนกต่าง ๆ แบบเรียลไทม์',
    'dashboard.live': 'ซิงค์สด',
    'dashboard.department_status': 'สถานะแผนก',
    'dashboard.patients': 'ผู้ป่วยในระบบ',
    'opd.title': 'OPD',
    'opd.subtitle': 'ข้อมูลผู้ป่วยสำหรับแผนกผู้ป่วยนอก',
    'opd.select_patient': 'เลือกผู้ป่วย',
    'opd.record': 'บันทึก OPD',
    'opd.form.note': 'บันทึกอาการและแผนการรักษา',
    'opd.save': 'บันทึก',
    'ipd.title': 'IPD',
    'ipd.subtitle': 'ข้อมูลผู้ป่วยสำหรับแผนกผู้ป่วยใน',
    'ipd.record': 'บันทึก IPD',
    'ipd.form.bed': 'เลขเตียง',
    'ipd.form.status': 'สถานะ',
    'ipd.update': 'อัปเดต',
    'pharmacy.title': 'ร้านยา',
    'pharmacy.subtitle': 'ระบบสั่งยาและการแจ้งเตือนทางคลินิก',
    'pharmacy.order': 'สั่งยา',
    'pharmacy.form.name': 'ชื่อยา',
    'pharmacy.form.dose': 'ขนาดยา',
    'pharmacy.form.freq': 'ความถี่',
    'pharmacy.submit': 'สั่งยา',
    'lab.title': 'แล็บ',
    'lab.subtitle': 'คำสั่งตรวจทางห้องปฏิบัติการ',
    'lab.order': 'ส่งคำสั่ง Lab',
    'lab.form.test': 'ประเภทการตรวจ',
    'lab.submit': 'ส่งคำสั่ง',
    'lab.result.title': 'ใส่ผล Lab',
    'lab.result.value': 'ผลตรวจ',
    'lab.result.save': 'บันทึกผล',
    'lab.result.list': 'ผล Lab ล่าสุด',
    'xray.title': 'เอ็กซเรย์',
    'xray.subtitle': 'คำสั่งตรวจภาพรังสี',
    'xray.order': 'ส่งคำสั่ง X-ray',
    'xray.form.test': 'ประเภทการตรวจ',
    'xray.submit': 'ส่งคำสั่ง',
    'xray.result.title': 'ใส่ผล X-ray',
    'xray.result.value': 'ผลภาพ',
    'xray.result.save': 'บันทึกผล',
    'xray.result.list': 'ผล X-ray ล่าสุด',
    'billing.title': 'การเงิน',
    'billing.subtitle': 'ข้อมูลค่าใช้จ่ายและการเรียกเก็บ',
    'billing.create': 'สร้างบิล',
    'billing.form.amount': 'จำนวนเงิน',
    'billing.form.type': 'ประเภท',
    'billing.submit': 'สร้าง',
    'login.title': 'MediFlow AI',
    'login.subtitle': 'ระบบ EMR ที่เชื่อมทุกแผนกในเวลาเดียวกัน',
    'login.form.username': 'ชื่อผู้ใช้',
    'login.form.password': 'รหัสผ่าน',
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
    'common.language': 'Language',
    'common.language_switcher': 'Switch language',
    'common.select_patient': 'Select patient',
    'common.no_patient_data': 'No patient data yet',
    'common.no_results': 'No results yet',
    'common.unknown': 'Unknown',
    'status.stable': 'Stable',
    'status.critical': 'Critical',
    'status.discharged': 'Discharged',
    'status.pending': 'Pending',
    'status.completed': 'Completed',
    'patients.gender.male': 'Male',
    'patients.gender.female': 'Female',
    'patients.gender.other': 'Other',
    'patients.status.stable': 'Stable',
    'patients.status.critical': 'Critical',
    'patients.status.discharged': 'Discharged',
    'billing.type.consultation': 'Consultation',
    'billing.type.admission': 'Admission',
    'billing.type.lab': 'Lab',
    'billing.type.imaging': 'Imaging',
    'dashboard.cards.today_patients': 'Patients today',
    'dashboard.cards.available_beds': 'Available beds',
    'dashboard.cards.low_stock': 'Low stock',
    'dashboard.cards.avg_wait': 'Average wait',
    'dashboard.departments.opd': 'OPD',
    'dashboard.departments.ipd': 'IPD',
    'dashboard.departments.pharmacy': 'Pharmacy',
    'dashboard.departments.lab': 'Lab',
    'dashboard.departments.xray': 'X-ray',
    'dashboard.departments.billing': 'Billing',
    'dashboard.ai_assistant': 'AI Assistant',
    'dashboard.ai.summary': 'Summary history:',
    'dashboard.ai.probable': 'Probable condition:',
    'dashboard.ai.alert': 'Clinical Alert:',
    'dashboard.ai.interaction': 'Drug Interaction:',
    'dashboard.ai.guidance': 'Treatment guidance:',
    'dashboard.ai.interaction.none': 'No clear drug interaction signals',
    'dashboard.ai.interaction.renal': 'Consider dose review and creatinine check',
    'dashboard.ai.guidance.critical': 'Monitor vitals and escalate as needed',
    'dashboard.ai.guidance.normal': 'Continue follow-up according to clinical practice',
    'messages.patient_saved': 'Patient saved successfully',
    'messages.opd_saved': 'OPD record saved',
    'messages.ipd_saved': 'IPD record updated',
    'messages.pharmacy_saved': 'Medication ordered',
    'messages.lab_saved': 'Lab order sent',
    'messages.lab_result_saved': 'Lab result saved',
    'messages.xray_saved': 'X-ray order sent',
    'messages.xray_result_saved': 'X-ray result saved',
    'messages.billing_saved': 'Invoice created',
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
    'lab.result.title': 'Enter Lab Result',
    'lab.result.value': 'Test result',
    'lab.result.save': 'Save result',
    'lab.result.list': 'Latest Lab Results',
    'xray.title': 'X-ray',
    'xray.subtitle': 'Imaging orders',
    'xray.order': 'Send X-ray Order',
    'xray.form.test': 'Test type',
    'xray.submit': 'Send Order',
    'xray.result.title': 'Enter X-ray Result',
    'xray.result.value': 'Image result',
    'xray.result.save': 'Save result',
    'xray.result.list': 'Latest X-ray Results',
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
    renderApp();
  });
}

function t(key, locale = currentLocale()) {
  return (TRANSLATIONS[locale] || TRANSLATIONS.en || {})[key] || key;
}

function localizedValue(value, locale = currentLocale()) {
  const normalized = String(value || '').trim();
  if (!normalized) return t('common.unknown', locale);
  const lower = normalized.toLowerCase();
  if (['male', 'ชาย', 'ຊາຍ'].includes(lower)) return t('patients.gender.male', locale);
  if (['female', 'หญิง', 'ຍິງ'].includes(lower)) return t('patients.gender.female', locale);
  if (['other', 'อื่นๆ', 'อื่น ๆ', 'ອື່ນໆ'].includes(lower)) return t('patients.gender.other', locale);
  if (['stable', 'เสถียร', 'ສະຖານະດີ'].includes(lower)) return t('patients.status.stable', locale);
  if (['critical', 'วิกฤต', 'ສະຖານະຮຸນແຮງ'].includes(lower)) return t('patients.status.critical', locale);
  if (['discharged', 'จำหน่าย', 'ອອກເຮັດ'].includes(lower)) return t('patients.status.discharged', locale);
  if (['completed', 'เสร็จสิ้น', 'ສຳເລັດ'].includes(lower)) return t('status.completed', locale);
  if (['pending', 'รอดำเนินการ', 'ຍັງລໍຖ້າ'].includes(lower)) return t('status.pending', locale);
  return normalized;
}

function getDepartmentLabel(department, locale = currentLocale()) {
  const map = {
    OPD: 'dashboard.departments.opd',
    IPD: 'dashboard.departments.ipd',
    Pharmacy: 'dashboard.departments.pharmacy',
    Lab: 'dashboard.departments.lab',
    'X-ray': 'dashboard.departments.xray',
    Billing: 'dashboard.departments.billing'
  };
  const key = map[department];
  return key ? t(key, locale) : department;
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
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (dict[key]) el.setAttribute('aria-label', dict[key]);
  });
  updateSelectOptionLabels(locale);
}

function updateSelectOptionLabels(locale) {
  const optionMap = {
    'ชาย': t('patients.gender.male', locale),
    'หญิง': t('patients.gender.female', locale),
    'อื่นๆ': t('patients.gender.other', locale),
    'อื่น ๆ': t('patients.gender.other', locale),
    'Stable': t('patients.status.stable', locale),
    'Critical': t('patients.status.critical', locale),
    'Discharged': t('patients.status.discharged', locale),
    'Completed': t('status.completed', locale),
    'Pending': t('status.pending', locale),
    'Consultation': t('billing.type.consultation', locale),
    'Admission': t('billing.type.admission', locale),
    'Lab': t('billing.type.lab', locale),
    'Imaging': t('billing.type.imaging', locale)
  };

  document.querySelectorAll('select option').forEach((option) => {
    const translated = optionMap[option.value] || optionMap[option.textContent.trim()];
    if (translated) option.textContent = translated;
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
      alert(t('messages.login_required'));
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
    if (messageBox) messageBox.textContent = t('messages.patient_saved');
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
      showDepartmentMessage(opdForm, t('messages.opd_saved'));
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
      showDepartmentMessage(ipdForm, t('messages.ipd_saved'));
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
      showDepartmentMessage(pharmacyForm, alerts.length ? `${t('dashboard.ai.alert')} ${alerts.join(', ')}` : t('messages.pharmacy_saved'));
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
      showDepartmentMessage(labForm, t('messages.lab_saved'));
    });
  }

  const labResultForm = document.getElementById('labResultForm');
  if (labResultForm) {
    labResultForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const state = getState();
      const patient = getActivePatient(state);
      const result = document.getElementById('labResultValue').value.trim();
      const status = document.getElementById('labResultStatus').value || 'Completed';
      if (!patient || !result) return;
      const order = [...state.labOrders].filter((item) => item.patientId === patient.id).sort((a, b) => b.id - a.id)[0];
      if (order) {
        order.result = result;
        order.status = status;
      } else {
        state.labOrders.unshift({ id: Date.now(), patientId: patient.id, test: 'Lab Result', status, result });
      }
      saveState(state);
      showDepartmentMessage(labResultForm, t('messages.lab_result_saved'));
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
      showDepartmentMessage(xrayForm, t('messages.xray_saved'));
    });
  }

  const xrayResultForm = document.getElementById('xrayResultForm');
  if (xrayResultForm) {
    xrayResultForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const state = getState();
      const patient = getActivePatient(state);
      const result = document.getElementById('xrayResultValue').value.trim();
      const status = document.getElementById('xrayResultStatus').value || 'Completed';
      if (!patient || !result) return;
      const order = [...state.xrayOrders].filter((item) => item.patientId === patient.id).sort((a, b) => b.id - a.id)[0];
      if (order) {
        order.result = result;
        order.status = status;
      } else {
        state.xrayOrders.unshift({ id: Date.now(), patientId: patient.id, test: 'X-ray Result', status, result });
      }
      saveState(state);
      showDepartmentMessage(xrayResultForm, t('messages.xray_result_saved'));
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
      showDepartmentMessage(billingForm, t('messages.billing_saved'));
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
  if (page === 'opd') renderDepartmentPage(state, 'OPD', 'opd.title', patients);
  if (page === 'ipd') renderDepartmentPage(state, 'IPD', 'ipd.title', patients);
  if (page === 'pharmacy') renderDepartmentPage(state, 'Pharmacy', 'pharmacy.title', patients);
  if (page === 'lab') {
    renderDepartmentPage(state, 'Lab', 'lab.title', patients);
    renderDiagnosticResults(state, 'lab');
  }
  if (page === 'xray') {
    renderDepartmentPage(state, 'X-ray', 'xray.title', patients);
    renderDiagnosticResults(state, 'xray');
  }
  if (page === 'billing') renderDepartmentPage(state, 'Billing', 'billing.title', patients);
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
      { key: 'dashboard.departments.opd', count: patients.filter((p) => p.department === 'OPD').length },
      { key: 'dashboard.departments.ipd', count: patients.filter((p) => p.department === 'IPD').length },
      { key: 'dashboard.departments.pharmacy', count: state.medications.length },
      { key: 'dashboard.departments.lab', count: state.labOrders.length },
      { key: 'dashboard.departments.xray', count: state.xrayOrders.length },
      { key: 'dashboard.departments.billing', count: state.billing.length }
    ].map((item) => `<div class="status-item"><strong>${t(item.key)}</strong><div>${item.count} items</div></div>`).join('');
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
          <td>${localizedValue(patient.gender)}</td>
          <td>${patient.diagnosis}</td>
          <td>${patient.admissionDate}</td>
          <td>${localizedValue(patient.status)}</td>
        </tr>`).join('')
    : `<tr><td colspan="7">${t('common.no_patient_data')}</td></tr>`;
}

function renderDepartmentPage(state, departmentName, titleKey, patients) {
  renderPatientSelector(patients);
  renderAiPanel(getActivePatient(state));
  const heading = document.querySelector('.topbar h1');
  if (heading) heading.textContent = t(titleKey);
}

function renderDiagnosticResults(state, type) {
  const container = document.getElementById(type === 'lab' ? 'labResultsList' : 'xrayResultsList');
  if (!container) return;
  const orders = (state[`${type}Orders`] || []).slice(0, 8);
  container.innerHTML = orders.length
    ? orders.map((item) => {
        const patient = state.patients.find((entry) => entry.id === item.patientId);
        return `
          <div class="status-item">
            <strong>${patient ? patient.name : 'Unknown'}</strong>
            <div>${item.test}</div>
            <div>${t('status.' + (item.status || 'pending').toLowerCase())}</div>
            <div>${t('dashboard.ai.summary')} ${item.result || '-'}</div>
          </div>`;
      }).join('')
    : `<p class="muted">${t('common.no_results')}</p>`;
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
    panel.innerHTML = `<p class="muted">${t('dashboard.ai.no_patient_selected')}</p>`;
    return;
  }

  const probable = inferProbableCondition(patient.diagnosis);
  const allergyMessage = patient.allergies?.length ? `${t('dashboard.ai.alert')} ${patient.allergies.join(', ')}` : `${t('dashboard.ai.alert')} ${t('common.no_patient_data')}`;
  const interaction = patient.renalImpairment ? t('dashboard.ai.interaction.renal') : t('dashboard.ai.interaction.none');
  const guidance = patient.status === 'Critical' ? t('dashboard.ai.guidance.critical') : t('dashboard.ai.guidance.normal');

  panel.innerHTML = `
    <h2>${t('dashboard.ai_assistant')}</h2>
    <p><strong>${t('dashboard.ai.summary')}</strong> ${patient.name} • ${patient.diagnosis} • ${getDepartmentLabel(patient.department)}</p>
    <p><strong>${t('dashboard.ai.probable')}</strong> ${probable}</p>
    <p><strong>${t('dashboard.ai.alert')}</strong> ${allergyMessage}</p>
    <p><strong>${t('dashboard.ai.interaction')}</strong> ${interaction}</p>
    <p><strong>${t('dashboard.ai.guidance')}</strong> ${guidance}</p>
  `;
}

function renderCommonDiseases(commonDiagnoses) {
  const panel = document.getElementById('commonDiseases');
  if (!panel) return;
  panel.innerHTML = commonDiagnoses.length ? commonDiagnoses.map(([name, count]) => `<div>${name}: ${count}</div>`).join('') : '<div>ไม่มีข้อมูล</div>';
}

function inferProbableCondition(diagnosis, locale = currentLocale()) {
  const text = diagnosis.toLowerCase();
  if (text.includes('pneumonia') || text.includes('cough')) return t('diagnoses.pneumonia', locale);
  if (text.includes('diab')) return t('diagnoses.diabetes', locale);
  if (text.includes('hypertension') || text.includes('pressure')) return t('diagnoses.hypertension', locale);
  return t('diagnoses.general', locale);
}

function getActivePatient(state) {
  return state.patients.find((patient) => patient.id === activePatientId) || state.patients[0] || null;
}

document.addEventListener('DOMContentLoaded', initializeApp);