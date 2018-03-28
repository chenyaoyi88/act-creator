function json2url(json) {
	json.t = Math.random();
	var arr = [];
	for (var name in json) {
		arr.push(name + "=" + encodeURIComponent(json[name]));
	}
	return arr.join("&");
}

function ajax(options) {
	options = options || {};
	if (!options.url) {
		alert("滚！");
		return;
	}
	options.data = options.data || {};
	options.type = options.type || "get";
	options.timeout = options.timeout || 0;

	//1 创建
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var str = json2url(options.data);


	if (options.type == "get") {
		xhr.open("get", options.url + "?" + str, true);
		xhr.send();
	} else {
		//2 连接
		xhr.open("post", options.url, true);
		//设置一个请求头：
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//3 发送
		xhr.send(str);
	}

	//4 接收
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) { //完成
			clearTimeout(timer);
			//成功
			if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
				options.success && options.success(xhr.responseText);
			} else {
				//失败
				options.error && options.error();
			}

		}
	};

	if (options.timeout) {
		var timer = setTimeout(function () {
			xhr.abort(); //终止
			alert("abort");
		}, options.timeout);
	}

}