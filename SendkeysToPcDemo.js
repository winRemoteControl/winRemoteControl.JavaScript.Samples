/*
 * winRemoteControl
 */
 
var REMOTE_NAME = "Send Keys To PC";

function SendkeysToNotpadButton() {

    this.Text            = "Send Keys To Notepad";
    this.BackgroundColor = Colors.DarkCyan;

    this.run = function() {

        var pid = this.executeProgram("notepad.exe");
        if (pid >= 0) {

            for(var i=0; i<16; i++) {
            	this.sendKeys("Hello World {0}\n".format(i));
            }
            this.wait(2);
            this.killProgram(pid);
            return true;
        }
    }
    return false;
}
function Remote() {

    this.initialize = function() {
        this.Actions = {
            SendkeysToNotpadButton : SendkeysToNotpadButton
        }
        this.Text                = REMOTE_NAME;
        this.ShowDeskDestop      = true;
        this.RequireComputerIp   = true;
    	this.BackgroundColor     = Colors.DarkYellow;
    }
}
