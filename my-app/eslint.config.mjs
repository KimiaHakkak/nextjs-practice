// ----------------------------------------------- what is this file -----------------------------------------------

//Next.js provides an ESLint plugin, @next/eslint-plugin-next, already bundled within the base configuration that makes it possible to catch common issues and problems in a Next.js application.
/*
ESLint is a tool that automatically checks your JavaScript (or TypeScript) code for:
      -Syntax errors
      -Bad coding practices
      -Violations of style or project conventions

It’s like a “grammar checker” for your code — it ensures your code is clean, consistent, and bug-free before it even runs.
*/



import { defineConfig, globalIgnores } from "eslint/config"; //This imports functions to define an ESLint configuration using the new modern ESLint flat config format.
import nextVitals from "eslint-config-next/core-web-vitals"; //This ensures your code follows Next.js + React quality standards.

const eslintConfig = defineConfig([                          //This wraps your configuration array so ESLint knows how to interpret it. basically create a configuration using defineConfig()
  ...nextVitals,                                             //Spread the default Next.js + React ESLint rules that we imported as an array.
  // Override default ignores of eslint-config-next.
  globalIgnores([                                            //This tells ESLint which files or folders to ignore completely when checking your code.
    // Default ignores of eslint-config-next:
    ".next/**",                                              //the compiled app build folder
    "out/**",                                                //output folders
    "build/**",                                              //output folders
    "next-env.d.ts",                                         //automatically generated TypeScript definitions (irrelevant for linting)
  ]),
]);

export default eslintConfig;                                 //Export it so ESLint knows what to use. If you ever run: npm run lint, It uses this file to check your entire project for problems.
