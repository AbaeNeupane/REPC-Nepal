/* REPC-Nepal admin helpers (loaded after Decap CMS):
   1. asks "Are you sure?" before anything is published, listing what was added / edited / deleted
   2. shows a small reminder that edits take about a minute to go live
   Everything is wrapped so a bug in this file can never stop the admin panel from working. */
(function () {
  'use strict';

  // ───────── helpers ─────────
  function toPlain(value) {
    return value && typeof value.toJS === 'function' ? value.toJS() : value;
  }
  function getKey(obj, key) {
    if (!obj) return undefined;
    return typeof obj.get === 'function' ? obj.get(key) : obj[key];
  }
  function same(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  function isObject(v) {
    return v !== null && typeof v === 'object' && !Array.isArray(v);
  }
  function prettify(key) {
    return String(key).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, function (c) { return c.toUpperCase(); });
  }
  function itemTitle(item) {
    if (!isObject(item)) return String(item);
    return item.titleEn || item.nameEn || item.altEn || item.categoryEn || item.en ||
      item.source || item.src || item.url || 'item';
  }
  // How many non-empty fields two items share (used to tell an edit from a delete + add).
  function similarity(a, b) {
    var n = 0;
    Object.keys(a || {}).forEach(function (k) {
      if (a[k] !== '' && a[k] != null && same(a[k], (b || {})[k])) n++;
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
    return {
      added: added.length,
      edited: edited,
      deleted: deleted,
      reordered: unchanged && !same(before, after),
    };
  }

  // ───────── walk both versions and collect a readable summary ─────────
  function collect(before, after, path, out) {
    if (Array.isArray(before) && Array.isArray(after)) {
      var objectList = before.concat(after).some(isObject);
      if (objectList) {
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
      var keys = Object.keys(before).concat(Object.keys(after)).filter(function (k, i, all) { return all.indexOf(k) === i; });
      keys.forEach(function (k) { collect(before[k], after[k], path.concat(k), out); });
      return;
    }
    if (!same(before, after) && !(isEmpty(before) && isEmpty(after))) addField(out, path);
  }
  function isEmpty(v) { return v === undefined || v === null || v === ''; }
  function addField(out, path) {
    var parent = path.slice(0, -1).map(prettify).join(' › ') || 'General';
    var found = out.fields.filter(function (f) { return f.label === parent; })[0];
    if (!found) { found = { label: parent, names: [] }; out.fields.push(found); }
    found.names.push(prettify(path[path.length - 1]));
  }

  function summarize(before, after) {
    var out = { sections: [], fields: [] };
    collect(before, after, [], out);
    var lines = [];
    var deleted = [];
    out.fields.forEach(function (f) {
      var shown = f.names.slice(0, 4).join(', ') + (f.names.length > 4 ? ', …' : '');
      lines.push('• ' + f.label + ': ' + f.names.length + ' field' + (f.names.length > 1 ? 's' : '') + ' changed (' + shown + ')');
    });
    out.sections.forEach(function (s) {
      var parts = [];
      if (s.list.added) parts.push(s.list.added + ' added');
      if (s.list.edited) parts.push(s.list.edited + ' edited');
      if (s.list.deleted.length) { parts.push(s.list.deleted.length + ' DELETED'); deleted = deleted.concat(s.list.deleted); }
      if (s.list.reordered) parts.push('reordered');
      lines.push('• ' + s.label + ': ' + parts.join(', '));
    });
    return { lines: lines, deleted: deleted };
  }

  // ───────── the confirmation dialogs ─────────
  function confirmPublish(summary) {
    var tail = '\n\nThe change appears on the website about a minute after you confirm.';
    var msg;
    if (!summary) {
      msg = 'Publish your changes to the LIVE website?\n\nIf you removed anything in this edit, it will be deleted from the site.' + tail;
    } else if (!summary.lines.length) {
      msg = 'Publish to the LIVE website?\n\n(No content changes were detected.)' + tail;
    } else {
      msg = 'Publish these changes to the LIVE website?\n\n' + summary.lines.join('\n') + tail;
    }
    if (!window.confirm(msg)) return false;

    if (summary && summary.deleted.length) {
      var shown = summary.deleted.slice(0, 8).map(function (t) { return '- ' + t; }).join('\n');
      var more = summary.deleted.length > 8 ? '\n…and ' + (summary.deleted.length - 8) + ' more' : '';
      var warn = '⚠ DELETE ' + summary.deleted.length + ' item' + (summary.deleted.length > 1 ? 's' : '') +
        ' from the website?\n\n' + shown + more +
        '\n\nThis can only be undone by restoring it from the GitHub history.';
      if (!window.confirm(warn)) return false;
    }
    return true;
  }

  // ───────── hook into Decap ─────────
  var lastPublished = {}; // file path → data we last published in this session

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
        if (!confirmPublish(summary)) {
          throw new Error('Cancelled. Nothing was published.');
        }
        // returning nothing keeps the entry exactly as the editor wrote it
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
        } catch (e) { /* ignore */ }
      },
    });
  }

  function addReminderBar() {
    if (typeof document === 'undefined' || document.getElementById('repc-admin-bar')) return;
    var bar = document.createElement('div');
    bar.id = 'repc-admin-bar';
    bar.textContent = 'Edits go live about a minute after you click Publish.';
    bar.style.cssText = 'position:fixed;right:12px;bottom:12px;z-index:50;max-width:240px;padding:8px 12px;' +
      'background:#0C2264;color:#fff;font:12px/1.4 system-ui,sans-serif;border-radius:8px;' +
      'box-shadow:0 2px 8px rgba(0,0,0,.25);opacity:.92;pointer-events:none';
    document.body.appendChild(bar);
  }

  try { install(); } catch (e) { /* the admin keeps working without confirmations */ }
  try {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addReminderBar);
    else addReminderBar();
  } catch (e) { /* ignore */ }
})();
