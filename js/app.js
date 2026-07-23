/*==================================================
        KHALSANA ES | app.js
==================================================*/

let currentService = "";
let totalPrice = 0;

const prices = {
    point: 90,
    switch: 40,
    socket: 40,
    lamp: 35,
    spot: 45,
    chandelier: 120,
    camera: 250,
    intercom: 450,
    washing: 350,
    fridge: 450,
    heater: 250,
    pump: 300,
    cooler: 250,
    blender: 150
};

/*==============================
      فتح النموذج
==============================*/
function openForm(service) {
    currentService = service;
    const titleEl = document.getElementById("formTitle");
    const modalEl = document.getElementById("formModal");
    
    if(titleEl) titleEl.innerText = service;
    if(modalEl) modalEl.style.display = "block";

    let html = "";

    switch (service) {
        case "تأسيس كهرباء":
            html = `
                <label>عدد الغرف</label>
                <input type="number" id="rooms" value="0" oninput="calcPrice()">
                <label>عدد الحمامات</label>
                <input type="number" id="bath" value="0" oninput="calcPrice()">
                <label>عدد المطابخ</label>
                <input type="number" id="kitchen" value="0" oninput="calcPrice()">
                <label>عدد الممرات</label>
                <input type="number" id="hall" value="0" oninput="calcPrice()">
                <label>ملاحظات</label>
                <textarea id="notes"></textarea>
            `;
            break;

        case "تشطيب إكسسوارات":
            html = `
                <label>عدد المفاتيح</label>
                <input type="number" id="switches" value="0" oninput="calcPrice()">
                <label>عدد البرايز</label>
                <input type="number" id="sockets" value="0" oninput="calcPrice()">
                <label>عدد اللمبات</label>
                <input type="number" id="lamps" value="0" oninput="calcPrice()">
                <label>عدد النجف</label>
                <input type="number" id="chandeliers" value="0" oninput="calcPrice()">
                <label>عدد السبوتات</label>
                <input type="number" id="spots" value="0" oninput="calcPrice()">
                <label>ملاحظات</label>
                <textarea id="notes"></textarea>
            `;
            break;

        case "كاميرات مراقبة":
            html = `
                <label>عدد الكاميرات</label>
                <input type="number" id="cams" value="1" oninput="calcPrice()">
                <label>ربط بالموبايل</label>
                <select id="mobile"><option>نعم</option><option>لا</option></select>
                <label>ملاحظات</label>
                <textarea id="notes"></textarea>
            `;
            break;

        case "إنتركم":
            html = `
                <label>عدد الوحدات</label>
                <input type="number" id="units" value="1" oninput="calcPrice()">
                <label>النوع</label>
                <select id="type"><option>صوت</option><option>فيديو</option></select>
                <label>ملاحظات</label>
                <textarea id="notes"></textarea>
            `;
            break;

        case "غسالات":
            html = `
                <label>نوع الغسالة</label>
                <select id="machineType"><option>عادية</option><option>نصف أوتوماتيك</option><option>أوتوماتيك</option><option>فوق أوتوماتيك</option></select>
                <label>وصف العطل</label>
                <textarea id="notes"></textarea>
            `;
            break;

        case "ثلاجات":
            html = `
                <label>نوع الثلاجة</label>
                <select id="fridgeType"><option>منزلية</option><option>ديب فريزر</option><option>تجارية</option></select>
                <label>وصف العطل</label>
                <textarea id="notes"></textarea>
            `;
            break;

        case "سخانات":
            html = `
                <label>نوع السخان</label>
                <select id="heaterType"><option>كهرباء</option><option>غاز</option></select>
                <label>وصف العطل</label>
                <textarea id="notes"></textarea>
            `;
            break;

        case "مواتير مياه":
            html = `
                <label>عدد المواتير</label>
                <input type="number" id="pumpCount" value="1" oninput="calcPrice()">
                <label>وصف العطل</label>
                <textarea id="notes"></textarea>
            `;
            break;

        case "مبردات مياه":
            html = `
                <label>عدد المبردات</label>
                <input type="number" id="coolerCount" value="1" oninput="calcPrice()">
                <label>وصف العطل</label>
                <textarea id="notes"></textarea>
            `;
            break;

        case "خلاطات":
            html = `
                <label>عدد الخلاطات</label>
                <input type="number" id="blenderCount" value="1" oninput="calcPrice()">
                <label>وصف العطل</label>
                <textarea id="notes"></textarea>
            `;
            break;

        default:
            html = `
                <label>وصف الطلب</label>
                <textarea id="notes"></textarea>
            `;
    }

    const dynamicEl = document.getElementById("dynamicFields");
    if(dynamicEl) dynamicEl.innerHTML = html;
    calcPrice();
}

