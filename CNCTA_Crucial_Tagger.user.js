// ==UserScript==
// @name        CnC TA: Crucial TAGGER
// @description Allows a player to tag bases to be killed and added to a list that can be managed by the alliance CiC
// @version     0.01b
// @author      DebitoSphere
// @homepage    https://www.allyourbasesbelong2us.com
// @namespace   AllYourBasesbelong2UsCrucialTAGGER
// @include     http*://*alliances*.com/*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @updateURL   https://raw.githubusercontent.com/zbluebugz/CnC-TA-Opt/master/CnCTAOpt.link.user.js
// @grant       GM_log
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @grant       GM_updatingEnabled
// @grant       unsafeWindow
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==



/*
Start of cnctagger Link Button
*/

try {
  unsafeWindow.__cncreserver_version = "0.49beta";
  (function () {

    var crucial_reserver_main = function () {

	

      function cncreserver_create() {
		var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
		console.log("cncreserver WorldID: " + WorldID);
		
        console.log("cncreserver Link Button v" + window.__cncreserver_version + " loaded");
		var OpenWindow = false;
		var ReservedBase = null;
		var BaseXCoord = null;
		var BaseYCoord = null;
		var ReservedBaseLayout = null;
		var BaseCnCOptLink = null;

		var mcvTimer = null;
		
        var cncreserver = {
          selected_base: null

        };
		
		function SD(){
	
			var WorldID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
			var AllianceID = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();
			cncreserver_create.BaseXCoord = cncreserver_create.ReservedBase.get_RawX();
			cncreserver_create.BaseYCoord = cncreserver_create.ReservedBase.get_RawY();
			var CoordsX = cncreserver_create.BaseXCoord;
			var CoordsY = cncreserver_create.BaseYCoord;
			var CoordsZ = CoordsX + ":" + CoordsY;
			console.log(CoordsZ);
			var LayoutReserved = cncreserver_create.ReservedBaseLayout;

				var xmlhttp = new XMLHttpRequest();
                	var url = "https://www.allyourbasesbelong2us.com/DbService/Service.php";
                	var params = "functionname=saveTAGGEDRecord&WorldID="+WorldID+"&AllianceID="+AllianceID+"&Coords="+CoordsZ;
					var CompletedTask = "No";
	                xmlhttp.open("POST", url, false);
        	        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							xmlhttp.onreadystatechange = function ()
							{
							if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
								{
									//return_data= eval(xmlhttp.responseText);
									console.log(xmlhttp.responseText);
									CompletedTask = xmlhttp.responseText;
								}
							}
		        xmlhttp.send(params);

				if (CompletedTask === "Yes"){
							webfrontend.gui.MessageBox.messageBox({
								modal: true,
								textRich: true,
								cancelButton: false,
								title: 'Forgotten Base Tagged',
								text: '<b>DONE</b><br>',
								okText: 'Done',
								cancelText: 'Close'
							});
				} else {
							webfrontend.gui.MessageBox.messageBox({
								modal: false,
								textRich: true,
								title: 'Already Tagged',
								text: '<b>Tag Another</b>',
								okText: 'OK :(',
							});
				}
				
	}
		

		
		
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncreserver_real_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__cncreserver_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }
		
        var check_ct = 0;
        var check_timer = null;
        var button_enabled = 1234567;
        /* Wrap showMenu so we can inject our Sharelink at the end of menus and
         * sync Base object to our cncreserver.selected_base variable  */
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
          try {
            var self = this;
            //console.log(selected_base);
            cncreserver.selected_base = selected_base;
			cncreserver_create.ReservedBase = selected_base;
            if (this.__cncreserver_initialized != 1) {
              this.__cncreserver_initialized = 1;
			  this.__cncreserver_links = [];
              for (var i in this) {
                try {
/* 				if (selected_base.get_VisObjectType() == 29){
					if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("eserve It", "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/favicon.png");
                    link.addListener("execute", function () {
                    var bt = qx.core.Init.getApplication();
                    bt.getBackgroundArea().closeCityInfo();
					// open a window to prompt reserve the layout
					
					cncreserver.SatCodeWindow();
                    });
                    this[i].add(link);
                    this.__cncreserver_links.push(link)
                  }
				} else { */
                  if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("TAG It", "https://www.allyourbasesbelong2us.com/CrucialScripts/images/Reserver/favicon.png");
                    link.addListener("execute", function () {
                    var bt = qx.core.Init.getApplication();
                    bt.getBackgroundArea().closeCityInfo();
					// open a window to prompt reserve the layout
					
					SD();
                    });
                    this[i].add(link);
                    this.__cncreserver_links.push(link)
                  }
				/* } */
                } catch (e) {
                  console.log("cncreserver [2]: ", e);
                }
              }
            }
			console.log("Selected Object: " + selected_base.get_VisObjectType());
			//console.log("Selected Object Type: " + selected_base.get_Type());
            var tf = true;
            switch (selected_base.get_VisObjectType()) {
/*               case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                switch (selected_base.get_Type()) {
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                    tf = false;
                    break;
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
				    tf = false;
                    break;
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                    tf = false;
                    break;
                }
                break; */
              case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                tf = false;

                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
			  if (cncreserver_create.OpenWindow === true){
				  tf = true;
			  }else{
                tf = true;
			  };
				
                break;
/*              case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
			  if (cncreserver_create.OpenWindow === true){
				  tf = false;
			  }else{
                tf = true;
			  };
                break;
 			case 29:
			  if (cncreserver_create.OpenWindow === true){

				  tf = false;
			  }else{
				  console.log("YEP");
                tf = true;
			  };
                break; */
            }
		  
            var orig_tf = tf;

            function check_if_button_should_be_enabled() {
              try {
                tf = orig_tf;
                var selected_base = cncreserver.selected_base;
                var still_loading = false;
                if (check_timer != null) {
                  clearTimeout(check_timer);
                }

                /* When a city is selected, the data for the city is loaded in the background.. once the 
                 * data arrives, this method is called again with these fields set, but until it does
                 * we can't actually generate the link.. so this section of the code grays out the button
                 * until the data is ready, then it'll light up. */
                if (selected_base && selected_base.get_Id) {
                  var city_id = selected_base.get_Id();
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);

                  if (!city || city.get_OwnerId() == 0) {
                    still_loading = true;
                    tf = true;
                  }
                } else {
                  tf = true;
                }
/* 				if (selected_base.get_VisObjectType() == 29){
					tf = true;
				} */
                if (tf != button_enabled) {
                  button_enabled = tf;
                  for (var i = 0; i < self.__cncreserver_links.length; ++i) {
                    self.__cncreserver_links[i].setEnabled(tf);
                  }
                }
                if (!still_loading) {
                  check_ct = 0;
                } else {
                  if (check_ct > 0) {
                    check_ct--;
                    check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                  } else {
                    check_timer = null;
                  }
                }
              } catch (e) {
                console.log("cncreserver [3]: ", e);
                tf = false;
              }
            }

            check_ct = 50;
            check_if_button_should_be_enabled();
          } catch (e) {
            console.log("cncreserver [3]: ", e);
          }
          this.__cncreserver_real_showMenu(selected_base);
        }
      }
	

      /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
      function cnc_check_if_loaded() {
        try {
          //if (typeof qx != 'undefined') {
			if (typeof qx !== 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().initDone) {
            a = qx.core.Init.getApplication(); // application
            if (a) {
				//var WorldIDea = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
				//if (WorldIDea == 368){	
					cncreserver_create();
				//}
            } else {
              window.setTimeout(cnc_check_if_loaded, 1000);
            }
          } else {
            window.setTimeout(cnc_check_if_loaded, 1000);
          }
        } catch (e) {
          if (typeof console != 'undefined') console.log(e);
          else if (window.opera) opera.postError(e);
          else GM_log(e);
        }
      }
      if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
	  }
    // injecting because we can't seem to hook into the game interface via unsafeWindow 
    //   (Ripped from AmpliDude's LoU Tweak script)
    var script_block = document.createElement("script");
    txt = crucial_reserver_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
	  
	})();
	
} catch (e) {
  GM_log(e);
}



function getClib(){
    var clib;
    try{
        clib = ClientLib.Data.MainData.GetInstance();
    }catch(e)
    {
        alert("can't get clientLib");
        return null;
    }

    if(!clib)
    {
        alert("clib is undefined");
    }
    return clib;
}

function getData(){
    return getClib().Data.MainData.GetInstance();
}


function getVis(){
    var clib = getClib();
    return clib.Vis.VisMain.GetInstance();
}




/*
End of cnctagger Link Button
*/
