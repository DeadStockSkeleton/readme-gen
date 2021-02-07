const chalk = require("./node_modules/chalk");
const fs = require("fs");
const inquirer = require("./node_modules/inquirer/lib/inquirer.js");
inquirer.registerPrompt(
  "recursive",
  require("./node_modules/inquirer-recursive")
);

inquirer
  .prompt([
    {
      type: "input",
      message: chalk.green("#"),
      name: "title",
      default: chalk.magenta("Project Title"),
    },
    {
      type: "checkbox",
      message: "Check desired section(s) for your README",
      name: "sections",
      choices: [
        "Description",
        "Installation",
        "Usage",
        "License",
        "Contributing",
        "Tests",
        "Questions",
      ],
    },
    {
      type: "input",
      message: "## Description\n\n",
      name: "Description",
      value: "section",
      default: chalk.magenta("Describe this project."),
      when: (checked) => {
        if (checked.sections.includes("Description")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "## Installation\n\n",
      name: "Installation",
      value: "section",
      default: chalk.magenta("A step by step of how to get project running."),
      when: (checked) => {
        if (checked.sections.includes("Installation")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "## Usage\n\n",
      name: "Usage",
      value: "section",
      default: chalk.magenta("How would this project be used?"),
      when: (checked) => {
        if (checked.sections.includes("Usage")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "list",
      message: "## License\n\n",
      name: "License",
      choices: ['MIT License','GPLv3 License','AGPL License'],
      when: (checked) => {
        if (checked.sections.includes("License")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "## Contributing\n\n",
      name: "Contributing",
      value: "section",
      default: chalk.magenta("Your code of conduct and process of submitting pull requests"),
      when: (checked) => {
        if (checked.sections.includes("Contributing")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "## Tests\n\n",
      name: "Tests",
      value: "section",
      default: chalk.magenta("Test instructions"),
      when: (checked) => {
        if (checked.sections.includes("Tests")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "## Questions\n\n",
      name: "Questions",
      value: "section",
      default: chalk.magenta("Basic question"),
      when: (checked) => {
        if (checked.sections.includes("Questions")) {
          return true;
        }
        return false;
      },
    },
    {
        type: "input",
        message: "Email: ",
        name: "Email",
        default: chalk.magenta("example@email.com"),
        value: "section",
        when: (checked) => {
          if (checked.sections.includes("Questions")) {
            return true;
          }
          return false;
        },
      },
      {
        type: "input",
        message: "Github username: ",
        name: "Github",
        default: chalk.magenta("username"),
        value: "section",
        when: (checked) => {
          if (checked.sections.includes("Questions")) {
            return true;
          }
          return false;
        },
      },
      {
        type: "recursive",
        message: "Add another question?",
        name: "addQ",
        when: (checked) => {
            if (checked.sections.includes("Questions")) {
              return true;
            }
            return false;
          },
        prompts: [{
            type: "input",
            name: "addedQ",
            message: "Question: ",
            default: chalk.magenta("Basic question"), 
        }]
      }
  ])
  .then(function (data) {
    let TOC = [];
    let tableOfContents = "# Table of Contents\n\n";
    let selected = "";
    let list = "";
    let readmeFormat = ''
    let questions = ''
    
    if (data.sections.length === 0){
      return 0;  
    }
    else{
      for (let i = 0; i < data.sections.length; i++) {
      selected += `## ${data.sections[i]}\n\n`;
      TOC.push({
        title: data.sections[i].charAt(0).toUpperCase() + data.sections[i].slice(1),
        link: data.sections[i].toLowerCase(),
      });

      if (data[data.sections[i]].indexOf("%") > -1) {
        list = data[data.sections[i]].split("%");
        for (let a = 0; a < list.length; a++) {
            selected += `${(a + 1 + ". " + list[a])}\n`;
          }
      } else {
        selected += `${data[data.sections[i]]}\n\n`;
      }
    }

    if (data.sections.includes('Questions')) {
        for (let y = 0; y < data.addQ.length; y++) {
            questions += `${data.addQ[y].addedQ}\n`;
        } 
        var contact = `### You can reach me at\n\n* [Github](https://github.com/${data.Github})\n* [My Email](${data.Email})`;
 
    }

    if (contact === undefined){
        contact = '';
    }

    

    for (let z = 0; z < TOC.length; z++) {
      tableOfContents += chalk.yellow(`* [${TOC[z].title}](#${TOC[z].link})\n`);
    }
    tableOfContents += `\n`;

    readmeFormat = `# ${data.title}\n\n${tableOfContents}${selected}${questions}${contact}`
    console.log(readmeFormat);  
    }
    
  }).catch(err => {
      console.error(err + ': Something went wrong!');
  });
