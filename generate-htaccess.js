// generate-htaccess.js
const fs = require("fs")
const path = require("path")

// Configuration
const outDir = path.join(__dirname, "out") // Your Next.js output directory

// Function to find all HTML files
function findHtmlFiles(dir, fileList = [], baseDir = dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (
      stats.isDirectory() &&
      !file.startsWith(".") &&
      !["_next", "static"].includes(file)
    ) {
      // Recursive call for directories
      findHtmlFiles(filePath, fileList, baseDir)
    } else if (
      file.endsWith(".html") &&
      file !== "index.html" &&
      file !== "404.html"
    ) {
      // Get relative path from base directory
      const relativePath = path.relative(baseDir, filePath)
      fileList.push(relativePath)
    }
  })

  return fileList
}

// Generate the .htaccess file
function generateHtaccess() {
  // Find all HTML files
  const htmlFiles = findHtmlFiles(outDir)

  // Prepare route rules
  let topLevelRules = ""
  let nestedRules = ""

  htmlFiles.forEach((htmlFile) => {
    // Get the path without .html extension
    const routePath = htmlFile.replace(".html", "")

    // Check if this is a top-level route or nested route
    if (!routePath.includes("/")) {
      // Top-level route (e.g., "about.html" => "/about")
      topLevelRules += `  RewriteRule ^${routePath}$ /${htmlFile} [L]\n`
      topLevelRules += `  RewriteRule ^${routePath}/$ /${htmlFile} [L]\n`
    } else {
      // Nested route (e.g., "work/fletnix.html" => "/work/fletnix")
      nestedRules += `  RewriteRule ^${routePath}$ /${htmlFile} [L]\n`
      nestedRules += `  RewriteRule ^${routePath}/$ /${htmlFile} [L]\n`
    }
  })

  // Create the .htaccess content
  const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Disable automatic directory slashes
  DirectorySlash Off
  
  # Specific rules for top-level routes
${topLevelRules}
  # Specific rules for nested routes
${nestedRules}
  # If the requested resource exists as a file, serve it directly
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]
  
  # If the requested resource doesn't exist but the .html file does, serve it
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
  
  # If the request is for a directory with an index.html, serve that
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)$ $1/index.html [L]
  
  # If nothing else matches, try the home page
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

# Prevent directory listings
Options -Indexes

# Handle errors
ErrorDocument 403 /404.html
ErrorDocument 404 /404.html
ErrorDocument 500 /404.html`

  // Write the .htaccess file
  fs.writeFileSync(path.join(outDir, ".htaccess"), htaccessContent)

  console.log("Generated .htaccess file with rules for:")
  console.log(
    "- Top-level routes:",
    htmlFiles.filter((file) => !file.includes("/")).length
  )
  console.log(
    "- Nested routes:",
    htmlFiles.filter((file) => file.includes("/")).length
  )
}

// Run the generator
generateHtaccess()
