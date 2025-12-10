import React, { useState, useEffect, useRef } from "react";
import Note from "@/components/Note";
import InputBar from "@/components/InputBar";
import EmojiPicker from "@/components/EmojiPicker";
import { loadTodos, saveTodos } from "@/utils/storage";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = loadTodos();
    if (savedTodos.length === 0) {
      // 如果没有数据，初始化一个默认的 Todo
      // 这里我们需要手动构建这个对象，因为 addNewTodo 还没定义
      const colors = ["#fef08a", "#bfdbfe", "#fbcfe8", "#bbf7d0"];
      return [
        {
          id: Date.now(),
          text: "Welcome back! 🎉",
          x: Math.random() * (window.innerWidth - 260) + 20,
          y: Math.random() * (window.innerHeight - 260) + 50,
          r: Math.random() * 6 - 3,
          bg: colors[Math.floor(Math.random() * colors.length)],
        },
      ];
    }
    return savedTodos;
  });
  const [inputValue, setInputValue] = useState(""); // 状态提升：输入框的值由 App 管理
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  // 辅助函数：创建新 Todo 对象
  const createNewTodo = (text, isInit = false) => {
    // 如果是初始化且已有数据，返回空数组（防御性编程）
    const colors = [
      "#fef08a", // Yellow
      "#bfdbfe", // Blue
      "#fbcfe8", // Pink
      "#bbf7d0", // Green
    ];

    // 如果是单个对象返回对象，如果是列表更新则返回数组，这里为了复用逻辑稍微做一下适配
    const newTodo = {
      id: Date.now(),
      text,
      // 随机位置逻辑
      x: Math.random() * (window.innerWidth - 240) + 20,
      y: Math.random() * (window.innerHeight - 240) + 50,
      r: Math.random() * 6 - 3,
      bg: colors[Math.floor(Math.random() * colors.length)],
    };

    return isInit ? [newTodo] : newTodo;
  };

  const handleAddTodo = (text) => {
    const newTodo = createNewTodo(text);
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setInputValue(""); // 清空输入框
  };

  const updateTodoPosition = (id, x, y) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, x, y } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  // 处理 Emoji 选择：直接更新 state，而不是操作 DOM
  const handleEmojiSelect = (emoji) => {
    setInputValue((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  // 点击外部关闭 Emoji 选择器
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        event.target.id !== "emojiTrigger"
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-desk relative overflow-hidden text-slate-800">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-black/30 font-bold text-xl uppercase tracking-widest pointer-events-none select-none z-0">
        Drag to Sort • Double Click to Crush
      </div>

      {/* 桌面区域 */}
      <div className="relative w-full h-full">
        {todos.map((todo) => (
          <Note
            key={todo.id}
            todo={todo}
            onPositionUpdate={updateTodoPosition}
            onRemove={removeTodo}
          />
        ))}
      </div>

      {/* 底部输入栏 */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-[600px] px-4 z-50 flex flex-col items-center">
        <div ref={emojiPickerRef} className="w-full relative">
          <EmojiPicker
            isVisible={showEmojiPicker}
            onEmojiSelect={handleEmojiSelect}
          />
        </div>

        <InputBar
          value={inputValue}
          onChange={setInputValue}
          onAdd={() => handleAddTodo(inputValue)}
          onToggleEmojiPicker={() => setShowEmojiPicker(!showEmojiPicker)}
          showEmojiPicker={showEmojiPicker}
        />
      </div>
    </div>
  );
}

export default App;
