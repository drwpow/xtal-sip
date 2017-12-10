[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-sip)

# \<xtal-sip\>

<a href="https://www.webcomponents.org/element/bahrus/xtal-sip/demo/index.html">Demo</a>

Dynamically "water" a custom element tag with the necessary dependency to sprout the tag from an inert seedling to a thing of beauty.  Dependency free.

Importing the files needed for web components is about to become a lot more complicated.  Some references will come from bower_components, some from node_modules.  Some will be references to html files, others js files.  And the references are likely to be in a state of flux, as the [whims of elite developers](https://codeburst.io/the-javascript-modules-limbo-585eedbb182e) change.  Components will first migrate to npm, as support for HTML Imports wanes.  *.html files may be converted to *.js files, then to *.mjs files, then back to *.mhtml files, once the W3C Ents show some HTML love.  That will shortly be followed by converting them to *.wasm, followed by the Universal binary format that includes HTML, JS, CSS, WASM: *.xap.

This component, \<xtal-sip\> is intended to "centralize the pain."  Keep the mappings between custom element tags and where to load the references for them all in one place.

The painful thing about HTMLImports (and ES6 Modules for that matter) is that creating references for each referenced web component inside an HTML or JS file feels like tedius busy work -- for HTML files, one must go towards the top of the page (outside any templates) to add the reference, and typically the reference is just a trite formulaic derivative of the file name itself.  E.g. \<paper-input\> => \<link rel="import" href="../paper-input/paper-input.html"\>, \<paper-checkbox\> => \<link rel="import" href="../paper-checkbox/paper-checkbox.html"\>.   And all these references add to the footprint of the application.

On top of that, leveraging a CDN when deploying [some of the] files to production could also be simplified by managing dependencies centrally.  Or maybe some components should only be activated in debug mode on the developer's workstation, but not deployed to production.

Another scenario is when raw HTML content containing web components is rendered inside a code-centric framework, like (P)react.  Not having a good solution to this scenario is causing many to "throw in the towel," pushing web components that might be 99% static markup, 1% JavaScript, to have to be entirely coded in JavaScript. Sad!  

Or what if the markup is generated by a server-side framework like asp.mvc or Java EE MVC, which may use web components to supplement the server-side generated HTML?  Although we are not supposed to use it to ["compare the performance of one PWA to another"](https://hnpwa.com/), one can't help noticing that the fastest performing implementation is the one that uses [no JavaScript, other than the service worker](https://github.com/davideast/hnpwa-firebase). Clearly, this is an architecture we can't dismiss.  But creating the web component references in a different location from the custom element tags can be quite awkward in these scenarios.   

The bottom line is that the need for centralizing management of references is likely to increase significantly. 

That's where \<xtal-sip\> fits in.

Whether using HTML Imports, or simple JavaScript references, or ES6 Modules, there's a pretty good principle that we can assume regarding web components:  *Each web component will depend on only one top-level reference*.  (One small exception to that rule, at least in spirit, appears to be with components that depend on icon libraries, like paper-icon-button).  Of course, that reference file itself will likely specify multiple other references recursively, following standardized module conventions, which is all fine and good.  \<xtal-sip\> is meant for content-heavy, non reusable web compositions, as opposed to highly reusable web components. 

xtal-sip builds on the one crumb the W3C has thrown [our way thus far](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content):  

```html
<link rel="preload" href="..."> 
```

For performance reasons, it is useful to use these to proload all these references ahead of time.  Might as well build on this support to provide the mappings we need:

So what does xtal-sip add to the \<link rel="preload"\> functionality?

## Auto triggering based on tag name

```html
<link rel="preload" type="text/html" as="scripts" href="//myCDN.com/@bower_components/paper-checkbox/paper-checkbox.html" data-tag="paper-checkbox">
```

When \<xtal-sip\> encounters a \<paper-checkbox\> tag (how it encounters it will be discussed later), it will search for link preload tags with tag "data-tag-paper-checkbox", and it will formally load the reference.  If as is document and type is text/html, it will use HTMLImport.  If as="script" it will use class script referencing, unless data-type="module" (TBD:  can type="module"?)

## Compact dependency preloading

It was mentioned that listing all the elements with the same prefix can be boring and add to the footprint.

```html
<link rel="preload-ish"  as="script" href="//myCDN.com/@bower_components/paper-{1}/paper-{1}.html" data-tags="paper-checkbox,paper-input,paper-button">
>
```

The tag name is split using the dash "-" delimiter.  {1} refers to the split array, index = 1.

xtal-sip will "autoexapand" this, and create multiple preload tags in the header where each file is listed explictly

Even more aggressive:

```html
<link rel-ish="preload" type="text/html" as="script" href="//myIoTServerRunningFromMyMicrowaveOven.com/npm/{0}-{1}/{0}-{1}.html" data-tags="paper-checkbox,paper-input,paper-button,iron-input">
>
```

## Script references

```html
<link rel="preload" as="script" type="module" href="node_modules/platinimum-{1}/platinum-{1}.js" platinum-sw
>
```

## ES5 alternative references

## Bundling

## Async

The default setting is to *not* add the async attribute (or invoke dynamic import).

### List of features:

- [x] Exact matching to mapping file.
- [ ] Pattern matching to mapping file.
- [ ] Remove "upgrade-me" once upgraded, so styling changes can take place
- [ ] For non async, specify whether to add a setTimeout before adding import tag (defaults to true)
- [ ] Support specific settings of how to import (async, etc)
- [x] Autogenerate .html references.
- [ ] Autogenerate .js script references.
- [ ] Autogenerate .mjs script references.
- [ ] Autogenerate ES6 module script references.
- [ ] Add some sort of TBD mechanism to help with builds / push strategies (suggestions welcome).
  


When \<xtal-sip/> is instantiated, it searches its neighbors (starting from the parent for any such nodes that need "watering".  If it finds some matching nodes, then for each one, it checks if the custom element tag name has already been registered.  

Note that \<xtal-sip> will *not* monitor for DOM Node changes.  The thinking is once the top level references are added, the (typically reusable) components will manage loading their own dependencies following standard import mechanisms.

NB:  

This component does not yet have a good story in terms of web component IDE support, nor build tooling.  Use with extreme caution.



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
