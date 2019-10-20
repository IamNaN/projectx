# ![](https://github.com/IamNaN/projectx/blob/master/extensions/chrome/logo.png) Project X
WIP - Not ready for primetime or contributions

The purpose of Project X is to add some missing features to Github's project boards. Initially, this will be:
- [X] Time estimates added to Issues
- [ ] Time spent tracked in PRs
- [ ] Visual display of these items in the project board cards and side panels in the the Issues and Pull Requests tabs with the help of browser plugins for Chrome and Firefox
- [ ] Time progress bars in PRs and project board cards

More features will be added over time, and some will be removed as Github makes ProjectX features redundant with native support.

### Topology
This is currently intended to be serverless. Data can be stored in the Issue/PR's description. A Javascript browser extension will retrieve the relevant data and insert html elements into the page while you are browsing. This may not be a permanent solution and if so, we'll add a server and database.

# Features/Instructions

## Time Managment/Tracking
ProjectX allows you to track time just by adding a block of estimates in the the description of the Issue or PR. You may have one or more estimate per Issue/PR and ProjectX will work with the totals.

The time estimate units are up to you. In the following examples we will be using hours.

### Time Estimates for Issues
You may add time estimates to Issues. The estimates appear on the Issue index page to the right of the assignee avatars...

![](https://github.com/IamNaN/projectx/blob/master/images/screenshot.png)
 
 ...and the Issue discussion page to the right of the assignee.

Project X allows multiple people to have time estimates in the Issue whether or not they are assignees.

To add one or more time estimates, using markdown, add a code block to the the Issue's description set to the "times" language. Use one line in the block for each person's time estimate, with their github alias and numerical estimate separated by a colon. For example:

     ```times
     IamNaN: 12
     EmmaS: 6
     ```
In the description is will appear less geeky, like this...
```times
IamNaN: 12
EmmaS: 6
```

## Time Spent for Pull Requests
Where Issues have "time estimates", PRs have "time spent".

To track time spent, add the same type of block as used in the Issue time estimates (above).

When appropriate, Project X will show a progress bar using the time estimates and the times spent. For that function to work, though, you will need to mention the Issue number in the PR description using Github's [magic syntax](https://help.github.com/en/articles/closing-issues-using-keywords). It's a good habit to get into anyway.