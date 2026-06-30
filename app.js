const teachers = [
  "ศ.ดร.อาริต ธรรมโน",
  "ศ.ดร.สุขสันต์ พาณิชพาพิบูล",
  "ศ.ดร.กิติ์สุชาต พสุภา",
  "รศ.ดร.นพพร โชติกกำธร",
  "รศ.ดร.วรพจน์ กรีสุระเดช",
  "รศ.ดร.โชติพัชร์ ภรณวลัย",
  "รศ.ดร.ปานวิทย์ ธุวะนุติ",
  "รศ.ดร.กันต์พงษ์ วรรัตน์ปัญญา",
  "รศ.ดร.บุญเลิศ วัจจะตรากุล",
  "ผศ.ดร.โอฬาร วงศ์วิรัตน์",
  "ผศ.อัครินทร์ คุณกิตติ",
  "ผศ.ดร.ภัทรชัย ลลิตโรจน์วงศ์",
  "ผศ.ดร.พัฒนพงษ์ ฉันทมิตรโอภาส",
  "ผศ.ดร.สุเมธ ประภาวัต",
  "ผศ.ดร.อนันตพัฒน์ อนันตชัย",
  "ผศ.ดร.บุญประเสริฐ สุรักษ์รัตนสกุล",
  "ผศ.ดร.ลภัส ประดิษฐ์ทัศนีย์",
  "ผศ.ดร.สุพัณณดา โชติพันธ์",
  "ผศ.ดร.สมเกียรติ วังศิริพิทักษ์",
  "ผศ.ดร.สุภกิจ นุตยะสกุล",
  "ผศ.ดร.มานพ พันธ์โคกกรวด",
  "ผศ.ดร.กนกวรรณ อัจฉริยะชาญวณิช",
  "ผศ.ดร.สิริอร วิทยากร",
  "ผศ.ดร.พรสุรีย์ แจ่มศรี",
  "ผศ.ดร.สามารถ หมุดและ",
  "ผศ.ดร.ธราวิเชษฐ์ ธิติจรูญโรจน์",
  "ผศ.ดร.ประพันธ์ ปวรางกูร",
  "ผศ.ดร.ทัศนัย พลอยสุวรรณ",
  "ผศ.ดร.สุวิทย์ ภูมิฤทธิกุล",
  "ผศ.ดร.นนท์ คนึงสุขเกษม",
  "อ.วารุณี บัววิรัตน์",
  "ดร.สุภวรรณ ทัศนประเสิรฐ",
  "ดร.ศิรสิทธิ์ โล่ห์ชนะจิต",
  "ดร.ณัฏฐ์ ดิลกธนากุล",
  "ดร.ภัทรภร วัฒนาชีพ",
  "ดร.อิสสระพงศ์ ค้วนเครือ",
  "ดร.ปาณิตา ธูสรานนท์",
  "อ.เฉลิมพล ศิริกายน",
  "ดร.ศรายุทธ นนท์ศิริ",
  "ดร.ธนานพ ทองถาวร",
  "ดร.สิทธิไกร ฉ.โรจน์ประเสริฐ",
  "ดร.สุทธิพงษ์ ยุนกระโทก"
];

const studyExpenseTypes = [
  "วิทยานิพนธ์ (ป.โท)",
  "วิทยานิพนธ์ (ป.เอก)",
  "การศึกษาอิสระ 2 (ป.โท)",
  "โครงงาน 2 (ป.ตรี)",
  "สหกิจศึกษา (ป.ตรี)",
  "ฝึกทักษะวิชาชีพ (ป.ตรี)"
];

const examExpenseTypes = [
  "วิทยานิพนธ์ (ป.โท)",
  "วิทยานิพนธ์ (ป.เอก)",
  "การศึกษาอิสระ 1 (ป.โท)",
  "การศึกษาอิสระ 2 (ป.โท)",
  "โครงงาน 1 (ป.ตรี)",
  "โครงงาน 2 (ป.ตรี)",
  "สหกิจศึกษา (ป.ตรี)",
  "ฝึกทักษะวิชาชีพ (ป.ตรี)",
  "วัดคุณสมบัติ (ป.เอก)"
];

