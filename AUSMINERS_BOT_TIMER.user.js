// ==UserScript==
// @name         AUSMINERS BOT TIMER
// @namespace    https://rtm.ausminers.com/
// @description  Counts down time between Bot Checks
// @match        https://*.ausminers.com/blocks
// @updateURL   https://github.com/Debitosphere/BETAS/raw/master/AUSMINERS_BOT_TIMER.user.js
// @version      1.0
// @grant       GM_log
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @grant       GM_updatingEnabled
// @grant       unsafeWindow
// ==/UserScript==
function main() {

if(/^http\:\/\/www\.google\.\w+/.test(location.href)) {
var tb = document.body.lastChild;
if(tb && tb.tagName=="DIV") tb.parentNode.removeChild(tb);
}

var nE = document.createElement("p");
nE.setAttribute('style', 'z-index:999;font-size:50px;position:absolute; top:50px;right:50px;background:url(\'https://th.bing.com/th/id/OIP.3ynbGcKR4D4wYSbO9iBaFQHaEK?pid=ImgDet&rs=1\');color:#ddd;border:10px ridge #080;padding:.3em;font-family:verdana;');
nE.setAttribute('id', 'nE');
document.body.appendChild(nE);
var i=300;

function wait() {
if(i===0) {

clearInterval(intV);
return;
}
else {
    var minutes = Math.floor(i / 60);
    var seconds = i - minutes * 60;
    function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    var i2 = "................." + finalTime.toString() ;

nE.innerHTML=i2.toString();
i--;
}
}

wait();
var intV = setInterval(wait, 1*1000);

}

window.addEventListener('load', main, false);