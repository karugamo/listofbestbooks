module.exports = {
  siteMetadata: {
    siteUrl: "https://listofbestbooks.com",
    title: "List of Best Books",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-PY93WWDCX6",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
  ],
};
