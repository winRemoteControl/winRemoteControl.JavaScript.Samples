/*
 * winRemoteControl
 */

var _clickerCounter = 0;
/**
 * Button1 Create a first button in the remote
 */
function Button1() {

    this.Type   = "Button";   // Optional Control Type
    this.Height = 75;         // Optional Control Height
    this.Text   = "Click Me"; // Control Text
    
    this.run = function() { // Executed when the button is touched

        this.getLabel1().setText("Clicked {0}".format(_clickerCounter++));
        return true;
    }
}
/**
 * Label1 Create a first label in the remote
 */
function Label1() {

    this.Type = "Label";
    this.Text = "Ready...";
}
/**
 * Remote Remote Implementation
 */
function Remote() {

    this.initialize = function() {

        this.Actions = {

            Button1 : Button1,
            Label1  : Label1,
        }
        this.Text              = "My Remote Title"; // Remote Title
        this.ControlGap        = 60;
        this.ControlYStart     = 120;
        this.RequireComputerIp = false; // This remote does not talk to any thing
    };
}
