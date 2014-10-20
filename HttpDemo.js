/*
 * winRemoteControl
 */
 
var REMOTE_NAME 			= "Http Demo";
var REMOTE_BACKGROUND_COLOR = "#1657B8";
var BUTTON_BACKGROUND_COLOR = "#174D9F";

var TEXT_FILE_URL = "http://winremotecontrolcloud.azurewebsites.net/DemoFiles/HelloWorld.txt";
var JSON_FILE_URL = "http://winremotecontrolcloud.azurewebsites.net/DemoFiles/TestData01.json.txt";

/**
 * DownloadTextFileButton
 * Class implementing the Download Text File Button
 */
function DownloadTextFileButton() {

    this.Text 				= "Download Text File";
    this.BackgroundColor 	= Colors.DarkGreen;
    
    this.run = function() {
    	
    	this.getLabel1().setText("");
    	this.getLabel2().setText("Downloading...");
    	var r = this.httpGet(TEXT_FILE_URL);
    	if(r.Ok) {
    		this.getLabel1().setText(r.Text);	
    	}
    	this.getLabel2().setText("Http Status:{0}".format(r.StatusCode));
        return true;
    }
}
/**
 * DownloadTextFileButton
 * Class implementing the Download Json Button
 */
function DownloadJsonButton() {

    this.Text 				= "Download Json";
    this.BackgroundColor 	= Colors.DarkCyan;
    
    this.run = function() {
    	
    	this.getLabel1().setText("");
    	this.getLabel2().setText("Downloading...");
    	var r = this.httpGet(JSON_FILE_URL);
    	if(r.Ok) {
    		
    		var data = JSON.parse(r.Text);
    		this.getLabel1().setText("Code:{0}, Text:{1}".format(data.Code, data.Text));
    	}
    	this.getLabel2().setText("Http Status:{0}".format(r.StatusCode));
        return true;
    }
}
/**
 * Label1
 * Class implementing a first label
 */
function Label1() {

	this.Type = "Label";
    this.Text = "Ready...";
}
/**
 * Label2
 * Class implementing a second label
 */
function Label2() {

	this.Type = "Label";
    this.Text = "...";
}
/**
 * Remote
 * Class implementing the remote
 */
function Remote() {

    this.initialize = function() {
    	
    	HTTP_TIME_OUT = 22;
    	this.Text     = REMOTE_NAME;
    	
    	if(this.getDeviceInfo().iPhone5) {
    		this.ControlYStart = 90;
    		this.ControlGap    = 20;
    	}
    	else {
    		this.ControlYStart = 75;
    		this.ControlGap    = 12;
    	}
    	
    	this.RequireComputerIp = false;
    	this.BackgroundColor   = Colors.DarkYellow;
    	
        this.Actions = {
            DownloadTextFileButton : DownloadTextFileButton,
            DownloadJsonButton     : DownloadJsonButton,
            Label1                 : Label1,
            Label2                 : Label2,
        };
    }
}
