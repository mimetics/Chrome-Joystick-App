var hasGP = false;
var repGP;
var gp;
var gpIndex = 0;
 
function canGame() {
    return "getGamepads" in navigator;
}
 
function reportOnGamepad() {
    var gp          = navigator.getGamepads()[gpIndex];
    var current     = "";
    var button      = "";
    var axisX       = 0;
    var axisXOffset = new Array(105, 315, 525, 105, 315, 525);
    var axisY       = 0;
    var axisYOffset = new Array(265, 265, 265, 520, 520, 520);


    $("#gamepadPrompt").html(gp.id);
 
    for(var i = 0; i < gp.buttons.length; ++i) {
        for (button = "" + (i + 1); 2 > button.length; button = "0" + button) {
        }
        current = "#button" + button;
        if (gp.buttons[i].pressed) {
            $(current).css("background-color", "#CCCCFF");
            $(current).css("color", "white");
        }
        else {
            $(current).css("background-color", "white");
            $(current).css("color", "black");
        }
    }
 
    for(var i = 0; i < gp.axes.length; i += 2) {
        axisX = Math.round(gp.axes[i] * 95) + axisXOffset[i / 2];
        axisY = Math.round(gp.axes[i + 1] * 95) + axisYOffset[i / 2];
        button = "" + ((i / 2) + 1); 
        current = "#joystick" + button + "Ball"
        $(current).css({"left": axisX + "px", "top":  axisY + "px"});
        axisX = Math.round(gp.axes[i] * 100);
        axisY = Math.round(gp.axes[i + 1] * 100);
        $("#joystick" + button + "X").html("X = " + axisX);
        $("#joystick" + button + "Y").html("Y = " + axisY);
    }
 
}
 
$(document).ready(function() {
 
    var prompt = "To begin using your gamepad, connect it and press any button!";
    $("#gamepadPrompt").text(prompt);

    $("#gamepadType").text("-");
 
    $(window).on("gamepadconnected", function() {
        hasGP = true;
        for (gp = navigator.getGamepads()[gpIndex = 0]; typeof(gp) != "undefined"; gp = navigator.getGamepads()[++gpIndex]) {
            var gpName = gp.id;
            if ("Logitech Extreme 3D (Vendor: 046d Product: c215)" == gp.id) {
                break;
            }
            else if ("Xbox 360 Controller (XInput STANDARD GAMEPAD)" == gp.id) {
                break;
            }
            else if ("Logitech Dual Action (STANDARD GAMEPAD Vendor: 046d Product: c216)" == gp.id) {
                break;
            }
        }
        if (typeof(gp) != "undefined") {
            console.log("connection event");
            repGP = window.setInterval(reportOnGamepad,100);
        }
        else {
            $("#gamepadPrompt").html("Unknown Gamepad/Joystick Type");
        }
    });
 
    //setup an interval for Chrome
    var checkGP = window.setInterval(function() {
        console.log('checkGP');
        if(navigator.getGamepads()[0]) {
            if(!hasGP) {
                $(window).trigger("gamepadconnected");
            }
            window.clearInterval(checkGP);
        }
    }, 100);
 
});
