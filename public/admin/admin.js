/* REPC-Nepal admin helpers (loaded after Decap CMS):
   1. a clear "review and confirm" popup before anything is published, listing what was
      added / edited / deleted (deleting needs an extra tick-box)
   2. a "?" help button with a short guide
   3. a "published" message after saving
   Everything is wrapped so a bug in this file can never stop the admin panel from working. */
(function () {
  'use strict';

  var SITE_URL = 'https://repcnepal.org.np';

  // ───────── small helpers ─────────
  function toPlain(value) {
    return value && typeof value.toJS === 'function' ? value.toJS() : value;
  }
  function getKey(obj, key) {
    if (!obj) return undefined;
    return typeof obj.get === 'function' ? obj.get(key) : obj[key];
  }
  function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  function isObject(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
  function isEmpty(v) { return v === undefined || v === null || v === ''; }
  function prettify(key) {
    return String(key).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, function (c) { return c.toUpperCase(); });
  }
  function itemTitle(item) {
    if (!isObject(item)) return String(item);
    return item.titleEn || item.nameEn || item.altEn || item.categoryEn || item.en ||
      item.source || item.src || item.url || 'item';
  }
  // Number of equal non-empty fields (tells an edit apart from a delete + add).
  function similarity(a, b) {
    var n = 0;
    Object.keys(a || {}).forEach(function (k) {
      if (!isEmpty(a[k]) && same(a[k], (b || {})[k])) n++;
    });
    return n;
  }

  // ───────── compare two versions of a list ─────────
  function diffList(before, after) {
    var removed = before.slice();
    var added = [];
    after.forEach(function (item) {
      var i = removed.findIndex(function (r) { return same(r, item); });
      if (i >= 0) removed.splice(i, 1); else added.push(item);
    });
    var edited = 0;
    var deleted = [];
    removed.forEach(function (r) {
      var best = -1, bestScore = 0;
      added.forEach(function (a, idx) {
        var s = similarity(r, a);
        if (s > bestScore) { bestScore = s; best = idx; }
      });
      if (best >= 0) { added.splice(best, 1); edited++; } else deleted.push(itemTitle(r));
    });
    var unchanged = removed.length === 0 && added.length === 0 && edited === 0;
    return { added: added.length, edited: edited, deleted: deleted, reordered: unchanged && !same(before, after) };
  }

  // ───────── walk both versions and collect a readable summary ─────────
  function addField(out, path) {
    var parent = path.slice(0, -1).map(prettify).join(' › ') || 'General';
    var found = out.fields.filter(function (f) { return f.label === parent; })[0];
    if (!found) { found = { label: parent, names: [] }; out.fields.push(found); }
    found.names.push(prettify(path[path.length - 1]));
  }
  function collect(before, after, path, out) {
    if (Array.isArray(before) && Array.isArray(after)) {
      if (before.concat(after).some(isObject)) {
        var d = diffList(before, after);
        if (d.added || d.edited || d.deleted.length || d.reordered) {
          out.sections.push({ label: path.map(prettify).join(' › '), list: d });
        }
      } else if (!same(before, after)) {
        addField(out, path);
      }
      return;
    }
    if (isObject(before) && isObject(after)) {
      Object.keys(before).concat(Object.keys(after))
        .filter(function (k, i, all) { return all.indexOf(k) === i; })
        .forEach(function (k) { collect(before[k], after[k], path.concat(k), out); });
      return;
    }
    if (!same(before, after) && !(isEmpty(before) && isEmpty(after))) addField(out, path);
  }

  // Result: { items: [{label, chips: [{kind, text}]}], deleted: [titles], lines: [plain text] }
  function summarize(before, after) {
    var out = { sections: [], fields: [] };
    collect(before, after, [], out);
    var items = [];
    var deleted = [];
    out.fields.forEach(function (f) {
      var shown = f.names.slice(0, 4).join(', ') + (f.names.length > 4 ? ', …' : '');
      items.push({ label: f.label, chips: [{ kind: 'edited', text: shown + ' changed' }] });
    });
    out.sections.forEach(function (s) {
      var chips = [];
      if (s.list.added) chips.push({ kind: 'added', text: s.list.added + ' added' });
      if (s.list.edited) chips.push({ kind: 'edited', text: s.list.edited + ' edited' });
      if (s.list.deleted.length) {
        chips.push({ kind: 'deleted', text: s.list.deleted.length + ' deleted' });
        deleted = deleted.concat(s.list.deleted);
      }
      if (s.list.reordered) chips.push({ kind: 'plain', text: 'reordered' });
      items.push({ label: s.label, chips: chips });
    });
    var lines = items.map(function (it) {
      return '• ' + it.label + ': ' + it.chips.map(function (c) { return c.text; }).join(', ');
    });
    return { items: items, deleted: deleted, lines: lines };
  }

  // ───────── tiny DOM helpers + popup ─────────
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Shows a popup and resolves with the key of the button that was chosen (null = dismissed).
  function openPopup(build) {
    return new Promise(function (resolve) {
      var previous = document.activeElement;
      var overlay = el('div', 'repc-overlay');
      var card = el('div', 'repc-card');
      card.setAttribute('role', 'dialog');
      card.setAttribute('aria-modal', 'true');
      overlay.appendChild(card);

      var focusables = [];
      var done = false;
      function close(result) {
        if (done) return;
        done = true;
        document.removeEventListener('keydown', onKey, true);
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        if (previous && typeof previous.focus === 'function') { try { previous.focus(); } catch (e) { /* ignore */ } }
        resolve(result);
      }
      function onKey(e) {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(null); return; }
        if (e.key === 'Tab') {
          var list = focusables.filter(function (f) { return !f.disabled; });
          if (!list.length) return;
          var i = list.indexOf(document.activeElement);
          var next = e.shiftKey ? (i <= 0 ? list.length - 1 : i - 1) : (i === list.length - 1 ? 0 : i + 1);
          e.preventDefault();
          list[next].focus();
        }
      }
      overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(null); });

      var initial = build(card, close, function (node) { focusables.push(node); });
      document.body.appendChild(overlay);
      document.addEventListener('keydown', onKey, true);
      var first = initial || focusables[0];
      if (first && typeof first.focus === 'function') first.focus();
    });
  }

  function header(card, icon, title, sub, danger) {
    var head = el('div', 'repc-head');
    head.appendChild(el('div', 'repc-badge' + (danger ? ' is-danger' : ''), icon));
    var text = el('div');
    text.appendChild(el('h2', 'repc-title', title));
    if (sub) text.appendChild(el('p', 'repc-sub', sub));
    head.appendChild(text);
    card.appendChild(head);
  }

  function confirmPopup(summary) {
    var hasDeletes = !!(summary && summary.deleted.length);
    return openPopup(function (card, close, track) {
      header(
        card,
        hasDeletes ? '!' : '✓',
        hasDeletes ? 'Publish and delete items?' : 'Publish to the live website?',
        'Please check what is about to change.',
        hasDeletes
      );

      if (!summary) {
        card.appendChild(el('p', 'repc-note',
          'We could not list the changes this time. If you removed anything in this edit, it will be deleted from the website.'));
      } else if (!summary.items.length) {
        card.appendChild(el('p', 'repc-note', 'No content changes were detected.'));
      } else {
        var list = el('ul', 'repc-list');
        summary.items.forEach(function (item) {
          var row = el('li', 'repc-row');
          row.appendChild(el('span', 'repc-row-label', item.label));
          item.chips.forEach(function (chip) {
            row.appendChild(el('span', 'repc-chip is-' + (chip.kind === 'plain' ? 'plain' : chip.kind), chip.text));
          });
          list.appendChild(row);
        });
        card.appendChild(list);
      }

      var tick = null;
      if (hasDeletes) {
        var box = el('div', 'repc-danger');
        box.appendChild(el('strong', '', 'These will be removed from the website:'));
        var ul = el('ul');
        summary.deleted.slice(0, 8).forEach(function (t) { ul.appendChild(el('li', '', t)); });
        if (summary.deleted.length > 8) ul.appendChild(el('li', '', '…and ' + (summary.deleted.length - 8) + ' more'));
        box.appendChild(ul);
        var label = el('label', 'repc-check');
        tick = el('input');
        tick.type = 'checkbox';
        label.appendChild(tick);
        label.appendChild(el('span', '', 'I understand. Delete ' + (summary.deleted.length === 1 ? 'this item' : 'these items') + '.'));
        box.appendChild(label);
        card.appendChild(box);
      }

      card.appendChild(el('p', 'repc-note', 'The change appears on the website about a minute after you publish.'));

      var actions = el('div', 'repc-actions');
      var cancel = el('button', 'repc-btn repc-btn-ghost', 'Cancel');
      cancel.type = 'button';
      var ok = el('button', 'repc-btn repc-btn-primary' + (hasDeletes ? ' is-danger' : ''), hasDeletes ? 'Publish and delete' : 'Publish');
      ok.type = 'button';
      if (tick) {
        ok.disabled = true;
        tick.addEventListener('change', function () { ok.disabled = !tick.checked; });
      }
      cancel.addEventListener('click', function () { close(null); });
      ok.addEventListener('click', function () { if (!ok.disabled) close('publish'); });
      actions.appendChild(cancel);
      actions.appendChild(ok);
      card.appendChild(actions);

      track(cancel);
      if (tick) track(tick);
      track(ok);
      // Cancel is the default focus when deleting, so Enter can never delete by accident.
      return hasDeletes ? cancel : ok;
    }).then(function (result) { return result === 'publish'; });
  }

  // If the popup itself breaks, fall back to the plain browser dialog so publishing still works.
  function confirmPublish(summary) {
    function plainConfirm() {
      var msg = summary && summary.lines.length
        ? 'Publish these changes to the LIVE website?\n\n' + summary.lines.join('\n')
        : 'Publish your changes to the LIVE website?';
      if (summary && summary.deleted.length) msg += '\n\n⚠ This will DELETE: ' + summary.deleted.join(', ');
      return window.confirm(msg);
    }
    try {
      return confirmPopup(summary).catch(plainConfirm);
    } catch (e) {
      return Promise.resolve(plainConfirm());
    }
  }

  // ───────── help guide ─────────
  function openHelp() {
    return openPopup(function (card, close, track) {
      header(card, '?', 'How to update the website', 'Four steps. Nothing goes live until you confirm.');
      var steps = el('ol', 'repc-steps');
      [
        'Pick a section on the left, such as Notices, Gallery or Team.',
        'Open the entry and add or change items. Fill in both English and Nepali.',
        'Click Publish, then Publish now. Check the summary and confirm.',
        'Wait about a minute, then refresh the website to see it.',
      ].forEach(function (t) { steps.appendChild(el('li', '', t)); });
      card.appendChild(steps);

      var tips = el('ul', 'repc-tips');
      [
        'Photos: keep them under about 1 MB (shrink big phone photos first).',
        'Videos: upload to YouTube first, then paste the link in the Gallery.',
        'New notices and photos are added at the top of the list.',
        'Leave the ID boxes alone. They keep links and icons working.',
        'Changed your mind? Close the tab, or press Cancel in the confirm window.',
      ].forEach(function (t) { tips.appendChild(el('li', '', t)); });
      card.appendChild(tips);

      var actions = el('div', 'repc-actions');
      var site = el('a', 'repc-link', 'Open the website ↗');
      site.href = SITE_URL;
      site.target = '_blank';
      site.rel = 'noopener';
      site.style.marginRight = 'auto';
      site.style.alignSelf = 'center';
      var done = el('button', 'repc-btn repc-btn-primary', 'Got it');
      done.type = 'button';
      done.addEventListener('click', function () { close('ok'); });
      actions.appendChild(site);
      actions.appendChild(done);
      card.appendChild(actions);
      track(done);
      track(site);
      return done;
    });
  }

  function addHelpButton() {
    if (document.getElementById('repc-help')) return;
    var btn = el('button', 'repc-help', '?');
    btn.id = 'repc-help';
    btn.type = 'button';
    btn.title = 'How to update the website';
    btn.setAttribute('aria-label', 'Help: how to update the website');
    btn.addEventListener('click', function () { openHelp(); });
    document.body.appendChild(btn);
  }

  function showToast(text) {
    var toast = el('div', 'repc-toast', text);
    toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
    setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 6500);
  }

  // ───────── hook into Decap ─────────
  var lastPublished = {}; // file path → data we published in this session

  function baselineFor(entry) {
    var path = getKey(entry, 'path');
    if (path && lastPublished[path]) return lastPublished[path];
    var raw = getKey(entry, 'raw');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* fall through */ }
    }
    return null;
  }

  function install() {
    if (!window.CMS || typeof window.CMS.registerEventListener !== 'function') return;

    // Decap waits for this handler to finish; throwing cancels the publish.
    window.CMS.registerEventListener({
      name: 'preSave',
      handler: function (args) {
        var summary = null;
        try {
          var entry = args && args.entry;
          var after = toPlain(getKey(entry, 'data'));
          var before = baselineFor(entry);
          if (before && after) summary = summarize(before, after);
        } catch (e) {
          summary = null; // never let our own bug block saving
        }
        return confirmPublish(summary).then(function (ok) {
          if (!ok) throw new Error('Cancelled. Nothing was published.');
          // returning nothing keeps the entry exactly as the editor wrote it
        });
      },
    });

    window.CMS.registerEventListener({
      name: 'postSave',
      handler: function (args) {
        try {
          var entry = args && args.entry;
          var path = getKey(entry, 'path');
          var data = toPlain(getKey(entry, 'data'));
          if (path && data) lastPublished[path] = JSON.parse(JSON.stringify(data));
          showToast('Published. It will appear on the website in about a minute.');
        } catch (e) { /* ignore */ }
      },
    });
  }

  try { install(); } catch (e) { /* the admin keeps working without the extras */ }
  try {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addHelpButton);
    else addHelpButton();
  } catch (e) { /* ignore */ }
})();
