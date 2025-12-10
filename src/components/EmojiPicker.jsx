import React from "react";

const EmojiPicker = ({ isVisible, onEmojiSelect }) => {
  const emojiList = [
    "✅",
    "🟩",
    "🔥",
    "⚠️", // 状态/优先级
    "📅",
    "⏰",
    "📌",
    "📝", // 计划/记录
    "💼",
    "💻",
    "📞",
    "💰", // 工作/财务
    "🏠",
    "🛒",
    "🍔",
    "💊", // 家庭/生活
    "📚",
    "💡",
    "🎨",
    "✈️", // 学习/创意/旅行
    "💪",
    "🏃",
    "💤",
    "🎉", // 健康/休闲
  ];

  return (
    <div
      className={`absolute bottom-2.5 left-0 w-[320px] bg-white/90 backdrop-blur-xl p-4 rounded-2xl rounded-bl-sm shadow-[0_15px_35px_rgba(0,0,0,0.15)] grid grid-cols-6 gap-2 origin-bottom-left transition-all duration-500 cubic-bezier(0.68,-0.55,0.265,1.55) ${
        isVisible
          ? "scale-100 opacity-100 pointer-events-auto"
          : "scale-0 opacity-0 pointer-events-none"
      }`}
    >
      {emojiList.map((emoji, index) => (
        <span
          key={index}
          className={`text-3xl cursor-pointer text-center transition-transform duration-200 hover:scale-135 select-none ${
            isVisible ? "animate-staggerPop" : "opacity-0"
          }`}
          style={{
            animationDelay: `${index * 0.02}s`,
            animationFillMode: "forwards",
          }}
          onClick={() => onEmojiSelect(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiPicker;
