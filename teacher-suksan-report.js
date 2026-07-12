const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzgv0iBmCXTu5J3rRvccsqXrwyZ-TOh2n9BM-HJyXKzZ2SA5n6Uku7EF4hnYd-WUC97/exec";
const TARGET_TEACHER_NAME = "ศ.ดร.สุขสันต์ พาณิชพาพิบูล";

const state = {
  records: [],
  filtered: []
};

const elements = {
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
    state.records = records.filter((record) => normalizeText(record.teacherName) === normalizeText(TARGET_TEACHER_NAME));
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

loadResponses();
