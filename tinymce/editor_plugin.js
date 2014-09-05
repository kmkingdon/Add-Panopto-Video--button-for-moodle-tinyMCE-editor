(function() {
        // Load plugin specific language pack
        tinymce.PluginManager.requireLangPack('panoptobutton');

        tinymce.create('tinymce.plugins.AddPanoptoButton', {
                /**
                 * Initializes the plugin, this will be executed after the plugin has been created.
                 * This call is done before the editor instance has finished it's initialization so use the onInit event
                 * of the editor instance to intercept that event.
                 *
                 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
                 * @param {string} url Absolute URL to where the plugin is located.
                 */
                init : function(ed, url) {
                	
                		var PanoptoServername = "http://demo.hosted.panopto.com";
                		
                		
                        // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
                        ed.addCommand('mcePanopto', function() {
                        		
                                ed.windowManager.open({
                                    file: ed.getParam("moodle_plugin_base") + 'panoptobutton/tinymce/panoptowrapper.html',
                                        width : 800,
                                        height : 600,
                                        inline : 1
                                }, {
                                        plugin_url : url, // Plugin absolute URL
                                        filepath: ed.getParam("moodle_plugin_base") // Custom argument
                                });
                        });

                        // Register example button
                        ed.addButton('panoptobutton', {
                                title : 'Add Panopto Video',
                                cmd : 'mcePanopto',
                                image : url + '/img/panopto_logo_globe.gif'
                        });

                        // Add a node change handler, selects the button in the UI when a image is selected
                        ed.onNodeChange.add(function(ed, cm, n) {
                                cm.setActive('panoptobutton', n.nodeName == 'IMG');
                        });
                },

                /**
                 * Creates control instances based in the incomming name. This method is normally not
                 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
                 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
                 * method can be used to create those.
                 *
                 * @param {String} n Name of the control to create.
                 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
                 * @return {tinymce.ui.Control} New control instance or null if no control was created.
                 */
                createControl : function(n, cm) {
                        return null;
                },

                /**
                 * Returns information about the plugin as a name/value array.
                 * The current keys are longname, author, authorurl, infourl and version.
                 *
                 * @return {Object} Name/value array containing information about the plugin.
                 */
                getInfo : function() {
                        return {
                                longname : 'Add Panopto Video Content to TinyMCE',
                                author : 'Peter Lancaster',                               
                                version : "1.0"
                        };
                }
        });

        // Register plugin
        tinymce.PluginManager.add('panoptobutton', tinymce.plugins.AddPanoptoButton);
})();