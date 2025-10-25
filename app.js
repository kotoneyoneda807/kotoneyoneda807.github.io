document.addEventListener('DOMContentLoaded', () => {
    const tempInput = document.getElementById('temperature');
    const skeletonSelect = document.getElementById('skeleton-type');
    // 天候とTPOの要素を取得
    const weatherSelect = document.getElementById('weather');
    const tpoSelect = document.getElementById('tpo');
    
    const suggestButton = document.getElementById('suggest-button');
    const resultArea = document.getElementById('result-area');
    const recommendationText = document.getElementById('recommendation-text');
    const trendDetails = document.getElementById('trend-details');

    if (suggestButton) {
        suggestButton.addEventListener('click', () => {
            const temp = parseInt(tempInput.value);
            const skeletonType = skeletonSelect.value;
            // 天候とTPOの値を取得
            const weather = weatherSelect.value;
            const tpo = tpoSelect.value;
    
            // 入力値のバリデーション
            if (isNaN(temp) || temp === "") {
                recommendationText.innerHTML = "有効な気温（数字）を入力してください。";
                trendDetails.innerHTML = "";
                resultArea.classList.remove('hidden');
                return;
            }
            if (skeletonType === "none") {
                 recommendationText.innerHTML = "骨格タイプを選択してください。";
                 trendDetails.innerHTML = "";
                 resultArea.classList.remove('hidden');
                 return;
            }
            
            // 新しい引数を関数に渡す
            const { recommendation, trendItem } = getCoordination(temp, skeletonType, weather, tpo);
    
            // 結果を表示
            recommendationText.innerHTML = recommendation;
            trendDetails.innerHTML = trendItem;
            resultArea.classList.remove('hidden');
        });
    }


    /**
     * 気温、骨格、天候、TPOに基づいてコーディネートとトレンドアイテムを提案するロジック
     */
    function getCoordination(temp, skeletonType, weather, tpo) {
        
        // 骨格タイプごとの基本スタイル定義
        const skeletonAdvice = {
            straight: "【骨格ストレート】<strong>ハリ感のある素材</strong>、<strong>Iラインシルエット</strong>、シンプルでベーシックなデザインで着痩せ効果を狙いましょう。",
            wave: "【骨格ウェーブ】<strong>柔らかい素材</strong>、<strong>AラインやXラインシルエット</strong>、<strong>ハイウエスト</strong>で重心を上げ、華奢な上半身をカバーしましょう。",
            natural: "【骨格ナチュラル】<strong>ざっくりした素材</strong>、<strong>オーバーサイズ</strong>、<strong>Yラインシルエット</strong>でフレームを活かし、カジュアルに着こなしましょう。"
        };

        // 提案ロジックの本体
        let recommendation = "";
        let specificItem = ""; 
        let tempAdvice = "";
        let finalAccessory = ""; 
        let tpoEmphasis = "";
        
        // --- TPOによる強調文の決定 ---
        if (tpo === 'work') {
            tpoEmphasis = "きれいめな通勤スタイルを意識したアイテムを提案します。";
        } else if (tpo === 'active') {
            tpoEmphasis = "動きやすさと機能性を優先したアイテムを提案します。";
        } else if (tpo === 'date') {
            tpoEmphasis = "フェミニンで華やかな、デートにぴったりのアイテムを提案します。";
        }

        // --- 天候による追加アドバイスの決定 ---
        if (weather === 'rain') {
            finalAccessory += "🌂 <strong>雨対策</strong>: 撥水加工のアウターや、水に強い素材（ポリエステル・ナイロン）のバッグを選びましょう。足元は防水ブーツやレインシューズが必須です。";
        } else if (weather === 'snow') {
            finalAccessory
