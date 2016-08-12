function init(json) {
  var infovis = get('infovis');
  var w = infovis.offsetWidth, h = infovis.offsetHeight;
  infovis.style.width = w + 'px';
  infovis.style.height = h + 'px';

  //init tm
  var tm = new TM.Squarified({
    //Where to inject the treemap.
    rootId: 'infovis',
    //Set the max. depth to be shown for a subtree
    levelsToShow: 1,

    //Add click handlers for
    //zooming the Treemap in and out
    addLeftClickHandler: true,
    addRightClickHandler: true,

    //When hovering a node highlight the nodes
    //between the root node and the hovered node. This
    //is done by adding the 'in-path' CSS class to each node.
    selectPathOnHover: true,

    //Allow tips
    Tips: {
      allow: true,
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

    //Implement this method for retrieving a requested
    //subtree that has as root a node with id = nodeId,
    //and level as depth. This method could also make a server-side
    //call for the requested subtree. When completed, the onComplete
    //callback method should be called.
    request: function (nodeId, level, onComplete) {
      var tree = eval('(' + JSON.stringify(json) + ')');
      var subtree = TM.Util.getSubtree(tree, nodeId);
      TM.Util.prune(subtree, 1);
      onComplete.onComplete(nodeId, subtree);
    },

    //Remove all events for the element before destroying it.
    onDestroyElement: clearLeafAttributes
  });

  //load JSON and plot
  var pjson = eval('(' + JSON.stringify(json) + ')');
  TM.Util.prune(pjson, 1);
  tm.loadJSON(pjson);
  //end
}
