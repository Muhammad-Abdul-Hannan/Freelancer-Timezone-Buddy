# 🌍 Freelancer Timezone Buddy

> Never Miss a Client Call Again.

Freelancer Timezone Buddy is a lightweight web application that helps freelancers and remote professionals convert timezones accurately, track upcoming meetings with live countdowns, and save important client call details — all in a clean, modern interface.

Built with pure **HTML, CSS, and JavaScript**, leveraging the **Intl API** for reliable timezone handling.

---

## 🚀 Live Demo

🔗 **[View Live Website]([https://muhammad-abdul-hannan.github.io/Freelancer-Timezone-Buddy/])**

---

## ✨ Features

### 🌎 Accurate Timezone Conversion
- Convert time between any IANA timezone (e.g., `America/New_York`, `Asia/Karachi`)
- Powered by the **JavaScript Intl API**
- Automatically handles:
  - Daylight Saving Time (DST)
  - Historical timezone rules
- Works globally

---

### ⏳ Live Countdown System
- Real-time countdown to scheduled meetings
- Updates every second
- Displays:
  - Remaining days, hours, minutes, seconds
  - "Starts now"
  - "Already passed"

---

### 💾 Save Meetings
- Save meetings with:
  - Title
  - Client Name
  - Platform (Upwork, LinkedIn, etc.)
  - Description / Notes
- Persistent storage using **localStorage**
- Meetings remain saved after page refresh
- Sorted by upcoming time

---

### 🌗 Dark & Light Theme Support
- CSS variable-based theme system
- Clean visual consistency across themes
- Easily extendable

---

### 🧭 Smooth Scrolling
- Powered by **Lenis**
- Native-feeling smooth scroll for:
  - Mouse wheel
  - Touchpad
  - Anchor navigation
- Respects reduced motion settings

---

## 🛠 Tech Stack

- **HTML5**
- **CSS3 (Custom Properties / Variables)**
- **Vanilla JavaScript (ES Modules)**
- **Intl API**
- **Lenis (Smooth Scroll Library)**

No frameworks. No backend. Fully client-side.

---

## 🧠 Architecture Highlights

- Modular JavaScript structure:
  - `app.js` – application wiring & logic
  - `timezone.js` – conversion engine
  - `storage.js` – localStorage + version-ready schema
  - `ui.js` – DOM rendering
  - `utils.js` – reusable utilities
- Version-ready localStorage structure
- IANA timezone-based system (not abbreviations)
- Clean separation of concerns

---

## 📂 Project Structure

timezone-buddy/
│
├── index.html
├── assets/
│ └── style.css
├── js/
│ ├── app.js
│ ├── timezone.js
│ ├── storage.js
│ ├── ui.js
│ └── utils.js



---

## 🧪 Example Use Case

Client says:

> “Meeting at 3:00 PM EST”

You:
1. Select `America/New_York`
2. Choose your timezone
3. Instantly see converted time
4. Save the meeting
5. Track live countdown

No more timezone confusion.

---

## 🔮 Planned Features

- Smart natural language parsing  
  *(e.g., "3pm ET tomorrow")*
- Advanced storage migration system (v2+)
- JSON export / import backup (pending)
- ICS calendar file download (pending)
- API-based time sync option (pending)
- Meeting filters (Upcoming / Past) (pending)

---

## 📦 Installation (Local Development)

1. Clone the repository:

```bash
git clone https://github.com/yourusername/freelancer-timezone-buddy.git

Navigate to the project folder.

Run with a local server (required for ES Modules).

Using VS Code Live Server
OR:
python -m http.server 5500

Open in browser:
http://localhost:5500

---

🧑‍💻 Purpose
This project was built to:
Practice advanced JavaScript architecture
Work with the Intl API
Handle real-world timezone problems
Implement persistent local storage with version-ready structure
Build a production-quality UI without frameworks

📄 License

This project is open-source and available under the MIT License.
