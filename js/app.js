import Lenis from "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm";

const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    smoothTouch: false
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();

    // Lenis smooth scroll to section
    lenis.scrollTo(target, {
        offset: 0,        // change later if you add sticky header
        duration: 1.1     // tweak for faster/slower anchor scroll
    });
});



import { savemeetingdialog, closeDialog, renderConversion, renderMeetings } from "./ui.js";
import { populateTimeZones, convertTime } from "./timezone.js";
import { formatTimeRemaining } from "./utils.js";
import { addMeeting, loadData, MeetingData, saveData } from "./storage.js";


document.addEventListener("DOMContentLoaded", () => {
    populateTimeZones();

    const form = document.getElementById("convert-form");

    let countdownInterval;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const date = document.getElementById("meeting-date").value;
        const time = document.getElementById("meeting-time").value;
        const fromTimeZone = document.getElementById("from-tz").value;
        const toTimeZone = document.getElementById("to-tz").value;

        const result = convertTime({
            date,
            time,
            fromTimeZone,
            toTimeZone
        });
        lastConversion = result;

        const instant = renderConversion(result);

        const countdownOutput = document.getElementById("countdown-output");

        // Clear old interval if exists
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        function updateCountdown() {
            const now = new Date();
            const diff = instant.getTime() - now.getTime();
            countdownOutput.textContent = formatTimeRemaining(diff);
        }

        updateCountdown(); // run immediately

        countdownInterval = setInterval(updateCountdown, 1000);
    });
});


let lastConversion = null;


function meetingSchedule() {
    if (!lastConversion) {
        alert("Please convert time first to proceed.")
    }

    let title = document.getElementById("meeting-title").value;
    let clientName = document.getElementById("client-name").value;
    let platform = document.getElementById("platform").value;
    let description = document.getElementById("meeting-desc").value;
    const fromTimeZone = document.getElementById("from-tz").value;
    const toTimeZone = document.getElementById("to-tz").value;

    let meetingData = new MeetingData(lastConversion, title, clientName, platform, description, fromTimeZone, toTimeZone);

    addMeeting(meetingData);
    meetingcard.style.display = "grid";

    const data = loadData();

    renderMeetings(data.meetings);

    closeDialog();
}


document.getElementById("save-meeting").addEventListener("click", opendialog);
function opendialog() {
    lastConversion ? savemeetingdialog(lastConversion) : alert("No time converted yet");
}
document.getElementById("close").addEventListener("click", closeDialog);
document.getElementById("meeting-scheduled").addEventListener("click", meetingSchedule);

export function updateStatus() {
    const clickedId = this.dataset.id;
    const allData = loadData();
    allData.meetings = allData.meetings.map(m =>
        m.id === clickedId ? { ...m, status: "Done" } : m
    );
    saveData(allData);
    const data = loadData();
    renderMeetings(data.meetings);

}

export function deleteMeeting() {
    const clickedId = this.dataset.id;
    const allData = loadData();
    allData.meetings = allData.meetings.filter(m => m.id !== clickedId);
    saveData(allData);
    const data = loadData();
    if (data.meetings.length === 0) {
        meetingcard.style.display = "none";
    }
    renderMeetings(data.meetings);
}


const data = loadData();
const meetingcard = document.getElementById("meeting-cards");
if (data.meetings.length === 0) {
    meetingcard.style.display = "none";
}
else {
    meetingcard.style.display = "grid";
    renderMeetings(data.meetings);
}



/* ================= THEME ================= */

const toggle =
    document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
    console.log("Yes");
    const root = document.documentElement;

    const next =
        root.dataset.theme === "dark"
            ? "light"
            : "dark";

    root.dataset.theme = next;
    localStorage.setItem("theme", next);
});

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme) {
    document.documentElement.dataset.theme =
        savedTheme;
} else if (
    window.matchMedia("(prefers-color-scheme: dark)").matches
) {
    document.documentElement.dataset.theme =
        "dark";
}
