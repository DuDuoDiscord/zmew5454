<img src="https://cdn.discordapp.com/attachments/456526035949846529/479982902029975552/discord_banner.png"><br/>
## Un bot de vérification Captcha basé sur Discord.js.

[![Discord Badge](https://discordapp.com/api/guilds/427409812112932864/embed.png)](https://discord.gg/gu3TWdq)

N'hésitez pas à rejoindre notre <a href="https://discord.gg/gu3TWdq">serveur discord</a> pour un support en direct.

## Procédure d'installation
Discord-Captcha nécessite **NodeJS 8.0+** Installez-le<a href="https://nodejs.org/en/download/package-manager/"> ici</a>.<br/>
Pour installer tous les modules **NPM** requis, exécutez le script d'installation `.bat` ou `npm install` <br/>
Pour l'instant, assurez-vous que le bot soit seulement dans une guilde.
Le fichier `config.json` se trouve dans `~/src/`. Obtenez votre jeton <a href="https://discordapp.com/developers/applications/me"> ici</a>.
Puis inscrivez vos ID :

<img src="https://i.gyazo.com/0959e1842dae3b4d5ffc60e29180caa2.png">

## N'oubliez pas !!
Inserer vos **VOTRE ID**, **SALON CAPTCHA ID** et **NOM DE VOTRE SALON CAPTCHA** dans le fichier `index.js`.
<img src="https://i.gyazo.com/73c6c631a39c2721fedbd00292048114.png">
<img src="https://i.gyazo.com/5a93a18bc24a0798cf786bf03e1dc45e.png">
<img src="https://i.gyazo.com/43bdc74292050b5c74f373976faf7af3.png">
<img src="https://i.gyazo.com/cdc416b7758b9e462248ddc80580b95a.png">

## Commandes supplémentaires
> Les noms de commandes peuvent être modifiés dans le fichier de configuration.
```js
/**
* Snowflake: ID
**/
!blockUser <Snowflake> // Bloque un ID utilisateur. Si l'utilisateur envoie un message à la guilde, il sera expulsé.
!removeBlock <Snowflake> // Supprime un ID utilisateur de la liste noire. L'utilisateur peut réécrire sans se faire botter.
!clear <Nombre de messages> // Efface une quantité de messages, jusqu'à 100
!version // La version actuelle et la dernière version
!create-role // Crée le rôle de vérification
```

## Type de captcha
Discord-captcha vous propose deux types de captchas : premièrement, les images en tant que captchas et les seconds, les messages texte normaux.
C'est à vous de décider si vous voulez des images ou du texte. Notez que les images sont **plus** difficile à contourner que les messages texte normaux.<br/>
Le type par défaut est `image`. Pour modifier le type, vous modifiez la valeur de la clé `captchaType` dans `~/src/config.json` soit `image`ou `text`.<br/>


## Commandes associées à l'API
> La commande est - comme mentionné ci-dessus - changeable. Ce sont les noms de commandes par défaut.
Les commandes peuvent également être désactivées en changeant `enabled` par `false`.
```js
!queries // Requête en cours
!querydelete // Supprime la requête (doit être exécutée toutes les 2 ou 3 semaines)
!purgelogs // Purge les logs
!logs // Obtenir des logs
!makerole // Crée un role 'verified'
!unverify // Permet à l'utilisateur de vérifier
```
<b>Note: </b>Si vous voulez utiliser ces commandes, vous devez mettre votre tag dans le tableau `contributors`.
<img src="https://i.gyazo.com/5af42f9a52d6ae640de204c5616f5652.png">

## Traiter avec SQLite
Les utilisateurs bloqués, les logs et les requêtes sont stockés dans une base de données située dans `~/src/db.sqlite`. Si vous voulez en lire les données, je vous recommande <a href="http://sqlitebrowser.org/">SQLite DB Browser</a>.
Après l'installation, vous pouvez ouvrir la base de données en cliquant sur 'open database' dans le programme.

### Utiliser le fichier minifié
Si vous ne souhaitez pas éditer le code principal, vous pouvez supprimer le fichier `index.js` localement et renommer `index.min.js` en `index.js`.
Une autre option consiste à changer la valeur de la clé `main` du fichier package.json de `index.js` en `index.min.js`.
Cela vous permet de taper `node` dans l'invite de commande au lieu de `node <path>`

## Conseils
• Regardez le repo pour quelques corrections.<br/>
• Me contacter via mon <a href="https://discord.gg/gu3TWdq">serveur discord</a><br/>

## By X-BOT DEVELOPMENT™

[![Discord Badge](https://discordapp.com/api/guilds/427409812112932864/embed.png?style=banner1)](https://discord.gg/gu3TWdq)
<img src="https://i.giphy.com/media/MYyBFcDrKm1B40JxrA/giphy.webp">
