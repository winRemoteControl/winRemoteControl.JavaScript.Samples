/*
 * winRemoteControl - Hello World
 */

/**
 * PrintHelloWorld Create a button PrintHelloWorld in the remote
 */
function PrintHelloWorld() {

    this.Type   = "Button";            // Optional Control Type
    this.Height = 75;                  // Optional Control Height
    this.Text   = "Print Hello World"; // Control Text
    
    this.run = function() { // Executed when the button is touched

        var msg = "Hello World!";
        this.notify(msg, new Date());
        this.getLabel1().setText(msg);
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

            PrintHelloWorld : PrintHelloWorld,
            Label1          : Label1,
        }
        this.Text              = "My Hello World"; // Remote Text
        this.ControlGap        = 60;
        this.ControlYStart     = 120;
        this.RequireComputerIp = false;            // This remote does not talk to any thing
    };
}

