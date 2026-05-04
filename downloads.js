/* ===== DOWNLOAD FUNKTIONEN ===== */
/* Ausgelagert aus index.html v0.55 */

/**
 * Gibt die ausgewählten Zeitplan-Einträge zurück
 * @returns {Array} Array mit ausgewählten Schedule-Daten
 */
function getSelectedScheduleData() {
    const checkboxes = document.querySelectorAll("#scheduleList input[type='checkbox']");
    return scheduleData.filter((_, index) => checkboxes[index]?.checked);
}

/**
 * Erstellt und lädt eine ICS-Kalenderdatei herunter
 */
function downloadICS() {
    const state = getFormState();
    const selectedData = getSelectedScheduleData();

    if (!selectedData.length) {
        alert("Keine Einträge ausgewählt.");
        return;
    }

    const emoji = emojiMap?.[state.scheduleType?.trim()] || "";

 let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kalender Generator Bienen//DE
`;

    selectedData.forEach((data, index) => {
        const date = formatDateISO(data.taskDate);
        const now = new Date();
    const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const uid = `${date}-${index}@bienenkalender`;
        const description = (data.additionalText || "").replace(/\n/g, " ");

  icsContent += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART;VALUE=DATE:${date}
SUMMARY:${emoji} ${title} - ${data.task}
DESCRIPTION:${description}
END:VEVENT
`;
    });

    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
 const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFileName + '.ics';
    a.click();

    URL.revokeObjectURL(url);
}

/**
 * Erstellt und lädt eine PDF-Datei herunter
 */
function downloadPDF() {
    // Prüfe ob jsPDF verfügbar ist
    if (typeof window.jspdf === 'undefined') {
        alert('❌ Fehler: PDF-Bibliothek konnte nicht geladen werden.\n\nBitte überprüfe deine Internetverbindung.');
        return;
    }

    const selectedData = getSelectedScheduleData();

    if (!selectedData.length) {
        alert("Keine Einträge ausgewählt.");
  return;
    }

    let xText = PDF_CONFIG.margin;
    let y = xText * 2;
    let xTask = PDF_CONFIG.taskOffset;
 const pageWidth = 210;
 const maxWidth = pageWidth - xText * 2 - xTask;

    const { jsPDF } = window.jspdf;
const doc = new jsPDF('p', 'mm', 'a4');

    const prefix = DOM.prefix.value.trim();
    const scheduleType = DOM.scheduleType.value;
    const pdfTitle = `${prefix} - ${scheduleType}-Zeitplan ${year}`;

    doc.setFontSize(PDF_CONFIG.titleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text(pdfTitle, xText, PDF_CONFIG.margin);

    doc.setFontSize(PDF_CONFIG.textFontSize);
    doc.setFont("helvetica", "normal");

    selectedData.forEach(({ taskDate, task, additionalText, dateShort }) => {
      doc.setFont("helvetica", "bold");
        doc.text(dateShort + ":", xText, y);
        doc.text(task, xText + xTask, y);

      if (additionalText) {
doc.setFont("helvetica", "normal");
            const lines = doc.splitTextToSize(additionalText, maxWidth);
    doc.text(lines, xText + xTask, y + 5);
         y += lines.length * PDF_CONFIG.lineSpacing;
        }

     y += (xText / PDF_CONFIG.sectionSpacing);

        if (y > PDF_CONFIG.pageHeight) {
      doc.addPage();
            y = PDF_CONFIG.margin;
     }
    });

  doc.setFont("helvetica", "normal");
    const creationDate = `Erstellt am: ${new Date().toLocaleDateString('de-DE')} - Version: ${Version}`;
    doc.text(creationDate, xText, y);

    doc.save(`${downloadFileName}.pdf`);
}
