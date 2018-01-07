var variables = [];
var labels = [];
var commands = [];
function exec() {
	document.getElementById('player').innerHTML = "";
	variables = ["line="+i+""];
	var code = document.getElementById('code').value.split("\n");
	for (var p = 0; p < code.length; p++) {
		if (code[p].startsWith(":")) {
			labels.push(code[p].substring(1) + "=" + p);
		}
	}
	for (var i = 0; i < code.length; i++) {
		if (code[i].startsWith("var ")) {
			var var1 = code[i].substring(4);
			var1 = var1.replace(" = ","=");
			var1 = var1.replace(" =","=");
			var1 = var1.replace("= ","=");
			var var2 = var1.split("=")[0]; // Var Name
			var var3 = var1.split("=")[1]; // Var Value
			variables.push(var2 + "=" + var3);
		} else if (code[i].startsWith("print ")) {
			var print1 = code[i].substring(6);
			document.getElementById('player').innerHTML += replaceVars(print1);
		} else if (code[i].startsWith("input ")) {
			var input1 = code[i].substring(6);
			input1 = input1.replace(" = ","=");
			input1 = input1.replace(" =","=");
			input1 = input1.replace("= ","=");
			var input2 = input1.split("=")[0]; // Var Name
			var input3 = input1.split("=")[1]; // Var Value
			var input4 = prompt(input3);
			variables.push(input2 + "=" + input4)
		} else if (code[i].startsWith("goto ")) {
			var goto1 = code[i].substring(5);
			if (isNaN(goto1)) {
				for (var o = 0; o < labels.length; o++) {
					if (labels[o].startsWith(goto1)) {
						i = labels[o].split("=")[1];
					}
				}
			} else {
				i = +goto1 - 2;
			}
		} else if (code[i].startsWith(":")) {
			i++
		} else if (code[i].startsWith("msg ")) {
			var msg1 = code[i].substring(4);
			alert(replaceVars(msg1));
		} else if (code[i].startsWith("if ")) {
			//name = fart:
			var if1 = code[i].substring(3);
			if1 = if1.replace(" = ","=");
			if1 = if1.replace(" =","=");
			if1 = if1.replace("= ","=");
			var name1 = if1.split("=")[0];
			var value1 = if1.split("=")[1];
			var code1 = value1.split(":")[1];
			value1 = value1.split(":")[0];
			if (getVar(name1) == value1) {
				if (isNaN(code1)) {
					for (var o = 0; o < labels.length; o++) {
						if (labels[o].startsWith(code1)) {
							i = labels[o].split("=")[1];
						}
					}
				} else {
					i = +code1 - 2;
				}
			}
		} else if (code[i].startsWith("not ")) {
			//name = fart:
			var if1 = code[i].substring(4);
			if1 = if1.replace(" = ","=");
			if1 = if1.replace(" =","=");
			if1 = if1.replace("= ","=");
			var name1 = if1.split("=")[0];
			var value1 = if1.split("=")[1];
			var code1 = value1.split(":")[1];
			value1 = value1.split(":")[0];
			if (getVar(name1) == value1) {
					i = +code1 - 2;
				} else {
					if (isNaN(code1)) {
					for (var o = 0; o < labels.length; o++) {
						if (labels[o].startsWith(code1)) {
							i = labels[o].split("=")[1];
						}
					}
				}
			}
		} else if (code[i].endsWith("++")) {
			var plusplus = code[i].substring(0,code[i].length - 2);
			setVar(plusplus,+getVar(plusplus) + 1);
		} else if (code[i].endsWith("--")) {
			var minusminus = code[i].substring(0,code[i].length - 2);
			setVar(minusminus,+getVar(minusminus) - 1);
		} else if (code[i] == ""){
			// Allow blank returns
		} else if (code[i].startsWith("//")) {

		} else if (code[i] == ""){

		} else if (code[i] == "stop") {
			return
		} else {
			var valid = false;
			for (var o = 0; o < commands.length; o++) {
				var start1 = commands[o].split(",")[0];
				var code2 = commands[o].split(",")[1];
				if (code[i].startsWith(start1)) {
					code2 = code2.replace(/#result#/g,code[i].substring(start1.length));
					eval(code2);
					valid = true
				} else {
					valid = false
				}
				if (valid == false) {
					alert("Syntax Error on line " + (i+1) + ".");
				}
			}
		}
	}
}
function setVar(name,setTo) {
	for (var o = 0; o < variables.length; o++) {
		if (variables[o].split("=")[0] == name) {
			variables[o] = name + "=" + setTo;
		}
	}
}
function getVar(name) {
	for (var o = 0; o < variables.length; o++) {
		if (variables[o].split("=")[0] == name) {
			return variables[o].split("=")[1]
		}
	}
}
function replaceVars(string) {
	var result = string;
	for (var o = 0; o < variables.length; o++) {
		var name = variables[o].split("=")[0];
		var value = variables[o].split("=")[1];
		var regex2 = /\(add ([a-zA-Z0-9_-]+),([a-zA-Z0-9_-]+)\)/g;
		result = result.replace(regex2,""+getVar("$1")+",$2"); 
		result = result.replace("("+name+")",value); 
	}
	return result
}
var name = "";
setInterval(function() {
	var text = document.getElementById('code').value;
	var regex4 = /var ([^\n=]+)([//=]+)([^\n=]+)/g;
	text = text.replace(regex4,"var <span style='color:gold;'>$1</span><span style='color:crimson;'>$2</span><span style='color:gold;'>$3</span>");
	var regex3 = /print ([^\n]+)/g;
	text = text.replace(regex3,"<span style='color:gold;'>print $1</span>");
	text = text.replace(/print/g,"<span style='color:orange;'>print</span>");
	text = text.replace(/var/g,"<span style='color:rgb(0,128,155);'>var</span>");
	var regex1 = /\/\/([a-zA-Z0-9~!@#$%^&* =;'`]*)/g;
	text = text.replace(regex1,"<span style='color:rgb(150,150,150);'>//$1</span>");
	text = text.toString().replace(/\n/g,"<br>");
	document.getElementById("overlay").innerHTML = text;
	count();
},10);
function count() {
	document.getElementById("counter").innerHTML = "<div style='height:2px;'></div>";
	var lines = document.getElementById("code").value.split("\n");
	for (var o = 0; o < lines.length; o++) {
		document.getElementById("counter").innerHTML += "<p>" + (o+1) + "</p>";
	}
	document.getElementById('overlay').scrollTop = document.getElementById('code').scrollTop;
	document.getElementById('counter').scrollTop = document.getElementById('code').scrollTop;
}
function l(string) { // Just to make things easier.
	console.log(string);
}
function newCommand(code4,startsWith) {
	commands.push(code4 + "," + startsWith);
	console.log("Command Created");
}
//newCommand("cls","document.getElementById('player').innerHTML = '';");
