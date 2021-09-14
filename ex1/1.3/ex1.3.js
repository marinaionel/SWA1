const Circle = function () {
  const circle = {};
  if (arguments.length == 2) {
    circle.center = arguments[0];
    circle.radius = arguments[1];
  } else if (arguments.length == 3) {
    circle.center = Point(arguments[0], arguments[1]);
    circle.radius = arguments[2];
  }
  circle.getCenter = function () {
    return this.center;
  };
  circle.getRadius = function () {
    return this.radius;
  };
  circle.moveTo = function (x, y) {
    this.center.moveTo(x, y);
  };
  circle.toString = function () {
    return "Circle[center=" + this.center + ",radius=" + this.radius + "]";
  };
  return circle;
};

const Point = function (x, y) {
  const point = {};
  point.x = x;
  point.y = y;
  point.getX = function () {
    return this.x;
  };
  point.getY = function () {
    return this.y;
  };
  point.moveTo = function (x, y) {
    this.x = x;
    this.y = y;
  };
  point.toString = function () {
    return "Point[x=" + this.x + ",y=" + this.y + "]";
  };
  point.copy = function () {
    return Point(x, y);
  };
  return point;
};

let arr = [
  Circle(Point(1, 1), 2),
  Circle(Point(3, 1), 2),
  Circle(Point(2, 4), 1),
  Circle(Point(3, 5), 8),
  Circle(Point(3, 3), 3),
];

console.log(arr.map((c) => c.getRadius()));
