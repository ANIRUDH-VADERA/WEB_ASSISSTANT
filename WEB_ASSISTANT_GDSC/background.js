chrome.runtime.onMessage.addListener(reciever);

window.word="";

function reciever(request,sender,sendResponse)
{
    word=request.text;
}   