const majors = [
  "เทคโนโลยีสารสนเทศ",
  "วิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ",
  "เทคโนโลยีสารสนเทศทางธุรกิจ (นานาชาติ)",
  "เทคโนโลยีปัญญาประดิษฐ์",
  "ปัญญาประดิษฐ์เพื่อการวิเคราะห์เชิงธุรกิจ"
];

const courseTypes = [
  "วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ (IT)",
  "วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ (DSBA)",
  "วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ) (BIT)",
  "วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีปัญญาประดิษฐ์ (AIT)",
  "วิทยาศาสตรมหาบัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ (IT)",
  "วิทยาศาสตรมหาบัณฑิต สาขาวิชาปัญญาประดิษฐ์เพื่อการวิเคราะห์เชิงธุรกิจ (AIBA)",
  "ปรัชญาดุษฎีบัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ (หลักสูตรนานาชาติ) (IT)",
  "ปรัชญาดุษฎีบัณฑิต สาขาวิชาปัญญาประดิษฐ์เพื่อการวิเคราะห์เชิงธุรกิจ (หลักสูตรนานาชาติ) (AIBA)"
];

const expenseCombos = [
  "ค่าลงทะเบียน",
  "ค่าที่พัก",
  "ค่าเบี้ยเลี้ยง",
  "ค่าเดินทาง",
  "ค่าลงทะเบียน+ค่าที่พัก",
  "ค่าลงทะเบียน+ค่าเบี้ยเลี้ยง",
  "ค่าลงทะเบียน+ค่าเดินทาง",
  "ค่าลงทะเบียน+ค่าที่พัก+ค่าเบี้ยเลี้ยง",
  "ค่าลงทะเบียน+ค่าที่พัก+ค่าเดินทาง",
  "ค่าลงทะเบียน+ค่าเบี้ยเลี้ยง+ค่าเดินทาง",
  "ค่าลงทะเบียน+ค่าที่พัก+ค่าเบี้ยเลี้ยง+ค่าเดินทาง"
];

