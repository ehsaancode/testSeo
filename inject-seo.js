const fs = require('fs');
const path = require('path');

const seoArrayPath = path.join(__dirname, 'src', 'utils', 'SeoArray.jsx');
const indexHtmlPath = path.join(__dirname, 'index.html');

try {
    console.log('Reading SeoArray.jsx from:', seoArrayPath);
    let seoFileContent = fs.readFileSync(seoArrayPath, 'utf8');

    // Find the array content
    const start = seoFileContent.indexOf('[');
    const end = seoFileContent.lastIndexOf(']');

    if (start === -1 || end === -1) {
        throw new Error('Could not find seoArray array in file');
    }

    const arrayString = seoFileContent.substring(start, end + 1);

    // Use eval to parse the array string safely in this context
    const seoArray = eval('(' + arrayString + ')');

    const homeSeo = seoArray.find(item => item.route_path === '/');

    if (!homeSeo) {
        console.warn('No SEO data found for home route "/"');
        process.exit(0);
    }

    console.log('Found SEO data for home route:', homeSeo);

    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

    // Construct meta tags
    const metaTags = [
        `<!-- Injected SEO Tags -->`,
        `<title>${homeSeo.page_title || 'Kuick Studio'}</title>`,
        `<meta name="description" content="${homeSeo.page_description || ''}" />`,
        `<meta name="keywords" content="${homeSeo.page_keyword || ''}" />`,
        `<link rel="icon" href="${homeSeo.page_favicon || ''}" />`,

        `<!-- Open Graph / Facebook -->`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:title" content="${homeSeo.page_title || ''}" />`,
        `<meta property="og:description" content="${homeSeo.page_description || ''}" />`,
        `<meta property="og:image" content="${homeSeo.page_image || ''}" />`,
        `<meta property="og:url" content="${homeSeo.canonical_url || ''}" />`,
        `<link rel="canonical" href="${homeSeo.canonical_url || ''}" />`,

        `<!-- Twitter -->`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${homeSeo.page_title || ''}" />`,
        `<meta name="twitter:description" content="${homeSeo.page_description || ''}" />`,
        `<meta name="twitter:image" content="${homeSeo.page_image || ''}" />`,
        `<!-- End Injected SEO Tags -->`
    ].join('\n    ');

    // Inject into <head>
    if (indexHtml.includes('<!-- Injected SEO Tags -->')) {
        console.log('Replacing existing injected tags...');
        indexHtml = indexHtml.replace(/<!-- Injected SEO Tags -->[\s\S]*?<!-- End Injected SEO Tags -->/, metaTags);
    } else {
        console.log('Inserting new tags before </head>...');
        indexHtml = indexHtml.replace('</head>', `${metaTags}\n  </head>`);
    }

    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log('Successfully injected SEO tags into index.html');

} catch (err) {
    console.error('Error injecting SEO tags:', err);
    process.exit(1);
}
