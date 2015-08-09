# Reactive Programming with Highland Streams!

A little example of how to use the HighlandJS library to manage asyncronous control flows. Highland allows you to treat EventEmitters, NodeJS Streams, DOM events, Arrays, and Collections all in a single uniform way.

## Further reading:
  - [academic paper where the idea originated](https://hal.archives-ouvertes.fr/file/index/docid/75494/filename/RR-1065.pdf)
  - [video explaining the basic idea in the context JavaScript](https://vimeo.com/131196784)
  - [HighlandJS docs](http://highlandjs.org/)
  - [RxJS, an alternative library not used in this example as it is more targeted to client-side JS, less towards Node](https://github.com/Reactive-Extensions/RxJS)

## Example

Imagine you have a DOM `keyup` handler. Each time a `keyup` is fired is like a new item in an array-like collection of events. Now what if you could do things like `map`, `filter`, and `reduce` that theoretical collection?

```javascript
  // get a frequent event source
  var text = _('keyup', $('#searchbox'));

  // Regulate event stream:
  // - wait until no keyup events for 1s
  // - when read from, only return the latest value
  var searches = text.debounce(1000).latest();

  // map the search events to an AJAX request
  var results = searches.map(searchRequest);

  // for each response, display it
  results.each(function (result) {
      // display result
  });
```