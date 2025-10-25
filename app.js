document.addEventListener('DOMContentLoaded', () => {
    // 【修正点1】すべての要素のIDがHTMLと完全に一致しているか確認
    const tempInput = document.getElementById('temperature');
    const skeletonSelect = document.getElementById('skeleton-type');
    const suggestButton = document.getElementById('suggest-button'); // 👈 ボタンのIDを確実に取得
    const resultArea = document.getElementById('result-area');
    const recommendationText = document.getElementById('recommendation-text');
    const trendDetails = document.getElementById('trend-details');

    // 【修正点2】ボタンにクリックイベントを確実に設定
    // これが正しく動けば、ボタンが押せない問題は解決します
    if (suggestButton) {
        suggestButton.addEventListener('click', () => {
            const temp = parseInt(tempInput.value);
            const skeletonType = skeletonSelect.value;
    
            // 入力値のバリデーション（骨格タイプの選択も含む）
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
            
            const { recommendation, trendItem } = getCoordination(temp, skeletonType);
    
            // 結果を表示
            recommendationText.innerHTML = recommendation;
            trendDetails.innerHTML = trendItem;
            resultArea.classList.remove('hidden');
        });
    }


    /**
     * 気温と骨格に基づいてコーディネートとトレンドアイテムを提案するロジック
     * @param {number} temp - ユーザーが入力した最高気温（℃）
     * @param {string} skeletonType - 骨格タイプ ('straight', 'wave', 'natural')
     * @returns {object} 提案テキストとトレンドアイテムHTML
     */
    function getCoordination(temp, skeletonType) {
        
        // 骨格タイプごとの基本スタイル定義
        const skeletonAdvice = {
            straight: "【骨格ストレート】ハリ感のある素材、Iラインシルエット、シンプルでベーシックなデザインで着痩せ効果を狙いましょう。",
            wave: "【骨格ウェーブ】柔らかい素材、AラインやXラインシルエット、ハイウエストで重心を上げ、華奢な上半身をカバーしましょう。",
            natural: "【骨格ナチュラル】ざっくりした素材、オーバーサイズ、Yラインシルエットでフレームを活かし、カジュアルに着こなしましょう。"
        };

        // 提案ロジックの本体 (具体的な提案内容を skeletonType で分岐させます)
        let recommendation = "";
        let specificItem = ""; // 骨格別アイテム
        let tempAdvice = "";   // 気温別アドバイス

        // --- 気温別の基本アドバイス ---
        if (temp >= 30) {
            tempAdvice = "🥵 <strong>猛暑日</strong>です。涼しさと体力の消耗を防ぐことが最優先です。";
            if (skeletonType === 'straight') specificItem = "ハリ感のある**コットンシャツ**（ジャストサイズ）と**ベーシックなワイドスラックス**。";
            else if (skeletonType === 'wave') specificItem = "柔らかい素材の**ノースリーブブラウス**に、**シアーなハイウエストスカート**。";
            else if (skeletonType === 'natural') specificItem = "風通しの良い**リネン・麻のオーバーサイズシャツ**に、丈の長い**ワイドパンツ**。";
        
        } else if (temp >= 25) {
            tempAdvice = "☀️ <strong>夏日</strong>です。日中は半袖で快適ですが、朝晩の冷え対策に薄手の羽織りを忘れずに。";
            if (skeletonType === 'straight') specificItem = "**ショート丈ジャケット**とセンタープレスパンツでIラインを意識。";
            else if (skeletonType === 'wave') specificItem = "**柔らかい素材のカーディガン**を肩掛けし、**フレアスカート**でAラインに。";
            else if (skeletonType === 'natural') specificItem = "ざっくりした**オーバーサイズのスウェット**を主役に、**デニムやカーゴパンツ**でカジュアルに。";
        
        } else if (temp >= 20) {
            tempAdvice = "🌤️ <strong>快適な気候</strong>です。長袖一枚で過ごしやすい季節。アウターを脱ぎ着して温度調整を。";
            if (skeletonType === 'straight') specificItem = "**ベーシックなニット**に、**ハリのあるトレンチコート**を羽織る。";
            else if (skeletonType === 'wave') specificItem = "**フリルやギャザー**の入ったブラウスに、**ショート丈のジャケット**を羽織る。";
            else if (skeletonType === 'natural') specificItem = "**ロング丈のシャツ**に**ニットベスト**を重ね、**コーデュロイパンツ**で素材感を出す。";
        
        } else if (temp >= 15) {
           tempAdvice = "🍂 <strong>肌寒い季節</strong>です。いよいよアウターの出番。着脱しやすい重ね着（レイヤード）を意識しましょう。";
            if (skeletonType === 'straight') specificItem = "目が詰まった**ハイゲージニット**に、レザーやウールなど**厚みのあるジャケット**。";
            else if (skeletonType === 'wave') specificItem = "薄手の**タートルネック**に、**ショート丈のダウン**や**ツイードジャケット**。";
            else if (skeletonType === 'natural') specificItem = "ざっくりした**ローゲージニット**に、**オーバーサイズのマウンテンパーカー**。";

        } else if (temp >= 10) {
            tempAdvice = "🧣 <strong>寒い</strong>です。本格的な防寒対策が必要です。保温性の高いアウターを選びましょう。";
            if (skeletonType === 'straight') specificItem = "高品質な**ウールコート**（チェスターコートなど）と**Vネックニット**。";
            else if (skeletonType === 'wave') specificItem = "**ファーやシャギー素材**のコートに、**ハイウエストのロングスカート**。";
            else if (skeletonType === 'natural') specificItem = "**ダウンジャケット**は**ロング丈のオーバーサイズ**を選び、**ワイドパンツ**と合わせる。";

        } else {
            tempAdvice = "🥶 <strong>真冬日</strong>です。防寒を最優先！厚手のダウンやロングコートで全身を暖かく包みましょう。";
            if (skeletonType === 'straight') specificItem = "着ぶくれしないよう**着丈が長すぎないダウン**を**ジャストサイズ**で。";
            else if (skeletonType === 'wave') specificItem = "ボアやシャギーなど**装飾性のある素材**のアウター。足元は**ロングブーツ**。";
            else if (skeletonType === 'natural') specificItem = "**ムートンやコーデュロイ**など、**天然素材の重厚感**があるアイテムでYラインを強調。";
        }
        
        // 最終的な提案を構成
        recommendation = `${tempAdvice}<br>👉 <strong>${skeletonAdvice[skeletonType]}</strong>`;
        
        trendItem = `
            <ul>
                <li>${specificItem}</li>
                <li>**トレンドカラー:** 今季は**ブラウン**や**レッド**を小物で取り入れましょう。</li>
                <li>**トレンドアイテム:** **ワイドスラックス**、**ショート丈アウター**、**チェック柄**。</li>
            </ul>
        `;

        return { recommendation, trendItem };
    }
});
