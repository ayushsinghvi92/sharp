app.factory('graphFactory', function ($localStorage) {
	$localStorage.graphs = $localStorage.graphs || [];
	let graphs = $localStorage.graphs;

	return {
		addGraph : function (obj) {
			if(!nv.models[obj.graph]) return false;
			obj.graphNumber = graphs.length + 1;
			graphs.push(obj)
			return graphs;
		},
		getGraphs : function () {
			let self = this
			return graphs.map(function (e) {
				e.code = self.makeGraph.toString();
				return e;
			})
		},
		makeGraph : function (requirements) {


			var width = requirements.width,
	        height = requirements.height;
			
			nv.addGraph({
		        generate: function() {
		            var chart = nv.models[requirements.graph]()
		                .width(requirements.width)
		                .height(requirements.height)
		                .x(function (d,i) {return i})
		                .y(function (d) {return d[requirements.value]})
		                
		            chart.tooltip["contentGenerator"]( function (d) {

		                	let str = "<h4>" + requirements.value + ": " + d.point[requirements.value] + '</h4>';
		                	requirements.tooltip.forEach(function (e) {
		                		str+="<h4>" + e + ": " + d.point[e] + '</h4>'
		                	})	
		                	return str;
		                })
		            let data = requirements.data;

		            let values1 = data.map(function(e, i) {
		                return { x: i, y: e[requirements.value] * 100}
		            })
		            chart.dispatch.on('renderEnd', function() {
		                console.log('render complete');
		            });
		            d3.select('#test' + requirements.graphNumber)
						.style({'width': width, 'height' : height})
		                .datum([{
		                    values: data,
		                    key: requirements.value,
		                    color: requirements.color
		                }])
		                .call(chart);

		            return chart;
		        },
		        callback: function(graph) {
		            window.onresize = function() {
		                var width = requirements.width,
		                    height = requirements.height,
		                    margin = graph.margin();

		                if (width < margin.left + margin.right + 20)
		                    width = margin.left + margin.right + 20;

		                if (height < margin.top + margin.bottom + 20)
		                    height = margin.top + margin.bottom + 20;

		                graph.width(width).height(height);

		                d3.select('#test'+requirements.graphNumber)
		                    .style({'width': width, 'height' : height})
		                    .call(graph);
		            };
		        }
	    	});

		},

		makeGraphs : function () {
			graphs.forEach(this.makeGraph)
		}
	}
});