const categories = [
  {
    id: "advisor",
    label: "4.1.1 ค่าตอบแทนอาจารย์ที่ปรึกษา",
    group: "4.1 ค่าตอบแทน",
    fields: [
      { type: "radio", name: "advisorType", label: "ประเภทอาจารย์ที่ปรึกษา (ระดับการศึกษา)", options: studyExpenseTypes, required: true },
      { type: "select", name: "major", label: "สาขาวิชา", options: majors, required: true },
      { type: "text", name: "topic", label: "ชื่อหัวข้อ", required: true },
      { type: "text", name: "semester", label: "ภาคการศึกษา/ปีการศึกษา", placeholder: "เช่น 1/2568", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  },
  {
    id: "examCommittee",
    label: "4.1.2 ค่ากรรมการสอบ",
    group: "4.1 ค่าตอบแทน",
    fields: [
      { type: "radio", name: "examType", label: "ประเภทกรรมการสอบ (ระดับการศึกษา)", options: examExpenseTypes, required: true },
      { type: "select", name: "major", label: "สาขาวิชา", options: majors, required: true },
      { type: "text", name: "topic", label: "ชื่อหัวข้อ", required: true },
      { type: "text", name: "semester", label: "ภาคการศึกษา/ปีการศึกษา", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  },
  {
    id: "examOperation",
    label: "4.1.3 ค่าดำเนินการสอบ",
    group: "4.1 ค่าตอบแทน",
    fields: [
      { type: "radio", name: "committeeType", label: "ประเภทกรรมการ", options: ["คุมสอบกลางภาค", "คุมสอบปลายภาค", "อำนวยการสอบกลางภาค", "อำนวยการสอบปลายภาค", "สอบสัมภาษณ์รับเข้า", "ออกข้อสอบเข้า", "ตรวจข้อสอบเข้า"], required: true },
      { type: "radio", name: "educationLevel", label: "ระดับการศึกษา", options: ["ปริญญาตรี", "ปริญญาโท", "ปริญญาเอก", "ปริญญาโท + เอก"], required: true },
      { type: "text", name: "semester", label: "ภาคการศึกษา/ปีการศึกษา", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  },
  {
    id: "teaching",
    label: "4.1.4 ค่าสอน",
    group: "4.1 ค่าตอบแทน",
    fields: [
      { type: "radio", name: "teachingType", label: "ประเภทค่าสอน", options: ["เกินภาระงานสอน ป.ตรี", "เกินภาระงานสอน ป.โท", "ค่าตอบแทนหลักสูตร Inter"], required: true },
      { type: "text", name: "semester", label: "ภาคการศึกษา/ปีการศึกษา", required: true },
      { type: "number", name: "hours", label: "จำนวนชั่วโมง", min: "0", step: "0.5", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  },
  {
    id: "curriculumCommittee",
    label: "4.1.5 ค่าตอบแทนกรรมการดำเนินการหลักสูตร",
    group: "4.1 ค่าตอบแทน",
    fields: [
      { type: "select", name: "courseType", label: "ประเภทหลักสูตร", options: courseTypes, required: true },
      { type: "text", name: "academicYear", label: "ปีการศึกษา", placeholder: "เช่น 2568", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  },
  {
    id: "speaker",
    label: "4.1.6 ค่าวิทยากร",
    group: "4.1 ค่าตอบแทน",
    fields: [
      { type: "text", name: "projectName", label: "ชื่อโครงการ", required: true },
      { type: "text", name: "courseName", label: "ชื่อหลักสูตร", required: true },
      { type: "number", name: "hours", label: "จำนวนชั่วโมง", min: "0", step: "0.5", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  },
  {
    id: "pageCharge",
    label: "4.2.1 ค่าใช้จ่ายสำหรับการตีพิมพ์ (Page charge)",
    group: "4.2 ค่าใช้จ่ายในการเผยแพร่ผลงานวิชาการ",
    fields: [
      { type: "text", name: "journalName", label: "ชื่อวารสาร", required: true },
      { type: "text", name: "articleName", label: "ชื่อบทความ", required: true },
      { type: "date", name: "paymentDate", label: "วัน/เดือน/ปี ที่เบิกจ่าย", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  },
  {
    id: "conference",
    label: "4.2.2 ค่าใช้จ่ายในการเดินทางไปเสนอผลงานวิชาการ (Conference)",
    group: "4.2 ค่าใช้จ่ายในการเผยแพร่ผลงานวิชาการ",
    fields: [
      { type: "radio", name: "conferenceLevel", label: "ระดับการประชุมวิชาการ", options: ["ระดับชาติ", "ระดับนานาชาติ"], required: true },
      { type: "text", name: "conferenceName", label: "ชื่อการประชุมวิชาการ", required: true },
      { type: "text", name: "articleName", label: "ชื่อบทความ", required: true },
      { type: "select", name: "expenseType", label: "ประเภทค่าใช้จ่าย", options: expenseCombos, required: true },
      { type: "date", name: "paymentDate", label: "วัน/เดือน/ปี ที่เบิกจ่าย", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  },
  {
    id: "service",
    label: "4.3 ค่าใช้สอย",
    group: "4.3 ค่าใช้สอย",
    fields: [
      { type: "radio", name: "serviceType", label: "ประเภทค่าใช้สอย", options: ["ค่าลิขสิทธิ์ซอฟต์แวร์", "ค่าสมัครสมาชิก", "ค่าธรรมเนียม", "อื่น ๆ"], required: true },
      { type: "text", name: "serviceDetail", label: "รายละเอียดค่าใช้สอย", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  },
  {
    id: "material",
    label: "4.4 ค่าวัสดุ",
    group: "4.4 ค่าวัสดุ",
    fields: [
      { type: "radio", name: "materialType", label: "ประเภทค่าวัสดุ", options: ["คอมพิวเตอร์", "การศึกษา", "อื่น ๆ"], required: true },
      { type: "text", name: "materialDetail", label: "รายละเอียดค่าวัสดุ", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  },
  {
    id: "travel",
    label: "4.5 ค่าเดินทาง",
    group: "4.5 ค่าเดินทาง",
    fields: [
      { type: "radio", name: "travelType", label: "ประเภทค่าเดินทาง", options: ["ค่าเดินทางไปราชการ (ในประเทศ)", "ค่าเดินทางไปราชการ (ต่างประเทศ)", "ค่าเดินทางไปเจรจาธุรกิจ (ในประเทศ)", "ค่าเดินทางไปเจรจาธุรกิจ (ต่างประเทศ)"], required: true },
      { type: "text", name: "travelDetail", label: "เรื่อง/รายละเอียด", required: true },
      { type: "select", name: "expenseType", label: "ประเภทค่าใช้จ่าย", options: expenseCombos, required: true },
      { type: "date", name: "paymentDate", label: "วัน/เดือน/ปี ที่เบิกจ่าย", required: true },
      { type: "money", name: "amount", label: "จำนวนเงิน", required: true }
    ]
  }
];

const form = document.querySelector("#expenseForm");
const teacherSelect = document.querySelector("#teacherName");
const categorySelect = document.querySelector("#category");
const dynamicFields = document.querySelector("#dynamicFields");
const categoryHint = document.querySelector("#categoryHint");
const resultDialog = document.querySelector("#resultDialog");
const resultJson = document.querySelector("#resultJson");
const docDatePicker = document.querySelector("[data-thai-date-picker]");
const docDateInput = document.querySelector("#docDate");
const fiscalYearInput = document.querySelector("#fiscalYear");

function option(value, label, selected = false) {
  const item = document.createElement("option");
  item.value = value;
  item.textContent = label;
  item.selected = selected;
  return item;
}

function fillSelect(select, placeholder, items) {
  select.innerHTML = "";
  select.append(option("", placeholder, true));
  items.forEach((item) => {
    if (typeof item === "string") {
      select.append(option(item, item));
    } else {
      select.append(option(item.id, item.label));
    }
  });
}

function stripCategoryNumber(label) {
  return label.replace(/^\d+(?:\.\d+)*\s*/, "");
}

function fillCategorySelect(select, placeholder, items) {
  select.innerHTML = "";
  select.append(option("", placeholder, true));
  items.forEach((item) => {
    select.append(option(item.id, stripCategoryNumber(item.label)));
  });
}

function createField(field) {
  if (field.type === "radio" || field.type === "checkbox") {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "option-group option-group--inline";
    fieldset.dataset.fieldName = field.name;
    const legend = document.createElement("legend");
    legend.innerHTML = `${field.label} ${field.required ? "<b>*</b>" : ""}`;
    fieldset.append(legend);
    field.options.forEach((choice, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = field.type;
      input.name = field.name;
      input.value = choice;
      input.required = Boolean(field.required && index === 0 && field.type === "radio");
      label.append(input, document.createTextNode(choice));
      fieldset.append(label);
    });
    return fieldset;
  }

  const label = document.createElement("label");
  label.className = "field";
  const title = document.createElement("span");
  title.innerHTML = `${field.label} ${field.required ? "<b>*</b>" : ""}`;
  label.append(title);

  if (field.type === "select") {
    const select = document.createElement("select");
    select.name = field.name;
    select.required = Boolean(field.required);
    fillSelect(select, `-- เลือก${field.label} --`, field.options);
    label.append(select);
    return label;
  }

  const input = document.createElement("input");
  input.name = field.name;
  input.type = field.type === "money" ? "number" : field.type;
  input.placeholder = field.placeholder || `ระบุ${field.label}`;
  input.required = Boolean(field.required);
  if (field.type === "money") {
    input.min = "0";
    input.step = "0.01";
    input.inputMode = "decimal";
  }
  if (field.min) input.min = field.min;
  if (field.step) input.step = field.step;
  label.append(input);
  return label;
}

function renderDynamicFields() {
  const selected = categories.find((item) => item.id === categorySelect.value);
  dynamicFields.innerHTML = "";

  if (!selected) {
    categoryHint.textContent = "เลือกหมวดหมู่ค่าใช้จ่ายเพื่อแสดงช่องกรอกข้อมูลที่เกี่ยวข้อง";
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "ยังไม่ได้เลือกหมวดหมู่ค่าใช้จ่าย";
    dynamicFields.append(empty);
    updateSummary();
    return;
  }

  categoryHint.textContent = `${stripCategoryNumber(selected.group)} / ${stripCategoryNumber(selected.label)}`;
  const panel = document.createElement("div");
  panel.className = "sub-panel";
  const heading = document.createElement("h3");
  heading.textContent = stripCategoryNumber(selected.label);
  panel.append(heading);

  const grid = document.createElement("div");
  grid.className = "form-grid form-grid--two";
  selected.fields.forEach((field) => grid.append(createField(field)));
  panel.append(grid);
  dynamicFields.append(panel);
  updateSummary();
}

function getFormData() {
  const data = new FormData(form);
  const selectedCategory = categories.find((item) => item.id === data.get("category"));
  const payload = {
    docNo: data.get("docNo") || "",
    docDate: data.get("docDate") || "",
    fiscalYear: data.get("fiscalYear") || "",
    teacherName: data.get("teacherName") || "",
    category: selectedCategory ? selectedCategory.label : "",
    categoryGroup: selectedCategory ? selectedCategory.group : "",
    details: {},
    attachments: data.getAll("attachments"),
    otherAttachment: data.get("otherAttachment") || "",
    note: data.get("note") || ""
  };

  if (selectedCategory) {
    selectedCategory.fields.forEach((field) => {
      if (field.type === "checkbox") {
        payload.details[field.name] = data.getAll(field.name);
      } else {
        payload.details[field.name] = data.get(field.name) || "";
      }
    });
  }

  return payload;
}

function formatMoney(value) {
  const amount = Number(value || 0);
  return `${amount.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`;
}

function updateSummary() {
  const payload = getFormData();
  document.querySelector("#summaryDocNo").textContent = payload.docNo || "ยังไม่ได้ระบุ";
  document.querySelector("#summaryDate").textContent = payload.docDate || "ยังไม่ได้ระบุ";
  document.querySelector("#summaryFiscalYear").textContent = payload.fiscalYear || "ยังไม่ได้ระบุ";
  document.querySelector("#summaryTeacher").textContent = payload.teacherName || "ยังไม่ได้เลือก";
  document.querySelector("#summaryCategory").textContent = payload.category ? stripCategoryNumber(payload.category) : "ยังไม่ได้เลือก";
  document.querySelector("#summaryAmount").textContent = formatMoney(payload.details.amount);
}

function showResult(payload) {
  resultJson.textContent = JSON.stringify(payload, null, 2);
  if (typeof resultDialog.showModal === "function") {
    resultDialog.showModal();
  } else {
    alert(resultJson.textContent);
  }
}

const thaiMonths = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม"
];

const thaiWeekdays = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

function padDate(value) {
  return String(value).padStart(2, "0");
}

function formatThaiShortDate(date) {
  const buddhistYear = date.getFullYear() + 543;
  return `${padDate(date.getDate())}/${padDate(date.getMonth() + 1)}/${padDate(buddhistYear % 100)}`;
}

function parseThaiShortDate(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const buddhistYear = 2500 + Number(match[3]);
  const date = new Date(buddhistYear - 543, month, day);
  if (date.getDate() !== day || date.getMonth() !== month) return null;
  return date;
}

function calculateFiscalYear(date) {
  const buddhistYear = date.getFullYear() + 543;
  return date.getMonth() >= 9 ? buddhistYear + 1 : buddhistYear;
}

function syncFiscalYearFromDocDate() {
  const date = parseThaiShortDate(docDateInput.value);
  if (!date) {
    fiscalYearInput.value = "";
    return;
  }
  fiscalYearInput.value = String(calculateFiscalYear(date));
}

function createYearOptions(selectedYear) {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 30;
  const endYear = currentYear + 10;
  let options = "";

  for (let year = startYear; year <= endYear; year += 1) {
    options += `<option value="${year}" ${year === selectedYear ? "selected" : ""}>${year + 543}</option>`;
  }

  if (selectedYear < startYear || selectedYear > endYear) {
    options += `<option value="${selectedYear}" selected>${selectedYear + 543}</option>`;
  }

  return options;
}

function initThaiDatePicker(picker) {
  if (!picker) return;
  const input = picker.querySelector("input");
  const toggle = picker.querySelector("button");
  const panel = picker.querySelector(".date-picker__panel");
  let viewDate = parseThaiShortDate(input.value) || new Date();

  function closeCalendar() {
    panel.hidden = true;
  }

  function openCalendar() {
    viewDate = parseThaiShortDate(input.value) || viewDate || new Date();
    renderCalendar();
    panel.hidden = false;
  }

  function selectDate(date) {
    input.value = formatThaiShortDate(date);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    closeCalendar();
    input.focus();
  }

  function renderCalendar() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0).getDate();
    const selectedDate = parseThaiShortDate(input.value);
    const today = new Date();
    let days = "";

    for (let index = 0; index < firstDay.getDay(); index += 1) {
      days += '<span class="date-picker__empty"></span>';
    }

    for (let day = 1; day <= lastDate; day += 1) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === today.toDateString();
      days += `<button type="button" class="${isSelected ? "is-selected" : ""} ${isToday ? "is-today" : ""}" data-day="${day}">${day}</button>`;
    }

    panel.innerHTML = `
      <div class="date-picker__head">
        <button type="button" data-move="-1" aria-label="เดือนก่อนหน้า">‹</button>
        <div class="date-picker__selectors">
          <select class="date-picker__month" aria-label="เลือกเดือน">
            ${thaiMonths.map((monthName, index) => `<option value="${index}" ${index === month ? "selected" : ""}>${monthName}</option>`).join("")}
          </select>
          <select class="date-picker__year" aria-label="เลือกปี พ.ศ.">
            ${createYearOptions(year)}
          </select>
        </div>
        <button type="button" data-move="1" aria-label="เดือนถัดไป">›</button>
      </div>
      <div class="date-picker__weekdays">${thaiWeekdays.map((day) => `<span>${day}</span>`).join("")}</div>
      <div class="date-picker__days">${days}</div>
    `;
  }

  toggle.addEventListener("click", () => {
    if (panel.hidden) {
      openCalendar();
    } else {
      closeCalendar();
    }
  });

  input.addEventListener("focus", openCalendar);

  input.addEventListener("blur", () => {
    const parsed = parseThaiShortDate(input.value);
    if (parsed) input.value = formatThaiShortDate(parsed);
  });

  panel.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.move) {
      viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + Number(button.dataset.move), 1);
      renderCalendar();
      return;
    }
    if (button.dataset.day) {
      selectDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), Number(button.dataset.day)));
    }
  });

  panel.addEventListener("change", (event) => {
    if (!event.target.matches(".date-picker__month, .date-picker__year")) return;
    const monthSelect = panel.querySelector(".date-picker__month");
    const yearSelect = panel.querySelector(".date-picker__year");
    viewDate = new Date(Number(yearSelect.value), Number(monthSelect.value), 1);
    renderCalendar();
  });

  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target)) closeCalendar();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCalendar();
  });
}

initThaiDatePicker(docDatePicker);
fillSelect(teacherSelect, "-- เลือกชื่อผู้ขอเบิก --", teachers);
fillCategorySelect(categorySelect, "-- เลือกหมวดหมู่ค่าใช้จ่าย --", categories);
renderDynamicFields();

categorySelect.addEventListener("change", renderDynamicFields);
docDateInput.addEventListener("input", syncFiscalYearFromDocDate);
docDateInput.addEventListener("change", syncFiscalYearFromDocDate);
form.addEventListener("input", updateSummary);
form.addEventListener("change", updateSummary);

const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzrbk1RXcDRXPAhj9nmwivp-rA1VQkuI4oc9GOAl-BzzC4dK-Bwt-cNeoQIWCLn3DA9/exec";

async function saveToGoogleSheet(payload) {
  await fetch(GOOGLE_SHEET_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const payload = getFormData();
  localStorage.setItem("facultyExpenseDraft", JSON.stringify(payload));
  await saveToGoogleSheet(payload);
  showResult(payload);
});

document.querySelector("#resetButton").addEventListener("click", () => {
  form.reset();
  renderDynamicFields();
  localStorage.removeItem("facultyExpenseDraft");
});
