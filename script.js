
        // 設定妳的好友限定密碼！
        const CORRECT_PASSWORD = "9696"; 

        // 倒數計時邏輯
        const birthday = new Date("Nov 17, 2026 00:00:00").getTime();
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

        // ==========================================
        // 🐈‍⬛ 守護小精靈：觸摸碎碎念機制
        // ==========================================
        const PET_TALKS = [
            "哼，愚蠢的人類！見到老夫還不快點跪下膜拜、溫柔地摸摸老夫的頭！",
            "整個貓帝國都是老夫的領土，包括妳現在踩的這塊地板也都是老夫的喵！",
            "看什麼看？再看老夫就把阿鐵的排球當成砲彈，轟炸妳的領地喔！💣",
            "（炸毛）哇啊！不要突然戳老夫！這叫無禮！大不敬！",
            "密碼？那種帝國機密怎麼可能隨便告訴妳這個外國人！除非妳拿秋刀魚來換喵！",
            "今天老夫的心情是：全天下都要聽老夫的！🐾",
            "哼，看在妳今天這麼誠心膜拜老夫的份上，特准妳摸老夫的下巴三秒鐘！不能再多了喵！",
            "（抖了抖耳朵）好啦，看妳今天很累的樣子……老夫特許妳把頭埋進老夫肚子裡吸一口喵！",
            "哼，老夫才沒有在偷聽 King Gnu 搖擺，老夫這是在親自巡視音樂界！♫",
            "（抬頭挺胸）老夫今天也完美地唯我獨尊！妳，對就是妳，准妳當老夫的頭號鏟屎官喵！",
            "爆料！主人今天根本沒在認真，又偷偷溜回本丸去找那個叫燭台切光忠的傢伙了喵！",
            "好啦、好啦！老夫賞賜妳一記「帝國不失眠魔法」，今晚准妳秒睡，不准熬夜！",
            "哼，天天泡在迪士尼扭曲仙境裡看那些魔法帥哥，當老夫瞎了喵？"
        ];

        let bubbleTimeout;

        function petTheCat() {
            const bubble = document.getElementById('pet-bubble');
            
            // 隨機撈一句話
            const randomQuote = PET_TALKS[Math.floor(Math.random() * PET_TALKS.length)];
            
            bubble.innerHTML = randomQuote;
            bubble.classList.add('show');
            
            // 點擊貓咪的彈跳小動畫
            const cat = document.getElementById('pet-aa');
            cat.style.transform = 'scale(1.2)';
            setTimeout(() => { cat.style.transform = 'scale(1)'; }, 150);

            // 5秒後台詞泡泡淡出
            clearTimeout(bubbleTimeout);
            bubbleTimeout = setTimeout(() => {
                bubble.classList.remove('show');
            }, 5000);
        }

        // ==========================================
        // 🐟 守護小精靈：月限一次 Local Storage 餵食統計
        // ==========================================
        // 生成模擬基底人數：利用當月份作為種子，讓數字在不同月份有合理的、微幅的基數
        function getBaseFeedCount() {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth(); // 0 - 11

            // 調整為 5 ~ 12 人（保證在 15 人以內，既溫馨熱鬧，又不會覺得浮誇害羞喵！）
            const base = 5 + ((year * 3 + month * 2) % 8);
            return base;
        }

        function getFeedStorageKey() {
            const now = new Date();
            return `fed-${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
        }

        // 初始化餵食畫面
        function initFeedSystem() {
            const storageKey = getFeedStorageKey();
            const baseCount = getBaseFeedCount();
            
            // 從 LocalStorage 拿取使用者點擊歷史
            let localClicks = parseInt(localStorage.getItem(storageKey + '-count') || '0');
            
            // 總人數 = 基礎模擬人數 + 這台手機點擊的次數
            const totalFeeds = baseCount + localClicks;
            
            // 更新畫面上的人數
            document.getElementById('feed-count-text').innerText = `這個月已經有 ${totalFeeds} 個人類餵我吃秋刀魚了喵！`;
            
            // 如果這個月已經餵過了，按鈕文字切換
            if (localStorage.getItem(storageKey) === 'true') {
                document.getElementById('feed-btn').innerText = '[ 謝謝人類！(𓏼⩊𓏼) ]';
            }
        }

        function feedTheCat() {
            const storageKey = getFeedStorageKey();
            const bubble = document.getElementById('pet-bubble');
            const btn = document.getElementById('feed-btn');
            
            // 檢查本月是否已經餵食過
            if (localStorage.getItem(storageKey) === 'true') {
                // 已餵食過 ➔ 貓咪吐槽
                bubble.innerHTML = "你這個月已經餵過我秋刀魚了，再吃肚子要爆掉啦喵！🐾";
                bubble.classList.add('show');
                
                // 3秒後台詞淡出
                clearTimeout(bubbleTimeout);
                bubbleTimeout = setTimeout(() => {
                    bubble.classList.remove('show');
                }, 3000);
                return;
            }

            // 未餵食 ➔ 執行餵食！
            localStorage.setItem(storageKey, 'true');
            
            let localClicks = parseInt(localStorage.getItem(storageKey + '-count') || '0');
            localClicks += 1;
            localStorage.setItem(storageKey + '-count', localClicks.toString());
            
            bubble.innerHTML = "（嚼嚼嚼）⋯⋯秋刀魚大餐！謝謝善心的人類！喵！━☆・。";
            bubble.classList.add('show');
            btn.innerText = '[ 謝謝人類！(𓏼⩊𓏼) ]';
            
            initFeedSystem();

            // 5秒後台詞淡出
            clearTimeout(bubbleTimeout);
            bubbleTimeout = setTimeout(() => {
                bubble.classList.remove('show');
            }, 5000);
        }

        // 初始化
        initFeedSystem();
