# Portfolio professionnel

Portfolio statique moderne, sans dépendance à installer. Il fonctionne avec un simple serveur HTTP.

## Lancer le site

```bash
cd /workspace/ecommerce-site-1
python3 -m http.server 4173
```

Ouvrez ensuite `http://localhost:4173`.

## Personnalisation

- **Nom et SEO :** remplacez chaque occurrence de `[VOTRE NOM]` dans `index.html`.
- **Compétences et niveaux :** modifiez le tableau `skills` au début de `script.js`.
- **Projets, descriptions et technologies :** modifiez le tableau `projects` au début de `script.js`.
- **Liens sociaux et GitHub :** remplacez les attributs `href="#"` correspondants dans `index.html` et dans le rendu des projets de `script.js`.
- **Parcours et coordonnées :** remplacez les textes placeholder dans les sections `#contact` et `.journey` de `index.html`.

Le formulaire est une interface prête à connecter à votre solution d'envoi (Formspree, EmailJS ou backend personnel). Il n'envoie volontairement aucune donnée vers un service non configuré.
