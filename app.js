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
            finalAccessory += "🧣 <strong>雪対策</strong>: 防寒対策を徹底し、防水性のある厚手のダウンやロングコートを。路面対策として滑りにくいブーツを選びましょう。";
        }
        
        // --- 気温別の基本アドバイスと骨格・TPOの反映 ---
        
        if (temp >= 30) {
            tempAdvice = `🥵 <strong>猛暑日</strong>です。涼しさと体力の消耗を防ぐことが最優先です。${tpoEmphasis}`;
            
            if (skeletonType === 'straight') {
                if (tpo === 'work') specificItem = "ハリ感のある<strong>ノースリーブブラウス</strong>と<strong>センタープレス入りのリネンパンツ</strong>。";
                else if (tpo === 'date') specificItem = "シンプルで上質な<strong>ワンピース</strong>に、ヒールで I ラインを強調。";
                else specificItem = "ハリ感のある<strong>コットンシャツ</strong>（ジャストサイズ）と<strong>ベーシックなワイドスラックス</strong>。"; // default
            } else if (skeletonType === 'wave') {
                if (tpo === 'work') specificItem = "柔らかい素材の<strong>ボウタイブラウス</strong>に、<strong>ハイウエストのフレアスカート</strong>。";
                else if (tpo === 'date') specificItem = "レースなど装飾性のある<strong>シアーブラウス</strong>に、<strong>ハイウエストのスカート</strong>。";
                else specificItem = "柔らかい素材の<strong>ノースリーブブラウス</strong>に、<strong>シアーなハイウエストスカート</strong>。"; // default
            } else if (skeletonType === 'natural') {
                specificItem = "風通しの良い<strong>リネン・麻のオーバーサイズシャツ</strong>に、丈の長い<strong>ワイドパンツ</strong>。"; // TPO分岐が少ない想定
            }
        
        } else if (temp >= 25) {
            tempAdvice = `☀️ <strong>夏日</strong>です。日中は半袖で快適ですが、朝晩の冷え対策に薄手の羽織りを忘れずに。${tpoEmphasis}`;
            
            if (skeletonType === 'straight') {
                if (tpo === 'work') specificItem = "ジャストサイズの<strong>薄手ジャケット</strong>に、<strong>テーパードパンツ</strong>でIラインを意識。";
                else if (tpo === 'date') specificItem = "ハイゲージの<strong>きれいめニット</strong>に、ハリのある<strong>タイトスカート</strong>。";
                else specificItem = "<strong>ショート丈ジャケット</strong>とセンタープレスパンツでIラインを意識。"; // default
            } else if (skeletonType === 'wave') {
                if (tpo === 'work') specificItem = "薄手の<strong>七分袖ブラウス</strong>に、ハイウエストの<strong>Aラインスカート</strong>。";
                else if (tpo === 'date') specificItem = "<strong>柔らかい素材のカーディガン</strong>を肩掛けし、<strong>フレアスカート</strong>でAラインに。";
                else specificItem = "<strong>柔らかい素材のカーディガン</strong>を肩掛けし、<strong>フレアスカート</strong>でAラインに。"; // default
            } else if (skeletonType === 'natural') {
                 specificItem = "ざっくりした<strong>オーバーサイズのスウェット</strong>を主役に、<strong>デニムやカーゴパンツ</strong>でカジュアルに。"; // TPO分岐が少ない想定
            }
        
        } else if (temp >= 20) {
            tempAdvice = `🌤️ <strong>快適な気候</strong>です。長袖一枚で過ごしやすい季節。アウターを脱ぎ着して温度調整を。${tpoEmphasis}`;

            if (skeletonType === 'straight') {
                if (tpo === 'work') specificItem = "<strong>ハリのあるトレンチコート</strong>に、<strong>ベーシックなテーパードパンツ</strong>。";
                else if (tpo === 'date') specificItem = "シンプルで落ち感のある<strong>リブニット</strong>に、上品な<strong>ミモレ丈スカート</strong>。";
                else specificItem = "<strong>ベーシックなニット</strong>に、<strong>ハリのあるトレンチコート</strong>を羽織る。"; // default
            } else if (skeletonType === 'wave') {
                if (tpo === 'work') specificItem = "薄手の<strong>アンサンブルニット</strong>に、<strong>チェック柄のタイトスカート</strong>（ハイウエスト）。";
                else if (tpo === 'date') specificItem = "<strong>フリルやギャザー</strong>の入ったブラウスに、<strong>ショート丈のジャケット</strong>を羽織る。";
                else specificItem = "<strong>フリルやギャザー</strong>の入ったブラウスに、<strong>ショート丈のジャケット</strong>を羽織る。"; // default
            } else if (skeletonType === 'natural') {
                 specificItem = "<strong>ロング丈のシャツ</strong>に<strong>ニットベスト</strong>を重ね、<strong>コーデュロイパンツ</strong>で素材感を出す。"; // TPO分岐が少ない想定
            }
        
        } else if (temp >= 15) {
            tempAdvice = `🍂 <strong>肌寒い季節</strong>です。アウターが必須。重ね着（レイヤード）を楽しみましょう。${tpoEmphasis}`;
            
            if (skeletonType === 'straight') {
                if (tpo === 'work') specificItem = "目が詰まった<strong>ウールジャケット</strong>に、<strong>センタープレスパンツ</strong>とレザーシューズ。";
                else if (tpo === 'active') specificItem = "<strong>厚みのあるパーカー</strong>に、ハリ感のある<strong>ナイロンブルゾン</strong>。";
                else specificItem = "目が詰まった<strong>ハイゲージニット</strong>に、レザーやウールなど<strong>厚みのあるジャケット</strong>。"; // default
            } else if (skeletonType === 'wave') {
                if (tpo === 'work') specificItem = "薄手の<strong>タートルネック</strong>に、<strong>ツイードジャケット</strong>とハイウエストスカート。";
                else if (tpo === 'date') specificItem = "華やかな<strong>シャギーニット</strong>に、足元は<strong>ショートブーツ</strong>で重心アップ。";
                else specificItem = "薄手の<strong>タートルネック</strong>に、<strong>ショート丈のダウン</strong>や<strong>ツイードジャケット</strong>。"; // default
            } else if (skeletonType === 'natural') {
                specificItem = "ざっくりした<strong>ローゲージニット</strong>に、<strong>オーバーサイズのマウンテンパーカー</strong>。"; // TPO分岐が少ない想定
            }

        } else if (temp >= 10) {
            tempAdvice = `🧣 <strong>寒い</strong>です。本格的な防寒対策が必要です。保温性の高いアウターを選びましょう。${tpoEmphasis}`;

            if (skeletonType === 'straight') {
                if (tpo === 'work') specificItem = "高品質な<strong>ウールコート</strong>（チェスターコートなど）と<strong>Vネックニット</strong>で首元をすっきり。";
                else if (tpo === 'active') specificItem = "ジャストサイズの<strong>ダウンベスト</strong>に、<strong>裏起毛のテーパードパンツ</strong>。";
                else specificItem = "高品質な<strong>ウールコート</strong>（チェスターコートなど）と<strong>Vネックニット</strong>。"; // default
            } else if (skeletonType === 'wave') {
                if (tpo === 'work') specificItem = "<strong>ファーやシャギー素材</strong>のコートに、ハイウエストの<strong>Aラインスカート</strong>。";
                else if (tpo === 'date') specificItem = "柔らかい素材の<strong>ロングワンピース</strong>に、<strong>ショート丈のボアコート</strong>。";
                else specificItem = "<strong>ファーやシャギー素材</strong>のコートに、<strong>ハイウエストのロングスカート</strong>。"; // default
            } else if (skeletonType === 'natural') {
                specificItem = "<strong>ダウンジャケット</strong>は<strong>ロング丈のオーバーサイズ</strong>を選び、<strong>ワイドパンツ</strong>と合わせる。"; // TPO分岐が少ない想定
            }

        } else {
            tempAdvice = `🥶 <strong>真冬日</strong>です。防寒を最優先！重ね着と、首・手首・足首の防寒を。${tpoEmphasis}`;
            
            if (skeletonType === 'straight') {
                specificItem = "着ぶくれしないよう<strong>着丈が長すぎないダウン</strong>を<strong>ジャストサイズ</strong>で。";
            } else if (skeletonType === 'wave') {
                specificItem = "ボアやシャギーなど<strong>装飾性のある素材</strong>のアウター。足元は<strong>ロングブーツ</strong>。";
            } else if (skeletonType === 'natural') {
                specificItem = "<strong>ムートンやコーデュロイ</strong>など、<strong>天然素材の重厚感</strong>があるアイテムでYラインを強調。";
            }
        }
        
        // 最終的な提案を構成 (天候アドバイスを追記)
        // finalAccessoryが空でない場合のみ<br>を挿入し、見栄えを整えます
        const finalAccessoryOutput = finalAccessory ? `<br>${finalAccessory}` : '';

        recommendation = `${tempAdvice}<br>👉 <strong>${skeletonAdvice[skeletonType]}</strong>${finalAccessoryOutput}`;
        
        // trendItem内の太字を<strong>タグに修正
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
