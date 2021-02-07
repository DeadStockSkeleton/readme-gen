const fs = require("fs");
const inquirer = require("inquirer");
inquirer.registerPrompt(
  "recursive",
  require("inquirer-recursive")
);

inquirer
  .prompt([
    {
      type: "input",
      message: "#",
      name: "Title",
      default: "Project Title",
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
      default: "Describe this project.",
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
      default: "A step by step of how to get project running.",
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
      default: "How would this project be used?",
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
      choices: ["MIT License", "GPLv3 License", "AGPL License"],
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
      default: "Your code of conduct and process of submitting pull requests.",
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
      default: "Test instructions",
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
      default: "Basic question",
      when: (checked) => {
        if (checked.sections.includes("Questions")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "[My Email]",
      name: "Email",
      default: "test@example.com",
      when: (checked) => {
        if (checked.sections.includes("Questions")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "[Github Username]",
      name: "Github",
      default: "username",
      when: (checked) => {
        if (checked.sections.includes("Questions")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "recursive",
      message: "Add questions",
      name: "addQ",
      when: (checked) => {
        if (checked.sections.includes("Questions")) {
          return true;
        }
        return false;
      },
      prompts: [
        {
          type: "input",
          name: "addedQ",
          message: "Question: ",
          default: "Basic question",
        },
      ],
    },
    {
      type: "recursive",
      message: "Add Custom Section",
      name: "addSection",
      prompts: [
        {
          type: "input",
          name: "sectionTitle",
          message: "# ",
          default: "Section Title",
        },
        {
          type: "input",
          name: "sectionDesc",
          message: (added) => {
            return `## ${
              added.sectionTitle.charAt(0).toUpperCase() +
              added.sectionTitle.slice(1)
            }\n\n`;
          },
          default: (added) => {
            return `Explain ${added.sectionTitle}...`;
          },
        },
      ],
    },
  ])
  .then(function (data) {
    let tableOfContents = "## Table of Contents\n\n";
    let selected = "";
    let list = "";
    let readmeFormat = "";
    let questions = "";
    let badge = "";
    if (data.sections.length === 0 && data.addSection.length === 0) {
      return;
    } else {
      if (data.addSection.length > 0) {
        for (let q = 0; q < data.addSection.length; q++) {
          selected += `## ${data.addSection[q].sectionTitle.charAt(0).toUpperCase() + data.addSection[q].sectionTitle.slice(1)}\n\n`;
          tableOfContents += `* [${
            data.addSection[q].sectionTitle.charAt(0).toUpperCase() +
            data.addSection[q].sectionTitle.slice(1)
          }](#${data.addSection[q].sectionTitle
            .toLowerCase()
            .replace(/\s/g, "_")})\n`;
          if (data.addSection[q].sectionDesc.indexOf("%") > -1) {
            list = data.addSection[q].sectionDesc.split("%");
            for (let a = 0; a < list.length; a++) {
              selected += `${a + 1 + ". " + list[a]}\n`;
            }
          } else {
            selected += `${data.addSection[q].sectionDesc}\n\n`;
          }
        }
      }

      if (data.sections.length > 0) {
        for (let i = 0; i < data.sections.length; i++) {
          selected += `## ${data.sections[i]}\n\n`;
          tableOfContents += `* [${
            data.sections[i].charAt(0).toUpperCase() + data.sections[i].slice(1)
          }](#${data.sections[i].toLowerCase()})\n`;
          if (data[data.sections[i]].indexOf("%") > -1) {
            list = data[data.sections[i]].split("%");
            for (let a = 0; a < list.length; a++) {
              selected += `${a + 1 + ". " + list[a]}\n`;
            }
          } else {
            selected += `${data[data.sections[i]]}\n\n`;
          }
        }

        if (data.sections.includes("Questions")) {
          for (let y = 0; y < data.addQ.length; y++) {
            questions += `${data.addQ[y].addedQ}\n\n`;
          }
          var contact = `### You can reach me at\n\n* [Github](https://github.com/${data.Github})\n* [My Email](${data.Email})`;
        }
      }

      if (data.License === "MIT License") {
        badge =
          "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n";
      } else if (data.License === "GPLv3 License") {
        badge =
          "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n";
      } else if (data.License === "AGPL License") {
        badge =
          "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)\n";
      } else {
        badge = "";
      }

      if (contact === undefined) {
        contact = "\n";
      }
      tableOfContents += `\n`;

      readmeFormat = `# ${data.Title}\n\n${badge}\n${tableOfContents}${selected}${questions}${contact}\n\n`;

      fs.appendFile("README.md", readmeFormat, (err) =>
        err
          ? console.error(err)
          : console.log("README.md created successfully!")
      );
    }
  })
  .catch((err) => {
    console.error(err);
  });
