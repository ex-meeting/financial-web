const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyycg6JrhmbMHLcS20WRhwgjHE_B5_tRCEcJMyV5AJCNc2o5lXOKMqmBoTKY2-0HOa8/exec";

const chartColors = ["#0b5cab", "#0f766e", "#c46a08", "#7c3aed", "#dc2626", "#0891b2", "#4d7c0f", "#be185d"];

const state = {
  records: [],
  filtered: []
};

const elements = {
  status: document.querySelector("#dashboardStatus"),
  lastUpdated: document.querySelector("#lastUpdated"),
  search: document.querySelector("#searchInput"),
  fiscalYear: document.querySelector("#fiscalYearFilter"),
  category: document.querySelector("#categoryFilter"),
  teacher: document.querySelector("#teacherFilter"),
  clear: document.querySelector("#clearButton"),
  reload: document.querySelector("#reloadButton"),
  totalAmount: document.querySelector("#totalAmount"),
  totalRecords: document.querySelector("#totalRecords"),
  totalTeachers: document.querySelector("#totalTeachers"),
  averageAmount: document.querySelector("#averageAmount"),
  categoryChartTotal: document.querySelector("#categoryChartTotal"),
  categoryChart: document.querySelector("#categoryChart"),
  fiscalYearDonut: document.querySelector("#fiscalYearDonut"),
  fiscalYearLegend: document.querySelector("#fiscalYearLegend"),
  fiscalYearColumnChart: document.querySelector("#fiscalYearColumnChart"),
  teacherChart: document.querySelector("#teacherChart"),
  recentBody: document.querySelector("#recentBody")
};

function loadResponses() {
  elements.status.textContent = "กำลังโหลดข้อมูล";
  elements.reload.disabled = true;
  elements.recentBody.innerHTML = '<tr><td colspan="6" class="empty-cell">กำลังโหลดข้อมูลจาก Google Sheet...</td></tr>';

  const callbackName = `handleDashboardResponses_${Date.now()}`;
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
  elements.recentBody.innerHTML = `<tr><td colspan="6" class="empty-cell">${escapeHtml(message)}</td></tr>`;
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
  const keyword = normalizeText(elements.search.value);
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

  renderDashboard();
}

function createSearchText(record) {
  return normalizeText([
    record.docNo,
    formatReportDate(record.docDate),
    record.fiscalYear,
    record.teacherName,
    record.category,
    record.categoryGroup,
    record.note,
    JSON.stringify(record.details || {}),
    (record.attachments || []).join(" ")
  ].join(" "));
}

function renderDashboard() {
  renderKpis();
  renderBarChart(elements.categoryChart, groupAmountBy("category"), { emptyText: "ยังไม่มีข้อมูลหมวดค่าใช้จ่าย" });
  renderDonutChart(groupAmountBy("fiscalYear"));
  renderColumnChart(groupAmountBy("fiscalYear"));
  renderBarChart(elements.teacherChart, groupAmountBy("teacherName").slice(0, 10), { emptyText: "ยังไม่มีข้อมูลผู้ขอเบิก" });
  renderRecentRows();
}

function renderKpis() {
  const totalAmount = getTotalAmount(state.filtered);
  const recordCount = state.filtered.length;
  const teacherCount = new Set(state.filtered.map((record) => record.teacherName).filter(Boolean)).size;
  elements.totalAmount.textContent = formatMoney(totalAmount);
  elements.totalRecords.textContent = recordCount.toLocaleString("th-TH");
  elements.totalTeachers.textContent = teacherCount.toLocaleString("th-TH");
  elements.averageAmount.textContent = formatMoney(recordCount ? totalAmount / recordCount : 0);
  elements.categoryChartTotal.textContent = formatMoney(totalAmount);
}

