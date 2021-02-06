const fs = require("fs");
const { async } = require("rxjs");
const inquirer = require("./node_modules/inquirer/lib/inquirer.js");
inquirer.registerPrompt('recursive', require("./node_modules/inquirer-recursive"))

inquirer.prompt([
  {
    type: "input",
    message: "What is the Project title?",
    name: "project",
    validate: function(x){
        if (x.length === 0){
            return 'Please add Project Title'
        }
        return true;
    }
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
  {
    type: 'recursive',
    message: 'Add another chapter? ',
    name: 'addedSections',
    prompts: [
        {
			type: 'input',
			name: 'Section',
			message: 'Chapter name: ',
			
		}, 
        {
            type: 'input',
            name: 'desc',
            message: 'List the Features (separate with commas): ',
            when: (answer) => {
                if (answer.Section.includes("features") || answer.Section.includes('Features')) {
                  return true;
                }
                return false;
              },
        },
        {
            type: 'input',
            name: 'desc',
            message: 'Badge URL (separate with commas): ',
            when: (answer) => {
                if (answer.Section.includes("badges") || answer.Section.includes('Badges')) {
                  return true;
                }
                return false;
              },
        },
        {
            type: 'input',
            name: 'desc',
            message: 'Contributing (separate with commas): ',
            when: (answer) => {
                if (answer.Section.includes("contributing") || answer.Section.includes('Contributing')) {
                  return true;
                }
                return false;
              },
        },
        {
            type: 'input',
            name: 'desc',
            message: 'Tests: (separate with commas): ',
            when: (answer) => {
                if (answer.Section.includes("tests") 
                || answer.Section.includes('Tests') 
                || answer.Section.includes('test') 
                || answer.Section.includes('Test')) {
                  return true;
                }
                return false;
              },
        },
        {
			type: 'input',
			name: 'desc',
			message: 'Chapter description: ',
			
		}, 
    ]
}
  
]);
