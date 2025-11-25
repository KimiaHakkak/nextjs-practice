// ----------------------------------------------- what is this top level file -----------------------------------------------

//Think of this file like the “settings panel” for your project. its the Configuration file for Next.js. pretty cool huh?





/** @type {import('next').NextConfig} */          //That’s a JSDoc type annotation, it tells the code edditor what kind of object nextConfig is supposed to be. like: “Hey, this variable (nextConfig) should follow the shape of a NextConfig object from the Next.js library.”

const nextConfig = {
  /* config options here */
  reactCompiler: true,                            //it enables the React Compiler, which optimizes rendering and re-renders intelligently under the hood (kind of like an automatic performance boost).

  turbopack: {
    root: import.meta.dirname, 
  }
};

export default nextConfig;                        //its a newer syntax than what was on the website. were using module system: ES Modules (next.config.mjs) instead of CommonJs (next.config.js)

