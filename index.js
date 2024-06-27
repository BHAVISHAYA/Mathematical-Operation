const letsPlay = document.querySelector("#playBtn");

const jumpToGamePage = () => {
    window.location.href = "gamePage.html";
}
letsPlay.addEventListener('click', jumpToGamePage);