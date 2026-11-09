// Carga dentro de #generated el HTML generado por tus scripts
// (generar_timeline.py, generar_fichas.py...). Basta con dejar el fichero
// en la carpeta generated/ con el nombre indicado en data-src.
(function () {
  var box = document.getElementById('generated');
  if (!box) return;
  var src = box.getAttribute('data-src');
  if (!src) return;

  fetch(src)
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then(function (html) {
      box.innerHTML = html;
    })
    .catch(function () {
      box.innerHTML =
        '<p class="placeholder">Pending content: copy the generated HTML to <code>' +
        src + '</code>.</p>';
    });
})();
