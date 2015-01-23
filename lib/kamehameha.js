"use strict";

var CliFrames = require("cli-frames");
var ascii = require('./ascii');

var release = function(opts, cb) {

    if (!opts.images) return cb(new Error("No images provided"));

    var frames = opts.images.map(function(image) {
        return ascii[image];
    })
    .filter(function(frame) {
        return !!frame;
    });

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
