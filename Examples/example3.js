function init(json) {
  var infovis = get('infovis');
  var w = infovis.offsetWidth, h = infovis.offsetHeight;
  infovis.style.width = w + 'px';
  infovis.style.height = h + 'px';

  //init tm
  //You can also do TM.SliceAndDice and TM.Squarified
  var tm = new TM.Strip({
    //Where to inject the treemap.
    rootId: 'infovis',

    titleHeight: 0,
    orientation: "h",
    offset: 0,

    //Add click handlers for
    //zooming the Treemap in and out
    addLeftClickHandler: true,
    addRightClickHandler: true,

    //When hovering a node highlight the nodes
    //between the root node and the hovered node. This
    //is done by adding the 'in-path' CSS class to each node.
    selectPathOnHover: true,

    Color: {
      //Allow coloring
      enable: true,
      //Set min value and max value constraints
      //for the *$color* property value.
      //Default's to -100 and 100.
      minValue: 1,
      maxValue: 50,
      //Set color range. Default's to reddish and greenish.
      //It takes an array of three
      //integers as R, G and B values.
      minColorValue: [0, 255, 50],
      maxColorValue: [255, 0, 50]
    },

    //Allow tips
    Tips: {
      enable: true,
      //add positioning offsets
      offsetX: 20,
      offsetY: 20,
      //implement the onShow method to
      //add content to the tooltip when a node
      //is hovered
      onShow: function (tip, node, isLeaf, domElement) {
        tip.innerHTML = "<div class=\"tip-title\">" + node.name + "</div>" +
          "<div class=\"tip-text\">" + this.makeHTMLFromData(node.data) + "</div>";
      },

      //Build the tooltip inner html by taking each node data property
      makeHTMLFromData: makeHTMLFromData
    },

    //This method is invoked when a DOM element is created.
    //Its useful to set DOM event handlers here or manipulate
    //the DOM Treemap nodes.
    onCreateElement: function (content, tree, isLeaf, leaf) {
      //Add background image
      if (isLeaf) {
        var style = leaf.style,
          width = parseInt(style.width) - 2,
          height = parseInt(style.height) - 2;

        leaf.innerHTML = tree.name +
          "<img src=\"css/gradient.png\" " +
          " style=\"position:absolute;top:0;left:0;width:" +
          width + "px;height:" + height + "px;\" />";

        style.width = width + "px";
        style.height = height + "px";
      }
    },

    //Remove all events for the element before destroying it.
    onDestroyElement: clearLeafAttributes
  });

  //load JSON and plot
  tm.loadJSON(json);
  //end
}
