"use strict";

var _fs = _interopRequireDefault(require("fs"));
var _csvParser = _interopRequireDefault(require("csv-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var writer = _fs["default"].createWriteStream('outputs/output-babel.json');
_fs["default"].createReadStream('csv/nodejs-hw1.csv').pipe((0, _csvParser["default"])()).on('data', function (data) {
  writer.write(JSON.stringify(data) + ', \n');
});
