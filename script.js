const time = document.getElementById("time");

const game_cont = document.getElementById("game-container");
const cat_container = document.getElementById("cat-container");
const cat = document.getElementById("cat");
const fire = document.getElementById("fire");
const score_display = document.getElementById("score-value");
const popup = document.getElementById("popup");
const final_score = document.getElementById("final-score");

const restart_btn = document.getElementById("restart-button");

let catX = (window.innerWidth - 80) / 2;
// console.log(window.innerWidth);
// console.log(window.innerWidth - 80);
// console.log(catX);

let score = 0;
// let highScore = localStorage.getItem("highScore") || 0;
// finalHighScore.textContent = highScore;
// console.log(highScore);
let gameOver = false;


function loadEquippedCat() {
    let equipped = JSON.parse(localStorage.getItem("equippedItems")) || {};
    let catSkin = equipped.cat || "c_p"; // ถ้าไม่มีตัวเลือก ใช้ c_p เป็นค่าเริ่มต้น

    cat.src = "img/" + catSkin + ".png"; // ✅ ใช้แมวที่เลือก
}

// โหลดตัวละครแมวตอนเริ่มเกม
window.onload = () => {
    loadEquippedCat();
    loadEquippedItems();
    startTimer();
};

// highscore_display.textContent = highScore;

let isDragging = false;
game_cont.addEventListener("touchstart", () => {
    isDragging = true;
});

game_cont.addEventListener("touchmove", (e) => {
    if (isDragging && !gameOver) {
        let touch = e.touches[0];
        catX = touch.clientX - 40;
        catX = Math.max(0, Math.min(catX, window.innerWidth - cat_container.offsetWidth));
        cat_container.style.left = `${catX}px`;
    }
});

game_cont.addEventListener("touchend", () => {
    isDragging = false;
});


let timerInterval;
let timeLeft = 30;
function startTimer() { 

    time.textContent = timeLeft;

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            time.textContent = timeLeft;
        } else {
            timeLeft = 30;
            clearInterval(timerInterval);
            endGame("time_out");
        }
    }, 1000);
}

// window.onload = () => {
    startTimer();
// };
let equipped = JSON.parse(localStorage.getItem("equippedItems")) || {};
let catSkin = equipped.cat || "c_p"; // ✅ ใช้ตัวแมวที่เลือก

function createItem(type) {
    if (gameOver) return;
    
    const item = document.createElement("img");
    item.classList.add("item");
    item.src = 'img/' + type + '.png';
    item.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
    item.style.top = "0px";
    item.dataset.type = type;
    game_cont.appendChild(item);

    let fallInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(fallInterval);
            item.remove();
            return;
        }
    
        item.style.top = `${item.offsetTop + 5}px`;
    
        let catTop = cat_container.offsetTop; // จุดบนของแมว
        let catLeft = cat_container.offsetLeft;
        let catRight = catLeft + cat_container.offsetWidth;
        
        let itemBottom = item.offsetTop + item.offsetHeight; // จุดล่างของไอเทม
        let itemCenterX = item.offsetLeft + item.offsetWidth / 2; // จุดกึ่งกลางของไอเทม
    


        // ✅ เงื่อนไขใหม่: ไอเทมต้องชน "หัวแมว" เท่านั้น
        if (itemBottom >= catTop && itemBottom <= catTop + 5 && 
            itemCenterX >= catLeft && itemCenterX <= catRight) {
    
            if (item.dataset.type === "milk") {
                milk_sound.play();
                score++;
                score_display.textContent = score;
    
                cat.src = "img/" + catSkin + "_open.png";
                setTimeout(() => {
                    cat.src = "img/" + catSkin + ".png";
                }, 250);
    
            } else if (item.dataset.type === "bomb") {
                bomb_sound.play();
                endGame('die');
            } else if (item.dataset.type === "clock") {
                timeLeft += 5;
                milk_sound.play();
                cat.src = "img/" + catSkin + "_open.png";
                setTimeout(() => {
                    cat.src = "img/" + catSkin + ".png";
                }, 250);
            }
    
            clearInterval(fallInterval);
            item.remove();
        }
    
        if (item.offsetTop > window.innerHeight) {
            clearInterval(fallInterval);
            item.remove();
        }
    
    }, 20);
    
}

function endGame(type) {
    gameOver = true;
    score = parseInt(score);
    final_score.textContent = score;

    all_score += score;
    localStorage.setItem("all_score", all_score);
    all_score_display.forEach(all_score_display => {
        all_score_display.textContent = all_score;
    });

    if (score > highScore) {
        highScore = score;
        // console.log(highScore);
        localStorage.setItem("highScore", highScore);
    }
    // finalHighScore.textContent = highScore;
    finalHighScore.forEach(finalHighScore => {
        finalHighScore.textContent = highScore;
    });

    setTimeout(() => {
        var cat_cry = document.getElementById('cat_cry');
        cat_cry.src = "img/" + catSkin + "_cry.png";
        popup.style.display = "block";
    }, 500);

    clearInterval(timerInterval);
    timeLeft = 30;

    if(type == 'die'){
        fire.style.display = "block";
    } else {

    }
}

restart_btn.addEventListener("click", () => {
    document.querySelectorAll(".item").forEach(item => item.remove());
    score = 0;
    score_display.textContent = score;
    gameOver = false;
    popup.style.display = "none";
    fire.style.display = "none";
    updateEquippedItems();
    loadEquippedCat();
    loadEquippedItems();
    clearInterval(timerInterval);
    startTimer();
});

setInterval(() => {
    if (!gameOver) {
        let random = Math.random();
        if(random <= 0.6){
            item_type = 'milk';
        } else {
            item_type = Math.random() < 0.83 ? "bomb" : "clock";
        }
        createItem(item_type);
    }
}, 700);


// ------- 
document.addEventListener("keydown", moveCat);
document.addEventListener("keyup", stopCat);

let catSpeed = 7;
let moveLeft = false;
let moveRight = false;

function moveCat(event) {
    if (event.key === "ArrowLeft") {
        moveLeft = true;
    } else if (event.key === "ArrowRight") {
        moveRight = true;
    }
}

function stopCat(event) {
    if (event.key === "ArrowLeft") {
        moveLeft = false;
    } else if (event.key === "ArrowRight") {
        moveRight = false;
    }
}

function updateCatPosition() {
    if (moveLeft) {
        catX = Math.max(0, catX - catSpeed);
    }
    if (moveRight) {
        catX = Math.min(window.innerWidth - cat_container.offsetWidth, catX + catSpeed);
    }
    cat_container.style.left = `${catX}px`;

    requestAnimationFrame(updateCatPosition);
}

updateCatPosition();
