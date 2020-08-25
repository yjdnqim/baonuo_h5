import Vue from 'vue'
import weui from 'weui.js' // eslint-disable-line
import config from "../config/config.js"
import dateUtils from "../utils/dateUtils.js" // eslint-disable-line

Vue.prototype.$weui = weui

Vue.prototype.$toast = function(msg) {
	this.$weui.topTips(msg, {
		duration: 1500,
		className: "custom-toast",
	});
}

Vue.prototype.$showLoading = function(loadingText) {
	this.loadingView = this.$weui.loading(loadingText)
}

Vue.prototype.$hideLoading = function() {
	if (this.loadingView) {
		this.loadingView.hide()
		this.loadingView = null
	}
}

Vue.prototype.$get = function(options) {
	var url = config.base_url + options.action;
	if (config.isdebug) {
		window.console.log("reqeust url: " + url);
	}
	
	if (!options.params) {
		options.params = {}
	}
	
	var jsonpOptions = {
		params: options.params,
	};
	if (config.isdebug) {
		window.console.log("reqeust params: " + JSON.stringify(options.params));
	}
	if (options.loadingText && options.loadingText.trim().length > 0) {
		this.$showLoading(options.loadingText)
	}
	var $this = this
	this.$http.get(url, jsonpOptions).then(function(res) {
		if (options.loadingText && options.loadingText.trim().length > 0) {
			$this.$hideLoading();
		}
		if (config.isdebug) {
			window.console.log("response body: " + JSON.stringify(res.body));
		}
		if (options.success) {
			options.success(res.body);
		}
	
	}, function(error) {
		if (options.loadingText && options.loadingText.trim().length > 0) {
			$this.$hideLoading();
		}
		if (config.isdebug) {
			window.console.error(JSON.stringify(error));
		}
		if (options.error) {
			if(this.$refs.mainView){
				this.$refs.mainView.showErrorView("class", "weui-icon-warn", JSON.stringify(error))
			}
			options.error(error);
		}
	});
},

Vue.prototype.$jsonp = function(options) {
	var url = config.base_url + options.action;
	if (config.isdebug) {
		window.console.log("reqeust url: " + url);
	}
	
	if (!options.params) {
		options.params = {}
	}
	
	var jsonpOptions = {
		params: options.params,
		jsonp: "callback"
	};
	if (config.isdebug) {
		window.console.log("reqeust params: " + JSON.stringify(options.params));
	}
	if (options.loadingText && options.loadingText.trim().length > 0) {
		this.$showLoading(options.loadingText)
	}
	var $this = this
	this.$http.jsonp(url, jsonpOptions).then(function(res) {
		if (options.loadingText && options.loadingText.trim().length > 0) {
			$this.$hideLoading();
		}
		if (config.isdebug) {
			window.console.log("response body: " + JSON.stringify(res.body));
		}
		if (options.success) {
			options.success(res.body);
		}
	
	}, function(error) {
		if (options.loadingText && options.loadingText.trim().length > 0) {
			$this.$hideLoading();
		}
		if (config.isdebug) {
			window.console.error(JSON.stringify(error));
		}
		if (options.error) {
			if(this.$refs.mainView){
				this.$refs.mainView.showErrorView("class", "weui-icon-warn", JSON.stringify(error))
			}
			options.error(error);
		}
	});
}

Array.prototype.pushAll = function(array) {
	if (array == null || array === undefined) {
		return
	}
	for (var i = 0; i < array.length; i++) {
		this.push(array[i])
	}
}