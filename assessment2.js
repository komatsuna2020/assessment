'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided =document.getElementById('tweet-area');

/**
 * 指定した要素の子要素を消すことで、診断結果を連続で表示させない関数
 * @param {HTMLElement} element HTMLの要素 
 */
function removeAllChildren(element){
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}

//診断するボタンを押したときの処理
assessmentButton.onclick = () =>{

    //入力された名前
    const userName = userNameInput.value;

    //名前が空のときは処理を終了
    if (userName.length === 0){
        return;
    }

    //診断結果の内容
    const result = assessment(userName);

    //診断結果を連続で表示させない
    removeAllChildren(resultDivided);

    //診断結果の表示エリア
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    //診断結果の表示エリアの中身
    const paragraph = document.createElement('p');
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //ツイートボタンを連続で表示させない
    removeAllChildren(tweetDivided);

    //ツイートボタンをaタグで表示
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ')   + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href',hrefValue); //指定した要素にhref属性をつくって値を入れた
    anchor.className = 'twitter-hashtag-button'; //class属性を取得し設定
    anchor.setAttribute('data-text', result); //診断結果を入れた
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor); 

    //widgets.jsの設定（TwitterのJSを読み込んでいる。ボタンに戻す）
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

}

//enterキーでも診断するボタンを押せる
userNameInput.onkeydown = (event) =>{
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
}

//診断結果のパターン
const answers = [
    '{ userName }のいいところは声です。{ userName }の特徴的な声は皆を惹きつけ、心に残ります。',
    '{ userName }のいいところはまなざしです。{ userName }に見つめられた人は、気になって仕方がないでしょう。',
    '{ userName }のいいところは情熱です。{ userName }の情熱に周りの人は感化されます。',
    '{ userName }のいいところは厳しさです。{ userName }の厳しさがものごとをいつも成功に導きます。',
    '{ userName }のいいところは知識です。博識な{ userName }を多くの人が頼りにしています。',
    '{ userName }のいいところはユニークさです。{ userName }だけのその特徴が皆を楽しくさせます。',
    '{ userName }のいいところは用心深さです。{ userName }の洞察に、多くの人が助けられます。',
    '{ userName }のいいところは見た目です。内側から溢れ出る{ userName }の良さに皆が気を惹かれます。',
    '{ userName }のいいところは決断力です。{ userName }がする決断にいつも助けられる人がいます。',
    '{ userName }のいいところは思いやりです。{ userName }に気をかけてもらった多くの人が感謝しています。',
    '{ userName }のいいところは感受性です。{ userName }が感じたことに皆が共感し、わかりあうことができます。',
    '{ userName }のいいところは節度です。強引すぎない{ userName }の考えに皆が感謝しています。',
    '{ userName }のいいところは好奇心です。新しいことに向かっていく{ userName }の心構えが多くの人に魅力的に映ります。',
    '{ userName }のいいところは気配りです。{ userName }の配慮が多くの人を救っています。',
    '{ userName }のいいところはその全てです。ありのままの{ userName }自身がいいところなのです。',
    '{ userName }のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{ userName }が皆から評価されています。',
    '{ userName }のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
 ];


/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    //名前のコード番号を取得し、それを足す
    let sumOfCharCode = 0;
    for ( let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //コード番号の合計をパターン数で割って余りを出し、それをパターン結果の添え字とする
    const index =sumOfCharCode % answers.length;
    let result = answers[index];

    //名前を置き換える
    result = result.replace(/\{ userName \}/g,userName);

    return result;

}

//テストコード、以下はassessment関数の動作確認
console.log(assessment('太郎'));
console.log(assessment('岡田'));

console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    'エラーです。正しく動作していません'
);
