require("@babel/register")({
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
]});
   
  const router = require("./sitemap-routes").default;
//   import router from "./sitemap-routes";
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build("https://ay0.site")
            .save("./build/sitemap.xml")
            .save("./public/sitemap.xml")
      );
  }
  
  generateSitemap();
