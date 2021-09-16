//Is it truthy?
expressions = [
  2 + 2 === 4, // yes
  2 + 2 === "4", // no
  2 + 2 == "4", // yes
  Number("4"), // yes
  Number("0"), // no
  NaN, // no
  NaN != NaN, // yes
  Infinity == Infinity, // yes
  1 / 0 == 2 / 0, // yes
  2 * null, // no
  2 + null, // yes
  7, // yes
  null || 7, // yes
  "4", // yes
  "", // no
];

for (let i = 0; i < expressions.length; i++) {
  if (expressions[i]) {
    console.log(i + 1 + ". yes");
  } else {
    console.log(i + 1 + ". no");
  }
}
