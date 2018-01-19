var syntax = true;
var variables = [];
var labels = [];
var commands = [];

function exec() {
    document.getElementById('player').innerHTML = "";
    variables = ["date="+ new Date().toJSON().slice(0,10)+ ""];
    var code = document.getElementById('code').value.split("\n");
    for (var p = 0; p < code.length; p++) {
        if (code[p].startsWith(":")) {
            labels.push(code[p].substring(1) + "=" + p);
        }
    }
    for (var i = 0; i < code.length; i++) {
        var current = code[i];
        var repeat = false;
        var times;
        // Check if the command is being repeated
        if (current.startsWith("repeat ")) {
            repeat = true;
            times = current.substring(7).split(":")[0];
            current = current.split(":")[1];
        }
        var valid = false;
        current = current.replace(/\/\/[^]+/g,"");
        if (current.startsWith("var ")) {
            if (current.includes("=")) {
                var var1 = current.substring(4);
                var1 = var1.replace(" = ", "=");
                var1 = var1.replace(" =", "=");
                var1 = var1.replace("= ", "=");
                var var2 = var1.split("=")[0]; // Var Name
                var var3 = var1.split("=")[1]; // Var Value
                if (var2 == "" || var3 == "") {
                    alert("Syntax Error on line " + (i + 1) + ".");
                } else {
                    if (var3.startsWith("random(") && endsWith(")")) {
                        var random1 = var3.substring(7);
                    }
                    variables.push(var2 + "=" + replaceVars(var3));
                }
            } else {
                alert("Syntax Error on line " + (i + 1) + ".");
            }
        } else if (current == "stop") {
            return
        } else if (current.startsWith("print ")) {
            var print1 = current.substring(6);
            if (repeat) {
                for (var p = 0; p < +times; p++) {
                    document.getElementById('player').innerHTML += replaceVars(print1);
                }
            } else {
                document.getElementById('player').innerHTML += replaceVars(print1);
            }
        } else if (current.startsWith("input ")) {
            if (current.includes("=")) {
                var input1 = current.substring(6);
                input1 = input1.replace(" = ", "=");
                input1 = input1.replace(" =", "=");
                input1 = input1.replace("= ", "=");
                var input2 = input1.split("=")[0]; // Var Name
                var input3 = input1.split("=")[1]; // Var Value
                if (input2 == "" || input3 == "") {
                    alert("Syntax Error on line " + (i + 1) + ".");
                } else {
                    var input4 = prompt(input3);
                    variables.push(input2 + "=" + input4);
                }
            } else {
                alert("Syntax Error on line " + (i + 1) + ".");
            }
        } else if (current.startsWith("goto ")) {
            var goto1 = current.substring(5);
            if (isNaN(goto1)) {
                for (var o = 0; o < labels.length; o++) {
                    if (labels[o].startsWith(goto1)) {
                        i = labels[o].split("=")[1];
                    }
                }
            } else {
                i = +goto1 - 2;
            }
        } else if (current.startsWith(":")) {

        } else if (current.startsWith("msg ")) {
            var msg1 = current.substring(4);
            if (repeat) {
                for (var p = 0; p < +times; p++) {
                    alert(replaceVars(msg1));
                }
            } else {
                alert(replaceVars(msg1));
            }
        } else if (current.startsWith("if ")) {
            if (current.includes("=")) {
                var if1 = current.substring(3);
                if1 = if1.replace(" = ", "=");
                if1 = if1.replace(" =", "=");
                if1 = if1.replace("= ", "=");
                var name1 = if1.split("=")[0];
                var value1 = if1.split("=")[1];
                if (name1 == "" || name1 == "" || current.includes(":")) {
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
                } else {
                    alert("Syntax Error on line " + (i + 1) + ".");
                }
            } else {
                alert("Syntax Error on line " + (i + 1) + ".");
            }
        } else if (current.startsWith("not ")) {
            if (current.includes("=")) {
                //name = fart:
                var if1 = current.substring(4);
                if1 = if1.replace(" = ", "=");
                if1 = if1.replace(" =", "=");
                if1 = if1.replace("= ", "=");
                var name1 = if1.split("=")[0];
                var value1 = if1.split("=")[1];
                if (name1 == "" || value1 == "" || current.startsWith) {
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
                } else {
                    alert("Syntax Error on line " + (i + 1) + ".");
                }
            } else {
                alert("Syntax Error on line " + (i + 1) + ".");
            }
        } else if (current.startsWith("set ")) {

        } else if (current.endsWith("++")) {
            var plusplus = current.substring(0, current.length - 2);
            if (repeat) {
                for (var p = 0; p < +times; p++) {
                    setVar(plusplus, +getVar(plusplus) + 1);
                }
            } else {
                setVar(plusplus, +getVar(plusplus) + 1);
            }
        } else if (current.endsWith("--")) {
            var minusminus = current.substring(0, current.length - 2);
            if (repeat) {
                for (var p = 0; p < +times; p++) {
                    setVar(minusminus, +getVar(minusminus) - 1);
                }
            } else {
                setVar(minusminus, +getVar(minusminus) - 1);
            }
        } else if (current == "") {
            // Allow blank returns
        } else if (current.startsWith("//")) {

        } else if (current == "") {

        } else if (current == "Meeska! Mooska! Mickey Mouse!") {
            // Easter Eggs!
            document.getElementById('player').innerHTML += "<img width='400' src='https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/abc-MMC_VOLUME_010-Full-Image_GalleryBackground-en-US-1504651650211._RI_SX940_.jpg'>";
        } else {
            for (var o = 0; o < commands.length; o++) {
                if (current.startsWith(commands[o].split(",")[0])) {
                    valid = true
                }
            }
            for (var o = 0; o < commands.length; o++) {
                var start1 = commands[o].split(",")[0];
                var code2 = commands[o].split(",")[1];
                if (current.startsWith(start1)) {
                    code2 = code2.replace(/#result#/g, current.substring(start1.length));
                    eval(code2);
                }
            }
            if (!valid) {
                alert("Syntax Error on line " + (i + 1) + ".");
            }
        }
    }
}

function setVar(name, setTo) {
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
$(function() {
    $("#settingsPopup").draggable({
        handle: '#draggy'
    });
    $("#settingsPopup").draggable({
        containment: "window"
    });
});

function replaceVars(string) {
    var result = string;
    for (var q = 0; q < 10; q++) {
        var add = result.match(/\(add ([a-zA-Z0-9._-]+),([a-zA-Z0-9._-]+)\)/g);
        var random = result.match(/\(random ([a-zA-Z0-9._-]+),([a-zA-Z0-9._-]+)\)/g);
        if (add == null && random == null) {
            for (var w = 0; w < variables.length; w++) {
                var name = variables[w].split("=")[0];
                var value = variables[w].split("=")[1];
                if (value.startsWith("[") && value.endsWith("]")) {
                    var array = value.substring(1,value.length - 1).split(",");
                    for (var z = 0; z < 30; z++) {
                        result = result.replace("(" + name + "[" + z + "])", array[z - 1]);
                    }
                } else {
                    result = result.replace("(" + name + ")", value);
                }
                
            }
        } else {
            if (random == null) {
                result = result.replace(add[0],(+add[0].substring(5,add[0].length-1).split(",")[0]) + (+add[0].substring(5,add[0].length-1).split(",")[1]));
            } else {
                result = result.replace(random[0], Math.floor((Math.random() * (+random[0].substring(7,random[0].length-1).split(",")[1])) + (+random[0].substring(7,random[0].length-1).split(",")[0]))).toString();
            }
           
        }
    }
    return result


}
function download() {
    // Downloading code from https://stackoverflow.com/users/2438165/mat%C4%9Bj-pokorn%C3%BD
    var element = document.createElement('a');
    element.style.display = 'none';
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById("code").value));
    element.setAttribute('download', "project.corescript");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function upload() {
    var upload = document.createElement('INPUT');
    upload.type = "file";
    document.body.appendChild(upload);
    upload.click();
     var file = upload.files[0];
  if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function(evt) {
         alert(evt.target.result);
      }
      reader.onerror = function(evt) {
          alert("Error");
      }
  }
    document.body.removeChild(upload);
}
function update() {
    if (syntax) {
        document.getElementById("overlay").style.visibility = "visible";
        document.getElementById("code").style.color = "transparent";
        document.getElementById("code").style.backgroundColor = "transparent";
        var text = document.getElementById('code').value;
        var regex4 = /var ([^\n=]+)([//=]+)([^\n=]+)/g;
        var regex1 = /\/\/([^]*)/g;
        var regex3 = /print ([^\n]+)/g;
        var regex12 = /msg ([^\n]+)/g;
        var regex5 = /([^\n]+)\+\+/g;
        var regex6 = /([^\n]+)--/g;
        var regex8 = /\(([^)(]+)\)/g;
        var regex7 = /input ([^\n=]+)([//=]+)([^\n=]+)/g;
        var regex9 = /if ([^\n=]+)([//=]+)([^\n=]+)/g;
        var regex10 = /not ([^\n=]+)([//=]+)([^\n=]+)/g;
        var regex11 = /\n:([^\n=]+)/g;
        var regex13 = /repeat ([0-9]+):/g;
        text = text.replace(/</g,"<&zwnj;"); 
        text = text.replace(/>/g,"&zwnj;>");
        // text = text.replace(regex8, "(<span style='color:white;'>$1</span>)");
        text = text.replace(regex11, "<br><span style='color:lightblue;'>:$1</span>");
        text = text.replace(regex4, "<span style='color:rgb(0,128,155);'>var</span> <span style='color:rgb(230,219,116);'>$1</span><span style='color:crimson;'>$2</span><span style='color:rgb(230,219,116);'>$3</span>");
        text = text.replace(regex3, "<span style='color:gold;'>print </span><span style='color:rgb(230,219,116);'>$1</span>");
        text = text.replace(regex9, "<span><span style='color:rgb(0,128,155);'>if</span> <span style='color:rgb(230,219,116);'>$1</span><span style='color:crimson;'>$2</span><span style='color:rgb(230,219,116);'>$3</span></span><span></span>");
        text = text.replace(regex1, "<span style='color:rgb(150,150,150);'>//$1</span>");
        text = text.replace(regex10, "<span style='color:rgb(0,128,155);'>not</span> <span style='color:rgb(230,219,116);'>$1</span><span style='color:crimson;'>$2</span><span style='color:rgb(230,219,116);'>$3</span>");
        text = text.replace(/stop/g, "<span style='color:red;'>stop</span>");
        text = text.replace(regex5, "<span style='color:lightgreen;'>$1++</span>");
        text = text.replace(regex6, "<span style='color:red;'>$1--</span>");
        text = text.replace(regex12, "<span style='color:cyan;'>msg </span><span style='color:rgb(230,219,116);'>$1</span>");
        text = text.replace(regex7, "<span style='color:rgb(0,128,155);'>input</span> <span style='color:rgb(230,219,116);'>$1</span><span style='color:crimson;'>$2</span><span style='color:rgb(230,219,116);'>$3</span>");
        text = text.replace(regex13,"<span style='color:lightgreen;'>repeat $1:</span>");
        text = text.toString().replace(/\n/g, "<br>");
        document.getElementById("overlay").innerHTML = text;
    } else {
        document.getElementById("overlay").style.visibility = "hidden";
        document.getElementById("code").style.color = "white";
        document.getElementById("code").style.backgroundColor = "rgb(66,66,66)";
    }
    count();
}
// window.onbeforeunload = function(e) {
//     return "Are you sure you want to leave?";
// };
function count() {
    document.getElementById("counter").innerHTML = "<div style='height:2px;'></div>";
    var lines = document.getElementById("code").value.split("\n");
    for (var o = 0; o < lines.length; o++) {
        document.getElementById("counter").innerHTML += "<p>" + (o + 1) + "</p>";
    }
    document.getElementById('overlay').scrollTop = document.getElementById('code').scrollTop;
    document.getElementById('counter').scrollTop = document.getElementById('code').scrollTop;
}

function l(string) { // Just to make things easier.
    console.log(string);
}

function newCommand(code4, startsWith) {
    commands.push(code4 + "," + startsWith);
    console.log("Command Created");
}
newCommand("cls", "document.getElementById('player').innerHTML = '';");
// Idea: newCommand("say #1# #2# times","for (var p = 0; i < #1#; p++) {alert("#1");}");
