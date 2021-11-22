let userinput;
let button = document.querySelector(".search_button");
button.addEventListener("click",function(event){
    userinput=document.getElementById("userinput");
    let message = userinput.value;
    let params={
        active : true,
        currentWindow: true
    }
    chrome.tabs.query(params, gotTabs);
    function gotTabs(tabs)
    {
        let msg ={
            txt : message
        };
        chrome.tabs.sendMessage(tabs[0].id,msg);
    }
    event.preventDefault();
});


// Wordnick definition


var definition_btn = document.querySelector(".find_btn");

definition_btn.addEventListener("click",()=>{
    let bgpage=chrome.extension.getBackgroundPage();
    let word=bgpage.word.trim();
    const change=document.querySelector(".definition_div");
    
    let url = "https://api.wordnik.com/v4/word.json/"+word+"/definitions?limit=2&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key="+'7dxhaih5u3p2igx97sv22v1a2q3vi0w931t0adoxbosh5dfo0';
    url.replace(/\s+/g,"");
    
    console.log(word);
    change.innerHTML=word;
    
    fetch(url)
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            change.innerHTML=data[1].text;
        })    
})




// const speak_btn = document.querySelector(".speak");
// const searchForm = document.querySelector(".search-form");
// const searchFormInput = searchForm.querySelector("input");

// // For checking if the browser supports speech recoginition
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if it doesnt it will try by adding a webkit prefix

// if(SpeechRecognition)
// {
//     console.log("Your Browser supports speech Recoginition");
//     var recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = false;
//     speak_btn.addEventListener("click", ()=>{
//         if(speak_btn.src==="chrome-extension://clnphnniogihhdfeejngbbomikkpacdi/images/mic_symbol.svg")
//         {
//             // Start speech recognition
//             recognition.start();
//         } 
//         else
//         {
//             // Stop speech recognition
//             recognition.stop();
//         } 
//         recognition.addEventListener("start" , startSpeechRecognition);
//         function startSpeechRecognition()
//         {
//             searchFormInput.focus();
//             speak_btn.src = "../images/cancel_mute.svg" ;
//             console.log("Speech Recoginition Active");
//         }
//         recognition.addEventListener("end" , endSpeechRecognition);
//         function endSpeechRecognition()
//         {
//             searchFormInput.focus();
//             speak_btn.src = "../images/mic_symbol.svg";
//             console.log("Speech Recoginition Disconnected");
//         }
//         recognition.addEventListener("result" , handleResult);
//         function handleResult(event)
//         {
//             const currentResultIndex = event.resultIndex;
//             const transcript = event.results[currentResultIndex][0].transcript;

//             if(transcript.toLowerCase().trim()==="stop recording")
//             {
//                 recognition.stop();
//             }
//             else
//             {
//                 if(transcript.toLowerCase().trim()==="reset input" || transcript.toLowerCase().trim()===" reset input")
//                 {
//                     searchFormInput.value = "";
//                 }
//                 else
//                 {
//                     searchFormInput.value = transcript;
//                 }
//             }
//         }
//     })
    
// }
// else
// {
//     console.log("Your Browser doesn't supports speech Recoginition");
// }

    // Manifest.json

    // "chrome_url_overrides" : {
    //     "newtab" : "styles/popup.html"
    // },    


// Expenditure

let starting_time;
let current_time;
var check_btn = document.querySelector(".check_expenditure");
var  time_div = document.querySelector(".time_div");



check_btn.addEventListener("click",()=>{
    chrome.storage.sync.get("total",function(time){
        var total_time_spend = 0;
        if(time.total)
        {
            total_time_spend+=parseInt(time.total);
        }
        else
        {
            starting_time = (new Date()).getTime()/1000;
        }
        total_time_spend = parseInt((new Date()).getTime()/1000);
        chrome.storage.sync.set({"total":total_time_spend , "starting_time" : starting_time });
        chrome.storage.sync.get("starting_time", function(time){
            if(total_time_spend - time.starting_time>= 0)
            {
                var diff= total_time_spend - time.starting_time;
                var days = Math.floor(diff / (60 * 60 * 24));
                var hours = Math.floor(diff / ( 60 * 60));
                var mins = Math.floor(diff / ( 60));
                var secs = Math.floor(diff);
               
                var d = days;
                var h = hours - days * 24;
                var  m = mins - hours * 60;
                var s = secs - mins * 60;
            
                s=s<10 ? '0'+s : s;
                m=m<10 ? '0'+m : m;
                h=h<10 ? '0'+h : h;
            
                time_div.innerHTML  = h+' hrs : '+m+' mins : '+ s+ ' secs';
            }
        })
    })
 })



 var set_time_btn = document.querySelector(".set_button")
 set_time_btn.addEventListener("click",(event )=>{
    var usersetinput=document.getElementById("setinput");
    let set_time  = usersetinput.value;
    set_time = set_time * 1000;
    console.log(set_time); 
    setInterval(()=>{
        alert("Your time limit has reached!!!")
    },set_time)
    event.preventDefault();
 })


//  Text to speech
