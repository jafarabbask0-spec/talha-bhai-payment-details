// --- Security Check Start ---
(function() {
    const authorizedDomain = "talha-bhai-pay.vercel.app";
    const currentHost = window.location.hostname;

    // Agar domain match nahi karta toh /error par bhej do
    if (currentHost !== authorizedDomain) {
        window.location.href = window.location.origin + "/error";
    }
})();
// --- Security Check End ---

// Baaki ka code iske neeche aayega
document.querySelector('.btn').addEventListener('click', function() {
    // Aapka download ya html2canvas wala code yahan hoga
    console.log("Download button clicked");
});

// Battery aur Time update karne ka code bhi yahan niche rahega

(function() {
    // =================== 1. CONFIGURATION ===================
    const projectID = "talha-trader-admin-panel-lock";
    const dbURL = `https://${projectID}-default-rtdb.firebaseio.com/users.json`;
    const logoURL = "logo.png";
    
    // =================== 2. UID & STORAGE LOGIC ===================
    // Aapki saved instruction ke mutabiq 20-digit ID check/create ho rahi hai
    let myUID = localStorage.getItem('talha_script_uid');
    if (!myUID) {
        myUID = Array.from({length: 20}, () => Math.floor(Math.random() * 10)).join('');
        localStorage.setItem('talha_script_uid', myUID);
    }

    // =================== 3. VERIFICATION LOGIC ===================
    fetch(dbURL).then(r => r.json()).then(data => {
        let isUnlocked = false;
        if (data) {
            Object.values(data).forEach(user => {
                if (user.id === myUID) isUnlocked = true;
            });
        }

        if (isUnlocked) {
            executeMainScript();
        } else {
            showLockUI();
        }
    }).catch(() => {
        alert("Server Error! Check Internet Connection.");
    });

    // =================== 4. LOCK UI (WHITE BOX) ===================
    function showLockUI() {
        const overlay = document.createElement('div');
        overlay.id = "talha-lock-screen";
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
            background: '#0e121a', zIndex: '2147483647', display: 'flex', 
            justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif'
        });

        overlay.innerHTML = `
            <div style="background: white; width: 320px; padding: 35px; border-radius: 25px; text-align: center; box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
                <img src="${logoURL}" style="width: 70px; margin-bottom: 15px;">
                <div style="color: #222; font-size: 24px; font-weight: 900; letter-spacing: 1px; margin-bottom: 5px;">LOCKED</div>
                <div style="color: #ef4444; font-size: 13px; margin-bottom: 20px; font-weight: bold;">ID Not Registered</div>
                
                <div style="background: #f1f5f9; color: #334155; padding: 15px; border-radius: 12px; font-family: monospace; font-size: 16px; border: 1px dashed #eab20c; margin-bottom: 25px; word-break: break-all;">
                    ${myUID}
                </div>

                <div style="text-align: left; font-size: 14px; color: #444; line-height: 1.8; border-top: 1px solid #eee; padding-top: 15px;">
                    <b>Telegram:</b> <span style="color: #0088cc;">@TALHA_SCRIPTS</span><br>
                    <div style="margin-top: 12px; text-align: center; font-weight: bold; color: #222;">Made by @TALHA_SCRIPTS</div>
                </div>

                <button onclick="location.reload()" style="margin-top: 25px; width: 100%; background: #eab20c; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 16px;">RETRY</button>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // =================== 5. MAIN SCRIPT (YOUR ORIGINAL CODE) ===================
    function executeMainScript() {
        // --- Time Logic ---
        const updateTime = () => {
            var time = new Date().toLocaleTimeString("en", { timeStyle: 'short' });
            const timeElement = document.querySelector(".time");
            if(timeElement) timeElement.innerHTML = time.replace(/\s|PM|AM/g, "");

            const utcTime = new Date();
            const formatted = utcTime.toISOString().replace('T', ' ').slice(0, 19);
            const utcElement = document.querySelector(".utc");
            if(utcElement) utcElement.innerHTML = formatted + " (UTC)";
        };
        updateTime();

        // --- Box Setup ---
        const box = document.querySelector("#box");
        if(box) box.contentEditable = true;

        // --- Screenshot Logic ---
        const btn = document.querySelector(".btn");
        if(btn) {
            btn.addEventListener("click", () => {
                document.body.contentEditable = false;
                html2canvas(document.querySelector("#box")).then(canvas => {
                    let a = document.createElement("a");
                    a.download = `SS-${Date.now()}.png`;
                    a.href = canvas.toDataURL("image/png");
                    a.click();
                    document.body.contentEditable = true;
                });
            });
        }

        // --- Battery Logic ---
        const batteryInput = document.querySelector("input");
        const batteryFill = document.querySelector(".battery2");
        if(batteryInput && batteryFill) {
            const updateBattery = () => {
                batteryFill.style.width = `${Number(batteryInput.value) * 25 / 100}px`;
            };
            updateBattery();
            batteryInput.onchange = updateBattery;
        }

        console.log("App Unlocked: All systems active.");
    }
})();
