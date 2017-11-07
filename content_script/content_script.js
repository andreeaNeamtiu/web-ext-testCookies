//create div element in page
var div = document.querySelector("#divContainer");
if (!div) {
    var newDiv = $('<div id = "divContainer" class = "divStyle" style="z-index: 9999; text-align: center; font-size: 20px; color: white; margin-top:20px; width: 300px; padding: 12px; background-color: #45925f;"></div>');
    var header = document.querySelector("header");
    header.append(newDiv[0]);
    var div = document.querySelector("#divContainer");
    console.log(div);
}

//append list item to div
function appendLi(inputData) {
    //send message with the input to background
    browser.runtime.sendMessage({
        userInput: inputData
    });

    var listItem = createLi(inputData);
    var div = document.querySelector("header");
    div.innerHTML = listItem;
}

//create list item for each input element
function createLi(inputData) {
    console.log("lalalla", inputData);
    return inputData;
    // var li = '<li class = "inputElement"></li>';
    // li.innerHTML = inputData;
    // console.log(inputData);
    // console.log(li);
    // return li;
}

//allowing the user to do bad things
//append user input in div
function createElement(request, sender, sendResponse) {
    if(request.name == "note1") {
        // console.log("cs", request.name);
        // div.append(request.data);
        appendLi(request.data);
    }
    else if(request.name == "note2") {
        // console.log("cs", request.name);
        // div.append(request.data);
        appendLi(request.data);
    }
    else if(request.name == "note3") {
        // console.log("cs", request.name);                
        // div.append(request.data);
        appendLi(request.data);
    }
}

// if(div) {
//     browser.tabs.query({
//         active: true,
//         currentWindow: true
//     }).then((tabs) => {

//         var getCookie = browser.cookies.getAll({
//             url: tabs.url
//         }).then(function (cookie) {
//             console.log(cookie);
//         })
//     });

// }

//receiving message
browser.runtime.onMessage.addListener(createElement);