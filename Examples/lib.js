Log = {
  elem: false,
  write: function(text){
    if (!this.elem)
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};

function addEvent(obj, type, fn) {
  if (obj.addEventListener) obj.addEventListener(type, fn, false);
  else obj.attachEvent('on' + type, fn);
};

function clearLeafAttributes(content, tree, isLeaf, leaf) {
  if (leaf.clearAttributes) {
    leaf.clearAttributes();
  }
}
function get(id) {
  return document.getElementById(id);
}

//Build the tooltip inner html by taking each node data property
function makeHTMLFromData(data) {
  var html = '';
  html += "playcount" + ': ' + data.$area + '<br />';
  if ("$color" in data) {
    html += "rank" + ': ' + data.$color + '<br />';
  }
  if ("image" in data) {
    html += "<img class=\"album\" src=\"" + data.image + "\" />";
  }
  return html;
}
