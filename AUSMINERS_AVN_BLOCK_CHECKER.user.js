// ==UserScript==
// @name         AUSMINERS AVN BOT BLOCK CHECKER
// @namespace    https://watc.ausminers.com/
// @version      1.03
// @description  Checks for AVN Block Status and Announces via Bot on Discord
// @author       Debitosphere
// @match        https://avn.ausminers.com/blocks
// @icon         https://www.google.com/s2/favicons?domain=ausminers.com
// @updateURL   https://github.com/Debitosphere/BETAS/raw/master/AUSMINERS_AVN_BLOCK_CHECKER.user.js
// @grant       GM_log
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @grant       GM_updatingEnabled
// @grant       unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    var avnBLOCKPending=(document.getElementsByClassName("vhmiddle tdHistoryPending"));
    var avnBLOCKConfirmed=(document.getElementsByClassName("vhmiddle tdHistoryConfirmed"));

    var avnBLOCKSPending = avnBLOCKPending.tdHistoryPending.innerText;
    var avnBLOCKSConfirmed = avnBLOCKConfirmed.tdHistoryConfirmed.innerText;
    console.log("Block Pending: " + avnBLOCKSPending);
    console.log("Blocks Confirmed: " + avnBLOCKSConfirmed);
    var avnBLOCKSConfirmed2 = avnBLOCKSConfirmed;

    if (avnBLOCKSConfirmed2 > 0){
 				var xmlhttp = new XMLHttpRequest();
                 	var url = "https://www.allyourbasesbelong2us.com/AUSMINERS/AVNService.php";
                 	var params = "functionname=sendAVNEmail&avnBLOCKSPending="+avnBLOCKSPending+"&avnBLOCKSConfirmed="+avnBLOCKSConfirmed;
    console.log(params);
	                 xmlhttp.open("POST", url, false);
         	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	 						xmlhttp.onreadystatechange = function ()
	 						{
	 						if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
	 							{
	 								console.log(xmlhttp.responseText);
	 							}
		 					}
	 	        xmlhttp.send(params);
        console.log("Blocks Confirmed: YES");
    }
    setTimeout(function(){ location.reload(); }, 300*1000);

})();
