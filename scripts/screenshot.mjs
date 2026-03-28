import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");

const SITES = [
  { name: "kensa", url: "https://kensa-system.vercel.app/login?demo=true", waitFor: 3000 },
  { name: "customer", url: "https://customer-mgmt.vercel.app/login?demo=true", waitFor: 3000 },
  { name: "reservation", url: "https://reservation-app-steel.vercel.app/login?demo=true", waitFor: 3000 },
  { name: "monshin", url: "https://web-monshin.vercel.app/staff?demo=true", waitFor: 3000 },
  { name: "meo", url: "https://meo-kachiage-beta.vercel.app/login?demo=true", waitFor: 3000 },
  { name: "sleep", url: "https://sleep-check-single.vercel.app", waitFor: 3000 },
  { name: "nutrition", url: "https://nutrition-check-app.vercel.app", waitFor: 3000 },
  { name: "gut", url: "https://gut-health-check.vercel.app", waitFor: 3000 },
];

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const site of SITES) {
    console.log(`Capturing ${site.name}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    try {
      await page.goto(site.url, { waitUntil: "networkidle2", timeout: 15000 });
      await new Promise(r => setTimeout(r, site.waitFor));
      await page.screenshot({
        path: path.join(outDir, `${site.name}.png`),
        fullPage: false,
      });
      console.log(`  -> ${site.name}.png saved`);
    } catch (e) {
      console.error(`  -> Failed: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log("Done!");
}

main();
