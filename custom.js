// document.addEventListener("DOMContentLoaded", function() {
    // ตัวแปรที่เกี่ยวข้องกับปุ่มและหมวดหมู่
    const catIcon = document.getElementById("cat-icon");
    const hatIcon = document.getElementById("hat-icon");
    const glassesIcon = document.getElementById("glasses-icon");

    const catCategory = document.getElementById("type-cat");
    const hatCategory = document.getElementById("type-hat");
    const glassesCategory = document.getElementById("type-glasses");

    // ฟังก์ชันในการซ่อนหมวดหมู่ทั้งหมดและแสดงหมวดหมู่ที่เลือก
    function showCategory(category) {
        // ซ่อนหมวดหมู่ทั้งหมด
        catCategory.classList.add("hidden");
        hatCategory.classList.add("hidden");
        glassesCategory.classList.add("hidden");

        // แสดงหมวดหมู่ที่เลือก
        category.classList.remove("hidden");
    }

    // ฟังก์ชันในการจัดการปุ่ม active
    function setActiveButton(button) {
        // ลบ active ทุกปุ่ม
        catIcon.classList.remove("active");
        hatIcon.classList.remove("active");
        glassesIcon.classList.remove("active");

        // เพิ่ม active ให้กับปุ่มที่ถูกกด
        button.classList.add("active");
    }

    // ฟังก์ชันเมื่อคลิกที่ปุ่มหมวดหมู่
    catIcon.addEventListener("click", function() {
        showCategory(catCategory); // แสดงหมวดหมู่ cat
        setActiveButton(catIcon);  // เพิ่ม active ให้ปุ่ม cat
    });

    hatIcon.addEventListener("click", function() {
        showCategory(hatCategory); // แสดงหมวดหมู่ hat
        setActiveButton(hatIcon);  // เพิ่ม active ให้ปุ่ม hat
    });

    glassesIcon.addEventListener("click", function() {
        showCategory(glassesCategory); // แสดงหมวดหมู่ glasses
        setActiveButton(glassesIcon);  // เพิ่ม active ให้ปุ่ม glasses
    });

    // เริ่มต้นแสดงหมวดหมู่แรก (cat)
    showCategory(catCategory);
    setActiveButton(catIcon);
// });


// ---

// var all_score = localStorage.getItem('all_score');
// // console.log(all_score);
// var cat_selected = document.getElementById('cat-selected');
// var select_btn = document.getElementById('select');

// -----------

// ตัวแปรเก็บกล่องนม
var all_score = parseInt(localStorage.getItem("all_score")) || 0;

// ตัวแปรเก็บไอเทมที่เป็นเจ้าของ
var ownedItems = JSON.parse(localStorage.getItem("ownedItems")) || ['c_p', 'hat_none', 'gl_none'];

// ตัวแปรเก็บไอเทมที่สวมใส่
var equippedItems = JSON.parse(localStorage.getItem("equippedItems")) || {
    cat: "c_p",
    hat: "hat_none",
    glasses: "gl_none"
};

// ราคาไอเทม
var itemPrices = {
    c_o: 50,
    hat_pirate: 100,
    gl_black: 80,
    gl_eye: 15
};

// ดึง element ที่ต้องใช้
var allScoreDisplay = document.querySelector(".all-score-display");
var selectButton = document.getElementById("select");
var catSelected = document.querySelectorAll(".cat-selected");
var costumeItems = document.querySelectorAll(".costume-item button");

// อัปเดตกล่องนม
function updateMilkScore() {
    allScoreDisplay.textContent = all_score;
}

// โหลดไอเทมที่ซื้อแล้ว
function updateOwnedItems() {
    costumeItems.forEach(function (item) {
        var itemId = item.id;
        if (ownedItems.includes(itemId)) {
            item.classList.remove("lock");
        }
    });
}

