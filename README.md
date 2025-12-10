# 📝 CrumpList - The Satisfying Todo App

> Don't just check it, **crush it**.
> 别只是打钩，**粉碎它**。

**CrumpList** is a creative productivity tool that turns your boring todo list into a stress-relief game. Instead of simply checking off tasks, you get to physically "crush" them into a paper ball and throw them away with satisfying animations and sound effects.

**CrumpList** 是一个极具创意的效率工具，它将枯燥的待办清单变成了一场解压游戏。你不再只是简单地勾选任务，而是可以将它们像废纸一样“揉碎”，伴随着爽快的动画和音效扔进垃圾桶。

---

## ✨ Features (功能特性)

- **💥 Stress-Relief Interaction (解压交互)**

  - Double-click a note to crush it!
  - Includes sound effects, paper-crumpling animations, and celebratory fireworks (`canvas-confetti`).
  - 双击便签即可粉碎！包含音效、揉纸动画以及庆祝烟花特效。

- **🖱️ Drag & Drop (自由拖拽)**

  - Organize your messy desk by dragging notes anywhere.
  - Random rotation and positioning for a natural, realistic feel.
  - 自由拖拽整理你的“桌面”，便签生成时带有随机旋转角度和位置，拟真感十足。

- **🎨 Handwritten Aesthetic (手写风格)**

  - Powered by Google Fonts "Caveat" for that authentic sticky note look.
  - Tailwind CSS styling with Glassmorphism input bar.
  - 采用 Caveat 字体模拟手写质感，配合毛玻璃风格的输入栏。

- **💾 Auto-Save (自动保存)**

  - All tasks and positions are persisted to `LocalStorage`.
  - 所有任务内容及其位置都会自动保存到本地存储，刷新页面不丢失。

- **🛠️ Productivity Emojis (效率表情包)**
  - Curated emoji picker specifically for to-do contexts (📅, ✅, 🔥, etc.).
  - 专为待办事项精选的 Emoji 列表，拒绝无效社交表情。

---

## 🔗 在线演示 (Live Demo)

**[👉 点击这里查看在线演示](https://kogorou0105-bit.github.io/CrumpList/)**

---

## 🛠️ Tech Stack (技术栈)

- **Core:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animation:** CSS Keyframes & `canvas-confetti`
- **Font:** Google Fonts (Caveat)

---

## 🚀 Getting Started (如何运行)

1. **Clone the repository (克隆项目)**

   ```bash
   git clone https://github.com/kogorou0105-bit/CrumpList
   cd crumplist
   ```

2. **Install dependencies (安装依赖)**

   ```bash
   npm install
   ```

3. **Run locally (本地运行)**

   ```bash
   npm run dev
   ```

4. **Build for production (打包部署)**

   ```bash
   npm run build
   ```

---

## 📂 Project Structure (项目结构)

```text
src/
├── components/
│   ├── Note.jsx        # Sticky note component (Drag & Crush logic) / 便签组件
│   ├── InputBar.jsx    # Glassmorphism input area / 底部输入栏
│   └── EmojiPicker.jsx # Custom emoji selector / 表情选择器
├── utils/
│   └── storage.js      # LocalStorage helper / 本地存储工具
├── App.jsx             # Main logic & State management / 主逻辑
└── index.css           # Global styles & Tailwind imports / 全局样式
public/
└── crush.mp3           # Sound effect file / 粉碎音效文件
```
