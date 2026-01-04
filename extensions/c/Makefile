EXTENSION = ____moduleName____
MODULE_big = ____moduleName____
OBJS = src/____moduleName____.o

DATA = sql/____moduleName____--0.1.0.sql
REGRESS = ____moduleName____

PG_CONFIG ?= pg_config
PGXS := $(shell $(PG_CONFIG) --pgxs)
include $(PGXS)

.PHONY: build clean install test

build: all

test: installcheck
