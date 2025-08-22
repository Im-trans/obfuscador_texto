const homoglyphMap = {
  'A': 'Α', 'B': 'Β', 'C': 'С', 'E': 'Ε', 'H': 'Н', 'I': 'Ι', 'J': 'Ј', 'K': 'Κ',
  'M': 'Μ', 'N': 'Ν', 'O': 'О', 'P': 'Ρ', 'S': 'Ѕ', 'T': 'Τ', 'X': 'Χ', 'Y': 'Υ',
  'a': 'а', 'c': 'с', 'e': 'е', 'i': 'і', 'j': 'ј', 'o': 'о', 'p': 'р', 's': 'ѕ',
  'x': 'х', 'y': 'у', 'd': 'ԁ', 'q': 'ԛ', 'r': 'г', 'u': 'υ', 'v': 'ѵ', 'w': 'ѡ',
  'm': 'м', 'b': 'Ь', 'f': 'ғ', 'l': 'ӏ', 'z': 'ᴢ', 'g': 'ɡ', 'h': 'һ', 'n': 'п',
  't': 'т',
  '0': '𝟢', '1': '𝟣', '2': '𝟤', '3': '𝟥', '4': '𝟦', '5': '𝟧', '6': '𝟨', '7': '𝟩', '8': '𝟪', '9': '𝟫'
};

function toHomoglyph(text) {
  return text.split('').map(char => homoglyphMap[char] || char).join('');
}

document.getElementById('convert').addEventListener('click', () => {
  const input = document.getElementById('input').value.slice(0, 240);
  document.getElementById('output').value = toHomoglyph(input);
});
