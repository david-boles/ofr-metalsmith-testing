# ofr-metalsmith-testing

## Build Process

| Build Step | Description |
| --- | --- |
| Initialize Metadata | Load Metalsmith metadata from config.yml (which should contain `bundles`, `productionBaseURL`, and `developmentBaseURL`). Also, set `metadata.devBuild` and `metadata.baseURL` depending on whether this is a development build. |
| Validate Bundles | Remove any files that are not part of a bundle specified in `metadata.bundles` and error if a specified bundle does not exist. |
| Metafiles | Using `metalsmith-metafiles` put any data specified in `<path>.meta.yml` files into corresponding `<path>` files and delete the `<path>.meta.yml` files. If a corresponding `<path>` file for a `<path>.meta.yml` file does not exist, error. |
| File Overrides | Iterate through the files in bundle order. If the file specifes a `override` key with a path that is within a bundle that has already been iterated through, set `files[path]` to the file with an additional `originalPath` value and an `overriden` array containing the overriden versions of the files in most original-first (lastest to be overriden-last) order.
