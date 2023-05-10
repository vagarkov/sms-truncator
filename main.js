/**
 * @param {string} text
 * @returns {(string|Array)}. 
 */
function textToSms(text) {
  if (!text || text.replace(/\s/g, "").length === 0) {
    return [""];
  } else if (text && text.trim().length <= 140) {
      return [text.trim()];
  } else {
    const messageLength = 140;
    const totalMessagesNumber = Math.ceil(text.trim().length/messageLength);

    return messagesComposer(text.trim(), messageLength, totalMessagesNumber);
  }
};

/**
 * @param {string} trimmed text
 * @param {number} message size
 * @param {number} total number of messages
 * @returns {(string|Array)}. 
 */
function messagesComposer(trimmedText, messageLength, totalMessagesNumber) {
  let result = [];
  const counterLength = 4; // ' k/n'
  let textRest = trimmedText;
  for (let i = 1; i <= totalMessagesNumber; i++) {
    let message = truncator(textRest, messageLength);
    result.push(message+' '+i+'/'+totalMessagesNumber);
    textRest = textRest.slice(messageLength-counterLength).trim();
  }

  return result;
}

/**
 * @param {string} trimmed text
 * @param {number} message size
 * @returns {string} sliced string by word
 */
function truncator(text, messageLength ){
  if (text.length <= messageLength) {
    return text;
  }

  const counterLength = 4
  const subString = text.slice(0, messageLength-counterLength);

  return subString.slice(0, subString.lastIndexOf(" "));
};

textToSms('Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut suscipit velit efficitur eget Sed sit amet posuere risus');
