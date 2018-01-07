var functions = [];
function newfunction(name,code) {
var aa = {name: "", code: ""};
functions.push(aa);
}
function runfunction(name) {
for(var i = 0; i < functions.length; i++) {
if (functions[i].name === name) {
functions[i].code();
}
}
}
