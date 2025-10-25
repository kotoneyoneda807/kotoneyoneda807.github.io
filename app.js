document.addEventListener('DOMContentLoaded', () => {
    const tempInput = document.getElementById('temperature');
    const skeletonSelect = document.getElementById('skeleton-type');
    const suggestButton = document.getElementById('suggest-button');
    const resultArea = document.getElementById('result-area');
    const recommendationText = document.getElementById('recommendation-text');
    const trendDetails = document.getElementById('trend-details');

    if (suggestButton) {
        suggestButton.addEventListener('click', () => {
            const temp = parseInt(tempInput.value);
            const skeletonType = skeletonSelect.value;
    
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
        
        // 【修正点1】骨格タイプごとの基本スタイル定義 (太字にしたい部分を<strong>タグに変更)
        const skeletonAdvice = {
            straight: "【骨格ストレート】<strong>ハリ感のある素材</strong>、<strong>Iラインシルエット</strong>、シンプルでベーシックなデザインで着痩せ効果を狙いましょう。",
            wave: "【骨格ウェーブ】<strong>柔らかい素材</strong>、<strong>AラインやXラインシルエット</strong>、<strong>ハイウエスト</strong>で重心を上げ、華奢な上半身をカバーしましょう。",
            natural: "【骨格ナチュラル】<strong>ざっくりした素材</strong>、<strong>オーバーサイズ</strong>、<strong>Yラインシルエット</strong>でフレームを活かし、カジュアルに着こなしましょう。"
        };

        // 提案ロジックの本体
        let recommendation = "";
        let specificItem = ""; // 骨格別アイテム
        let tempAdvice = "";   // 気温別アドバイス

        // --- 気温別の基本アドバイス --- (前回修正済みですが念のため含めます)
        if (temp >= 30) {
            tempAdvice = "🥵 <strong>猛暑日</strong>です。涼しさと体力の消耗を防ぐことが最優先です。";
            // 【修正点2】specificItem内の**マークダウンをHTMLタグに変更
            if (skeletonType === 'straight') specificItem = "ハリ感のある<strong>コットンシャツ</strong>（ジャストサイズ）と<strong>ベーシックなワイドスラックス</strong>。";
            else if (skeletonType === 'wave') specificItem = "柔らかい素材の<strong>ノースリーブブラウス</strong>に、<strong>シアーなハイウエストスカート</strong>。";
            else if (skeletonType === 'natural') specificItem = "風通しの良い<strong>リネン・麻のオーバーサイズシャツ</strong>に、丈の長い<strong>ワイドパンツ</strong>。";
        
        } else if (temp >= 25) {
            tempAdvice = "☀️ <strong>夏日</strong>です。日中は半袖で快適ですが、朝晩の冷え対策に薄手の羽織りを忘れずに。";
            if (skeletonType === 'straight') specificItem = "<strong>ショート丈ジャケット</strong>とセンタープレスパンツでIラインを意識。";
            else if (skeletonType === 'wave') specificItem = "<strong>柔らかい素材のカーディガン</strong>を肩掛けし、<strong>フレアスカート</strong>でAラインに。";
            else if (skeletonType === 'natural') specificItem = "ざっくりした<strong>オーバーサイズのスウェット</strong>を主役に、<strong>デニムやカーゴパンツ</strong>でカジュアルに。";
        
        } else if (temp >= 20) {
            tempAdvice = "🌤️ <strong>快適な気候</strong>です。長袖一枚で過ごしやすい季節。アウターを脱ぎ着して温度調整を。";
            if (skeletonType === 'straight') specificItem = "<strong>ベーシックなニット</strong>に、<strong>ハリのあるトレンチコート</strong>を羽織る。";
            else if (skeletonType === 'wave') specificItem = "<strong>フリルやギャザー</strong>の入ったブラウスに、<strong>ショート丈のジャケット</strong>を羽織る。";
            else if (skeletonType === 'natural') specificItem = "<strong>ロング丈のシャツ</strong>に<strong>ニットベスト</strong>を重ね、<strong>コーデュロイパンツ</strong>で素材感を出す。";
        
        } else if (temp >= 15) {
            tempAdvice = "🍂 <strong>肌寒い季節</strong>です。アウターが必須。重ね着（レイヤード）を楽しみましょう。";
            if (skeletonType === 'straight') specificItem = "目が詰まった<strong>ハイゲージニット</strong>に、レザーやウールなど<strong>厚みのあるジャケット</strong>。";
            else if (skeletonType === 'wave') specificItem = "薄手の<strong>タートルネック</strong>に、<strong>ショート丈のダウン</strong>や<strong>ツイードジャケット</strong>。";
            else if (skeletonType === 'natural') specificItem = "ざっくりした<strong>ローゲージニット</strong>に、<strong>オーバーサイズのマウンテンパーカー</strong>。";

        } else if (temp >= 10) {
            tempAdvice = "🧣 <strong>寒い</strong>です。本格的な防寒対策が必要です。保温性の高いアウターを選びましょう。";
            if (skeletonType === 'straight') specificItem = "高品質な<strong>ウールコート</strong>（チェスターコートなど）と<strong>Vネックニット</strong>。";
            else if (skeletonType === 'wave') specificItem = "<strong>ファーやシャギー素材</strong>のコートに、<strong>ハイウエストのロングスカート</strong>。";
            else if (skeletonType === 'natural') specificItem = "<strong>ダウンジャケット</strong>は<strong>ロング丈のオーバーサイズ</strong>を選び、<strong>ワイドパンツ</strong>と合わせる。";

        } else {
            tempAdvice = "🥶 <strong>真冬日</strong>です。防寒を最優先！重ね着と、首・手首・足首の防寒を。";
            if (skeletonType === 'straight') specificItem = "着ぶくれしないよう<strong>着丈が長すぎないダウン</strong>を<strong>ジャストサイズ</strong>で。";
            else if (skeletonType === 'wave') specificItem = "ボアやシャギーなど<strong>装飾性のある素材</strong>のアウター。足元は<strong>ロングブーツ</strong>。";
            else if (skeletonType === 'natural') specificItem = "<strong>ムートンやコーデュロイ</strong>など、<strong>天然素材の重厚感</strong>があるアイテムでYラインを強調。";
        }
        
        // 最終的な提案を構成
        recommendation = `${tempAdvice}<br>👉 <strong>${skeletonAdvice[skeletonType]}</strong>`;
        
        // 【修正点3】trendItem内の**マークダウンをHTMLタグに変更
        trendItem = `
            <ul>
                <li>${specificItem}</li>
                <li><strong>トレンドカラー:</strong> 今季は<strong>ブラウン</strong>や<strong>レッド</strong>を小物で取り入れましょう。</li>
                <li><strong>トレンドアイテム:</strong> <strong>ワイドスラックス</strong>、<strong>ショート丈アウター</strong>、<strong>チェック柄</strong>。</li>
            </ul>
        `;

        return { recommendation, trendItem };
    }
});
