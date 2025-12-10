import React from "react";

const InputBar = ({
  value,
  onChange,
  onAdd,
  onToggleEmojiPicker,
  showEmojiPicker,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // 只有非空才提交
      if (value.trim()) {
        onAdd();
      }
    }
  };

  return (
    <div className="relative w-full h-[70px] bg-white/65 backdrop-blur-xl border border-white/80 rounded-full shadow-2xl flex items-center px-3 transition-all duration-300 ease-in-out hover:shadow-3xl focus-within:bg-white/90 focus-within:-translate-y-1 focus-within:scale-[1.02]">
      {/* Emoji Toggle Button */}
      <button
        id="emojiTrigger"
        title="Add Emoji"
        onClick={(e) => {
          e.stopPropagation();
          onToggleEmojiPicker();
        }}
        className={`w-12 h-12 rounded-full shrink-0 border-none bg-transparent text-4xl cursor-pointer transition-all duration-300 ease-out flex items-center justify-center pb-1 ${
          showEmojiPicker
            ? "scale-110 rotate-12 grayscale-0 opacity-100"
            : "grayscale opacity-60 hover:scale-110 hover:rotate-12 hover:grayscale-0 hover:opacity-100"
        }`}
      >
        ☺︎
      </button>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Type something..."
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="grow h-full border-none bg-transparent px-4 font-cursive text-3xl text-gray-800 outline-none placeholder:text-gray-400 placeholder:opacity-60"
      />

      {/* Add Button */}
      <button
        onClick={() => value.trim() && onAdd()}
        className="w-[55px] h-[55px] shrink-0 rounded-full border-none bg-gray-800 text-white text-3xl leading-none cursor-pointer flex items-center justify-center pb-2 pr-1 transition-transform duration-200 hover:scale-110 hover:bg-black active:scale-90"
      >
        +
      </button>
    </div>
  );
};

export default InputBar;
