.PHONY: build clean install test

EXTENSIONS_DIR := extensions

build:
	@for dir in $(EXTENSIONS_DIR)/*; do \
		if [ -d "$$dir" ] && [ -f "$$dir/Makefile" ]; then \
			echo "Building $$dir..."; \
			$(MAKE) -C $$dir build; \
		fi \
	done

clean:
	@for dir in $(EXTENSIONS_DIR)/*; do \
		if [ -d "$$dir" ] && [ -f "$$dir/Makefile" ]; then \
			echo "Cleaning $$dir..."; \
			$(MAKE) -C $$dir clean; \
		fi \
	done

install:
	@for dir in $(EXTENSIONS_DIR)/*; do \
		if [ -d "$$dir" ] && [ -f "$$dir/Makefile" ]; then \
			echo "Installing $$dir..."; \
			$(MAKE) -C $$dir install; \
		fi \
	done

test:
	@for dir in $(EXTENSIONS_DIR)/*; do \
		if [ -d "$$dir" ] && [ -f "$$dir/Makefile" ]; then \
			echo "Testing $$dir..."; \
			$(MAKE) -C $$dir test; \
		fi \
	done
