import React, { useRef, useState } from 'react';
import { Stage, Layer, Line, Circle, Text } from 'react-konva';
import CameraComponent from './CameraComponent';

const OverlayComponent = () => {
  const [dimensions, setDimensions] = useState({ width: 640, height: 480 });
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState([]);
  const stageRef = useRef(null);

  const handleUserMedia = (dims) => {
    setDimensions(dims);
  };

  const handleStageClick = () => {
    const stage = stageRef.current;
    const pointerPosition = stage.getPointerPosition();
    setCurrentShape((prevShape) => [...prevShape, pointerPosition]);
  };

  const handleFinishShape = () => {
    if (currentShape.length > 2) {
      setShapes((prevShapes) => [...prevShapes, currentShape]);
      setCurrentShape([]);
      console.log("Points:",currentShape);
      console.log("Dimension:",dimensions);
    } else {
      alert("A shape must have at least three points!");
    }
  };

  return (
    <div className="container">
      <CameraComponent onUserMedia={handleUserMedia} />
      <button className="finish-shape-button" onClick={handleFinishShape}>
        Finish Shape
      </button>
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleStageClick}
        ref={stageRef}
        className="stage"
      >
        <Layer>
          {shapes.map((shape, index) => (
            <Line
              key={index}
              points={shape.flatMap((p) => [p.x, p.y])}
              stroke="green"
              strokeWidth={2}
              lineJoin="round"
              lineCap="round"
              closed={true}
            />
          ))}
          <Line
            points={currentShape.flatMap((p) => [p.x, p.y])}
            stroke="blue"
            strokeWidth={2}
            lineJoin="round"
            lineCap="round"
            closed={false}
          />
          {currentShape.map((point, index) => (
            <React.Fragment key={index}>
              <Circle x={point.x} y={point.y} radius={4} fill="red" />
              <Text
                x={point.x + 5}
                y={point.y - 10}
                text={`(${Math.round(point.x)}, ${Math.round(point.y)})`}
                fontSize={12}
                fill="white"
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default OverlayComponent;
