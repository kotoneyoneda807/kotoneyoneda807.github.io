document.addEventListener('DOMContentLoaded', () => {
    const tempInput = document.getElementById('temperature');
    const suggestButton = document.getElementById('suggest-button');
    const resultArea = document.getElementById('result-area');
    const recommendationText = document.getElementById('recommendation-text');
    const trendDetails = document.getElementById('trend-details');

    suggestButton.addEventListener('click', () => {
        const temp = parseInt(tempInput.value);

        // 入力値のバリデーション
        if (isNaN(temp) || temp === "") {
            recommendationText.innerHTML = "有効な気温（数字）を入力してください。";
            trendDetails.innerHTML = "";
            resultArea.classList.remove('hidden');
            return;
        }

        const { recommendation, trendItem } = getCoordination(temp);

        // 結果を表示
        recommendationText.innerHTML = recommendation;
        trendDetails.innerHTML = trendItem;
        resultArea.classList.remove('hidden');
    });

    /**
     * 気温に基づいてコーディネートとトレンドアイテムを提案するロジック
     * @param {number} temp - ユーザーが入力した最高気温（℃）
     * @returns {object} 提案テキストとトレンドアイテムHTML
     */
    function getCoordination(temp) {
        let recommendation = "";
        let trendItem = "";

        if (temp >= 30) {
            // 猛暑日（30℃以上）
            recommendation = "🥵 **猛暑日**です。涼しさと体力の消耗を防ぐことが最優先です。清涼感のある素材を選びましょう。";
            trendItem = `
                <ul>
                    <li>**着こなし:** **ノースリーブ**やTシャツに、冷房対策として**シアー素材**のシャツを羽織る。</li>
                    <li>**トレンド:** リラックス感のある**ワイドスラックス**や、**カットアウトトップス**を取り入れて。</li>
                    <li>**素材:** リネン、コットン、吸水速乾素材</li>
                </ul>
            `;
        } else if (temp >= 25) {
            // 夏日/初秋（25℃〜29℃）
            recommendation = "☀️ **夏日**です。日中は半袖で快適ですが、朝晩の冷えや紫外線対策に薄手の羽織りを忘れずに。";
            trendItem = `
                <ul>
                    <li>**着こなし:** **半袖トップス**に、薄手の**カーディガン**や**シアーシャツ**を肩掛け。</li>
                    <li>**トレンド:** **ショート丈アウター**や、秋のトレンドカラー（**ブラウン、レッド**）を取り入れたトップス。</li>
                    <li>**素材:** 薄手のコットン、レーヨン、リネンブレンド</li>
                </ul>
            `;
        } else if (temp >= 20) {
            // 快適な気候（20℃〜24℃）
            recommendation = "🌤️ **快適な気候**です。長袖一枚で過ごしやすい季節。朝晩の気温差に注意して。";
            trendItem = `
                <ul>
                    <li>**着こなし:** 薄手の**ニット**や**長袖Tシャツ**（ロンT）が主役。軽めの**ジャケット**やパーカーを準備。</li>
                    <li>**トレンド:** **テーラードジャケット**や、**チェック柄**のシャツ。足元はクラシカルな**ローファー**が旬。</li>
                    <li>**素材:** コットン、薄手のウール、スウェット</li>
                </ul>
            `;
        } else if (temp >= 15) {
            // やや寒い（15℃〜19℃）
            recommendation = "🍂 **肌寒い季節**です。いよいよアウターの出番。着脱しやすい重ね着（レイヤード）を意識しましょう。";
            trendItem = `
                <ul>
                    <li>**着こなし:** **ニット**や**スウェット**に、**トレンチコート**や**ブルゾン**を羽織る。</li>
                    <li>**トレンド:** **レザージャケット**やキルティングコート。ボトムスは暖かみのある**コーデュロイ**や**ワイドスラックス**。</li>
                    <li>**素材:** 厚手のコットン、薄手のウール、フリース</li>
                </ul>
            `;
        } else if (temp >= 10) {
            // 寒い（10℃〜14℃）
            recommendation = "🧣 **寒い**です。本格的な防寒対策が必要です。保温性の高いアウターを選びましょう。";
            trendItem = `
                <ul>
                    <li>**着こなし:** 厚手の**ニット**に、**ウールコート**や**ダウンベスト**を重ねる。首元は**マフラー**で防寒。</li>
                    <li>**トレンド:** ふわふわの**シャギー素材**のニット。ボトムスはロング丈の**ペンシルスカート**や厚手パンツ。</li>
                    <li>**素材:** ウール、カシミヤ、裏起毛スウェット</li>
                </ul>
            `;
        } else {
            // 真冬日（10℃未満）
            recommendation = "🥶 **真冬日**です。防寒を最優先！厚手のダウンやロングコートで全身を暖かく包みましょう。";
            trendItem = `
                <ul>
                    <li>**着こなし:** **発熱インナー**を着用し、厚手の**ニット**、その上に**ロングダウンコート**を。防風素材を選ぶと◎。</li>
                    <li>**トレンド:** シックな**グレー**や、差し色の**レッド**を取り入れて重くなりがちな冬コーデにアクセントを。</li>
                    <li>**素材:** ダウン、ボア、裏起毛、高機能保温素材</li>
                </ul>
            `;
        }

        return { recommendation, trendItem };
    }
});
