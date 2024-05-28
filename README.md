# DT173G Projekt - Publik webbplats
Detta repo innehåller filer för att utveckla en webbplats med hjälp av en automatiserad arbetsprocess. Förutom verktygen Node.js och Node Package Manager (NPM) används Gulp som en task runner för att utföra olika steg i den automatiserade arbetsprocessen. Därtill har flera olika plugin installerats:

* Gulp-typescript används för att transpilera TypeScript till JavaScript (es5).
* Gulp-terser används för att minifiera JavaScript-kod.
* Gulp-sass och node-sass används för att transpilera SCSS till CSS samt för att minifiera CSS-kod.
* Browser-sync används för att synkronisera och ladda om webbläsaren vid förändring i källkodsfiler.

Webbplatsen konsumerar en webbtjänst för att hämta (GET) data om en restaurangs företagspresentation och meny samt för att skicka (POST) data om bordsbokningar via Fetch API.

Webbplatsen är skapad med HTML, SCSS och TypeScript.

Länk till publik webbplats: https://studenter.miun.se/~pein2200/writeable/dt173g/projekt/umami/
