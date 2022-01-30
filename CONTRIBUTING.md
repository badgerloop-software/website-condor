When contributing to this repository, please first discuss the proposed changes with Luke. After the changes have been discussed, create a branch specifically for your feature using `git checkout -b [branch name]`.
Develop on the branch you created until your feature is complete.

# Badgerloop Website Development

### Non-Git (Just want to learn / play around)

Find the button that says _Clone or download_  
and click _Download ZIP_. Unzip the folder and begin editing [index.html](index.html).

It's that simple!

### Git (Want to know how to publish my work to GitHub)

**WARNING: You will need a GitHub account and to be a part of the  
badgerloop-software GitHub organization first, contact Luke Houge
for help**

Make a new folder somewhere (i.e. called `website-template`), open a terminal or **Git Bash**  
window here and run the following commands:

```
git init
git remote add origin https://github.com/badgerloop-software/website-condor.git
git fetch
git pull origin master
```

Depending what feature/page you are currently working on you will need to create a new branch for that purpose.  
Examples:

```
git checkout stlying
git checkout backend
git checkout home
git checkout contact-form
...
```

To see all branches, view the [branches](https://github.com/badgerloop-software/website-condor/branches) tab.  
Once you have the right branch checked out (see what branch you're  
currently on using `git branch`) you can start making changes!
When you're at a logical stopping point and would like to submit  
your changes run the following commands:

```
git add -A
git commit -m "describe_changes_in_your_words"
git push origin your_current_branch
```

Once this command goes through, you should be able to see your updates on GitHub!

### Recommended Text Editors

Both of these have great git integration (if you want to do it that way) and have all the features you will need and are availble on Mac, Windows, and Linux.

- [Visual Studio Code](https://code.visualstudio.com/)
- [Atom](https://atom.io/)

## Design

We are utulizing a template made by [Pixelarity](pixelarity.com) to get us started with a basic layout, and then adding in our own elements as needed. Most of the dynamic elements are contained in the `/assets/js/main.js` file, which uses Javascript. The backend code is in the `../api` folder and using Node.js. Frontend styling in mainly in `assets/main.css` where you can make most styling changes. The content is in the `.html` files for each page.
