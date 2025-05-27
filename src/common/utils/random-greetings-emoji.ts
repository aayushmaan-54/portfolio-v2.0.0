export default function randomGreetingsEmoji() {
  const emojis = [
    "✌️",
    "🫰",
    "🤘",
    "👍",
    "👋",
    "🤟",
    "🫶",
    "👐",
    "🙌",
    "👏",
  ];

  return emojis[Math.floor(Math.random() * emojis.length)];
}
