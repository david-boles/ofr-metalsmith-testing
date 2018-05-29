# ofr-metalsmith-testing

## Supported Resource Types

| Name | Resource Type | Description | Build Details |
| --- | --- | --- | --- |
| Undefined | n/a | This applies to any file that does not specify a type or does not specify a valid type. | `pageOutputPath` and `pageURLPath` are not set. If unset, `contentOutputPath` is set to source path (after overrides). File contents are rendered to `contentOutputPath` without modification unless `noOutput` evaluates to `true`. |
| Page | `page` | A simple, static page on the site. Not recommended for pretty much anything. | `contentOutputPath` is not set. If unset, `pageURLPath` is set to the file's path with the last file extension removed (if there is one to remove). If unset, `pageOutputPath` is set to `pageURLPath` followed by `.html`. The contents are rendered with nunjucks to `pageOutputPath`. |
| Document | A page of hierarchically organized content sections. | `contentOutputPath` is not set. If unset, `pageURLPath` is set to the file's path with the last file extension removed (if there is one to remove). If unset, `pageOutputPath` is set to `pageURLPath` followed by `.html`. The contents are rendered with nunjucks to `pageOutputPath`. |

## Build Process

| Build Step | Description |
| --- | --- |
| Initialize Metadata | Load Metalsmith metadata from config.yml (which should contain `bundles`, `productionBaseURL`, and `developmentBaseURL`). Also, set `metadata.devBuild` and `metadata.baseURL` depending on whether this is a development build. |
| Validate Bundles | Remove any files that are not part of a bundles specified in `metadata.bundles` and error if no files belong to a specified bundle. |
| Metafiles | Using `metalsmith-metafiles`, put any data specified in `<path>.meta.yml` files into corresponding `<path>` files and delete the `<path>.meta.yml` files. If a corresponding `<path>` file for a `<path>.meta.yml` file does not exist, error. |
| File Overrides | Iterate through the files in bundle order. If the file specifes a `override` key with a path that is within a bundle that has already been iterated through, set `files[path]` to the file with an additional `originalPath` value and an `overriden` array containing the overriden versions of the files in most original-first (lastest to be overriden-last) order.
| Output Paths |  |
| Render |  |
