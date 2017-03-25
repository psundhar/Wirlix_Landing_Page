# Git Usage

- Clone the Repository <br/>```git clone git@github.com:psundhar/Wirlix_Landing_Page.git```
- Clone <u>develop</u> branch the Repository <br/>```git clone -b develop git@github.com:psundhar/Wirlix_Landing_Page.git```
- Which branch you are on <br/> ```git branch```
- Switch branch to develop in local machine <br/>```git checkout develop```<br/> If you run into issues not able to switch from master repo , You will have to commit your code to your local repository. If you dont need your commits you can use be careful you will lose your changes.<br/> ```git stash``` 
- Switch branch to master in local machine <br/>```git checkout master```
- Sync your Repo in local machine <br/> ```git reset --hard```<br/>```git pull origin  ``` ***branchname***
- Push your code commits to Remote Repository <br/>```git push origin``` ***branchname***
- Run the application <br/>```node server.js```
- Access the application in the browser<br/>```http://localhost:3000```

# Collabratively Code Sharing.
- Pull Changes before you work.
- Commit your tested code in local repository.
- Push Changes to remote repository , so others can pull and work on your changes.
