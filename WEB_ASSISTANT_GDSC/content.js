chrome.runtime.onMessage.addListener(gotMessage);


function gotMessage(message,sender,sendResponse)
{
    var everything = document.getElementsByTagName('*');
    for(var j = 0;j < everything.length; j++)
    {
          if(message.txt!="")
          {
            everything[j].style.cssText="";
            if(everything[j].getAttribute('aria-label')==message.txt)
            {
              everything[j].style.cssText="border: 5px solid red; background-color: #FFD700";
              everything[j].scrollIntoView(true);
            }
            if(everything[j].title==message.txt)
            {
              everything[j].style.cssText="border: 5px solid red; background-color: #FFD700";
              everything[j].scrollIntoView(true);
              
            }
            if(everything[j].innerHTML==message.txt)
            {
              everything[j].style.cssText="border: 5px solid red; background-color: #FFD700";
              everything[j].scrollIntoView(true);
            }
          }
    }
}

window.addEventListener("mouseup" , selected);

function selected()
{
  let selectedText=window.getSelection().toString().trim();
  if(selectedText.length>0)
  {
    let message={
      text : selectedText
    };
    chrome.runtime.sendMessage(message);
  }
}