/*
	# winRemoteControl Samples
	
	## winRemoteControl integration with the Open Weather Map Api
	
	### Documentation:
	
		http://openweathermap.org/current
		http://openweathermap.org/weather-data#current
	
	### Http get samples:
	
		http://api.openweathermap.org/data/2.5/weather?q=boston,Ma,USA
		http://api.openweathermap.org/data/2.5/weather?q=New%20York,NY,USA
*/
var REMOTE_NAME = "OpenWeatherMap Integration";

/**
 * Convert and return kelvin temperature to Celsius
 * @returns {Number}        
 * @param {Number} The temperature in Kelvin unit
 */
function ToCelsius(kelvin) {
	
	return Math.ceil((kelvin - 273.15) * 100)/100;
}

/**
 * OpenWeatherMap
 * Class wrapping the Open Weather Map Api
 */
function OpenWeatherMap() {

	var OPEN_WEATHER_MAP_URL_API = "http://api.openweathermap.org/data/2.5/weather?q=";

	/**
	 * Convert and return kelvin temperature to Celsius
	 * @returns {Number}        
	 * @param {Object} actionInstance the winRemoteControl Action instance
	 * @param {String} city The city on which to perform the weather look up
	 * @param {String} state The state
	 * @param {String} country The country
	 */
	this.getWeather = function(actionInstance, city, state, country) {
		var 
			url;
		
		if(state)
			url = "{0}{1},{2},{3}".format(OPEN_WEATHER_MAP_URL_API, city, state, country);
		else
			url = "{0}{1},{2}".format(OPEN_WEATHER_MAP_URL_API, city, country);
		
		var httpResult = actionInstance.httpGet(url);
    	if(httpResult.Ok) {
    		var data = JSON.parse(httpResult.Text); // Turn the result from the json api result into an object
    		if(data.weather) {
    			// Convert temperature in Celsius
    			data.main.temp     = ToCelsius(data.main.temp);
    			data.main.temp_min = ToCelsius(data.main.temp_min);
    			data.main.temp_max = ToCelsius(data.main.temp_max);
    			return data;
    		}
    	}
    	else {
    		 actionInstance.notify("Http.StatusCode:{0}".format(httpResult.StatusCode));
    	}
    	return null;
	}
}
/**
 * OpenWeatherMap_GetWeather
 * Class implementing the Get Weather Button
 */
function OpenWeatherMap_GetWeather() {

    this.Text   = "Get Weather";
    this.Height = 60;
    
    this.run  = function() {
    	
    	var $this = this;
    	
		var cities = [
    		{ city : "Boston",     state: "MA", country : "USA"  },
    		{ city : "New York",   state: "NY", country : "USA"  },
    		{ city : "London",     state: null, country : "UK"   },
		];
		
		cities.forEach(function(c) {
		
			$this.getLabel1().setText("Querying Weather for {0}".format(c.city));
			var r = new OpenWeatherMap().getWeather($this, c.city, c.state, c.country);
			if(r) {
				$this.getLabel1().setText("City: {0}".format(r.name));
    			$this.getLabel2().setText("{0} - Temp:{1}".format(r.weather[0].description, r.main.temp));
			}
			$this.wait(1);
		});
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
    	
    	HTTP_TIME_OUT       = 22;
    	this.Text 		  	= REMOTE_NAME;
    	this.ControlYStart  = 100;
    	this.ControlGap     = 30;
        this.Actions = {
            OpenWeatherMap_GetWeather : OpenWeatherMap_GetWeather,
            Label1 : Label1,
            Label2 : Label2,
        };
    }
}
