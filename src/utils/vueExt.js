import Vue from 'vue'
import weui from 'weui.js' // eslint-disable-line
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

/**
 * 时间选择器
 * @param {Object} options
 */
Vue.prototype.$datetimePicker = function(options) {
	var todayStartTimeStr = new Date().format('yyyy/MM/dd ') + options.startHour + ':00:00'
	var todayStartTime = new Date(todayStartTimeStr) // 上班时间
	var todayEndTimeStr = new Date().format('yyyy/MM/dd ') + options.endHour + ':00:00'
	var todayEndTime = new Date(todayEndTimeStr) // 下班时间
	var minute = options.startTime.getMinutes()
	var offTime = 10 - (minute % 10)
	options.startTime = options.startTime.dateAdd("n", offTime)
	
	if(options.startTime.getTime() < todayStartTime.getTime()){ // 如果小于上班时间
		options.startTime = todayStartTime
	}
	if (options.startTime.getTime() > todayEndTime.getTime()){ // 如果大于下班时间，则只能约第二天的。
		var tomorrowStartTimeStr = new Date().dateAdd('d', 1).format('yyyy/MM/dd ') + options.startHour + ':00:00'
		options.startTime = new Date(tomorrowStartTimeStr)
	}
	if (!options.defaultValue) {
		options.defaultValue = options.startTime
	}
	
	var selectedVal = options.startTime.format("yyyy/M/d HH:mm")
	var selectedDateVal = selectedVal.split(" ")[0]
	var selectedHourVal = selectedVal.split(" ")[1].split(":")[0]
	var selectedMinuteVal = selectedVal.split(" ")[1].split(":")[1]
	if(parseInt(selectedMinuteVal) < 0){
		selectedMinuteVal = "10"
	}
	var defaultValue = [selectedDateVal, selectedHourVal, selectedMinuteVal]
	var dataList = buildDataList(options.startTime, options.days, options.startHour, options.endHour)
	this.$weui.picker(dataList, {
		title: options.title,
		defaultValue: defaultValue,
		onChange: function(result) {
			var selectedDateTimeVal = result[0].value + " " + result[1].value + ":" + result[2].value
			var selectedDateTime = new Date(selectedDateTimeVal)
			if (options.onChange) {
				options.onChange({
					selectedValue: selectedDateTime.format("M月d日(周w) HH:mm"),
					selectedDateTime: selectedDateTime
				})
			}
		},
		onConfirm: function(result) {
			var selectedDateTimeVal = result[0].value + " " + result[1].value + ":" + result[2].value + ":00"
			window.console.log()
			var selectedDateTime = new Date(selectedDateTimeVal)
			if (options.onConfirm) {
				options.onConfirm({
					selectedValue: selectedDateTime.format("M月d日(周w) HH:mm"),
					selectedDateTime: selectedDateTime
				})
			}
		},
		id: 'datetimePicker'
	});
}

Vue.prototype.$jsonp = function() {
	
}

Array.prototype.pushAll = function(array) {
	if (array == null || array === undefined) {
		return
	}
	for (var i = 0; i < array.length; i++) {
		this.push(array[i])
	}
}

/**
 * 构建日期数组
 * @param {Object} days
 */
function buildDataList(startTime, days, startHour, endHour) {
	var dataList = []
	for (var i = 0; i < days; i++) {
		var date = startTime.dateAdd('d', i)
		var year = date.getFullYear()
		var month = date.getMonth() + 1
		var day = date.getDate()
		var hourList = buildHourList(startTime, i, startHour, endHour)
		dataList.push({
			label: date.format('M月d日(周w)'),
			value: year + "/" + month + "/" + day,
			children: hourList
		})
	}
	return dataList
}

function buildHourList(startTime, dateIndex, startHour, endHour) {
	var hourList = []
	var hour = startTime.getHours()
	if (dateIndex == 0 && hour > startHour) {
		startHour = hour
	}
	for (var h = startHour; h < endHour + 1; h++) {
		var minuteList = initMinuteListWithDateIndexAndHourIndex(startTime, dateIndex, h, endHour)
		if (h < 10) {
			hourList.push({
				label: "0" + h,
				value: "0" + h,
				children: minuteList
			})
		} else {
			hourList.push({
				label: "" + h,
				value: "" + h,
				children: minuteList
			})
		}
	}
	return hourList
}

function initMinuteListWithDateIndexAndHourIndex(startTime, dateIndex, hour, endHour) {
	var minuteList = []
	var startIndex = 0
	if (dateIndex == 0 && hour == startTime.getHours()) {
		var minute = startTime.getMinutes()
		startIndex = parseInt(minute / 10) 
	}
	var minuteCount = 6
	if(hour == endHour){
		minuteCount = 1
	}
	for (var k = startIndex; k < minuteCount; k++) {
		if (k == 0) {
			minuteList.push({
				label: "00",
				value: "00"
			})
		} else {
			minuteList.push({
				label: "" + k * 10,
				value: "" + k * 10
			})
		}
	}
	return minuteList
}
