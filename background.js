function injectReportAlert(idOfTab) {
    chrome.scripting.executeScript({
        target : {tabId : idOfTab},
        files : ["new_report_alert.js"]
    });
}

// swithes from current state to next state
function switchState(startState) {
    return startState === "ON" ? "OFF" : "ON";
}

const handleCountMessage = (message, sender, sendResponse) => {
    let newCount = message.count;
    if (newCount > oldCount) {
        sendResponse(
            { increase: true }
        );
    }
    else {
        sendResponse(
            { increase: false }
        );
    }
    oldCount = newCount;
}

let state = "OFF";
const pageUrl = "https://report-management.securetempus.com/reports/clinical-trials/Clinical/DNA";
let intervalId = null;
let oldCount = 0; // make sound on initial run if any unassigned reports

chrome.action.setBadgeText(
    { text: state }
    );

chrome.action.onClicked.addListener(function(tab) {
    oldCount = 0; // reset count after each toggle

    if (state === "OFF" && tab.url != pageUrl) {
        console.log("Incorrect page. Extension only works for: " + pageUrl);
    }

    else {
        state = switchState(state);
        chrome.action.setBadgeText(
            { text: state }
        );
    }
    if (state === "ON" && tab.status === "complete" && tab.url === pageUrl) {
        injectReportAlert(tab.id);
        intervalId = setInterval(() => {injectReportAlert(tab.id)}, 7000); // inject every 10s
        chrome.runtime.onMessage.addListener(handleCountMessage);
    }
    
    else if (state === "OFF" && intervalId != null) {
        chrome.runtime.onMessage.removeListener(handleCountMessage);
        clearInterval(intervalId);
        intervalId = null;
    }

});