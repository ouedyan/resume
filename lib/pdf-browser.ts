import { access } from "node:fs/promises";

import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

const localChromeCandidates = {
  darwin: [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
  ],
  linux: [
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ],
  win32: [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ],
} as const;

async function firstExecutablePath(paths: readonly string[]): Promise<string | null> {
  for (const path of paths) {
    try {
      await access(path);
      return path;
    } catch {
      // Try the next conventional installation path.
    }
  }

  return null;
}

async function localChromeExecutablePath(): Promise<string> {
  if (process.env.CHROME_EXECUTABLE_PATH) {
    await access(process.env.CHROME_EXECUTABLE_PATH);
    return process.env.CHROME_EXECUTABLE_PATH;
  }

  const candidates =
    localChromeCandidates[
      process.platform as keyof typeof localChromeCandidates
    ] ?? [];
  const executablePath = await firstExecutablePath(candidates);

  if (!executablePath) {
    throw new Error(
      "No local Chrome executable found. Set CHROME_EXECUTABLE_PATH.",
    );
  }

  return executablePath;
}

function isServerlessRuntime(): boolean {
  return Boolean(
    process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.AWS_EXECUTION_ENV,
  );
}

export async function launchPdfBrowser() {
  const serverless = isServerlessRuntime();
  const executablePath = serverless
    ? await chromium.executablePath()
    : await localChromeExecutablePath();
  const launchArgs = serverless ? chromium.args : [];

  return puppeteer.launch({
    args: await puppeteer.defaultArgs({
      args: launchArgs,
      headless: "shell",
    }),
    executablePath,
    headless: "shell",
  });
}
