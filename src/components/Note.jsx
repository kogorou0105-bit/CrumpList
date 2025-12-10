import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti"; // 确保你 npm install canvas-confetti 了

const Note = ({ todo, onPositionUpdate, onRemove }) => {
  const [position, setPosition] = useState({ x: todo.x, y: todo.y });
  const [isDragging, setIsDragging] = useState(false);
  const [isCrushing, setIsCrushing] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const noteRef = useRef(null);

  // 播放音效
  const playCrushSound = () => {
    const audio = new Audio("/crush.mp3"); // 确保 public 文件夹里有这个文件
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  // 触发烟花
  const triggerConfetti = () => {
    if (!noteRef.current) return;
    const rect = noteRef.current.getBoundingClientRect();
    // 计算中心点 (0-1)
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      zIndex: 9999, // 确保烟花在最上层
      disableForReducedMotion: true,
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // 全局 MouseMove 和 MouseUp 监听，防止拖拽过快鼠标脱离元素
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newX = e.clientX - offset.current.x;
      const newY = e.clientY - offset.current.y;
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onPositionUpdate(todo.id, position.x, position.y);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, todo.id, onPositionUpdate, position.x, position.y]);

  const handleDoubleClick = () => {
    if (isCrushing) return;

    triggerConfetti();
    playCrushSound();
    setIsCrushing(true);

    // 等待动画结束通知父组件删除
    setTimeout(() => {
      onRemove(todo.id);
    }, 600);
  };

  const dateStr = new Date(todo.id).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      ref={noteRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      className={`absolute w-[220px] min-h-40 p-6 pb-8 cursor-grab will-change-transform mix-blend-multiply transition-shadow duration-200 select-none
        ${isCrushing ? "is-crushing" : ""} 
        ${
          isDragging
            ? "cursor-grabbing z-[1000] scale-105 shadow-2xl"
            : "shadow-md hover:shadow-xl hover:scale-[1.02] z-10"
        }
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        // 动态样式
        transform: isCrushing
          ? undefined // 动画接管
          : `rotate(${isDragging ? 0 : todo.r}deg)`, // 拖拽时稍微摆正一点手感更好，或者保持 todo.r
        transition: isDragging ? "none" : "transform 0.1s", // 拖拽时移除过渡防止延迟

        // CSS 变量传给动画使用
        "--rotate-deg": `${todo.r}deg`,
        "--bg-color-dynamic": todo.bg,

        // 拟真纸张背景
        background: `linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(255,255,255,0.1) 100%), ${todo.bg}`,
      }}
    >
      {/* 纸张翘角效果 (伪元素很难在 JSX直接写，依赖 CSS 类) */}
      <div className="pointer-events-none absolute -z-10 bottom-3 left-[10px] w-[70%] h-[20%] max-w-[300px] shadow-[0_15px_12px_rgba(0,0,0,0.3)] -rotate-3 origin-bottom-left" />
      <div className="pointer-events-none absolute -z-10 bottom-3 right-[10px] w-[20%] h-[20%] shadow-[0_15px_10px_rgba(0,0,0,0.25)] rotate-3 origin-bottom-right" />

      <strong className="block mb-2 text-lg text-black/40 font-bold uppercase tracking-wide select-none">
        {dateStr}
      </strong>
      <div className="text-[1.6rem] leading-relaxed font-cursive text-slate-800 break-words">
        {todo.text}
      </div>
    </div>
  );
};

export default Note;
