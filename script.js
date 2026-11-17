
        // 設定妳的好友限定密碼！
        const CORRECT_PASSWORD = "9696"; 

        // 倒數計時邏輯
        const birthday = new Date("Nov 17, 2027 00:00:00").getTime();
        function updateTimer() {
            const now = new Date().getTime();
            const distance = birthday - now;
            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);
            const format = (num) => num.toString().padStart(2, '0');
            document.getElementById("timer").innerHTML = `${d}d ${format(h)}h ${format(m)}m ${format(s)}s`;
        }
        setInterval(updateTimer, 1000);
        updateTimer();

        // 密碼彈窗控制
        function openPasswordModal() {
            document.getElementById("pw-error").innerText = "";
            document.getElementById("pw-input").value = "";
            document.getElementById("password-modal").classList.add("active");
            document.getElementById("pw-input").focus();
        }

        function closePasswordModal() {
            document.getElementById("password-modal").classList.remove("active");
        }

        function handleEnter(event) {
            if (event.key === "Enter") {
                checkPassword();
            }
        }

        // 密碼驗證與轉場魔法 (絕對不 Shame 的 Flex 轉場)
        function checkPassword() {
            const enteredPw = document.getElementById("pw-input").value;
            const errorDiv = document.getElementById("pw-error");
            
            if (enteredPw === CORRECT_PASSWORD) {
                // 關閉彈窗
                closePasswordModal();
                
                // 公開主頁淡出
                const publicView = document.getElementById("public-view");
                publicView.style.opacity = "0";
                
                setTimeout(() => {
                    publicView.style.display = "none";
                    
                    // 好友限定頁淡入
                    const privateView = document.getElementById("private-view");
                    privateView.style.display = "block";
                    setTimeout(() => {
                        privateView.style.opacity = "1";
                    }, 50);
                }, 500);
            } else {
                errorDiv.innerText = "ACCESS DENIED. ( 嗚 )";
                document.getElementById("pw-input").value = "";
                document.getElementById("pw-input").focus();
            }
        }

        // 重新上鎖
        function lockPage() {
            const privateView = document.getElementById("private-view");
            privateView.style.opacity = "0";
            
            setTimeout(() => {
                privateView.style.display = "none";
                const publicView = document.getElementById("public-view");
                publicView.style.display = "block";
                setTimeout(() => {
                    publicView.style.opacity = "1";
                }, 50);
            }, 500);
        }



        // 初始化
        initFeedSystem();
