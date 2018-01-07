var vars = [];
var cc;
var params = [];
var functionname;
var datadata;
function run(code) {
  var c = code.split("/n");
  for(var i=0;i<c.length;i++) {
    cc = c[i].split(" ");
    functionname = cc[0];
    cc.shift();
    datadata = cc.join("");
    params = datadata.split(",");
    runfunction(functionname);
  }
}
