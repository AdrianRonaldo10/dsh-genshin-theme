# genshin-theme

Out-of-tree DeepSeek Harness web plugin that adds:

- Genshin / Fontaine / Sumeru appearance themes
- a draggable Paimon desktop pet with localized quips and special drag/land animations
- the Teyvat boot skin (when `boot.css` is present)

## Files

| File          | Purpose |
|---------------|---------|
| `package.json`| dsh bundle manifest (`dsh.bundle.patch` + `dsh.client`) |
| `cordis.patch.yml` | profile layer that activates this plugin row |
| `index.js`    | injects the pre-plugin boot CSS |
| `client.js`   | generated theme + Paimon browser bundle |
| `boot.css`    | optional full boot skin; `index.js` has a minimal fallback |
| `LICENSE`     | PolyForm Noncommercial 1.0.0 |

## License

PolyForm Noncommercial License 1.0.0: you may copy, modify, and share this
plugin for noncommercial purposes only. Commercial use requires a separate
license from the copyright holder.

## Build / update

From `~/.dsh/genshin`:

```bash
python3 generate_client.py
```

This regenerates:

- `~/.dsh/genshin/client.js`
- `~/.dsh/genshin/genshin-theme/client.js`

The paths can be overridden with:

```bash
GENSHIN_THEME_SOURCE_DIR=/path/to/genshin \
GENSHIN_THEME_PLUGIN_DIR=/path/to/genshin-theme \
python3 generate_client.py
```

## Install into a profile

```bash
bash ~/.dsh/genshin/install-plugin.sh web
```

or for a custom profile:

```bash
bash ~/.dsh/genshin/install-plugin.sh <profile-name>
```

The script copies the plugin package into
`$DSH_HOME/profiles/<profile>/node_modules/genshin-theme` and ensures the
profile `cordis.patch.yml` contains the `genshin-theme` insert. The plugin
lives under the user's dsh home, so updating the global dsh package does not
remove it.

If pnpm is available, the same package can be installed with:

```bash
python3 ~/.dsh/genshin/generate_client.py
dsh plugin --profile web add file:$HOME/.dsh/genshin/genshin-theme
```

## Install from GitHub

Publish this directory (including the generated `client.js` and ideally
`boot.css`) as a GitHub repository, then:

```bash
dsh plugin --profile web add github:owner/repo
```

Because `package.json` declares `dsh.bundle.patch`, `dsh plugin` reconciles
the dependency into `dsh.profile.bundles` automatically — no manual
`cordis.patch.yml` edit is required.

To prepare a git repo with the generated bundle committed, run:

```bash
bash ~/.dsh/genshin/publish-github.sh ~/genshin-theme-release
```
