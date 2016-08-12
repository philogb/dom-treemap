DOMTreeMap
=========

DOMTreeMap is a robust, library agnostic, HTML/CSS/JavaScript TreeMap visualization library.

![A Cushion Strip TreeMap example](http://blog.thejit.org/assets/static/img/cushion.png)

Description
---------

DOMTreeMap implements multiple TreeMap tiling algorithms: Strip, Squarified and SliceAndDice.
The library also provides built-in support for Colored nodes and HTML Tooltips.

DOMTreeMap is extensible in many ways. Since DOMTreeMap nodes are HTML elements they're very easy
to customize with CSS and add behavior with JavaScript.

If you want to know more about how to use this library please take a look at the examples.
The same TreeMap implementation can be found [here](http://thejit.org/demos).

Status
---------

No formal releases (since I have to tweak the documentation a little bit). The library is fully functional though, as can be seen in the Examples.

Download
---------

Clone the repo from GitHub
 
    $ git clone git://github.com/philogb/dom-treemap.git

And play with the examples!    


Example
---------

Here's an instanciation example (taken from example1.js).

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
          onShow: function(tip, node, isLeaf, domElement) {
              tip.innerHTML = "<div class=\"tip-title\">" + node.name + "</div>" + 
                "<div class=\"tip-text\">" + this.makeHTMLFromData(node.data) + "</div>"; 
          },  

          //Build the tooltip inner html by taking each node data property
          makeHTMLFromData: function(data){
              var html = '';
              html += "playcount" + ': ' + data.$area + '<br />';
              if ("$color" in data) 
                  html += "rank" + ': ' + data.$color + '<br />';
              if ("image" in data) 
                  html += "<img class=\"album\" src=\"" + data.image + "\" />";
              return html;
          }
        },

        //Remove all element events before destroying it.
        onDestroyElement: function(content, tree, isLeaf, leaf){
            if(leaf.clearAttributes) leaf.clearAttributes();
        }
    });
    
    //load JSON and plot
    tm.loadJSON(json);    


License
---------

BSD License.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
         * Redistributions of source code must retain the above copyright
           notice, this list of conditions and the following disclaimer.
         * Redistributions in binary form must reproduce the above copyright
           notice, this list of conditions and the following disclaimer in the
           documentation and/or other materials provided with the distribution.
         * Neither the name of the organization nor the
           names of its contributors may be used to endorse or promote products
           derived from this software without specific prior written permission.
    
     THIS SOFTWARE IS PROVIDED BY Nicolas Garcia Belmonte ``AS IS'' AND ANY
     EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
     WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
     DISCLAIMED. IN NO EVENT SHALL Nicolas Garcia Belmonte BE LIABLE FOR ANY
     DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
     LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
     ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
