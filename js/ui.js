import { updateStatus, deleteMeeting } from "./app.js";


export function savemeetingdialog(lastConversion) {
    let dialog = document.getElementById("dialog");
    dialog.style.display = "block";
    let clienttime = document.getElementById("dialog-client-time");
    clienttime.innerText = lastConversion.sourceFormatted;
    let my_time = document.getElementById("dialog-my-time");
    my_time.innerText = lastConversion.targetFormatted;
}

export function closeDialog() {
    let dialog = document.getElementById("dialog");
    dialog.style.display = "none";
}

// ui.js

export function renderConversion(result) {
  const clientTime = document.getElementById("client-time-output");
  const yourTime = document.getElementById("your-time-output");
//   const warning = document.getElementById("warning-output");

  clientTime.textContent = result.sourceFormatted;
  yourTime.textContent = result.targetFormatted;

//   if (result.dateShift) {
//     warning.textContent = "⚠ Date changed after conversion.";
//   } else {
//     warning.textContent = "";
//   }

  return result.instant;
}


export function renderMeetings(meetings) {
    let meetingContainer = document.getElementById("meeting-cards");
    meetingContainer.innerHTML = "";
    meetings.map((meeting) => {
        let card = document.createElement("div");
        let title = document.createElement("h3");
        let client = document.createElement("h4");
        let platform = document.createElement("span");
        let client_time = document.createElement("p");
        let client_time_span = document.createElement("span");
        let my_time = document.createElement("p");
        let my_time_span = document.createElement("span");
        let description = document.createElement("p");
        let status_button = document.createElement("button");
        let delete_button = document.createElement("button");
        

        card.classList.add("card");
        card.setAttribute("id", "card");
        status_button.setAttribute("id", "status");
        status_button.setAttribute("data-id", meeting.id);
        status_button.addEventListener("click", updateStatus);
        delete_button.setAttribute("id", "delete_meeting");
        delete_button.setAttribute("data-id", meeting.id);
        delete_button.addEventListener("click", deleteMeeting);

        title.innerText = meeting.title;
        client.innerText = meeting.clientName + " ";
        platform.innerText = " - " + meeting.platform;
        client.append(platform);
        client_time_span.innerText = meeting.sourceFormatted;
        client_time.append(client_time_span);
        client_time.classList.add("client-time");
        my_time_span.innerText = meeting.targetFormatted;
        my_time.append(my_time_span);
        my_time.classList.add("my-time");
        description.innerText = meeting.description;
        status_button.innerText = meeting.status === "upcoming" ? "⏳" : "✅";
        delete_button.innerText = "🗑️";


        card.append(
            title,
            client,
            client_time,
            my_time,
            description,
            status_button,
            delete_button
        )
        meetingContainer.append(
            card
        )
    })
}
