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
      message: "What is the Project title?",
      name: "project",
      validate: function (x) {
        if (x.length === 0) {
          return "Please add Project Title";
        }
        return true;
      },
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
      name: "Overview",
      value: "sec",
      when: (checked) => {
        if (checked.sections.includes("Overview")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "List the Installation (use % to separate): ",
      name: "Installation",
      value: "sec",
      when: (checked) => {
        if (checked.sections.includes("Installation")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "Describe the Usage: ",
      name: "Usage",
      value: "sec",
      when: (checked) => {
        if (checked.sections.includes("Usage")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "input",
      message: "Credit(s) (use % to separate): ",
      name: "Credits",
      value: "sec",
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
      name: "License",
      value: "sec",
      when: (checked) => {
        if (checked.sections.includes("License")) {
          return true;
        }
        return false;
      },
    },
    {
      type: "recursive",
      message: "Add another chapter? ",
      name: "addedSections",
      prompts: [
        {
          type: "input",
          name: "Section",
          message: "Chapter name: ",
        },
        {
          type: "input",
          name: "desc",
          message: "List the Features (use % to separate): ",
          when: (answer) => {
            if (
              answer.Section.includes("features") ||
              answer.Section.includes("Features")
            ) {
              return true;
            }
            return false;
          },
        },
        {
          type: "input",
          name: "desc",
          message: "Badge URL (use % to separate): ",
          when: (answer) => {
            if (
              answer.Section.includes("badges") ||
              answer.Section.includes("Badges")
            ) {
              return true;
            }
            return false;
          },
        },
        {
          type: "input",
          name: "desc",
          message: "Contributing (use % to separate): ",
          when: (answer) => {
            if (
              answer.Section.includes("contributing") ||
              answer.Section.includes("Contributing")
            ) {
              return true;
            }
            return false;
          },
        },
        {
          type: "input",
          name: "desc",
          message: "Tests: (use % to separate): ",
          when: (answer) => {
            if (
              answer.Section.includes("tests") ||
              answer.Section.includes("Tests") ||
              answer.Section.includes("test") ||
              answer.Section.includes("Test")
            ) {
              return true;
            }
            return false;
          },
        },
        {
          type: "input",
          name: "desc",
          message: "License: ",
          when: (answer) => {
            if (
              answer.Section.includes("license") ||
              answer.Section.includes("License")
            ) {
              return true;
            }
            return false;
          },
        },
        {
          type: "input",
          name: "desc",
          message: "Credit(s) (use % to separate): ",
          when: (answer) => {
            if (
              answer.Section.includes("credits") ||
              answer.Section.includes("Credits")
            ) {
              return true;
            }
            return false;
          },
        },
        {
          type: "input",
          name: "desc",
          message: "Describe the Usage: ",
          when: (answer) => {
            if (
              answer.Section.includes("usage") ||
              answer.Section.includes("Usage")
            ) {
              return true;
            }
            return false;
          },
        },
        {
          type: "input",
          name: "desc",
          message: "List the Installation (use % to separate): ",
          when: (answer) => {
            if (
              answer.Section.includes("installation") ||
              answer.Section.includes("Installation")
            ) {
              return true;
            }
            return false;
          },
        },
        {
          type: "input",
          name: "desc",
          message: "Describe the Overview: ",
          when: (answer) => {
            if (
              answer.Section.includes("overview") ||
              answer.Section.includes("Overview")
            ) {
              return true;
            }
            return false;
          },
        },
        {
          type: "input",
          name: "desc",
          message: "Description: ",
          when: (answer) => {
            if (
              answer.Section.includes("Description") ||
              answer.Section.includes("description")
            ) {
              return true;
            }
            return false;
          },
        },
        {
          type: "input",
          name: "desc",
          message: "Chapter description: ",
        },
      ],
    },
  ])
  .then(function (data) {
    let chapters = [];
    let toc = []
    let checkedSection = "";
    let list = "";
    let tableOfContents = '';
    for (let i = 0; i < data.sections.length; i++) {
      checkedSection += `## ${data.sections[i]}\n
        `;
      if (data[data.sections[i]].indexOf("%") > -1) {
        list = data[data.sections[i]].split("%");
        for (let a = 0; a < list.length; a++) {
          checkedSection += `${(a + 1 + ". " + list[a]).trim()}\n`;
        }
      } else {
        checkedSection += `
        ${data[data.sections[i]]}
        `;
      }
      toc.push({
        title: data.sections[i].charAt(0).toUpperCase() + data.sections[i].slice(1),
        link: data.sections[i].toLowerCase(),
    } )
      
    }
    for (let i = 0; i < data.addedSections.length; i++) {
      chapters[i] = {
        name: data.addedSections[i].Section,
        desc: data.addedSections[i].desc,
      };

      toc.push({
          title: data.addedSections[i].Section.charAt(0).toUpperCase() + data.addedSections[i].Section.slice(1),
          link: data.addedSections[i].Section.toLowerCase(),
      } )
    }

    let addedSection = "";
    let secList = "";
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].desc.indexOf("%") > -1) {
        secList = chapters[i].desc.split("%");
        for (let a = 0; a < secList.length; a++) {
          addedSection += `${(a + 1 + ". " + secList[a]).trim()}`;
        }
      } else{
         addedSection += `
        ## ${chapters[i].name.charAt(0).toUpperCase() + chapters[i].name.slice(1)}

        ${chapters[i].desc}
                   
        `; 
      }
        
      
    }

    for (let z = 0; z < toc.length; z++){
        tableOfContents += `* [${toc[z].title}](#${toc[z].link})\n`
    }
    
    let readmeFormat = `# ${data.project.charAt(0).toUpperCase() + data.project.slice(1)}\n
    ${tableOfContents}\n${checkedSection}${addedSection}\n`
      
      console.log(readmeFormat);
  });
