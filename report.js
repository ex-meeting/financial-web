const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyycg6JrhmbMHLcS20WRhwgjHE_B5_tRCEcJMyV5AJCNc2o5lXOKMqmBoTKY2-0HOa8/exec";

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
  teacher: document.querySelector("#teacherFilter"),
  reload: document.querySelector("#reloadButton"),
  totalRecords: document.querySelector("#totalRecords"),
  filteredRecords: document.querySelector("#filteredRecords"),
  totalAmount: document.querySelector("#totalAmount"),
  body: document.querySelector("#reportBody")
};

function loadResponses() {
  elements.status.textContent = "กำลังโหลดข้อมูล";
  elements.reload.disabled = true;
  elements.body.innerHTML = '<tr><td colspan="10" class="empty-cell">กำลังโหลดข้อมูลจาก Google Sheet...</td></tr>';

  const callbackName = `handleWebFormResponses_${Date.now()}`;
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

    state.records = Array.isArray(response.records) ? response.records : [];
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
  elements.body.innerHTML = `<tr><td colspan="10" class="empty-cell">${escapeHtml(message)}</td></tr>`;
}

function populateFilters() {
  fillFilter(elements.fiscalYear, "ทุกปีงบประมาณ", uniqueValues("fiscalYear"));
  fillFilter(elements.category, "ทุกหมวด", uniqueValues("category"));
  fillFilter(elements.teacher, "ทุกคน", uniqueValues("teacherName"));
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
  const keyword = elements.search.value.trim().toLowerCase();
  const fiscalYear = elements.fiscalYear.value;
  const category = elements.category.value;
  const teacher = elements.teacher.value;

  state.filtered = state.records.filter((record) => {
    if (fiscalYear && String(record.fiscalYear) !== fiscalYear) return false;
    if (category && record.category !== category) return false;
    if (teacher && record.teacherName !== teacher) return false;
    if (!keyword) return true;
    return createSearchText(record).includes(keyword);
  });

  renderSummary();
  renderRows();
}

function createSearchText(record) {
  return [
    record.docNo,
    record.docDate,
    record.fiscalYear,
    record.teacherName,
    record.category,
    record.categoryGroup,
    record.note,
    JSON.stringify(record.details || {}),
    (record.attachments || []).join(" ")
  ].join(" ").toLowerCase();
}

function renderSummary() {
  const totalAmount = state.filtered.reduce((sum, record) => sum + getAmount(record.details), 0);
  elements.totalRecords.textContent = state.records.length.toLocaleString("th-TH");
  elements.filteredRecords.textContent = state.filtered.length.toLocaleString("th-TH");
  elements.totalAmount.textContent = formatMoney(totalAmount);
}

function renderRows() {
  if (!state.filtered.length) {
    elements.body.innerHTML = '<tr><td colspan="10" class="empty-cell">ไม่พบข้อมูลตามเงื่อนไขที่เลือก</td></tr>';
    return;
  }

  elements.body.innerHTML = state.filtered.map((record) => `
    <tr>
      <td>${escapeHtml(record.rowNumber)}</td>
      <td>${escapeHtml(record.timestamp)}</td>
      <td>${escapeHtml(record.docNo)}</td>
      <td>${escapeHtml(record.docDate)}</td>
      <td>${escapeHtml(record.fiscalYear)}</td>
      <td>${escapeHtml(record.teacherName)}</td>
      <td>${escapeHtml(record.category)}</td>
      <td class="amount-cell">${escapeHtml(formatMoney(getAmount(record.details)))}</td>
      <td>${formatDetails(record.details)}</td>
      <td>${escapeHtml(record.note)}</td>
    </tr>
  `).join("");
}

function formatDetails(details) {
  const entries = Object.entries(details || {}).filter(([, value]) => value !== "" && value !== null && value !== undefined);
  if (!entries.length) return "-";
  return entries
    .map(([key, value]) => `<span class="detail-chip">${escapeHtml(key)}: ${escapeHtml(value)}</span>`)
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
elements.teacher.addEventListener("change", applyFilters);

loadResponses();
