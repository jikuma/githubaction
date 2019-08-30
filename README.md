## Supported Operations

### create a release

```
  - uses: jikuma/githubaction@v0.3.3-alpha
      with:
        operation: 'create a release'
        repo-token: ${{ secrets.GITHUB_TOKEN }}
        release_title: 'Release from Test'
        release_note: 'its a release node'
        asset_filepath: './CHANGELOG.md'
        tag_name: v0.1.GIHUB_SHORT_SHA
```



## Contribution

See the walkthrough located [here](https://github.com/actions/toolkit/blob/master/docs/javascript-action.md).

In addition to walking your through how to create an action, it also provides strategies for versioning, releasing and referencing your actions.


