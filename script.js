document.addEventListener("DOMContentLoaded", function() {
    
    // =================== 1. DOM ELEMENTS SELECTION ===================
    // Display UI Elements (iPhone view screen nodes)
    const displayTime = document.getElementById("display-time");
    const displayBatteryText = document.getElementById("display-battery-text");
    const displayBatteryFill = document.getElementById("display-battery-fill");
    const displayAmount = document.getElementById("display-amount");
    const displayPaidWith = document.getElementById("display-paid-with");
    const displayTraderId = document.getElementById("display-trader-id");
    const displayTraderName = document.getElementById("display-trader-name");
    const displayNote = document.getElementById("display-note");
    const displayOrderId = document.getElementById("display-order-id");
    const displayDatetime = document.getElementById("display-datetime");

    // Input Control Panels Elements
    const inputTime = document.getElementById("input-time");
    const inputBattery = document.getElementById("input-battery");
    const inputAmount = document.getElementById("input-amount");
    const inputPaidWith = document.getElementById("input-paid-with");
    const inputTraderId = document.getElementById("input-trader-id");
    const inputTraderName = document.getElementById("input-trader-name");
    const inputNote = document.getElementById("input-note");
    const inputOrderId = document.getElementById("input-order-id");
    const inputDatetime = document.getElementById("input-datetime");
    
    const downloadBtn = document.querySelector(".btn-download");

    // =================== 2. REALTIME SYNCHRONIZATION DATA ===================
    function syncValue(inputEl, displayEl, callback = null) {
        if (!inputEl || !displayEl) return;
        
        const update = () => {
            displayEl.innerText = inputEl.value;
            if (callback) callback(inputEl.value);
        };
        
        inputEl.addEventListener("input", update);
        // Initial load sync values
        update();
    }

    // Connect all input changes directly to screen layout labels
    syncValue(inputTime, displayTime);
    syncValue(inputAmount, displayAmount);
    syncValue(inputPaidWith, displayPaidWith);
    syncValue(inputTraderId, displayTraderId);
    syncValue(inputTraderName, displayTraderName);
    syncValue(inputNote, displayNote);
    syncValue(inputOrderId, displayOrderId);
    syncValue(inputDatetime, displayDatetime);

    // Battery system logic linking fill bar width with text updates
    if (inputBattery && displayBatteryText && displayBatteryFill) {
        const updateBattery = () => {
            let val = Math.min(Math.max(parseInt(inputBattery.value) || 0, 0), 100);
            displayBatteryText.innerText = val;
            displayBatteryFill.style.width = `${val}%`;
            
            // Turn battery red if less than 20 percent for pure authenticity
            if (val <= 20) {
                displayBatteryFill.style.backgroundColor = "#ff3b30";
            } else {
                displayBatteryFill.style.backgroundColor = "#000000";
            }
        };
        inputBattery.addEventListener("input", updateBattery);
        updateBattery();
    }

    // Make the card layout elements directly editable as backup feature
    const boxEl = document.getElementById("box");
    if (boxEl) {
        boxEl.contentEditable = "true";
    }

    // =================== 3. CAPTURE & DOWNLOAD ENGINE ===================
    if (downloadBtn && boxEl) {
        downloadBtn.addEventListener("click", function() {
            // Temporarily disable editing border views before click snap
            boxEl.contentEditable = "false";
            
            // Render the inner #box exactly matching layout specifications
            html2canvas(boxEl, {
                scale: 3, // High definition crisp scale settings
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff"
            }).then(canvas => {
                const link = document.createElement("a");
                link.download = `iOS-PaymentDetails-${Date.now()}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                
                // Re-enable content editable properties
                boxEl.contentEditable = "true";
            }).catch(err => {
                console.error("Screenshot rendering fault:", err);
                boxEl.contentEditable = "true";
            });
        });
    }
});
