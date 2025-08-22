chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convert-homoglyph",
    title: "Converter para Homógrafos",
    contexts: ["editable"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convert-homoglyph") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: convertSelectedTextToHomoglyph
    });
  }
});

// Função injetada na página para converter o texto selecionado
function convertSelectedTextToHomoglyph() {
  const homoglyphMap = {
    'A': 'Α', 'B': 'Β', 'C': 'С', 'E': 'Ε', 'H': 'Н', 'I': 'Ι', 'J': 'Ј', 'K': 'Κ',
    'M': 'Μ', 'N': 'Ν', 'O': 'О', 'P': 'Ρ', 'S': 'Ѕ', 'T': 'Τ', 'X': 'Χ', 'Y': 'Υ',
    'a': 'а', 'c': 'с', 'e': 'е', 'i': 'і', 'j': 'ј', 'o': 'о', 'p': 'р', 's': 'ѕ',
    'x': 'х', 'y': 'у', 'd': 'ԁ', 'q': 'ԛ', 'r': 'г', 'u': 'υ', 'v': 'ѵ', 'w': 'ѡ',
    'm': 'м', 'b': 'Ь', 'f': 'ғ', 'l': 'ӏ', 'z': 'ᴢ', 'g': 'ɡ', 'h': 'һ', 'n': 'п',
    't': 'т',
    '0': '𝟢', '1': '𝟣', '2': '𝟤', '3': '𝟣', '4': '𝟦', '5': '𝟧', '6': '𝟨', '7': '𝟩', '8': '𝟪', '9': '𝟫'
  };

  function toHomoglyph(text) {
    return text.split('').map(char => homoglyphMap[char] || char).join('');
  }

  const active = document.activeElement;
  if (
    active &&
    (
      active.tagName === "TEXTAREA" ||
      (active.tagName === "INPUT" && active.type === "text")
    )
  ) {
    // Substituição em textarea/input
    const start = active.selectionStart;
    const end = active.selectionEnd;
    if (start !== end) {
      const original = active.value;
      const selected = original.substring(start, end);
      const converted = toHomoglyph(selected);
      active.value = original.substring(0, start) + converted + original.substring(end);
      active.selectionStart = start;
      active.selectionEnd = start + converted.length;
    }
   // TODO: Depurar pois isso está instável... as vezes funciona as vezes não! Javascript maldito
  } else if (active && active.isContentEditable) {
    // Substituição em contenteditable (ex: X, Facebook, redes sociais, etc)
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = selection.toString();
      if (selectedText.length > 0) {
        const converted = toHomoglyph(selectedText);
        range.deleteContents();
        range.insertNode(document.createTextNode(converted));
      }
    }
  }
}
