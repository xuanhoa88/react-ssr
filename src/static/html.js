export default function html({
  helmet,
  styleTags,
  scriptTags,
  rendered,
  frontloadData
} = {}) {
  return `<!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      <meta charset="utf-8">
      ${helmet.meta.toString()}
      ${helmet.title.toString()}
      ${helmet.link.toString()}
      ${styleTags}
    </head>
    <body>
      <div id="root">${rendered}</div>
      <script>window.__UNIVERSSR_FRONTLOAD_DATA__ = ${frontloadData}</script>
      ${scriptTags}
    </body>
  </html>`;
}
