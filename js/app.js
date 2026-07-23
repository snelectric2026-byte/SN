/*==================================================
    SN ELECTRIC | app.js
==================================================*/

let currentService = "";
let totalPrice = 0;

const prices = {
    point: 90,
    switch: 40,
    socket: 40,
    lamp: 35,
    spot: 45,
    camera: 250
};

function openForm(service) {
    currentService = service;
    document.getElementById("formTitle").innerText = service;
    document.getElementById("formModal").style.display = "block";
    
    let html = `<label>ملاحظات إضافية</label><textarea id="notes" placeholder="اكتب أي تفاصيل إضافية هنا..."></textarea>`;
    document.getElementById("dynamicFields").innerHTML = html;
}

function closeForm() {
    document.getElementById("formModal").style.display = "none";
    document.getElementById("serviceForm").reset();
}

function sendWhatsApp() {
    let name = document.getElementById("customerName").value.trim();
    let phone = document.getElementById("customerPhone").value.trim();
    let address = document.getElementById("customerAddress").value.trim();
    let notes = document.getElementById("notes") ? document.getElementById("notes").value.trim() : "";

    if (!name || !phone || !address) {
        alert("يرجى استكمال البيانات الأساسية.");
        return;
    }

    let message = "*طلب خدمة جديد*%0A--------------------%0A";
    message += "👤 الاسم: " + name + "%0A";
    message += "📱 الهاتف: " + phone + "%0A";
    message += "📍 العنوان: " + address + "%0A";
    message += "🛠 الخدمة: " + currentService + "%0A";
    if (notes) message += "📝 ملاحظات: " + notes + "%0A";

    window.open("https://wa.me/201287837118?text=" + message, "_blank");
    closeForm();
}

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".menu");
    const nav = document.querySelector("nav");
    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
});
