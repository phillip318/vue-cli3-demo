


function Sketchpad(config) {
    for (var key in this.constructor.prototype) {
        this[key] = this[key].bind(this);
    }

    if (!config.hasOwnProperty('element')) {
        console.error('SKETCHPAD ERROR: No element selected');
        return;
    }

    if (typeof(config.element) === 'string') {
        this.element = $(config.element);
    } else {
        this.element = config.element;
    }

    // 宽度
    this._width = config.width || this.element.attr('data-width') || 0;
    // 高度
    this._height = config.height || this.element.attr('data-height') || 0;
    // 颜色
    this.color = config.color || this.element.attr('data-color') || '#000000';
    // 大小
    this.penSize = config.penSize || this.element.attr('data-penSize') || 5;
    // 数组坐标点
    this.strokes = config.strokes || [];
    this._currentStroke = {
        color: null,
        size: null,
        lines: [],
    };


    this.undoHistory = config.undoHistory || [];

    this._sketching = false;
    // 画图
}

//
// Private API
//
// 监听数组变化
Sketchpad.prototype.change = function(event) {
    // Array.prototype._push = Array.prototype.push;
    // Array.prototype.push = function(v) {
    //     this._push(v);
    //     if (typeof this.pushListener == 'function') this.pushListener.call(this, v)
    // }
    let that = this
    this.strokes.pushListener = function(v) {
      that.redraw(that.strokes); 
    }
};
// // 位置
Sketchpad.prototype._cursorPosition = function(event) {
    return {
        x: event.pageX - $(this.canvas).offset().left,
        y: event.pageY - $(this.canvas).offset().top,
    };
};

Sketchpad.prototype._draw = function(start, end, color, size) {
    this._stroke(start, end, color, size, 'source-over');
};

Sketchpad.prototype._erase = function(start, end, color, size) {
    this._stroke(start, end, color, size, 'destination-out');
};

Sketchpad.prototype._stroke = function(start, end, color, size, compositeOperation) {
    this.context.save();
    this.context.lineJoin = 'round';
    this.context.lineCap = 'round';
    this.context.strokeStyle = color;
    this.context.lineWidth = size;
    this.context.globalCompositeOperation = compositeOperation;
    this.context.beginPath();
    this.context.moveTo(start.x, start.y);
    this.context.lineTo(end.x, end.y);
    this.context.closePath();
    this.context.stroke();

    this.context.restore();
};

//
// Callback Handlers
//

Sketchpad.prototype._mouseDown = function(event) {
    this._lastPosition = this._cursorPosition(event);
    this._currentStroke.color = this.color;
    this._currentStroke.size = this.penSize;
    this._currentStroke.lines = [];
    this._sketching = true;
    this.canvas.addEventListener('mousemove', this._mouseMove);
};

Sketchpad.prototype._mouseUp = function(event) {
    if (this._sketching) {
        this.strokes.push($.extend(true, {}, this._currentStroke));
        this._sketching = false;
    }
    this.canvas.removeEventListener('mousemove', this._mouseMove);
};

Sketchpad.prototype._mouseMove = function(event) {
    var currentPosition = this._cursorPosition(event);

    this._draw(this._lastPosition, currentPosition, this.color, this.penSize);
    this._currentStroke.lines.push({
        start: $.extend(true, {}, this._lastPosition),
        end: $.extend(true, {}, currentPosition),
    });

    this._lastPosition = currentPosition;
};

Sketchpad.prototype._touchStart = function(event) {
    event.preventDefault();
    if (this._sketching) {
        return;
    }
    this._lastPosition = this._cursorPosition(event.changedTouches[0]);
    this._currentStroke.color = this.color;
    this._currentStroke.size = this.penSize;
    this._currentStroke.lines = [];
    this._sketching = true;
    this.canvas.addEventListener('touchmove', this._touchMove, false);
};

Sketchpad.prototype._touchEnd = function(event) {
    event.preventDefault();
    if (this._sketching) {
        this.strokes.push($.extend(true, {}, this._currentStroke));
        this._sketching = false;
    }
    this.canvas.removeEventListener('touchmove', this._touchMove);
};

