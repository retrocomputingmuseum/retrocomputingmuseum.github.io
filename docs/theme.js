/* Tema de la web: automático (por defecto), claro u oscuro.
   - Automático: sigue el modo claro/oscuro del sistema (sin atributo data-theme).
   - Claro / oscuro: forzado con el botón de la cabecera, que recorre
     automático -> claro -> oscuro -> automático y recuerda la elección en este navegador.
   Se carga en <head>, antes de las hojas de estilo, para evitar el parpadeo. */
(function () {
  var KEY = 'theme';
  var ORDER = ['auto', 'light', 'dark'];
  var ICONS = {
    auto: '🖥️',   // 🖥️
    light: '☀️',        // ☀️
    dark: '🌙'          // 🌙
  };
  var NAMES = { auto: 'automatic (system)', light: 'light', dark: 'dark' };
  var root = document.documentElement;

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return (v === 'light' || v === 'dark') ? v : 'auto';
    } catch (e) {
      return 'auto';
    }
  }

  function save(mode) {
    try {
      if (mode === 'auto') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, mode);
    } catch (e) { /* sin almacenamiento: no se recuerda */ }
  }

  // Modo seleccionado ahora mismo
  function current() {
    return root.getAttribute('data-theme') || 'auto';
  }

  function apply(mode) {
    if (mode === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', mode);
  }

  apply(stored());

  function updateButton() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var mode = current();
    var next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    var label = 'Theme: ' + NAMES[mode] + '. Click to switch to ' + NAMES[next] + '.';
    btn.textContent = ICONS[mode];
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
    btn.hidden = false;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length];
        apply(next);
        save(next);
        updateButton();
      });
    }
    updateButton();
  });

  // Si se cambia el tema en otra pestaña, esta se actualiza
  window.addEventListener('storage', function (e) {
    if (e.key === KEY || e.key === null) {
      apply(stored());
      updateButton();
    }
  });
})();
