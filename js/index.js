console.clear()

//換頁
var i=0
var changePage=function(){
  i++
  var item = $(".qa_wrap")[i]
  var item_pre = $(".qa_wrap")[i-1]
  setTimeout( function(){$(item).addClass("add")}, 400 )
  setTimeout( function(){$(item_pre).delay(500).removeClass("add")}, 400 )
  if(i==5){
      //顯示結果
      setTimeout( function(){$(".result").addClass("add")}, 400 )
  }
}

//觸發 radio 事件 change
$("button").click(function(e){
  var btn = $(e.target).find("input[type=radio]")
  btn.prop('checked',true)
  handlechangeGetVal(btn)
  changePage()
})
$("input[type=radio]").on("change",handlechangeGetVal)

//從問題按鈕radio中取值
var arr = []
var handlechangeGetVal = function handlechangeGetVal(el){
  
console.log(el[0])

//把值推入陣列
var myVal = el[0].value.split('_').slice()
arr.push(...myVal)
console.log(arr)

//根據名字計數{dog:0,..}
var map = arr.reduce(function(prev,cur){
prev[cur] = (prev[cur] || 0)+1
return prev
},{})
console.log(map)

//將{}轉換為[],才可以 arr.sort()
//將物件的key 和 value ， 分成 name score 類別，好依類別排序sort()
// 並以[{name:"ccc", score:1},..]呈現
var resultArr_1 =[]

    var aniName = Object.keys(map)
    var aniScore = Object.values(map)
      //將值一一推入陣列
      for(var i=0;i<aniName.length;i++){
        
        //將 name 翻譯成中文
        var re = /dog/gi
        var re1 = /cat/gi
        var re2 = /mouse/gi
        var re3 = /bird/gi
        aniName[i] = aniName[i].replace(re, '狗狗')
        aniName[i] = aniName[i].replace(re1, '貓貓')
        aniName[i] = aniName[i].replace(re2, '鼠鼠')
        aniName[i] = aniName[i].replace(re3, '鳥鳥')
        
        //將 name 翻譯成中文後，與 score 一起推入陣列
        resultArr_1.push({
          name: aniName[i],
          score: aniScore[i]
        })
      }
      console.log(resultArr_1)
      
      ////////  排序  ////////
      //將上陣列中的值大>小 排列sort(return值<0 a往前 ， >0 a往後)
      resultArr_1 = resultArr_1.sort(function(a,b){
        return b.score - a.score
      })
      console.log(resultArr_1)

      ////////  判斷種類  ////////
      //印出兩種 2 2 1 // 印出一種 50 41 32 必贏
      var two = resultArr_1[0].score
      //萬一一二題連答一樣為 2 ，但 resultArr_1[1] 會未被定義 undefined
      //所以要先預設定義 resultArr_1[1] == undefined
      resultArr_1[1] == undefined
        //resultArr_1[1] !== undefined 才算答完，才可進入迴圈印到 html
        if (two ==2 && resultArr_1[1] !== undefined){
        $(".result").html(
          `<h2>
              你是 ${resultArr_1[0].name} ${resultArr_1[1].name} 人<br>
              <h3>╰( ’·人·)╯</h3>
          <h2/>
          <input id="again" type="button" onclick="playAgain()" value="再玩一次">
          `)
      }
      else {
        $(".result").html(
          `<h2>
              你是 ${resultArr_1[0].name} 人<br>
              <h3>╰( ’· 人·)╯</h3>
          <h2/>
          <input id="again" type="button" onclick="playAgain()" value="再玩一次">
          `)
      }        
}

//再玩一次
var playAgain = function(){
  console.log("Again!")
  $(".result").html(`
  <div style="width:300px; color:white; font-size:30px; padding:10px">
  ╰( ’·人·)╯ !!!</div>
  `)
  setTimeout( function(){$(".result").removeClass("add")}, 400 )
  clearRadioGroup("question_1")
  clearRadioGroup("question_2")
  clearRadioGroup("question_3")
  clearRadioGroup("question_4")
  clearRadioGroup("question_5")
  arr = []
  i=-1
  changePage()
}

//再玩一次 重複按的值TMD不會輸入到 change 裡 -> 原因: 沒歸零 input 成 checked = false (為選取)，故使用 clearRadioGroup(GroupName) 解決
function clearRadioGroup(GroupName)
{
  var ele = document.getElementsByName(GroupName)
	for(var i=0;i<ele.length;i++){
    ele[i].checked = false
  }
}
