Workspace.factory('fabricJsService', function() {
  var getSelf, globscale, toolkit;
  globscale = 1;
  getSelf = function(name) {
    return _.find(toolkit, {
      name: name
    });
  };
  toolkit = [
    {
      name: 'disabled',
      properties: {
        isDrawingMode: false
      },
      annotating: false
    }, {
      name: 'draw',
      properties: {
        isDrawingMode: true
      },
      annotating: true
    }, {
      name: 'move',
      properties: {
        isDrawingMode: false
      },
      annotating: false
    }, {
      name: 'shape',
      properties: {
        isDrawingMode: false
      },
      annotating: true,
      type: fabric.Circle,
      types: [fabric.Circle, fabric.Rect],
      drawparams: [
        function(pointer) {
          return {
            radius: Math.abs(self.origX - pointer.x)
          };
        }, function(pointer) {
          return {
            width: -self.origX + pointer.x,
            height: -self.origY + pointer.y
          };
        }
      ],
      blanks: [
        {
          radius: 1,
          strokeWidth: 5,
          stroke: 'red',
          selectable: false,
          fill: "",
          originX: 'center',
          originY: 'center'
        }, {
          height: 1,
          width: 1,
          strokeWidth: 5,
          stroke: 'red',
          selectable: false,
          fill: "",
          originX: 'left',
          originY: 'top'
        }
      ],
      events: {
        mouseup: function(e, canvas) {
          return self.mouseDown = false;
        },
        mousedown: function(e, canvas) {
          var pointer, shape, spec, we;
          self.mouseDown = true;
          pointer = canvas.getPointer(e.e);
          we = getSelf('shape');
          spec = we.blanks[we.types.indexOf(we.type)];
          spec.left = pointer.x;
          spec.top = pointer.y;
          shape = new we.type(spec);
          canvas.add(shape);
          return em.unit;
        },
        objectadded: null,
        mousemove: function(e, canvas) {
          var pointer, shape, we;
          if (self.mouseDown) {
            we = getSelf('shape');
            pointer = canvas.getPointer(e.e);
            shape = canvas.getObjects()[canvas.getObjects().length - 1];
            shape.set(we.drawparams[we.types.indexOf(we.type)](pointer));
            canvas.renderAll();
          }
          return em.unit;
        }
      }
    }, {
      name: 'comment',
      properties: {
        isDrawingMode: false
      },
      annotating: true,
      events: {
        mouseup: null,
        mousedown: null,
        objectadded: null
      }
    }, {
      name: 'arrow',
      properties: {
        isDrawingMode: false
      },
      annotating: true
    }, {
      name: 'text',
      properties: {
        isDrawingMode: false
      },
      annotating: true
    }, {
      name: 'zoom',
      properties: {
        isDrawingMode: false
      },
      annotating: false,
      events: {
        mouseup: null,
        mousemove: function(o, canvas) {
          var SCALE_FACTOR, delta, klass, objects, pointer, transform, _i, _len, _results;
          if (self.mouseDown) {
            SCALE_FACTOR = 0.01;
            pointer = canvas.getPointer(o.e);
            delta = origX - pointer.x;
            objects = canvas.getObjects();
            delta = Math.abs(delta * SCALE_FACTOR);
            transform = [1 + delta, 0, 0, 1 + delta, 0, 0];
            console.log(transform);
            _results = [];
            for (_i = 0, _len = objects.length; _i < _len; _i++) {
              klass = objects[_i];
              klass.transformMatrix = transform;
              _results.push(klass.setCoords());
            }
            return _results;
          }
        },
        mousedown: function(o, canvas) {
          return self.origX = canvas.getPointer(o.e).x;
        }
      }
    }, {
      name: 'colorpicker',
      properties: {},
      annotating: false
    }, {
      name: 'load',
      properties: {},
      annotating: false
    }, {
      name: 'export',
      properties: {},
      annotating: false
    }
  ];
  return {
    init: function(path) {
      var returnCanvas;
      returnCanvas = {};
      (function() {
        var canvas, docGet;
        docGet = function(id) {
          return document.getElementById(id);
        };
        canvas = this.__canvas = new fabric.Canvas('annotation_canvas');
        canvas.on("after:render", function() {
          canvas.calcOffset();
          return em.unit;
        });
        fabric.util.loadImage(path, function(src) {
          var realImage;
          realImage = new fabric.Image(src);
          canvas.setWidth(realImage.width);
          canvas.setHeight(realImage.height);
          canvas.setBackgroundImage(realImage, canvas.renderAll.bind(canvas));
          return em.unit;
        });
        returnCanvas = canvas;
        return em.unit;
      })();
      (function() {
        return fabric.util.addListener(fabric.window, 'load', function() {
          var canvas, canvases, _i, _ref;
          canvas = this.__canvas || this.canvas;
          canvases = this.__canvases || this.canvases;
          canvas && canvas.calcOffset && canvas.calcOffset();
          if (canvases && canvases.length) {
            for (_i = 0, _ref = canvases.length; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--) {
              canvases[i].calcOffset();
            }
          }
          return em.unit;
        });
      })();
      return {
        canvas: returnCanvas,
        toolkit: toolkit
      };
    }
  };
});
