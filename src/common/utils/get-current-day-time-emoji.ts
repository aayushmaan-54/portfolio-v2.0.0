export default function getCurrentDayTimeEmoji(timezone = 'Asia/Kolkata') {
  const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      hour12: false
  });

  const hour = parseInt(formatter.format(new Date()));

  if (hour >= 5 && hour < 12) {
      return {
          period: "Morning",
          emoji: "🌅",
          message: "शुभ प्रभात",
          hour: hour
      };
  } else if (hour >= 12 && hour < 16) {
      return {
          period: "Afternoon",
          emoji: "☀️",
          message: "शुभ दोपहर",
          hour: hour
      };
  } else if (hour >= 16 && hour < 19) {
      return {
          period: "Evening",
          emoji: "🌆",
          message: "शुभ संध्या",
          hour: hour
      };
  } else {
      return {
          period: "Night",
          emoji: "🌑",
          message: "शुभ रात्रि",
          hour: hour
      };
  }
}
