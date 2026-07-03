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

const searchInput = document.querySelector("#teacherSearchInput");
const linkBody = document.querySelector("#teacherLinkBody");

function buildTeacherReportUrl(name) {
  const url = new URL("teacher-report.html", window.location.href);
  url.searchParams.set("name", name);
  url.searchParams.set("v", "20260703-1");
  return url.href;
}

function renderLinks() {
  const keyword = normalizeText(searchInput.value);
  const names = TEACHER_REPORT_NAMES.filter((name) => !keyword || normalizeText(name).includes(keyword));

  if (!names.length) {
    linkBody.innerHTML = '<tr><td colspan="2" class="empty-cell">ไม่พบรายชื่อที่ค้นหา</td></tr>';
    return;
  }

  linkBody.innerHTML = names.map((name) => {
    const url = buildTeacherReportUrl(name);
    return `
      <tr>
        <td>${escapeHtml(name)}</td>
        <td><a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(url)}</a></td>
      </tr>
    `;
  }).join("");
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

searchInput.addEventListener("input", renderLinks);
renderLinks();
