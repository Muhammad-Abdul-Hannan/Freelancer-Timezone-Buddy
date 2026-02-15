export function MeetingData(lastConversion, title, clientName, platform, description, fromTimeZone, toTimeZone) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.clientName = clientName;
    this.platform = platform;
    this.description = description;
    this.status = "upcoming";
    this.instant = lastConversion.instant.getTime();
    this.fromTimeZone = fromTimeZone;
    this.toTimeZone = toTimeZone;
    this.sourceFormatted = lastConversion.sourceFormatted;
    this.targetFormatted = lastConversion.targetFormatted;
    this.createdAt = new Date();
}


const STORAGE_KEY = "timezoneBuddyData";
const LATEST_VERSION = 1;

function getDefaultData(meetings = []) {
    return {
        version: LATEST_VERSION,
        meetings
    };
}

function migrateToLatest(data) {
    // If old or missing version, treat as v1 and normalize.
    if (typeof data.version !== "number") data.version = 1;

    // Future:
    // if (data.version === 1) data = migrateV1toV2(data);

    if (!Array.isArray(data.meetings)) data.meetings = [];

    data.version = LATEST_VERSION;
    return data;
}

export function loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData([]);

    try {
        const parsed = JSON.parse(raw);
        const migrated = migrateToLatest(parsed);

        // Save normalized/migrated data back
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));

        return migrated;
    } catch {
        return getDefaultData([]);
    }
}


export function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addMeeting(meeting) {
    const data = loadData();
    data.meetings.push(meeting);
    saveData(data);
}

export function deleteMeeting(id) {
    const data = loadData();
    data.meetings = data.meetings.filter(m => m.id !== id);
    saveData(data);
}
