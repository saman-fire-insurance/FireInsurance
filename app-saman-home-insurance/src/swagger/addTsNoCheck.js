const fs = require('fs');
const path = require('path');

// Path to the CancelablePromise.ts file
const cancelablePromiseFilePath = path.join(__dirname, '../swagger/core/CancelablePromise.ts');
// Path to the OpenAPI.ts file
const openApiFilePath = path.join(__dirname, '../swagger/core/OpenAPI.ts');

// Function to add "// @ts-nocheck" to the first line of the file
const addTsNoCheck = () => {
  // Check if the file exists
  if (fs.existsSync(cancelablePromiseFilePath)) {
    // Read the content of the file
    const fileContent = fs.readFileSync(cancelablePromiseFilePath, 'utf8');

    // Check if "@ts-nocheck" is already added
    if (!fileContent.startsWith('// @ts-nocheck')) {
      // Prepend "// @ts-nocheck" to the file content
      const updatedContent = `// @ts-nocheck\n${fileContent}`;
      
      // Write the updated content back to the file
      fs.writeFileSync(cancelablePromiseFilePath, updatedContent, 'utf8');
      console.log('Added "// @ts-nocheck" to CancelablePromise.ts');
    } else {
      console.log('"// @ts-nocheck" is already present.');
    }
  } else {
    console.error(`File not found: ${cancelablePromiseFilePath}`);
  }
};

// Function to update OpenAPI BASE with environment variable
const updateOpenApiConfig = () => {
  if (fs.existsSync(openApiFilePath)) {
    let fileContent = fs.readFileSync(openApiFilePath, 'utf8');
    
    // Replace the hardcoded BASE URL with environment variable
    const updatedContent = fileContent.replace(
      /BASE: '[^']*'/,
      "BASE: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'"
    );
    
    if (updatedContent !== fileContent) {
      fs.writeFileSync(openApiFilePath, updatedContent, 'utf8');
      console.log('Updated OpenAPI BASE to use environment variable');
    } else {
      console.log('OpenAPI BASE already configured with environment variable');
    }
  } else {
    console.error(`File not found: ${openApiFilePath}`);
  }
};

// Execute the functions
addTsNoCheck();
updateOpenApiConfig();