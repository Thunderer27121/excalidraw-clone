import { useRef, useState, useEffect } from "react";
import Navbar from "./Components/Navbar";

const App = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [imageBeforeShape, setImageBeforeShape] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60; // leave space for navbar

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctxRef.current = ctx;
  }, []);
useEffect(() => {
  const ctx = ctxRef.current;
  if (!ctx) return;

  if (tool === "eraser") {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
  } else {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
  }
}, [tool]);
  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e) => {
    const { x, y } = getPos(e);
    setIsDrawing(true);
    setStartPos({ x, y });

    if (["rectangle", "line", "ellipse"].includes(tool)) {
      const snapshot = ctxRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setImageBeforeShape(snapshot);
    }

    if (tool === "pencil" || tool === "eraser") {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(x, y);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const { x, y } = getPos(e);
    const ctx = ctxRef.current;

    if (tool === "pencil") {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    if (tool === "eraser") {
      ctx.lineWidth = 10;
      ctx.strokeStyle = "white";
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    if (["rectangle", "line", "ellipse"].includes(tool)) {
      ctx.putImageData(imageBeforeShape, 0, 0);
      drawShape(startPos, { x, y }, tool);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const drawShape = (start, end, shapeType) => {
    const ctx = ctxRef.current;

    if (shapeType === "rectangle") {
      const width = end.x - start.x;
      const height = end.y - start.y;
      ctx.strokeRect(start.x, start.y, width, height);
    }

    if (shapeType === "line") {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }

    if (shapeType === "ellipse") {
      const centerX = (start.x + end.x) / 2;
      const centerY = (start.y + end.y) / 2;
      const radiusX = Math.abs(end.x - start.x) / 2;
      const radiusY = Math.abs(end.y - start.y) / 2;

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-50 overflow-hidden">
      <Navbar setTool={setTool} />
      <canvas
        ref={canvasRef}
        className="bg-white"
        style={{
          width: "100%",
          height: "calc(100vh - 60px)",
          display: "block",
          cursor: tool === "eraser" ? "crosshair" : "default",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default App;
