[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-sip)

# \<xtal-sip\>

Dynamically "water" a custom element tag with the necessary dependency to sprout the tag from an inert seedling to a thing of beauty.

Importing the files needed for web components is about to become a lot more complicated.  Some references will come from bower_components, some from node_modules.  Some will be references to html files, others js files.  And the references are likely to be in a state of flux, as components migrate to npm, and support for HTML Imports wanes.  *.html files may be converted to *.js files, then to *.mjs files, then back to *.mhtml files once the W3C Ents show some HTML love.  That will shortly be followed by converting them to *.wasm, followed by the Universal binary format that includes HTML, JS, CSS, WASM: *.xap.

This component, \<xtal-sip\> is intended to "centralize the pain."  Keep the mappings between custom element tags and where to load the references for them all in one place.

The painful thing about HTMLImports (and ES6 Modules for that matter) is that creating references for each referenced web component inside an HTML or JS file feels like tedius busy work -- for HTML files, one must go towards the top of the page (outside any templates) to add the reference, and typically the reference is just a trite formulaic derivative of the file name itself.  E.g. \<paper-input\> => \<link rel="import" href="../paper-input/paper-input.html"\>, \<paper-checkbox\> => \<link rel="import" href="../paper-checkbox/paper-checkbox.html"\>.   And all these references add to the footprint of the application.

On top of that, leveraging a CDN when deploying [some of the] files to production could also be simplified by managing dependencies centrally.

Another scenario is when raw HTML content containing web components is rendered inside a container that isn't a web-component based framework, like Preact or Vue, or if the markup is generated by a server-side framework like asp.mvc or Java EE MVC, which may use web components to supplement the server-side generated HTML. Creating the references in a different location from the custom element tags can be quite awkward in these scenarios.

The bottom line is that the need for centralizing management of references is likely to increase significantly. 

That's where \<xtal-sip\> fits in.

Whether using HTML Imports, or simple JavaScript references, or ES6 Modules, there's a pretty good principle that we can assume regarding web components:  *For any web component, it will depend on only one top-level reference*.  (One small exception to that rule appears to be with components that depend on icon libraries, like paper-icon-button).  Of course, that reference file itself will likely specify multiple other references recursively following standardized module conventions, which is all fine and good.  \<xtal-sip\> is meant for content-heavy, non reusable web compositions, as opposed to highly reusable web components.  

xtal-sip uses a mapping file to be used to create the look-up between web component tag names and href paths to HTML or JavaScript files.  Because it is meant to serve as a mapping file for all components, regardless of the contextual path of the component itself, it is best not to use relative paths for the hrefs. The format of the mapping file ("web_component_ref.json") is as follows:

```json
{
    "my-specific-tag-name": "/bower_components/my-specific-tag-name.html",
    "paper-{0}": "//myCDN.com/bower_components/paper-{0}/paper-{0}.html",
    "dom-if": "/node_modules/@polymer/lib/elents/dom-if.js",
    "iron-{0}":{
        "path": "//myIoTServerRunningFromMyMicrowaveOven.com/bower_components/iron-{0}/iron-{0}.html",
        "async": true
    },
    "platinum-{0}":{
        "path": "/node_modules/platinimum-{0}/platinum-{0}.js",
        "async": true,
        "useES6Module": true
    }
}
```
Realistically, the combination shown above probably wouldn't work, as paper elements depend on iron elements, and mixing where they come from will likely result in errors, or in many duplicate resources being downloaded from multiple places. 

The default setting is to *not* add the async attribute (or invoke dynamic import).

### List of features:

- [x] Exact matching to mapping file.
- [ ] Pattern matching to mapping file.
- [ ] Support specific settings of how to import (async, etc)
- [ ] Autogenerate .html references.
- [ ] Autogenerate .js script references.
- [ ] Autogenerate .mjs script references.
- [ ] Autogenerate ES6 module script references.
- [ ] Add some sort of TBD mechanism to help with builds / push strategies (suggestions welcome).
  

Custom elements wishing to be activated with the help of the mapping file can advertise themselves by adding the attribute _upgrade-me_ \<my-custom-element upgrade-me/>

When \<xtal-sip/> is instantiated, it searches its neighbors (starting from the parent, and then doing a parent.querySelectorAll('[upgrade-me]')) for any such nodes that need watering.  If it finds some matching nodes, then for each one, it checks if the custom element tag name has already been registered.  If not, it goes through web_component_ref.json file, top to bottom, searching for a matching file path to import. Files ending with .html will be added as HTML Imports, and files ending with .js or .mjs will either add standard script tags, or ES6 module tags, depending on the setting _useES6Module_.

Note that \<xtal-sip> will *not* monitor for DOM Node changes.  The thinking is once the top level references are added, the (typically reusable) components will manage loading their own dependencies following standard import mechanisms.

NB:  This component does not yet have a good story in terms of web component IDE support, nor build tooling.  Use with extreme caution.

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
