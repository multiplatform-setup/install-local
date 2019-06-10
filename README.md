# What is install-local for?

Installing local directories as dependencies using npm is buggy. Especially when working in a group using various operating systems. Sometimes you want to just test your project's dependency's new version locally. This is where this handy tool comes in.

Just install it as a dev dependency or with a `--no-save` flag and run it using `$ npx install-local <relative-path-to-local-dependency>`.

No warnings about missing access rights. It just works.

Should you find a bug feel free to report it on [GitHub](https://github.com/multiplatform-setup/install-local).
