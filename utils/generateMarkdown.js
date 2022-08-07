// list of objects containing all the license types in the list for choosing 
const licenseType = [
  {
    name: 'none',
    abbreviation: 'none',
  },
  {
    name: 'Apache license 2.0',
    abbreviation: 'apache-2.0',
  },
  {
    name: 'GNU General Public License v3.0',
    abbreviation: 'gpl-3.0',
  },
  {
    name: 'MIT',
    abbreviation: 'mit',
  },
  {
    name: 'BSD 3-clause "New" or "Revised" license',
    abbreviation: 'bsd-3-clause',
  },
  {
    name: 'GNU General Public License v2.0',
    abbreviation: 'gpl-2.0',
  },
  {
    name: 'Mozilla Public License 2.0',
    abbreviation: 'mpl-2.0',
  }
]

// Create a function that returns a license badge based on which license is passed in
const renderLicenseBadge = (license) => {
  //we need to convert the display name that the user has chosen to the abbreviation used 
  // in the badge which is required by img.shields.io
  for(let i = 0; i < licenseType.length; i++){
    //iterate through the licenese list and find the same license object
    if(license == licenseType[i].name){
      // select the abbreviation
      let licenceAbbrev = licenseType[i].abbreviation;
      // convert the abbreviation to use the double -- as a single - will signify an end to the license type
      // on img.shields.io
      let result = licenceAbbrev.replace(/-/g, "--");
      return `<img alt="APM badge" src='https://img.shields.io/badge/license-${result}-blue'>`;
      //return image
    }
  }
}

// Create a function that returns the license link
const renderLicenseLink = (license) => {
  //iterate through the licenese list and find the same license object
  for(let i = 0; i < licenseType.length; i++){
    if(license == licenseType[i].name && licenseType[i].name != 'none'){
      // if name = none then there is no information at website no we wont return it
      return `https://choosealicense.com/licenses/${licenseType[i].abbreviation}`;
    }
  }
  // link to license section in case of option none selected
  return `#license`;
}

// Create a function that returns the license section of README
const renderLicenseSection = (license) => {
  // if none is selected display no license
  // if a valid license selected then use that license and also display link to website that describes that license.
  if (license != 'none'){
    return `This project is licensed under the ${license} license.
    More information can be found at ${(renderLicenseLink(license))}`;
  }else{
    return `No license has been selected`;
  }
}

// Create a function to generate markdown for README
// this markdown is for the main title (single #)
const generateHeader = (title) => {
  return `# ${title}`;
}

// Create a function to generate markdown for README
// this markdown is for any sub heading (double ##)
const generateHeaderSub = (title) => {
  return `## ${title}`;
}

const generateMarkdown = ({ github, email, project, description, license, dependancies, tests, knowledge, contributing}) => {

  /*
  generateHeader will generate the header (single #) markdown with the title passed in
  generateHeaderSub will generate the sub header (double ##) markdown with the title passed in
  renderLicenseBadge will obtain the image used for the license badge with the license passed in
  renderLicenseSection will generate the License section content with the license type chosen
  */
 return `${generateHeader(project)}


[${renderLicenseBadge(license)}](#license)

${generateHeaderSub('Description')}

${description}

${generateHeaderSub('Table of Contents')}

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

${generateHeaderSub('Installation')} 
\`\`\`
${dependancies}
\`\`\`

${generateHeaderSub('Usage')}

${knowledge}

${generateHeaderSub('License')}

${renderLicenseSection(license)} 

${generateHeaderSub('Contributing')}

${contributing}

${generateHeaderSub('Tests')}
\`\`\`
${tests}
\`\`\`

${generateHeaderSub('Questions')}

If you have any questions about the repo, open an issue in GitHib or contact me directly at [${email}](mailto:${email}). You can find more of my work at [GitHub](https://github.com/${github})`;
}

//exports functions and data types
module.exports = {
  licenseType,
  generateMarkdown
};
