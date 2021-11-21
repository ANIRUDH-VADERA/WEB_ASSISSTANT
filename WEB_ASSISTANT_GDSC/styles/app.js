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

// let bgpage=chrome.extension.getBackgroundPage();
// let word=bgpage.word.trim();
// const change=document.querySelector(".anirudhvadera");

// let url = "https://api.wordnik.com/v4/word.json/"+word+"/definitions?limit=2&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=YOURAPIKEY";
// url.replace(/\s+/g,"");

// change.innerHTML=word;

// fetch(url)
//     .then(res=>{
//         return res.json();
//     })
//     .then(data=>{
        
//         // change.innerHTML=data[1].text;
//     })



const speak_btn = document.querySelector(".speak");
const searchForm = document.querySelector(".search-form");
const searchFormInput = searchForm.querySelector("input");
const Temp = document.querySelector(".temp_div");

// For checking if the browser supports speech recoginition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if it doesnt it will try by adding a webkit prefix

if(SpeechRecognition)
{
    console.log("Your Browser supports speech Recoginition");
    var recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    speak_btn.addEventListener("click", ()=>{
        if(speak_btn.src==="chrome-extension://clnphnniogihhdfeejngbbomikkpacdi/images/mic_symbol.svg")
        {
            // Start speech recognition
            recognition.start();
        } 
        else
        {
            // Stop speech recognition
            recognition.stop();
        } 
        recognition.addEventListener("start" , startSpeechRecognition);
        function startSpeechRecognition()
        {
            searchFormInput.focus();
            speak_btn.src = "../images/cancel_mute.svg" ;
            console.log("Speech Recoginition Active");
        }
        
        recognition.onerror = function(event) {
            Temp.textContent = 'Error occurred in recognition: ' + event.error;
        }
        recognition.addEventListener("end" , endSpeechRecognition);
        function endSpeechRecognition()
        {
            searchFormInput.focus();
            speak_btn.src = "../images/mic_symbol.svg";
            console.log("Speech Recoginition Disconnected");
        }
        recognition.addEventListener("result" , handleResult);
        function handleResult(event)
        {
            const currentResultIndex = event.resultIndex;
            const transcript = event.results[currentResultIndex][0].transcript;

            if(transcript.toLowerCase().trim()==="stop recording")
            {
                recognition.stop();
            }
            else
            {
                if(transcript.toLowerCase().trim()==="reset input" || transcript.toLowerCase().trim()===" reset input")
                {
                    searchFormInput.value = "";
                }
                else
                {
                    searchFormInput.value = transcript;
                }
            }
        }
    })
    
}
else
{
    console.log("Your Browser doesn't supports speech Recoginition");
}


