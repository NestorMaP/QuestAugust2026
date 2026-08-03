# Andorra — escapada sorpresa 🏔️

Página estática de una sola vista para dar la sorpresa del viaje a Andorra
(21–23 agosto 2026): resumen del plan + un pequeño "quest" de 3 fotos que
desbloquea la pista del regalo físico.

No lleva backend ni servidor: todo funciona en el navegador. Las fotos que
se suben en el quest se guardan solo en el propio dispositivo (localStorage),
no se envían a ningún sitio.

## Estructura

```
index.html    → todo el contenido (hero, itinerario, info práctica, quest)
style.css     → estilos
script.js     → lógica de la puerta de entrada y del quest
```

## Cómo publicarla en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser privado o público, ver
   aviso más abajo).
2. Sube estos tres archivos a la raíz del repo:
   ```
   git init
   git add index.html style.css script.js README.md
   git commit -m "Escapada a Andorra"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```
3. En el repo → **Settings → Pages** → en "Source" elige la rama `main` y
   la carpeta `/ (root)` → Guardar.
4. En un par de minutos la página estará disponible en:
   `https://TU-USUARIO.github.io/TU-REPO/`

## ⚠️ Aviso sobre privacidad

GitHub Pages publica la web en una URL pública **aunque el repositorio sea
privado** (salvo que tengas GitHub Enterprise con control de acceso). Es
decir: cualquiera con el enlace puede verla.

Para darle una capa mínima de intimidad, la página incluye una "puerta de
entrada" con contraseña (ver `CONFIG.passphrase` en `script.js`, por
defecto `ORDINO26`). No es seguridad real — solo evita que alguien que
tropiece con el enlace por casualidad vea la sorpresa. Si no la quieres,
pon `passphrase: null` en `script.js` y desaparece.

También puedes usar un nombre de repo poco descriptivo (no lo llames
"sorpresa-novia-andorra") para no dar pistas si alguien navega por tu
perfil de GitHub.

## Personalizar

- **Contraseña de entrada y mensaje del regalo**: al principio de
  `script.js`, en el objeto `CONFIG`.
- **Textos del itinerario, restaurantes, horarios**: directamente en
  `index.html`, todo está en español plano y comentado por secciones.
- **Fotos del quest**: los 3 lugares propuestos son Casa de la Vall, la
  iglesia de La Cortinada y la Ruta del Hierro — puedes cambiarlos por
  otros editando los `<h4>` y `.hint` de cada `.quest-slot` en
  `index.html`.
- **Colores**: variables CSS al principio de `style.css` (`:root`).

## Cosas para revisar antes del viaje

- Confirmar horario y reserva de **Casa de la Vall** (visita guiada con
  aforo limitado): https://www.casadelavall.ad/es/visites
- Reservar mesa en el restaurante elegido para la cena, sobre todo en
  temporada alta de agosto.
- Revisar tráfico/obras el mismo día de salida antes de fijar las paradas
  exactas de carretera.
- El bono de Caldea es válido para el **día siguiente** al check-in del
  hotel (22 de agosto) a las 22:00 — llevarlo impreso o en el móvil.
