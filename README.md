# Martian Robots code challenge

This monorepo contains the different parts of the challenge:

- [Core](packages/core): Contains the main logic of the challenge.
- [CLI](packages/cli): Console interface to interact with the application.

## Troubleshooting

During the development of the challenge I encountered several problems since it was the first time I used a monorepo, especially in CI/CD, since I cannot use the ones I usually incorporate in my projects such as semantic-release.

To solve these problems I looked at [Babel](https://github.com/babel/babel), since it is also assembled as a monorepo and I found [preconstruct](https://preconstruct.tools/), a tool to develop and assemble monorepo projects. Looking for alternatives to semantic-release I found [Changesets](https://github.com/atlassian/changesets) from altassian, a tool to make package releases in a monorepo project, it is not exactly the same, since it does not use commits messages, but it allows me to make a release in the pipeline.

I also found some minor problems regarding package publishing, at first I did it in the github registry but I didn't like the fact that I had to add the package registry to install it, so I decided to move it to npm.
