window.addEventListener("DOMContentLoaded", () => {
    console.log("✔ Everything finished loading");

    const popup = document.createElement("div");
    popup.innerText = "✔ Everything finished loading";
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.background = "green";
    popup.style.color = "white";
    popup.style.padding = "10px";
    popup.style.borderRadius = "8px";
    popup.style.zIndex = "9999";

    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 4000);
});
