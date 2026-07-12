const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzgv0iBmCXTu5J3rRvccsqXrwyZ-TOh2n9BM-HJyXKzZ2SA5n6Uku7EF4hnYd-WUC97/exec";

const TEACHER_REPORT_NAMES = [
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

const state = {
  records: [],
  filtered: []
};

const elements = {
  topTeacherName: document.querySelector("#topTeacherName"),
  teacherNameHeading: document.querySelector("#teacherNameHeading"),
  avatar: document.querySelector("#teacherAvatar"),
  status: document.querySelector("#reportStatus"),
  lastUpdated: document.querySelector("#lastUpdated"),
  search: document.querySelector("#searchInput"),
  fiscalYear: document.querySelector("#fiscalYearFilter"),
  category: document.querySelector("#categoryFilter"),
  reload: document.querySelector("#reloadButton"),
  totalRecords: document.querySelector("#totalRecords"),
  filteredRecords: document.querySelector("#filteredRecords"),
  totalAmount: document.querySelector("#totalAmount"),
  body: document.querySelector("#reportBody")
};

const targetTeacherName = resolveTeacherName();

function resolveTeacherName() {
  const params = new URLSearchParams(window.location.search);
  const rawName = params.get("name") || params.get("teacher") || "";
  const normalizedName = normalizeText(rawName);
  return TEACHER_REPORT_NAMES.find((name) => normalizeText(name) === normalizedName) || rawName.trim();
}

function initializePage() {
  if (!targetTeacherName) {
    showError('ไม่พบชื่อผู้ขอเบิกใน URL กรุณาระบุ ?name=ชื่อผู้ขอเบิก');
    elements.topTeacherName.textContent = "ไม่พบชื่อผู้ขอเบิก";
    elements.teacherNameHeading.textContent = "ไม่พบชื่อผู้ขอเบิก";
    elements.reload.disabled = true;
    return;
  }

  document.title = `รายงานสรุปการเบิกจ่ายงบประมาณ - ${targetTeacherName}`;
  elements.topTeacherName.textContent = targetTeacherName;
  elements.teacherNameHeading.textContent = targetTeacherName;
  elements.avatar.textContent = createAvatarText(targetTeacherName);
  loadResponses();
}

function loadResponses() {
  elements.status.textContent = "กำลังโหลดข้อมูล";
  elements.reload.disabled = true;
  elements.body.innerHTML = '<tr><td colspan="6" class="empty-cell">กำลังโหลดข้อมูลจาก Google Sheet...</td></tr>';

  const callbackName = `handleTeacherResponses_${Date.now()}`;
  const script = document.createElement("script");
  const url = new URL(GOOGLE_SHEET_WEB_APP_URL);
  url.searchParams.set("action", "list");
  url.searchParams.set("limit", "1000");
  url.searchParams.set("callback", callbackName);

  window[callbackName] = (response) => {
    delete window[callbackName];
    script.remove();
    elements.reload.disabled = false;

    if (!response || !response.ok) {
      showError(response && response.error ? response.error : "ไม่สามารถโหลดข้อมูลได้");
      return;
    }

    const records = Array.isArray(response.records) ? response.records : [];
    state.records = records.filter((record) => normalizeText(record.teacherName) === normalizeText(targetTeacherName));
    elements.status.textContent = "โหลดข้อมูลแล้ว";
    elements.lastUpdated.textContent = `อัปเดตล่าสุด ${new Date().toLocaleString("th-TH")}`;
    populateFilters();
    applyFilters();
  };

  script.onerror = () => {
    delete window[callbackName];
    script.remove();
    elements.reload.disabled = false;
    showError("โหลดข้อมูลไม่สำเร็จ กรุณาตรวจสอบ URL Apps Script หรือสิทธิ์ Web App");
  };

  script.src = url.toString();
  document.body.append(script);
}

function showError(message) {
  elements.status.textContent = "โหลดข้อมูลไม่สำเร็จ";
  elements.body.innerHTML = `<tr><td colspan="6" class="empty-cell">${escapeHtml(message)}</td></tr>`;
}

function populateFilters() {
  fillFilter(elements.fiscalYear, "ทุกปีงบประมาณ", uniqueValues("fiscalYear"));
  fillFilter(elements.category, "ทุกหมวด", uniqueValues("category"));
}

function fillFilter(select, placeholder, values) {
  const currentValue = select.value;
  select.innerHTML = `<option value="">${placeholder}</option>`;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
  select.value = values.includes(currentValue) ? currentValue : "";
}

function uniqueValues(key) {
  return [...new Set(state.records.map((record) => String(record[key] || "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "th"));
}

function applyFilters() {
  const keyword = normalizeText(elements.search.value);
  const fiscalYear = elements.fiscalYear.value;
  const category = elements.category.value;

  state.filtered = state.records.filter((record) => {
    if (fiscalYear && String(record.fiscalYear) !== fiscalYear) return false;
    if (category && record.category !== category) return false;
    if (!keyword) return true;
    return createSearchText(record).includes(keyword);
  });

  renderSummary();
  renderRows();
}

function createSearchText(record) {
  return normalizeText([
    record.docNo,
    formatReportDate(record.docDate),
    record.fiscalYear,
    record.category,
    record.categoryGroup,
    record.note,
    JSON.stringify(record.details || {}),
    (record.attachments || []).join(" ")
  ].join(" "));
}

function renderSummary() {
  const totalAmount = state.filtered.reduce((sum, record) => sum + getAmount(record.details), 0);
  elements.totalRecords.textContent = state.records.length.toLocaleString("th-TH");
  elements.filteredRecords.textContent = state.filtered.length.toLocaleString("th-TH");
  elements.totalAmount.textContent = formatMoney(totalAmount);
}

function renderRows() {
  if (!state.filtered.length) {
    elements.body.innerHTML = '<tr><td colspan="6" class="empty-cell">ไม่พบข้อมูลตามเงื่อนไขที่เลือก</td></tr>';
    return;
  }

  elements.body.innerHTML = state.filtered.map((record) => `
    <tr>
      <td>${escapeHtml(record.docNo)}</td>
      <td>${escapeHtml(formatReportDate(record.docDate))}</td>
      <td>${escapeHtml(record.fiscalYear)}</td>
      <td>${escapeHtml(record.category)}</td>
      <td class="amount-cell">${escapeHtml(formatMoney(getAmount(record.details)))}</td>
      <td>${formatDetails(record.details)}</td>
    </tr>
  `).join("");
}

function formatDetails(details) {
  const entries = Object.entries(details || {}).filter(([, value]) => value !== "" && value !== null && value !== undefined);
  if (!entries.length) return "-";
  return entries
    .map(([key, value]) => `<span class="detail-chip">${escapeHtml(key)}: ${escapeHtml(Array.isArray(value) ? value.join(", ") : value)}</span>`)
    .join("");
}

function getAmount(details) {
  const amount = details && details.amount ? String(details.amount).replace(/,/g, "") : "0";
  const number = Number(amount);
  return Number.isFinite(number) ? number : 0;
}

function formatMoney(amount) {
  return `${amount.toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท`;
}

function formatReportDate(value) {
  if (!value) return "";
  const text = String(value).trim();
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/.exec(text);

  if (match) {
    return `${match[1].padStart(2, "0")}/${match[2].padStart(2, "0")}/${match[3]}`;
  }

  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) {
    return `${String(parsed.getDate()).padStart(2, "0")}/${String(parsed.getMonth() + 1).padStart(2, "0")}/${String(parsed.getFullYear()).slice(-2)}`;
  }

  return text;
}

function createAvatarText(name) {
  return name
    .replace(/^(ศ|รศ|ผศ|อ|ดร)\.?(ดร\.)?/, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2) || "TR";
}

function normalizeText(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

elements.reload.addEventListener("click", loadResponses);
elements.search.addEventListener("input", applyFilters);
elements.fiscalYear.addEventListener("change", applyFilters);
elements.category.addEventListener("change", applyFilters);

initializePage();
