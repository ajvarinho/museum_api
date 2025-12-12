import { Point } from '@/services/interfaces';

export const polygonCenter = (points: Point[]) => {
    console.log(points);
    const valX: number[] = [];
    const valY: number[] = [];
    for(let i = 0; i < points.length; i++){
        valX.push(points[i].x);
        valY.push(points[i].y);
    }
    const sumX = valX.reduce((accumulator, currentValue) => accumulator + currentValue,0);
    const sumY = valY.reduce((accumulator, currentValue) => accumulator + currentValue,0);
    const cogX = Math.round(sumX / valX.length);
    const cogY = Math.round(sumY / valY.length);
    return {
        cogX,
        cogY
    }
};


export const isPointInside = (x: number, y: number, polygon:Point[]) => {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;

    const intersect =
      ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

    if (intersect) inside = !inside;
  }
  return inside;
};