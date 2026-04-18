.PHONY: install serve start dev preview serve-py help

help:
	@echo "TRFC static site"
	@echo "  make install   - install npm dev dependencies"
	@echo "  make serve     - run local static server on http://localhost:3000"
	@echo "  make serve-py  - same, using Python (no npm required)"

install:
	npm install

serve start dev preview:
	npm run serve

serve-py:
	python3 -m http.server 3000
