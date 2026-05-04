/* ===== DREHSCHEIBEN FUNKTIONEN ===== */
/* Ausgelagert aus index.html v0.55 */

/* ===== DREHSCHEIBEN KONFIGURATION ===== */
const WHEEL_CONFIG = {
    size: 200,
    center: 100,
    radius: 93,
    markerY: 13,
    markerRadius: 6,
    degPerDay: 6,
    segmentCount: 12,
    segmentAngle: 30
};

/* ===== GLOBALE VARIABLEN ===== */
let canvas;
let ctx;
let angle = 0;
let dragging = false;
let lastAngle = 0;
let baseDate = new Date();

/**
 * Initialisiert die Drehscheibe
 */
function initWheel() {
    canvas = document.getElementById("wheelCanvas");
    ctx = canvas?.getContext("2d");
    
    if (!canvas || !ctx) return;

    // Canvas Event-Listener für Start des Dragging
    canvas.addEventListener("mousedown", startDrag);
    canvas.addEventListener("touchstart", startDrag, { passive: false });

    drawWheel();
    updateWheelCalculation();
}

/**
 * Zeichnet die Drehscheibe
 */
function drawWheel() {
    if (!ctx) return;

    ctx.clearRect(0, 0, WHEEL_CONFIG.size, WHEEL_CONFIG.size);

    const gradient = ctx.createConicGradient(
        angle * Math.PI / 180, 
        WHEEL_CONFIG.center, 
        WHEEL_CONFIG.center
    );
    for (let i = 0; i <= 360; i += 10) {
        gradient.addColorStop(i / 360, `hsl(${i},80%,60%)`);
    }

    ctx.beginPath();
    ctx.arc(WHEEL_CONFIG.center, WHEEL_CONFIG.center, WHEEL_CONFIG.radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Segmentlinien
    for (let i = 0; i < WHEEL_CONFIG.segmentCount; i++) {
        let a = (i * WHEEL_CONFIG.segmentAngle + angle) * Math.PI / 180;

  ctx.beginPath();
        ctx.moveTo(WHEEL_CONFIG.center, WHEEL_CONFIG.center);
   ctx.arc(
            WHEEL_CONFIG.center, 
            WHEEL_CONFIG.center, 
        WHEEL_CONFIG.radius, 
        a, 
   a + WHEEL_CONFIG.segmentAngle * Math.PI / 180
        );
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
      ctx.lineWidth = 2;
     ctx.stroke();
    }

    // Marker oben (weiß)
    ctx.beginPath();
    ctx.arc(WHEEL_CONFIG.center, WHEEL_CONFIG.markerY, WHEEL_CONFIG.markerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();
}

/**
 * Berechnet das Datum basierend auf dem aktuellen Winkel
 * @returns {Date} Berechnetes Datum
 */
function getWheelDate() {
    let days = Math.round(angle / WHEEL_CONFIG.degPerDay);
    let d = new Date(baseDate);
    d.setDate(d.getDate() + days);
    return d;
}

/**
 * Aktualisiert die Datumsanzeige der Drehscheibe
 */
function updateWheelCalculation() {
    const wheelDateDisplay = document.getElementById('wheelDateDisplay');
 if (!wheelDateDisplay) return;

    const date = getWheelDate();
    wheelDateDisplay.innerHTML = `<b>Ausgewähltes Datum:</b> ${formatDateLong(date).slice(0, -1)}`;
}

/**
 * Berechnet den Winkel basierend auf Mausposition
 * @param {number} x - X-Koordinate
 * @param {number} y - Y-Koordinate
 * @returns {number} Winkel in Grad
 */
function getMouseAngle(x, y) {
    return Math.atan2(y - WHEEL_CONFIG.center, x - WHEEL_CONFIG.center) * 180 / Math.PI;
}

/**
 * Startet das Drehen der Scheibe
 * @param {Event} e - Mouse/Touch Event
 */
function startDrag(e) {
    e.preventDefault();
    dragging = true;
    lastAngle = getMouseAngle(...getPos(e));
    
    // Event-Listener für Bewegung hinzufügen
    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("touchmove", moveDrag, { passive: false });
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);
}

/**
 * Bewegt die Drehscheibe während des Dragging
 * @param {Event} e - Mouse/Touch Event
 */
function moveDrag(e) {
    if (!dragging) return;

    e.preventDefault();
 let current = getMouseAngle(...getPos(e));
    let diff = current - lastAngle;

    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    angle += diff;
    lastAngle = current;

    drawWheel();
    updateWheelCalculation();
    generateSchedule();
}

/**
 * Beendet das Drehen der Scheibe
 */
function endDrag() {
    dragging = false;
    
    // Event-Listener entfernen
    window.removeEventListener("mousemove", moveDrag);
    window.removeEventListener("touchmove", moveDrag);
    window.removeEventListener("mouseup", endDrag);
    window.removeEventListener("touchend", endDrag);
}

/**
 * Passt das Datum um n Tage an
 * @param {number} n - Anzahl der Tage (+/-)
 */
function adjustDay(n) {
    angle += n * WHEEL_CONFIG.degPerDay;
    drawWheel();
    updateWheelCalculation();
    generateSchedule();
}

/**
 * Ermittelt die Position relativ zum Canvas
 * @param {Event} e - Mouse/Touch Event
 * @returns {Array} [x, y] Koordinaten
 */
function getPos(e) {
    const rect = canvas.getBoundingClientRect();

    if (e.touches) {
        return [
     e.touches[0].clientX - rect.left,
 e.touches[0].clientY - rect.top
      ];
    }

    return [
        e.clientX - rect.left,
        e.clientY - rect.top
    ];
}

/**
 * Gibt den aktuellen Winkel zurück (für State-Management)
 * @returns {number} Aktueller Winkel
 */
function getWheelAngle() {
    return angle;
}

/**
 * Setzt den Winkel (für State-Management)
 * @param {number} newAngle - Neuer Winkel
 */
function setWheelAngle(newAngle) {
    angle = newAngle;
    drawWheel();
    updateWheelCalculation();
}
