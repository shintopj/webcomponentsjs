/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';

/*
 * Polyfills loaded: HTML Imports, Custom Elements, Shady DOM/Shady CSS, platform polyfills, template
 * Used in: webcomponents bundle to load ALL the things
 */

import './webcomponents-sd-ce-pf-index.js';

const customElements = window.customElements;
const Template = window.HTMLTemplateElement;

if (customElements['polyfillWrapFlushCallback'] && Template.bootstrap) {
  let shouldFlush = false;
  /** @type {?function()} */
  let flusher = null;
  customElements['polyfillWrapFlushCallback']((flush) => {
    flusher = flush;
    if (shouldFlush) {
      flush();
    }
  });
  window.addEventListener('DOMContentLoaded', () => {
    flusher && flusher();
    shouldFlush = true;
  });
}

function finish() {
  requestAnimationFrame(() => {
    window.WebComponents.ready = true;
    document.dispatchEvent(new CustomEvent('WebComponentsReady', { bubbles: true }));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('readystatechange', finish, { once: true });
} else {
  finish();
}