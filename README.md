## Backend coding challenge

To run please first install dependencies using:

```
$ npm i
```

afterwards, in order to run the challenge input test case use:

```
$ npm run test FolderRunner
```

That will show something like:

![Test runner]('/img/ChallengeTest.png')

to run the whole tests included in the `tests` folder, use:

```
$ npm run test
```

which includes the coverage report below:

![Test coverage]('/img/Coverage.png')

# Comments
There are couple of things that doesnt match exactly with the given input for the challenge with the LIST command, but actually the LIST shows the same folders tree. 
The reason is because the order in which was stored the child folders. Them was stored using a Map data structure and that uses a simple way to store them, textually: 
> A Map object iterates entries, keys, and values in the order of entry insertion. [MDN link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps)
