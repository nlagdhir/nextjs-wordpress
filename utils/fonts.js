export const getTextAlign = (textAlign = "left") => {
  const getTextMap = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };
  return `${getTextMap[textAlign] || ""}`;
};

export const getLevelForHeader = (level) => {
  const getLevelMap = {
    1: "text-6xl",
    2: "text-5xl",
    3: "text-4xl",
    4: "text-3xl",
    5: "text-2xl",
    6: "text-xl",
  };

  return `${getLevelMap[level] || ''}`
};
