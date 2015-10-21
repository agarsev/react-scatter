all: example

example: $(wildcard src/*)
	browserify example/main.jsx -t babelify --outfile example/bundle.js
