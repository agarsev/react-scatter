all: example

example:
	browserify example/main.jsx -t babelify --outfile example/bundle.js

.PHONY: example
