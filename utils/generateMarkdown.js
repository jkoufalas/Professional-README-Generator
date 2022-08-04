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
const generateMarkdown = (title) => {
  return `# ${title}`;
}

// Create a function to generate markdown for README
// this markdown is for any sub heading (double ##)
const generateMarkdownSub = (title) => {
  return `## ${title}`;
}

//exports functions and data types
module.exports = {
  generateMarkdown,
  renderLicenseLink,
  renderLicenseSection,
  renderLicenseBadge,
  generateMarkdownSub,
  licenseType
};
