/*
 * Power Point Remote
 */

var REMOTE_NAME = "Power Point Remote";
var Color1      = '#10518E';

function Previous() {

    this.Text              = "<< Previous";
    this.BackgroundColor   = Color1;
    this.run = function() {
        this.sendKeys("{LEFT}");
        return true;
    }
}
function Next() {

    this.Text               = "Next >>";
    this.BackgroundColor    = Color1;
    this.run = function() {
        this.sendKeys("{RIGHT}");
        return true;
    }
}
function Escape() {

    this.Text               = "Escape";
    this.BackgroundColor    = Color1;
    this.run = function() {
        this.sendKeys("{ESCAPE}");
        return true;
    }
}
function RefreshScreen() {

    this.Text               = "Refresh";
    this.BackgroundColor    = Color1;
    this.run = function() {
        this.grabScreenShot(true);
        return true;
    }
}
function Remote() {

    this.initialize = function() {

        this.Text           = REMOTE_NAME;
        this.ShowDeskDestop = true;
        
        if(this.getDeviceInfo().iPhone5) { // iPhone 5 or 6 or 6+
            this.Actions = {
                Next            : Next,
                Previous        : Previous,
                Escape          : Escape,
                RefreshScreen   : RefreshScreen,
            };
        }
        else { // iPhone 4
            this.Actions = {
                Previous        : Previous,
                Next            : Next,
                Escape          : Escape,
                RefreshScreen   : RefreshScreen,
            };
        }
        this.ControlYStart   = 65; // 65 is the minimun value
        this.ControlGap      = this.getDeviceInfo().iPhone5 ? 12 : 10;
        this.SmallControl    = !this.getDeviceInfo().iPhone5;        
    }
}
