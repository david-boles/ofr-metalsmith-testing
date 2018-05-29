# ofr-metalsmith-testing

## Build Process

| Build Step | Description |
| --- | --- |
| Initialize Metadata | Load Metalsmith metadata from config.yml (which should contain `bundles`, `productionBaseURL`, and `developmentBaseURL`). Also, set `metadata.devBuild` and `metadata.baseURL` depending on whether this is a development build. |
| Validate Bundles | Remove any files that are not part of a bundle specified in `metadata.bundles` and error if a specified bundle does not exist. |
