import React from "react";
import {
  calculateCanvasDimensions,
  calculateControlPointsWithBuffer,
  calculateDeltas,
} from "./utils";

const strokeWidth = 1;
const arrowHeadEndingSize = 10;
const boundingBoxElementsBuffer = strokeWidth + arrowHeadEndingSize;
const dotEndingRadius = 3

function arrow({ startPoint, endPoint }) {
  const canvasStartPoint = {
    x: Math.min(startPoint.x, endPoint.x),
    y: Math.min(startPoint.y, endPoint.y),
  };

  const { absDx, absDy, dx, dy } = calculateDeltas(startPoint, endPoint);
  const { p1, p2, p3, p4, boundingBoxBuffer } =
    calculateControlPointsWithBuffer({
      boundingBoxElementsBuffer,
      dx,
      dy,
      absDx,
      absDy,
    });

  const { canvasWidth, canvasHeight } = calculateCanvasDimensions({
    absDx,
    absDy,
    boundingBoxBuffer,
  });

  const curvedLinePath = `
      M ${p1.x}, ${p1.y} 
      C ${p2.x}, ${p2.y} 
      ${p3.x}, ${p3.y} 
      ${p4.x}, ${p4.y}
    `;

  return (
    <div>
      <svg
        width={canvasWidth}
        height={canvasHeight}
        style={{
          backgroundColor: "#eee",
          transform: `translate(${canvasStartPoint.x}px, ${canvasStartPoint.y}px)`,
        }}
      >
        {/* Line */}
        <path
          stroke="black"
          strokeWidth={strokeWidth}
          fill="none"
          d={curvedLinePath}
        />

        {/* arrow-head */}
        <path
          d={`
            M ${(arrowHeadEndingSize / 5) * 2} 0
            L ${arrowHeadEndingSize} ${arrowHeadEndingSize / 2}
            L ${(arrowHeadEndingSize / 5) * 2} ${arrowHeadEndingSize}`}
          fill="none"
          stroke="black"
          style={{
            transform: `translate(${p4.x - arrowHeadEndingSize}px, ${
              p4.y - arrowHeadEndingSize / 2
            }px)`,
          }}
        />

        {/* circle-line-start */}
        <circle
          cx={p1.x}
          cy={p1.y}
          r={dotEndingRadius}
          stroke="black"
          strokeWidth={strokeWidth}
          fill='#fff'
        />
      </svg>
    </div>
  );
}

export default arrow;
