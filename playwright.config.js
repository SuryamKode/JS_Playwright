// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  //timeout: 15000,
  reporter: 'html',
  expect:{

    timeout:10000
  },
  use: {

    browserName:'chromium',
    headless:false,
    video:'on',
    launchOptions:{
      slowMo:1000
    }
    
  }


});

module.exports= config