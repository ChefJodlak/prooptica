/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://prooptica.pl',
  generateRobotsTxt: false, // We have a custom robots.txt
  generateIndexSitemap: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  
  // Exclude certain paths
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/404',
    '/500',
  ],
  
  // Additional paths to include
  additionalPaths: async (config) => {
    const result = [];
    
    // Add all main pages with specific priorities
    const pages = [
      { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() },
      { loc: '/o-nas', changefreq: 'monthly', priority: 0.8 },
      { loc: '/salony', changefreq: 'weekly', priority: 0.9 },
      { loc: '/kontakt', changefreq: 'monthly', priority: 0.8 },
      { loc: '/marki', changefreq: 'weekly', priority: 0.7 },
      { loc: '/artykuly', changefreq: 'daily', priority: 0.8 },
      { loc: '/umow-wizyte', changefreq: 'weekly', priority: 0.9 },
      { loc: '/oferta/badanie-wzroku', changefreq: 'monthly', priority: 0.9 },
    ];
    
    for (const page of pages) {
      result.push({
        loc: page.loc,
        changefreq: page.changefreq,
        priority: page.priority,
        lastmod: page.lastmod || new Date().toISOString(),
      });
    }
    
    return result;
  },
  
  // Transform function to add hreflang and image tags
  transform: async (config, path) => {
    // Default values
    const defaultConfig = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `${config.siteUrl}${path}`,
          hreflang: 'pl',
        },
      ],
    };
    
    // Higher priority for important pages
    if (path === '/') {
      return {
        ...defaultConfig,
        priority: 1.0,
        changefreq: 'daily',
      };
    }
    
    if (path.includes('/umow-wizyte') || path.includes('/salony')) {
      return {
        ...defaultConfig,
        priority: 0.9,
        changefreq: 'weekly',
      };
    }
    
    if (path.includes('/oferta')) {
      return {
        ...defaultConfig,
        priority: 0.9,
        changefreq: 'monthly',
      };
    }
    
    return defaultConfig;
  },
  
  // Robots.txt options (for reference, we use custom robots.txt)
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps if needed
      // 'https://prooptica.pl/sitemap-articles.xml',
    ],
  },
};
