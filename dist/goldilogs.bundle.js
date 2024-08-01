!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define("GoldiLogs",[],o):"object"==typeof exports?exports.GoldiLogs=o():e.GoldiLogs=o()}(self,(()=>{return e={838:e=>{function o(e){return null!=e&&""!==e.trim()&&"string"==typeof e&&!e.startsWith("Object")&&!e.startsWith("<")}var t={reset:"[0m",bright:"[1m",dim:"[2m",underscore:"[4m",blink:"[5m",reverse:"[7m",hidden:"[8m",fg:{black:"[30m",red:"[31m",green:"[32m",yellow:"[33m",blue:"[34m",magenta:"[35m",cyan:"[36m",white:"[37m",gray:"[90m"},bg:{black:"[40m",red:"[41m",green:"[42m",yellow:"[43m",blue:"[44m",magenta:"[45m",cyan:"[46m",white:"[47m"}};e.exports={validateString:o,evaluateMessageLevel_CLI:function(e){return"INFO"===e?t.fg.green:"WARN"===e?t.fg.yellow:"ERROR"===e?t.fg.red:"LOG"===e?t.fg.blue:t.fg.white},evaluateMessageLevel_CLI_BG:function(e){return"INFO"===e?t.bg.green:"WARN"===e?t.bg.yellow:"ERROR"===e?t.bg.red:"LOG"===e?t.bg.blue:t.bg.white},cliColors:t,buildCallerInfo:function(e){var n="";if(o(e.className)&&(n+=e.className+"."),o(e.methodName)&&(n+=e.methodName),o(n)){var c=t.fg.cyan;return n.includes(".")?"[ ".concat(c).concat(n).concat(t.reset," ]"):"[ ".concat(c).concat(n,"()").concat(t.reset," ]")}return null},browserMessageStyles:{log:"color: blue; font-weight: bold;",info:"color: blue; font-weight: bold;",warn:"color: orange; font-weight: bold;",error:"color: red; font-weight: bold;",timestamp:"color: white; font-weight: bold;",normal:"color: white; font-weight: normal;",caller:"color: lightblue; font-weight: bold;"}}},894:(e,o,t)=>{function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function c(e,o){for(var t=0;t<o.length;t++){var n=o[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,r(n.key),n)}}function r(e){var o=function(e){if("object"!=n(e)||!e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var t=o.call(e,"string");if("object"!=n(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==n(o)?o:o+""}function a(e,o,t){if("function"==typeof e?e===o:e.has(o))return arguments.length<3?o:t;throw new TypeError("Private element is not present on this object")}var l=t(637),i=(t(838),new WeakSet),s=function(){return e=function e(){!function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}(this,e),function(e,o){(function(e,o){if(o.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(e,o),o.add(e)}(this,i)},o=[{key:"log",value:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"condensed",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=g(),c="";""!==t?c+=l.buildObjectLog(t,e):c=l.buildCommandLineMessage(e,n,o,"LOG"),console.log(c)}},{key:"error",value:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"condensed",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=g(),c="";""!==t?c+=l.buildObjectLog(t,e):c=l.buildCommandLineMessage(e,n,o,"ERROR"),console.error(c)}},{key:"info",value:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"condensed",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=g(),c="";""!==t?c+=l.buildObjectLog(t,e):c=l.buildCommandLineMessage(e,n,o,"INFO"),console.info(c)}},{key:"warn",value:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"condensed",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=g(),c="";""!==t?c+=l.buildObjectLog(t,e):c=l.buildCommandLineMessage(e,n,o,"WARN"),console.warn(c)}},{key:"group",value:function(e,o){console.group(e);for(var t=arguments.length,c=new Array(t>2?t-2:0),r=2;r<t;r++)c[r-2]=arguments[r];for(var l=0,s=c;l<s.length;l++){var g=s[l];"object"===n(g)?a(i,this,u).call(this,g.message,g.level,o):this.log(g,o)}console.groupEnd()}},{key:"logObject",value:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";console.log(l.buildObjectLog(e,o))}}],o&&c(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,o}();function u(e,o,t){"ERROR"===o?this.error(e,t):"WARN"===o?this.warn(e,t):"LOG"===o?this.log(e,t):"INFO"===o&&this.info(e,t)}function g(){var e,o=(null!==(e=(new Error).stack)&&void 0!==e?e:"").split("\n")[3].match(/at (\S+) \(([^)]+)\)/);if(o&&o.length>1){var t=o[1].split(".");return{methodName:t.pop()||"",className:t.pop()||""}}return{methodName:"",className:""}}e.exports&&(e.exports=s),"undefined"!=typeof window&&(window.Logger=s)},637:(e,o,t)=>{function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function c(e,o){for(var t=0;t<o.length;t++){var n=o[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,r(n.key),n)}}function r(e){var o=function(e){if("object"!=n(e)||!e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var t=o.call(e,"string");if("object"!=n(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==n(o)?o:o+""}var a=t(838),l=t(772),i=["condensed","detailed","pretty","important"],s=function(){return e=function e(){!function(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}(this,e)},(o=[{key:"buildCommandLineMessage",value:function(e,o,t,n){if(!i.includes(t))throw new Error("Invalid log type: ".concat(t," \n\n Types: (default)condensed, detailed, pretty, important"));if(!a.validateString(e))return"";var c="",r=a.buildCallerInfo(o);return"condensed"===t?c=l.condenseMessage(e,r,n):"detailed"===t?c=l.detailedMessage(e,r,n):"pretty"===t?c=l.prettyMessage(e,r,n):"important"===t&&(c=l.importantMessage(e,r,n)),c}},{key:"buildBrowserMessage",value:function(e){}},{key:"buildObjectLog",value:function(e,o){var t={1:a.cliColors.fg.cyan,2:a.cliColors.fg.blue,3:a.cliColors.fg.green,4:a.cliColors.fg.yellow,5:a.cliColors.fg.red,6:a.cliColors.fg.magenta,7:a.cliColors.fg.cyan,8:a.cliColors.fg.blue,9:a.cliColors.fg.green,10:a.cliColors.fg.yellow,11:a.cliColors.fg.red,12:a.cliColors.fg.magenta,reset:a.cliColors.reset},c=function(e){return"   ".repeat(e)},r=function(e,o){if("object"!==n(e)||null===e)return JSON.stringify(e);var l=Object.keys(e),i=t[o]||t[12],s=t.reset,u=o+1,g=l.map((function(t){var n=r(e[t],u);return n.toString().startsWith("{")?"".concat(c(o)).concat(i).concat(t).concat(s,": ").concat(n):"".concat(c(o)).concat(i).concat(a.cliColors.bright).concat(t).concat(s,": ").concat(a.cliColors.fg.white).concat(n).concat(s)})).join(",\n");return"{\n".concat(g,"\n").concat(c(o-1),"}")};return""!==o?"\n".concat(o,"\n").concat(r(e,1)):"\n".concat(r(e,1))}}])&&c(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,o}();e.exports=new s},772:(e,o,t)=>{var n=t(838);function c(e,o,t){var c=(new Date).toLocaleTimeString("it-IT"),r=n.evaluateMessageLevel_CLI(t),a=n.cliColors.fg.white;return null===o?"".concat(a).concat(n.cliColors.bright).concat(c).concat(n.cliColors.reset," [ ").concat(r).concat(n.cliColors.bright).concat(t).concat(n.cliColors.reset," ]: ").concat(e):"".concat(a).concat(n.cliColors.bright).concat(c).concat(n.cliColors.reset," ").concat(o," [ ").concat(r).concat(n.cliColors.bright).concat(t).concat(n.cliColors.reset," ]: ").concat(e)}e.exports={condenseMessage:c,detailedMessage:function(e,o,t){var c=(new Date).toISOString(),r=n.evaluateMessageLevel_CLI(t),a=n.cliColors.fg.white;return null===o?"Timestamp: ".concat(a).concat(n.cliColors.bright).concat(c).concat(n.cliColors.reset,"\n\t[ Level ]: [ ").concat(r).concat(n.cliColors.bright).concat(t).concat(n.cliColors.reset," ]\n\t[ Message ]: ").concat(e,"\n"):"Timestamp: ".concat(a).concat(n.cliColors.bright).concat(c).concat(n.cliColors.reset,"\n\t[ Caller ]: ").concat(o,"\n\t[ Level ]: [ ").concat(r).concat(n.cliColors.bright).concat(t).concat(n.cliColors.reset," ]\n\t[ Message ]: ").concat(e,"\n")},prettyMessage:function(e,o,t){var c=new Date,r=c.toLocaleTimeString("it-IT"),a=c.toLocaleDateString("it-IT"),l=n.evaluateMessageLevel_CLI(t),i=n.cliColors.fg.white,s="=".repeat(50);return null===o?"\n".concat(s,"\n • Time: ").concat(i).concat(n.cliColors.bright).concat(r).concat(n.cliColors.reset,"\n • Date: ").concat(i).concat(n.cliColors.bright).concat(a).concat(n.cliColors.reset,"\n • Level: [ ").concat(l).concat(n.cliColors.bright).concat(t).concat(n.cliColors.reset," ]\n • Message: ").concat(e,"\n").concat(s,"\n"):"\n".concat(s,"\n • Time: ").concat(i).concat(n.cliColors.bright).concat(r).concat(n.cliColors.reset,"\n • Date: ").concat(i).concat(n.cliColors.bright).concat(a).concat(n.cliColors.reset,"\n • Caller: ").concat(o,"\n • Level: [ ").concat(l).concat(n.cliColors.bright).concat(t).concat(n.cliColors.reset," ]\n • Message: ").concat(e,"\n").concat(s,"\n")},importantMessage:function(e,o,t){var r=new Date,a=(r.toLocaleTimeString("it-IT"),r.toLocaleDateString("it-IT"),n.evaluateMessageLevel_CLI(t),n.cliColors.fg.white,"\n".concat("=".repeat(25),"||").concat(n.cliColors.bg.red," IMPORTANT ").concat(n.cliColors.reset,"||").concat("=".repeat(25),"\n")),l="=".repeat(64);return"".concat(a,"\n ").concat(c(e,o,t),"\n ").concat(l)}}}},o={},function t(n){var c=o[n];if(void 0!==c)return c.exports;var r=o[n]={exports:{}};return e[n](r,r.exports,t),r.exports}(894);var e,o}));