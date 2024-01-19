// takes path to audio file; plays audio
function playSound(url) {
    let soundURL = chrome.runtime.getURL(url);
    const audio = new Audio(soundURL);
    audio.play();
    return audio;
}

function getUnassignedReportCount() {
    let unassignedContainerElement = document.querySelector("div.status-tabs :nth-child(1)");
    let countParentElement = unassignedContainerElement.querySelector("button :nth-child(1)");
    let unassignedCountElement = countParentElement.querySelector("div :nth-child(2)");
    if (unassignedCountElement) {
        let count = unassignedCountElement.textContent;
        return Number(count);
    }

    else {
        alert("Failed to locate elements");
    }
}

function getSendBackCount() {
    let allQueuesElement = document.querySelector("div.WorkflowStatuses");
    let sendbackElement = allQueuesElement.querySelector("div :nth-child(2)");
    let sendbackQueueName = sendbackElement.textContent;
    let sendbackCount = sendbackQueueName.split("(")[1].slice(0, -1);
    return Number(sendbackCount);
}

function newReportAlert() {
    const payload = chrome.runtime.sendMessage(
        { count: getUnassignedReportCount() }
    );
    
    // Figure out if a response can be sent back to bg; respond would be sound
    payload.then((response) => {
        if (response.increase === true) {
            let sound = playSound("/assets/alert.mp3");
            
            // reload after sound has ended
            sound.onended = () => {
                location.reload();
            }
        }

        else {
            location.reload();
        }
    })
}

newReportAlert();