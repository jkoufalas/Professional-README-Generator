const fs = require('fs');
const inquirer = require('inquirer');
const generate = require('./utils/generateMarkdown');
//including modules required

 // map the license list for the user questions from the generate markdown file
 // this will syncronise licenses to ask and then generate badges, links and content
 const listLicenseTypes = generate.licenseType.map(license => {
  // Copy the object being iterated over
  const pObj = { ...license };  
  // return the display name as this is the what the user will see in the question
  return pObj.name;
});
 
//Create an array of questions for user input
// this list is to be used by the inquirer prompt
const questions = [
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub Username?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
  },
  {
    type: 'input',
    name: 'project',
    message: 'Where is your Projects Name?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please write a short description of your project',
  },
  {
    type: 'list',
    name: 'license',
    message: 'What kind of license should your project have?',
    choices: listLicenseTypes,
  },
  {
    type: 'input',
    name: 'dependancies',
    message: 'What command should be run to install the dependancies?',
    default: 'npm i',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'What command should be run to run tests?',
    default: 'npm test',
  },
  {
    type: 'input',
    name: 'knowledge',
    message: 'What does the user need to know about running the repo?',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'What does the user need to know about contributing to the repo?',
  },
];


//Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
      err ? console.log(err) : console.log('Successfully created README!')
    );
}

// App initialisation
function init() {

  

  // use the inquirer package to prompt the list of questions
  inquirer
  .prompt(questions)
  //wait for response to all question and then use answers
  .then((answers) => {
    console.log('Geneating README...');
    // generate the readme in markdown language from template using response to all questions
    const readmePageContent = generateReadme(answers);
    // write the README file with the content generated
    writeToFile('./output/README.md', readmePageContent);
    
  });


}


const generateReadme = ({ github, email, project, description, license, dependancies, tests, knowledge, contributing}) => {

  /*
  generateMarkdown will generate the header (single #) markdown with the title passed in
  generateMarkdownSub will generate the sub header (double ##) markdown with the title passed in
  renderLicenseBadge will obtain the image used for the license badge with the license passed in
  renderLicenseSection will generate the License section content with the license type chosen
  */
 return `${generate.generateMarkdown(project)}


[${generate.renderLicenseBadge(license)}](#license)

${generate.generateMarkdownSub('Description')}

${description}

${generate.generateMarkdownSub('Table of Contents')}

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

${generate.generateMarkdownSub('Installation')} 
\`\`\`
${dependancies}
\`\`\`

${generate.generateMarkdownSub('Usage')}

${knowledge}

${generate.generateMarkdownSub('License')}

${generate.renderLicenseSection(license)} 

${generate.generateMarkdownSub('Contributing')}

${contributing}

${generate.generateMarkdownSub('Tests')}
\`\`\`
${tests}
\`\`\`

${generate.generateMarkdownSub('Questions')}

If you have any questions about the repo, open an issue in GitHib or contact me directly at [${email}](mailto:${email}). You can find more of my work at [GitHub](https://github.com/${github})`;
}

// Function call to initialize app
init();
