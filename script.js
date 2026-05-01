// script.js

const episodes = [
    /* SEASON 1 */
    "Jujutsu Kaisen/JUJUTSU KAISEN - E01.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E02.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E03.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E04.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E05.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E06.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E07.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E08.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E09.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E10.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E11.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E12.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E13.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E14.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E15.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E16.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E17.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E18.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E19.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E20.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E21.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E22.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E23.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E24.mkv",

    /* SEASON 2 */
    "Jujutsu Kaisen/JUJUTSU KAISEN - E25.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E26.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E27.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E28.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E29.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E30.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E31.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E32.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E33.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E34.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E35.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E36.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E37.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E38.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E39.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E40.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E41.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E42.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E43.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E44.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E45.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E46.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E47.mkv",

    /* SEASON 3 */
    "Jujutsu Kaisen/JUJUTSU KAISEN - E48.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E49.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E50.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E51.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E52.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E53.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E54.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E55.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E56.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E57.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E58.mkv",
    "Jujutsu Kaisen/JUJUTSU KAISEN - E59.mkv"
];

let current = 0;
let countdownInterval;

const menu = document.getElementById("menu");
const playerScreen = document.getElementById("playerScreen");
const player = document.getElementById("player");
const episodeList = document.getElementById("episodeList");
const continueBox = document.getElementById("continueBox");
const nextCountdown = document.getElementById("nextCountdown");

function createSeason(title){
    const section = document.createElement("div");
    section.style.marginBottom = "30px";

    const label = document.createElement("h2");
    label.innerText = title;
    label.style.margin = "25px 0 10px";
    label.style.borderBottom = "1px solid #333";
    label.style.paddingBottom = "5px";

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fit,minmax(180px,1fr))";
    grid.style.gap = "12px";

    section.appendChild(label);
    section.appendChild(grid);
    episodeList.appendChild(section);

    return grid;
}

const season1 = createSeason("Season 1");
const season2 = createSeason("Season 2");
const season3 = createSeason("Season 3");

episodes.forEach((ep,index)=>{
    const btn = document.createElement("button");
    btn.className = "episodeBtn";
    btn.innerText = "Episode " + (index + 1);
    btn.onclick = ()=>playEpisode(index);

    if(index <= 23){
        season1.appendChild(btn);
    }else if(index <= 46){
        season2.appendChild(btn);
    }else{
        season3.appendChild(btn);
    }
});

/* Continue Watching */
if(localStorage.getItem("lastEpisode")){
    let last = Number(localStorage.getItem("lastEpisode"));

    continueBox.innerHTML = `
        <button class="episodeBtn" onclick="playEpisode(${last})">
            Continue Episode ${last + 1}
        </button><br><br>
    `;
}

/* Start Episode */
function playEpisode(index){
    current = index;

    menu.style.display = "none";
    playerScreen.style.display = "block";

    player.src = episodes[current];

    let savedTime = localStorage.getItem("time_" + current);
    if(savedTime){
        player.currentTime = savedTime;
    }

    player.play();

    localStorage.setItem("lastEpisode", current);

    document.getElementById("episodeTitle").innerText =
        "Episode " + (current + 1);
}

/* Save Progress */
player.addEventListener("timeupdate", ()=>{
    localStorage.setItem("time_" + current, player.currentTime);
});

/* Auto Next */
player.addEventListener("ended", ()=>{
    let seconds = 5;

    nextCountdown.style.display = "block";
    nextCountdown.innerText = "Next Episode in " + seconds + "...";

    countdownInterval = setInterval(()=>{
        seconds--;

        nextCountdown.innerText = "Next Episode in " + seconds + "...";

        if(seconds < 0){
            clearInterval(countdownInterval);
            nextCountdown.style.display = "none";
            nextEpisode();
        }
    },1000);
});

function nextEpisode(){
    current++;

    if(current >= episodes.length){
        current = 0;
    }

    playEpisode(current);
}

function goHome(){
    player.pause();

    playerScreen.style.display = "none";
    menu.style.display = "block";

    nextCountdown.style.display = "none";
    clearInterval(countdownInterval);
}