/*==============================
      إغلاق النموذج
==============================*/
function closeForm() {
    const modalEl = document.getElementById("formModal");
    const formEl = document.getElementById("serviceForm");
    const dynamicEl = document.getElementById("dynamicFields");
    const priceEl = document.getElementById("totalPrice");

    if(modalEl) modalEl.style.display = "none";
    if(formEl) formEl.reset();
    if(dynamicEl) dynamicEl.innerHTML = "";
    if(priceEl) priceEl.innerHTML = "السعر التقديري: 0 جنيه";
}

/*==============================
      حساب الأسعار
==============================*/
function calcPrice() {
    totalPrice = 0;

    if (currentService === "تأسيس كهرباء") {
        let rooms = Number(document.getElementById("rooms")?.value || 0);
        let bath = Number(document.getElementById("bath")?.value || 0);
        let kitchen = Number(document.getElementById("kitchen")?.value || 0);
        let hall = Number(document.getElementById("hall")?.value || 0);
        let points = (rooms * 8) + (bath * 3) + (kitchen * 6) + (hall * 2);
        totalPrice = points * prices.point;
    } else if (currentService === "تشطيب إكسسوارات") {
        let sw = Number(document.getElementById("switches")?.value || 0);
        let so = Number(document.getElementById("sockets")?.value || 0);
        let la = Number(document.getElementById("lamps")?.value || 0);
        let ch = Number(document.getElementById("chandeliers")?.value || 0);
        let sp = Number(document.getElementById("spots")?.value || 0);
        totalPrice = (sw * prices.switch) + (so * prices.socket) + (la * prices.lamp) + (ch * prices.chandelier) + (sp * prices.spot);
    } else if (currentService === "كاميرات مراقبة") {
        let cams = Number(document.getElementById("cams")?.value || 1);
        totalPrice = cams * prices.camera;
    } else if (currentService === "إنتركم") {
        let units = Number(document.getElementById("units")?.value || 1);
        totalPrice = units * prices.intercom;
    } else if (currentService === "غسالات") {
        totalPrice = prices.washing;
    } else if (currentService === "ثلاجات") {
        totalPrice = prices.fridge;
    } else if (currentService === "سخانات") {
        totalPrice = prices.heater;
    } else if (currentService === "مواتير مياه") {
        let count = Number(document.getElementById("pumpCount")?.value || 1);
        totalPrice = count * prices.pump;
    } else if (currentService === "مبردات مياه") {
        let count = Number(document.getElementById("coolerCount")?.value || 1);
        totalPrice = count * prices.cooler;
    } else if (currentService === "خلاطات") {
        let count = Number(document.getElementById("blenderCount")?.value || 1);
        totalPrice = count * prices.blender;
    }

    const priceBox = document.getElementById("totalPrice");
    if (priceBox) {
        priceBox.innerHTML = "💰 السعر التقديري (مصنعية فقط): " + totalPrice.toLocaleString() + " جنيه";
    }
}

