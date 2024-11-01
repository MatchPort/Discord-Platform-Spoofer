// ============================================================ //
//                      Made by Matchport                       //
//                    Github.com/Matchport                      //
//                   Discord Platform Spoofer                   //
// ============================================================ //

const readline = require("readline");
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js-selfbot-v11");

const menuOptions = [
  "Set token",
  "Spoof Mobile",
  "Spoof Web",
  "Spoof PC/Client",
  "Spoof Embedded (Console)",
  "Exit"
];

function displayMenu() {
  console.clear();
  console.log("=== Discord Platform Spoofer ===");
  menuOptions.forEach((option, index) => {
    console.log(`${index}. ${option}`);
  });
  console.log("=== Made by Github.com/Matchport ===");
}

function handleSelection(choice) {
  switch (choice) {
    case "0":
      console.log("You selected: Set token");
      setToken();
      break;
    case "1":
      console.log("Loading Spoof..");
      console.log("Dont click anything until user is loaded.");
      startClient("Discord iOS", "Mobile");
      break;
    case "2":
      console.log("Loading Spoof..");
      console.log("Dont click anything until user is loaded.");
      startClient("Chrome", "Web");
      break;
    case "3":
      console.log("Loading Spoof..");
      console.log("Dont click anything until user is loaded.");
      startClient("Discord Client", "PC/Client");
      break;
    case "4":
      console.log("Loading Spoof..");
      console.log("Dont click anything until user is loaded.");
      startClient("Discord Embedded", "Embedded (Console)");
      break;
    case "5":
      console.log("Exiting... Goodbye!");
      rl.close();
      return false;
    default:
      console.log("Invalid selection. Please try again.");
  }
  return true;
}

function setToken() {
  rl.question("Enter your token: ", (token) => {
    const configFilePath = path.resolve(__dirname, "config.json");
    const configContent = { TOKEN: token };

    fs.writeFile(configFilePath, JSON.stringify(configContent, null, 2), (err) => {
      if (err) {
        console.error("Failed to write token to config.json:", err);
      } else {
        console.log("Token saved successfully to config.json!");
      }
      rl.question("Press Enter to return to the menu.", () => {
        runMenu();
      });
    });
  });
}

function startClient(browserType, spoofType) {
  const configFilePath = path.resolve(__dirname, "config.json");
  let token;

  try {
    const config = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
    token = config.TOKEN;
  } catch (err) {
    console.error("Failed to load token from config.json:", err);
    process.exit(1);
  }

  const client = new Discord.Client({
    ws: { properties: { $browser: browserType } },
  });

  client.on("ready", () => {
    console.clear();
    console.log(`Detected user ${client.user.tag}`);
    console.log(`Spoofed as ${spoofType}`);
    console.log("Spoof will last until you close this window. To stop the spoof, close this window. To use a different spoof, restart the program.");
  });

  client.login(token);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function runMenu() {
  displayMenu();
  rl.question("Enter your choice (0-5): ", (choice) => {
    if (handleSelection(choice)) {
      rl.question("Press Enter to return to the menu.", () => {
        runMenu();
      });
    }
  });
}

runMenu();
