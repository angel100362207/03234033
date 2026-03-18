#!/usr/bin/env node

import fs from "fs-extra";
import inquirer from "inquirer";

const prompts = {
  mobile: "./prompts/mobile.txt",
  web: "./prompts/web.txt",
  tesla: "./prompts/tesla.txt"
};

async function run() {
  console.clear();
  console.log("🚀 GOD AI CLI\n");

  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "¿Qué quieres generar?",
      choices: [
        { name: "📱 App Móvil (Nivel NASA)", value: "mobile" },
        { name: "🌐 App Web Fullstack", value: "web" },
        { name: "⚡ Ecosistema Tesla Nivel Dios", value: "tesla" }
      ]
    }
  ]);

  const prompt = await fs.readFile(prompts[type], "utf-8");

  console.log("\n🔥 COPIA ESTE PROMPT Y PÉGALO EN TU IA:\n");
  console.log(prompt);
}

run();