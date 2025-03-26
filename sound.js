const soundButtons = document.querySelectorAll(".toggle-sound");  // เลือกทุกปุ่มที่มี class "toggle-sound"
const soundIcons = document.querySelectorAll(".sound-icon");  // เลือกทุกไอคอน
const bgSound = document.getElementById("bg_sound");
const click_sound = document.getElementById("click_sound");
const bomb_sound = document.getElementById("bomb_sound");
const milk_sound = document.getElementById("milk_sound");

soundButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (bgSound.muted) {
            // เปิดเสียงทุกๆ ตัว
            bomb_sound.muted = false;
            milk_sound.muted = false;
            bgSound.muted = false;
            bgSound.play();

            // เปลี่ยนไอคอนทุกตัวเป็น unmute
            soundIcons.forEach(icon => {
                icon.src = 'img/unmute.png';
            });
        } else {
            // ปิดเสียงทุกๆ ตัว
            bomb_sound.muted = true;
            milk_sound.muted = true;
            bgSound.muted = true;

            // เปลี่ยนไอคอนทุกตัวเป็น mute
            soundIcons.forEach(icon => {
                icon.src = 'img/mute.png';
            });
        }
    });
});
