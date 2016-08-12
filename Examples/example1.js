function init(json) {
  var infovis = get('infovis');
  var w = infovis.offsetWidth, h = infovis.offsetHeight;
  infovis.style.width = w + 'px';
  infovis.style.height = h + 'px';

  //init tm
  var tm = new TM.Squarified({
    //Where to inject the treemap.
    rootId: 'infovis',

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

    //Remove all element events before destroying it.
    onDestroyElement: clearLeafAttributes
  });

  //load JSON and plot
  tm.loadJSON(json);
  //end
}
