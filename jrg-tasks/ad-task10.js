var tabs = document.querySelector(".tabs");
tabs.addEventListener("focusin", function(e){
    console.log(e.target);
    e.preventDefault();
    e.target.style.background = "#bbb";
    var as = document.querySelectorAll(".tabs>li>a");
    console.log(as);
    for(var i=0; i<as.length; i++){
        if(e.target === as[i]){
            break;
        }
    }
    console.log(document.querySelectorAll(".content>li"));
    document.querySelectorAll(".content>li")[i].style.display = "block";
});
tabs.addEventListener("focusout", function(e){
    console.log(" 222");
    e.target.style.background = "none";
    for(var i = 0; i < 3; i++){
        document.querySelectorAll(".content>li")[i].style.display = "none";
    }
});

var alertBox = document.querySelector(".alert-box");
var alertBackground = document.querySelector(".alert-model")
var clickMe = document.querySelector(".click-me");
clickMe.addEventListener("click", function(){
    // alertBox.style.display = "block";
    alertBackground.style.display = "block";
});
alertBox.addEventListener("click",function(e){
    e.stopPropagation();
});
alertBackground.addEventListener("click", function(e){
    alertBackground.style.display = "none";
});
var close = document.querySelector(".close");
close.addEventListener("click", function(e){
    alertBackground.style.display = "none";
});
var cancel = document.querySelector(".cancel");
cancel.addEventListener("click", function(e){
    alertBackground.style.display = "none";
});