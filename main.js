// ดึง element ของแต่ละหน้า
const main_menu = document.getElementById("main-menu");
const custom = document.getElementById("custom");
const game_container = document.getElementById("game-container");

// ดึงปุ่มที่ใช้เปลี่ยนหน้า
const start_btn = document.getElementById("start-btn");
const custom_btn = document.querySelectorAll(".custom-btn");
const main_menu_btn = document.getElementById("main-menu-btn");

// high score
const finalHighScore = document.querySelectorAll(".final-high-score"); 
let highScore = localStorage.getItem("highScore") || 0;
finalHighScore.forEach(finalHighScore => {
    finalHighScore.textContent = highScore;
});

// all score
const all_score_display = document.querySelectorAll(".all-score-display");
let all_score = localStorage.getItem("all_score") || 0;
all_score = parseInt(all_score);
all_score_display.forEach(all_score_display => {
    all_score_display.textContent = all_score;
});

// ฟังก์ชันซ่อนทุกหน้า
function hideAllScreens() {
    main_menu.classList.add('hidden');
    custom.classList.add('hidden');
    game_container.classList.add('hidden');
}

// เมื่อกดปุ่ม "เริ่มเกม"
start_btn.addEventListener("click", () => {
    hideAllScreens();
    game_container.classList.remove('hidden');

    let gameScriptLoaded = false;
    if (!gameScriptLoaded) {
        let script = document.createElement("script");
        script.src = "script.js"; // โหลดไฟล์เกม
        script.onload = () => {
            gameScriptLoaded = true; // ป้องกันโหลดซ้ำ
        };
        document.body.appendChild(script);
    } 

});

// เมื่อกดปุ่ม "แต่งตัว"
custom_btn.forEach(custom_btn => {
    custom_btn.addEventListener("click", () => {
        hideAllScreens();
        custom.classList.remove('hidden');
    });
});


// เมื่อกดปุ่ม "กลับ"
main_menu_btn.addEventListener("click", () => {
    hideAllScreens();
    main_menu.classList.remove('hidden');
});

// ฟังก์ชันเริ่มเกม (ต้องสร้างไว้ในไฟล์เกมหลัก)
// function startGame() {
//     console.log("เริ่มเกม!");
//     // โค้ดสำหรับเปลี่ยนไปหน้าเกม
// }
