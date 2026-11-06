
const videoURL = document.getElementById("videoURL");
const playBtn = document.getElementById("playBtn");
const videoPlayer = document.getElementById("videoPlayer");
const placeholder = document.getElementById("placeholder");
const videoContainer = document.getElementById("videoContainer");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const message = document.getElementById("message");

document.getElementById("year").textContent =
    new Date().getFullYear();

function showMessage(text, type = "") {
    message.textContent = text;
    message.className = "message " + type;
}

function playVideo() {

    const link = videoURL.value.trim();

    if (!link) {
        showMessage("Please enter a video link.", "error");
        return;
    }

    try {
        const url = new URL(link);

        // Validate the supported hosting URL
        if (
            url.protocol !== "https:" ||
            url.hostname !== "player.abyssplayer.com" ||
            !/^\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)
        ) {
            showMessage("Invalid video link.", "error");
            return;
        }

        // Load video inside GRYPHON
        videoPlayer.src = url.href;
        videoPlayer.style.display = "block";
        placeholder.style.display = "none";

        // Remove the submitted URL from the visible input
        videoURL.value = "";

        showMessage("Your video is ready!", "success");

    } catch (error) {
        showMessage("Please enter a valid video link.", "error");
    }
}

playBtn.addEventListener("click", playVideo);

videoURL.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        playVideo();
    }
});

fullscreenBtn.addEventListener("click", async function() {
    try {
        if (!document.fullscreenElement) {
            await videoContainer.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    } catch (error) {
        console.error(error);
    }
});

document.addEventListener("fullscreenchange", function() {
    fullscreenBtn.textContent = document.fullscreenElement
        ? "✕ Exit Fullscreen"
        : "⛶ Fullscreen";
});
