# adapt-googleanalytics


This is not an official Google product.

This is a simple Adapt extension that implements Google Analytics upon post render of pageView, which is triggered when a page's view has rendered.  Be sure to include the Analytics library and Autotrack in core > js > scriptLoader.js.

Example:

scripLoader.js:

function setupRequireJS() {
  requirejs.config({
    map: {
...
    },
    paths: {
...
  analytics: 'https://www.google-analytics.com/analytics',
  autotrack: 'libraries/autotrack'
}


Use Autotrack semantics in component-level .hbs files for tracking events such as mouseover and clicks.

Example:

`<div class="graphic-inner component-inner" role="region" aria-label="{{_globals._components._graphic.ariaRegion}}" ga-on="mouseover"
ga-event-category="Graphic Component"
ga-event-action="Mouseover"
ga-event-label="{{displayTitle}}">`


Video tracking is already available through the MediaElement library. Add "universalgoogleanalytics" to "features" for a given media component. Example:

"features": [
...
  "universalgoogleanalytics"
  ]
