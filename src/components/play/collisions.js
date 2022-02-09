// Implemented logic from http://jeffreythompson.org/collision-detection
export const collisions = new class Collisions {
  // Do these 2 rectangles collide
  rectRect(r1, r2) {
    return (r1.x + r1.width >= r2.x 
         && r1.x <= r2.x + r2.width 
         && r1.y + r1.height >= r2.y 
         && r1.y <= r2.y + r2.height);
  } 
  // Do these 2 lines collide
  lineLine(l1, l2) {
    const uA = ((l2.b.x - l2.a.x) * (l1.a.y - l2.a.y)
              - (l2.b.y - l2.a.y) * (l1.a.x - l2.a.x)) / ((l2.b.y - l2.a.y) * (l1.b.x - l1.a.x)
              - (l2.b.x - l2.a.x) * (l1.b.y - l1.a.y));
    const uB = ((l1.b.x - l1.a.x) * (l1.a.y - l2.a.y) 
              - (l1.b.y - l1.a.y) * (l1.a.x - l2.a.x)) / ((l2.b.y - l2.a.y) * (l1.b.x - l1.a.x)
              - (l2.b.x - l2.a.x) * (l1.b.y - l1.a.y));

    return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
  }
  toLine(x1, y1, x2, y2) {
    const a = {x: x1, y: y1};
    const b = {x: x2, y: y2};
    
    return {a, b};
  }
  // Do the line and rect collide
  lineRect(l, r) {
    const left =   this.lineLine(l, this.toLine(r.x, r.y, r.x, r.y + r.height));
    const right =  this.lineLine(l, this.toLine(r.x + r.width, r.y, r.x + r.width, r.y + r.height));
    const top =    this.lineLine(l, this.toLine(r.x, r.y, r.x + r.width, r.y));
    const bottom = this.lineLine(l, this.toLine(r.x, r.y + r.height, r.x + r.width, r.y + r.height));

    return (left || right || top || bottom);
  }
}();

