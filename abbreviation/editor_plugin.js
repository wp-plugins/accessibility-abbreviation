(function() {
	tinymce.create('tinymce.plugins.AccAbbrPlugin', {
		init : function(ed, url) {
			ed.addCommand('mceAbbr', function() {
				ed.windowManager.open({
					file : url + '/abbr.htm',
					width : 350,
					height : 200,
					inline : 1
				}, {
					plugin_url : url
				});
			});
			
			ed.addButton('abbr', {
				title : 'accessibility-abbreviation.button',
				cmd : 'mceAbbr',
				image : url + '/img/icon_abbr.png'});

			ed.onNodeChange.add(function(ed, cm, n, co) {
				n = ed.dom.getParent(n, 'SPAN');

				cm.setDisabled('span', co);
				cm.setDisabled('attribs', n && n.nodeName == 'BODY');
				cm.setActive('span', 0);

				if (n) {
					do {
						cm.setDisabled(n.nodeName.toLowerCase(), 0);
						cm.setActive(n.nodeName.toLowerCase(), 1);
					} while (n = n.parentNode);
				}
			});

			ed.onPreInit.add(function() {
				ed.dom.create('span');
			});
		},

		getInfo : function() {
			return {
				longname : 'Accessibility Abbreviation',
				author : 'Hailstorm',
				authorurl : 'http://hailstorm.nl',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	tinymce.PluginManager.add('accabbr', tinymce.plugins.AccAbbrPlugin);
})();