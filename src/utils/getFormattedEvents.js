const getFormattedEvents = (events) => events.reduce((res, e) => {
    let summary = res[e["shift_id"]];
    if (summary === undefined) {
        summary = {};
        res[e["shift_id"]] = summary;
    }
    if (e.event === "CLOCKED_IN") {
        summary.clockIn = new Date(e.timestamp);
    }
    if (e.event === "CLOCKED_OUT") {
        summary.clockOut = new Date(e.timestamp);

    }
    summary.userId = e["user_id"] || e["id"];
    summary.shiftId = e["shift_id"]
    if(e["full_name"]){
        summary.fullName = e["full_name"];
    }
    return res;
}, {});

export default getFormattedEvents;