function groupAmountBy(key) {
  const groups = new Map();
  state.filtered.forEach((record) => {
    const label = String(record[key] || "ไม่ระบุ").trim() || "ไม่ระบุ";
    groups.set(label, (groups.get(label) || 0) + getAmount(record.details));
  });
  return [...groups.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function renderBarChart(container, rows, options = {}) {
  if (!rows.length) {
    container.innerHTML = `<div class="empty-cell">${options.emptyText || "ยังไม่มีข้อมูล"}</div>`;
    return;
  }

  const max = Math.max(...rows.map((row) => row.value), 1);
  container.innerHTML = rows.map((row, index) => {
    const width = Math.max((row.value / max) * 100, row.value > 0 ? 2 : 0);
    const color = chartColors[index % chartColors.length];
    return `
      <div class="bar-row">
        <div class="bar-row__meta">
          <span>${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(formatMoney(row.value))}</strong>
        </div>
        <div class="bar-track">
          <span style="width: ${width}%; background: ${color};"></span>
        </div>
      </div>
    `;
  }).join("");
}

function renderDonutChart(rows) {
  if (!rows.length) {
    elements.fiscalYearDonut.style.background = "#e5eaf0";
    elements.fiscalYearLegend.innerHTML = '<div class="empty-cell">ยังไม่มีข้อมูล</div>';
    return;
  }

  const total = getTotalAmountFromRows(rows);
  let start = 0;
  const segments = rows.map((row, index) => {
    const ratio = total ? row.value / total : 0;
    const end = start + ratio * 360;
    const color = chartColors[index % chartColors.length];
    const segment = `${color} ${start}deg ${end}deg`;
    start = end;
    return segment;
  });

  elements.fiscalYearDonut.style.background = `conic-gradient(${segments.join(", ")})`;
  elements.fiscalYearLegend.innerHTML = rows.map((row, index) => `
    <div class="legend-item">
      <span style="background: ${chartColors[index % chartColors.length]};"></span>
      <p>${escapeHtml(row.label)}</p>
      <strong>${escapeHtml(formatMoney(row.value))}</strong>
    </div>
  `).join("");
}

function renderColumnChart(rows) {
  if (!rows.length) {
    elements.fiscalYearColumnChart.innerHTML = '<div class="empty-cell">ยังไม่มีข้อมูลปีงบประมาณ</div>';
    return;
  }

  const max = Math.max(...rows.map((row) => row.value), 1);
  elements.fiscalYearColumnChart.innerHTML = rows
    .slice()
    .sort((a, b) => String(a.label).localeCompare(String(b.label), "th"))
    .map((row, index) => {
      const height = Math.max((row.value / max) * 100, row.value > 0 ? 4 : 0);
      return `
        <div class="column-item">
          <div class="column-track">
            <span style="height: ${height}%; background: ${chartColors[index % chartColors.length]};"></span>
          </div>
          <strong>${escapeHtml(row.label)}</strong>
          <small>${escapeHtml(formatMoney(row.value))}</small>
        </div>
      `;
    }).join("");
}

function renderRecentRows() {
  if (!state.filtered.length) {
    elements.recentBody.innerHTML = '<tr><td colspan="6" class="empty-cell">ไม่พบข้อมูลตามเงื่อนไขที่เลือก</td></tr>';
    return;
  }

  elements.recentBody.innerHTML = state.filtered.slice(0, 12).map((record) => `
    <tr>
      <td>${escapeHtml(record.docNo)}</td>
      <td>${escapeHtml(formatReportDate(record.docDate))}</td>
      <td>${escapeHtml(record.fiscalYear)}</td>
      <td>${escapeHtml(record.teacherName)}</td>
      <td>${escapeHtml(record.category)}</td>
      <td class="amount-cell">${escapeHtml(formatMoney(getAmount(record.details)))}</td>
    </tr>
  `).join("");
}

function clearFilters() {
  elements.search.value = "";
  elements.fiscalYear.value = "";
  elements.category.value = "";
  elements.teacher.value = "";
  applyFilters();
}

function getTotalAmount(records) {
  return records.reduce((sum, record) => sum + getAmount(record.details), 0);
}

function getTotalAmountFromRows(rows) {
  return rows.reduce((sum, row) => sum + row.value, 0);
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
elements.clear.addEventListener("click", clearFilters);
elements.search.addEventListener("input", applyFilters);
elements.fiscalYear.addEventListener("change", applyFilters);
elements.category.addEventListener("change", applyFilters);
elements.teacher.addEventListener("change", applyFilters);

loadResponses();
