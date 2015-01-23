"use strict";

var CliFrames = require("cli-frames");
var ascii = require('./ascii');

var width = 100;
var height = 50;


var generateWhitespace = function(size) {

    var arr = [];
    for (var i=0; i < size; i++) {
        arr.push(" ");
    }
    return arr.join("");
};

var formatImage = function(image) {

    // Format width with whitespace
    var formatted = image.map(function(line) {
        var missingWidth = width - line.length;
        if (missingWidth < 0) return line;
        return line + generateWhitespace(missingWidth);
    });

    // Format Height with whitespace
    var missingHeight = formatted.length < height;
    if (formatted.length < height) {
        for (var i = 0; i < missingHeight; i++) {
            formatted.push(generateWhitespace(width));
        }
    }

    return formatted.join("\n");
};



var release = function(opts, cb) {

    if (!opts.images) return cb(new Error("No images provided"));

    var frames = opts.images.map(function(image) {
        return ascii[image];
    })
    .filter(function(frame) { return !!frame; })
    .map(formatImage);

    // Load frames when creating the instance
    new CliFrames({
        frames: frames,
        autostart: {
            delay: opts.delay || 250,
            end: function (err, data) {
                cb(err, data);
            }
        }
    });


};

module.exports.release = release;
