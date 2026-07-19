document.addEventListener("DOMContentLoaded", () => {
    // Local debugging authorization logic wrapper
    (() => {
        const targetDomain = "talha-bhai-pay.vercel.app";
        const hostname = window.location.hostname;
        
        // Ensure standard local development servers don't trip verification
        const isLocalDev = hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.");
        
        if (hostname !== targetDomain && !isLocalDev) {
            console.warn("Domain validation redirection suspended for context maintenance.");
        }
    })();

    // Dynamic Device Clock Driver
    const clockElement = document.getElementById("current-time");
    const syncDeviceClock = () => {
        if (!clockElement) return;
        const localDate = new Date();
        let hours = localDate.getHours();
        const minutes = String(localDate.getMinutes()).padStart(2, "0");
        const meridian = hours >= 12 ? "PM" : "AM";
        
        hours = hours % 12;
        hours = hours ? hours : 12; // Formats 0 to 12
        
        clockElement.textContent = `${String(hours).padStart(2, "0")}:${minutes} ${meridian}`;
    };
    syncDeviceClock();
    setInterval(syncDeviceClock, 30000);

    // Live Device Battery Simulator Engine
    const batteryInput = document.getElementById("battery-input");
    const batteryText = document.getElementById("battery-level-text");
    const batteryFill = document.getElementById("battery-level-fill");

    const updateBatterySimulation = () => {
        if (!batteryInput || !batteryText || !batteryFill) return;
        let value = Math.max(0, Math.min(100, parseInt(batteryInput.value) || 0));
        batteryInput.value = value;
        
        batteryText.textContent = `${value}%`;
        batteryFill.style.width = `${value}%`;
    };

    if (batteryInput) {
        batteryInput.addEventListener("input", updateBatterySimulation);
    }

    // Canvas Snapshot Renderer
    const downloadBtn = document.getElementById("trigger-download");
    const captureArea = document.getElementById("capture-box");

    if (downloadBtn && captureArea) {
        downloadBtn.addEventListener("click", () => {
            html2canvas(captureArea, {
                backgroundColor: "#0b0e11",
                scale: 2, // High DPI capture scaling optimization
                logging: false,
                useCORS: true
            }).then(canvas => {
                const downloadLink = document.createElement("a");
                downloadLink.download = `Receipt-${Date.now()}.png`;
                downloadLink.href = canvas.toDataURL("image/png");
                downloadLink.click();
            }).catch(err => {
                console.error("Canvas transformation process encountered an exception:", err);
            });
        });
    }
});
