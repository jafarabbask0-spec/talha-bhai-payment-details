document.addEventListener("DOMContentLoaded", () => {
    // Inputs elements variables
    const inputTime = document.getElementById("input-time");
    const inputBattery = document.getElementById("input-battery");
    const inputAmount = document.getElementById("input-amount");
    const inputTraderId = document.getElementById("input-trader-id");
    const inputUsername = document.getElementById("input-username");
    const inputDatetime = document.getElementById("input-datetime");
    const inputOrderId = document.getElementById("input-order-id");
    const inputPaidWith = document.getElementById("input-paid-with");

    // Display elements variables
    const displayTime = document.getElementById("display-time");
    const displayBatteryFill = document.getElementById("display-battery-fill");
    const displayAmount = document.getElementById("display-amount");
    const displayTraderId = document.getElementById("display-trader-id");
    const displayUsername = document.getElementById("display-username");
    const displayDatetime = document.getElementById("display-datetime");
    const displayOrderId = document.getElementById("display-order-id");
    const displayPaidWith = document.getElementById("display-paid-with");

    // Live sync fields logic
    const syncText = (inputEl, displayEl) => {
        inputEl.addEventListener("input", () => {
            displayEl.textContent = inputEl.value;
        });
    };

    syncText(inputTime, displayTime);
    syncText(inputAmount, displayAmount);
    syncText(inputTraderId, displayTraderId);
    syncText(inputUsername, displayUsername);
    syncText(inputDatetime, displayDatetime);
    syncText(inputOrderId, displayOrderId);
    syncText(inputPaidWith, displayPaidWith);

    // Battery system logic adjustment
    const updateBatterySystem = () => {
        let val = Number(inputBattery.value);
        if (val > 100) val = 100;
        if (val < 0) val = 0;
        displayBatteryFill.style.width = `${val}%`;
    };
    inputBattery.addEventListener("input", updateBatterySystem);
    updateBatterySystem(); // Init state

    // High quality screenshot download function
    const downloadBtn = document.querySelector(".download-btn");
    downloadBtn.addEventListener("click", () => {
        const targetBox = document.getElementById("box");
        
        html2canvas(targetBox, {
            scale: 3, // Premium clarity enhancement
            useCORS: true,
            backgroundColor: "#181e25"
        }).then(canvas => {
            const link = document.createElement("a");
            link.download = `Payment_Details_${Date.now()}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    });
});
