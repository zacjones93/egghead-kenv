// Shortcut: opt+shift+c
let { titleCase, sentenceCase, paramCase, camelCase } = await npm("text-case");

let text = await getSelectedText();

let options = {
  "Title Case": titleCase,
  "Sentence case": sentenceCase,
  "param-case": paramCase,
  camelCase: camelCase,
};

let option = await arg(
  "What case do you want to convert to?",
  Object.keys(options)
);

let formattedText = options[option](text);

await setSelectedText(formattedText);