/*==============================
      إرسال واتساب
==============================*/
async function sendWhatsApp() {
    let name = document.getElementById("customerName")?.value.trim() || "";
    let phone = document.getElementById("customerPhone")?.value.trim() || "";
    let address = document.getElementById("customerAddress")?.value.trim() || "";

    if (name === "" || phone === "" || address === "") {
        alert("يرجى استكمال جميع البيانات.");
        return;
    }

    let notes = "";
    if (document.getElementById("notes")) {
        notes = document.getElementById("notes").value.trim();
    }

    let message = "*طلب خدمة جديد*%0A====================%0A";
    message += "👤 الاسم: " + name + "%0A";
    message += "📱 الهاتف: " + phone + "%0A";
    message += "📍 العنوان: " + address + "%0A";
    message += "🛠 الخدمة: " + currentService + "%0A";
    message += "💰 السعر التقديري: " + totalPrice + " جنيه%0A";
    if (notes !== "") {
        message += "📝 الملاحظات: " + notes + "%0A";
    }

    try {
        if (window.saveServiceRequest) {
            await window.saveServiceRequest({
                name: name,
                phone: phone,
                address: address,
                service: currentService,
                price: totalPrice,
                notes: notes
            });
        }
    } catch (err) {
        console.log(err);
    }

    if (window.increaseCounter) {
        window.increaseCounter("whatsapp");
        window.increaseCounter("requests");
    }

    window.open("https://wa.me/201287837118?text=" + message, "_blank");
    closeForm();
}

/*==============================
        عداد الزيارات والاتصالات
==============================*/
async function increaseVisitCounter() {
    try {
        if (window.increaseCounter) {
            await window.increaseCounter("visits");
        }
    } catch (err) {
        console.log(err);
    }
}

function registerCall() {
    if (window.increaseCounter) {
        window.increaseCounter("calls");
    }
}

/*==============================
    تحميل الإحصائيات
==============================*/
async function loadStatistics() {
    try {
        if (!window.loadSiteStatistics) return;
        const stats = await window.loadSiteStatistics();
        if (!stats) return;

        if (document.getElementById("visitCounter")) document.getElementById("visitCounter").innerText = stats.visits || 0;
        if (document.getElementById("callCounter")) document.getElementById("callCounter").innerText = stats.calls || 0;
        if (document.getElementById("whatsappCounter")) document.getElementById("whatsappCounter").innerText = stats.whatsapp || 0;
        if (document.getElementById("requestCounter")) document.getElementById("requestCounter").innerText = stats.requests || 0;
        if (document.getElementById("ratingAverage")) document.getElementById("ratingAverage").innerText = Number(stats.rating || 5).toFixed(1);
    } catch (err) {
        console.log(err);
    }
}

/*==============================
      Animation on Scroll
==============================*/
function revealElements() {
    const items = document.querySelectorAll(".card,.feature,.review-card,.stat,.contact-card");
    items.forEach(item => {
        const top = item.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            item.classList.add("fade-up");
        }
    });
}

/*==============================
      القائمة بالموبايل
==============================*/
function toggleMenu() {
    const nav = document.querySelector("nav");
    if (!nav) return;
    nav.classList.toggle("active");
}

/*==============================
      تشغيل الموقع
==============================*/
document.addEventListener("DOMContentLoaded", async () => {
    await increaseVisitCounter();
    await loadStatistics();
    revealElements();

    const menuBtn = document.querySelector(".menu");
    if (menuBtn) {
        menuBtn.addEventListener("click", toggleMenu);
    }

    document.querySelectorAll('a[href^="tel:"]').forEach(btn => {
        btn.addEventListener("click", () => {
            registerCall();
        });
    });
});

window.onclick = function (e) {
    const modal = document.getElementById("formModal");
    if (e.target === modal) {
        closeForm();
    }
};

window.openForm = openForm;
window.closeForm = closeForm;
window.calcPrice = calcPrice;
window.sendWhatsApp = sendWhatsApp;

console.log("KHALSANA ES Loaded Successfully");