// โหลดไอเทมที่สวมใส่
function updateEquippedItems() {
    document.querySelector(".cat").src = "img/" + equippedItems.cat + ".png";
    document.querySelector(".hat").src = equippedItems.hat ? "img/" + equippedItems.hat + ".png" : "";
    document.querySelector(".eye").src = equippedItems.glasses ? "img/" + equippedItems.glasses + ".png" : "";

    // อัปเดตคลาส active ในปุ่ม
    costumeItems.forEach(function (item) {
        var itemId = item.id;
        var category = item.parentNode.id.replace("type-", "");

        if (equippedItems[category] === itemId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// เมื่อกดไอเทม
costumeItems.forEach(function (item) {
    item.addEventListener("click", function () {
        // console.log('a');

        var itemId = this.id;
        var category = this.parentNode.id.replace("type-", ""); // แยกประเภทไอเทม

        // แสดงตัวอย่างไอเทมที่เลือก
        previewItem(itemId, category);

        if (ownedItems.includes(itemId)) {
            selectButton.textContent = "สวมใส่";
            selectButton.onclick = function () {
                equipItem(itemId, category);
            };
        } else {
            selectButton.textContent = "ซื้อเลย (" + itemPrices[itemId] + ")";
            selectButton.onclick = function () {
                buyItem(itemId, category);
            };
        }
    });
});

// ✅ ฟังก์ชันแสดงตัวอย่างไอเทม (แต่ไม่บันทึกลง localStorage)
function previewItem(itemId, category) {
    console.log(`Preview ${category}: ${itemId}`);
    
    if (category === "cat") {
        // document.querySelectorAll(".cat").forEach(img => img.src = `img/${itemId}.png`);
        document.getElementById("cat1").src = `img/${itemId}.png`;
    } else if (category === "hat") {
        // document.querySelectorAll(".hat").forEach(img => img.src = itemId !== "hat_none" ? `img/${itemId}.png` : "");
        document.getElementById("hat1").src = itemId !== "hat_none" ? `img/${itemId}.png` : "";
    } else if (category === "glasses") {
        // document.querySelectorAll(".eye").forEach(img => img.src = itemId !== "gl_none" ? `img/${itemId}.png` : "");
        document.getElementById("eye1").src = itemId !== "gl_none" ? `img/${itemId}.png` : "";
    }
}

// ✅ ฟังก์ชันกดเลือกไอเทม (ซื้อหรือสวมใส่)
costumeItems.forEach(function (item) {
    item.addEventListener("click", function () {
        var itemId = this.id;
        var category = this.parentNode.id.replace("type-", ""); // ดึงประเภทไอเทม (cat, hat, glasses)

        // แสดงตัวอย่างไอเทม
        previewItem(itemId, category);

        if (ownedItems.includes(itemId)) {
            selectButton.textContent = "สวมใส่";
            selectButton.onclick = function () {
                equipItem(itemId, category);
            };
        } else {
            selectButton.textContent = `ซื้อเลย (${itemPrices[itemId]})`;
            selectButton.onclick = function () {
                buyItem(itemId, category);
            };
        }
    });
});

// ✅ ฟังก์ชันซื้อไอเทม
function buyItem(itemId, category) {
    if (all_score >= itemPrices[itemId]) {
        all_score -= itemPrices[itemId];
        ownedItems.push(itemId);
        localStorage.setItem("all_score", all_score);
        localStorage.setItem("ownedItems", JSON.stringify(ownedItems));
        updateMilkScore();
        updateOwnedItems();
        selectButton.textContent = "สวมใส่";
        selectButton.onclick = function () {
            equipItem(itemId, category);
        };
    } else {
        alert("กล่องนมไม่พอ!");
    }
}

// ✅ ฟังก์ชันสวมใส่ไอเทม (กดปุ่ม "สวมใส่" แล้วเท่านั้น)
function equipItem(itemId, category) {
    equippedItems[category] = itemId;
    localStorage.setItem("equippedItems", JSON.stringify(equippedItems));
    updateEquippedItems();
}


// โหลดข้อมูลเริ่มต้น
updateMilkScore();
updateOwnedItems();
updateEquippedItems();
