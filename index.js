const fs = require("fs");
const { async } = require("rxjs");
const inquirer = require("./node_modules/inquirer/lib/inquirer.js");

inquirer.prompt([
  {
    type: "input",
    message: "What is the project name?",
    name: "project",
  },
  {
    type: "checkbox",
    message: "check the chapter(s)in your README",
    name: "sections",
    choices: ["Overview", "Installation", "Usage", "Credits", "License"],
  },
  {
    type: "input",
    message: "Describe the Overview: ",
    name: "overview",
    when: (checked) => {
      if (checked.sections.includes("Overview")) {
        return true;
      }
      return false;
    },
  },
  {
    type: "input",
    message: "Describe the Installation: ",
    name: "installation",
    when: (checked) => {
      if (checked.sections.includes("Installation")) {
        return true;
      }
      return false;
    },
  },
  {
    type: "input",
    message: "Describe the Usage : ",
    name: "usage",
    when: (checked) => {
      if (checked.sections.includes("Usage")) {
        return true;
      }
      return false;
    },
  },
  {
    type: "input",
    message: "Credit(s) (separate with commas): ",
    name: "credits",
    when: (checked) => {
      if (checked.sections.includes("Credits")) {
        return true;
      }
      return false;
    },
  },
  {
    type: "input",
    message: "License: ",
    name: "license",
    when: (checked) => {
      if (checked.sections.includes("license")) {
        return true;
      }
      return false;
    },
  },
  
]);