Sketchpad.prototype._touchCancel = function(event) {
    event.preventDefault();
    if (this._sketching) {
        this.strokes.push($.extend(true, {}, this._currentStroke));
        this._sketching = false;
    }
    this.canvas.removeEventListener('touchmove', this._touchMove);
};

Sketchpad.prototype._touchLeave = function(event) {
    event.preventDefault();
    if (this._sketching) {
        this.strokes.push($.extend(true, {}, this._currentStroke));
        this._sketching = false;
    }
    this.canvas.removeEventListener('touchmove', this._touchMove);
};

Sketchpad.prototype._touchMove = function(event) {
    event.preventDefault();
    var currentPosition = this._cursorPosition(event.changedTouches[0]);

    this._draw(this._lastPosition, currentPosition, this.color, this.penSize);
    this._currentStroke.lines.push({
        start: $.extend(true, {}, this._lastPosition),
        end: $.extend(true, {}, currentPosition),
    });

    this._lastPosition = currentPosition;
};

// //
// // Public API
// //

Sketchpad.prototype.reset = function() {
    // Set attributes
    this.canvas = this.element[0];
    this.canvas.width = this._width;
    this.canvas.height = this._height;
    this.context = this.canvas.getContext('2d');

    // Setup event listeners
    this.redraw(this.strokes);

    if (this.readOnly) {
        return;
    }

    // Mouse
    this.canvas.addEventListener('mousedown', this._mouseDown);
    this.canvas.addEventListener('mouseout', this._mouseUp);
    this.canvas.addEventListener('mouseup', this._mouseUp);

    // Touch
    this.canvas.addEventListener('touchstart', this._touchStart);
    this.canvas.addEventListener('touchend', this._touchEnd);
    this.canvas.addEventListener('touchcancel', this._touchCancel);
    this.canvas.addEventListener('touchleave', this._touchLeave);
};

Sketchpad.prototype.drawStroke = function(stroke) {
    for (var j = 0; j < stroke.lines.length; j++) {
        var line = stroke.lines[j];
        this._draw(line.start, line.end, stroke.color, stroke.size);
    }
};

Sketchpad.prototype.redraw = function(strokes) {
    for (var i = 0; i < strokes.length; i++) {
        // this.drawStroke(strokes[i]);
    }
};

Sketchpad.prototype.toObject = function() {
    return {
        width: this.canvas.width,
        height: this.canvas.height,
        strokes: this.strokes,
        undoHistory: this.undoHistory,
    };
};

Sketchpad.prototype.toJSON = function() {
    return JSON.stringify(this.toObject());
};

Sketchpad.prototype.animate = function(ms, loop, loopDelay) {
    this.clear();
    var delay = ms;
    var callback = null;
    for (var i = 0; i < this.strokes.length; i++) {
        var stroke = this.strokes[i];
        for (var j = 0; j < stroke.lines.length; j++) {
            var line = stroke.lines[j];
            callback = this._draw.bind(this, line.start, line.end,
                stroke.color, stroke.size);
            this.animateIds.push(setTimeout(callback, delay));
            delay += ms;
        }
    }
    if (loop) {
        loopDelay = loopDelay || 0;
        callback = this.animate.bind(this, ms, loop, loopDelay);
        this.animateIds.push(setTimeout(callback, delay + loopDelay));
    }
};

Sketchpad.prototype.cancelAnimation = function() {
    for (var i = 0; i < this.animateIds.length; i++) {
        clearTimeout(this.animateIds[i]);
    }
};

Sketchpad.prototype.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Sketchpad.prototype.undo = function() {
    this.clear();
    var stroke = this.strokes.pop();
    if (stroke) {
        this.undoHistory.push(stroke);
        this.redraw(this.strokes);
    }
};

Sketchpad.prototype.redo = function() {
    var stroke = this.undoHistory.pop();
    if (stroke) {
        this.strokes.push(stroke);
        this.drawStroke(stroke);
    }
};

export default Sketchpad