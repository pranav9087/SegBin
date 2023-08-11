
#include "pin_config.h"


#include <WiFi.h>          // Replace with WiFi.h for ESP32
#include <WebServer.h>     // Replace with WebServer.h for ESP32
#include <AutoConnect.h>
#include "TFT_eSPI.h"

WebServer Server;          // Replace with WebServer for ESP32
AutoConnect Portal(Server);
TFT_eSPI tft = TFT_eSPI();

void rootPage() {
  char content[] = "Hello, world";
  Server.send(200, "text/plain", content);
}

void displayConnected() {
  tft.fillScreen(TFT_BLACK);  // Clear the screen to white color
  tft.setTextColor(TFT_GREEN);  // Set the text color to green
  tft.setTextSize(2);  // Set the text size to a bigger value

  // Set the font and size
  tft.loadFont("TenorSans-Regular.ttf", SPIFFS);  // Load the Tenor Sans font from the SPIFFS (flash memory)

  int screenWidth = tft.width();
  int screenHeight = tft.height();

  // Calculate the center coordinates for the text
  int textWidth = tft.textWidth("Connected successfully");
  int textHeight = tft.fontHeight() + 8;
  int x = (screenWidth - textWidth) / 2;
  int y = (screenHeight - (2 * textHeight)) / 2;

  // Display the first line of text on the screen
  tft.drawString("Connected successfully", x, y);

  // Calculate the center coordinates for the second line of text
  textWidth = tft.textWidth("Welcome");
  x = (screenWidth - textWidth) / 2;
  y += textHeight;  // Increment the y-coordinate for the second line of text

  // Display the second line of text on the screen
  tft.drawString("Welcome", x, y);
}

void displayTerraVortex() {
  tft.fillScreen(TFT_BLACK);  // Clear the screen to black color
  tft.setTextColor(TFT_BLUE);  // Set the text color to RED
  tft.setTextSize(4);  // Set the text size to a bigger value

  // Set the font and size
  tft.loadFont("TenorSans-Regular.ttf", SPIFFS);  // Load the Tenor Sans font from the SPIFFS (flash memory)

  int screenWidth = tft.width();
  int screenHeight = tft.height();

  // Calculate the center coordinates for the text
  int textWidth = tft.textWidth("TerraVortex");
  int textHeight = tft.fontHeight() + 8;
  int x = (screenWidth - textWidth) / 2;
  int y = (screenHeight - textHeight) / 2;

  // Display the text on the screen
  tft.drawString("TerraVortex", x, y);
}

void displayReady() {
  tft.fillScreen(TFT_BLACK);  // Clear the screen to black color
  tft.setTextColor(TFT_WHITE);  // Set the text color to RED
  tft.setTextSize(3);  // Set the text size to a bigger value

  // Set the font and size
  tft.loadFont("TenorSans-Regular.ttf", SPIFFS);  // Load the Tenor Sans font from the SPIFFS (flash memory)

  int screenWidth = tft.width();
  int screenHeight = tft.height();

  // Calculate the center coordinates for the text
  int textWidth = tft.textWidth("Throw your thrash");
  int textHeight = tft.fontHeight() + 8;
  int x = (screenWidth - textWidth) / 2;
  int y = (screenHeight - textHeight) / 2;

  // Display the text on the screen
  tft.drawString("Throw your thrash", x, y);
}

void displayProcess() {
  tft.fillScreen(TFT_BLACK);  // Clear the screen to black color
  tft.setTextColor(TFT_RED);  // Set the text color to RED
  tft.setTextSize(3);  // Set the text size to a bigger value

  // Set the font and size
  tft.loadFont("TenorSans-Regular.ttf", SPIFFS);  // Load the Tenor Sans font from the SPIFFS (flash memory)

  int screenWidth = tft.width();
  int screenHeight = tft.height();

  // Calculate the center coordinates for the text
  int textWidth = tft.textWidth("Processing...");
  int textHeight = tft.fontHeight() + 8;
  int x = (screenWidth - textWidth) / 2;
  int y = (screenHeight - textHeight) / 2;

  // Display the text on the screen
  tft.drawString("Processing...", x, y);
}

void displayBinHatch(int binNumber) {
  tft.fillScreen(TFT_BLACK);  // Clear the screen to black color
  tft.setTextColor(TFT_GREEN);  // Set the text color to green
  tft.setTextSize(3);  // Set the text size to a bigger value

  // Set the font and size
  tft.loadFont("TenorSans-Regular.ttf", SPIFFS);  // Load the Tenor Sans font from the SPIFFS (flash memory)

  int screenWidth = tft.width();
  int screenHeight = tft.height();

  // Calculate the center coordinates for the text
  int textWidth = tft.textWidth("Throw trash into Bin 999");  // Max width for "Bin 999"
  int textHeight = tft.fontHeight() + 8;
  int x = (screenWidth - textWidth) / 2;
  int y = (screenHeight - textHeight) / 2;

  // Create a message string with the bin number
  String message = "Throw trash into Bin " + String(binNumber);

  // Display the text on the screen
  tft.drawString(message, x, y);
}


void displaySegBin() {
  tft.fillScreen(TFT_WHITE);  // Clear the screen to black color
  tft.setTextColor(TFT_BLACK);  // Set the text color to RED
  tft.setTextSize(4);  // Set the text size to a bigger value

  // Set the font and size
  tft.loadFont("TenorSans-Regular.ttf", SPIFFS);  // Load the Tenor Sans font from the SPIFFS (flash memory)

  int screenWidth = tft.width();
  int screenHeight = tft.height();

  // Calculate the center coordinates for the text
  int textWidth = tft.textWidth("SegBin.ai");
  int textHeight = tft.fontHeight() + 8;
  int x = (screenWidth - textWidth) / 2;
  int y = (screenHeight - textHeight) / 2;

  // Display the text on the screen
  tft.drawString("SegBin.ai", x, y);
}

void displaySetup() {
  tft.fillScreen(TFT_WHITE);  // Clear the screen to white color
  tft.setTextColor(TFT_BLACK);  // Set the text color to black
  tft.setTextSize(2);  // Set the text size to a bigger value

  // Set the font and size
  tft.loadFont("TenorSans-Regular.ttf", SPIFFS);  // Load the Tenor Sans font from the SPIFFS (flash memory)

  int screenWidth = tft.width();
  int screenHeight = tft.height();

  // Calculate the center coordinates for the text
  int textWidth = tft.textWidth("Connect to device wifi");
  int textHeight = tft.fontHeight() + 8;
  int x = (screenWidth - textWidth) / 2;
  int y = (screenHeight - (2 * textHeight)) / 2;

  // Display the first line of text on the screen
  tft.drawString("Connect to device wifi", x, y);

  // Calculate the center coordinates for the second line of text
  textWidth = tft.textWidth("esp32AP for setup");
  x = (screenWidth - textWidth) / 2;
  y += textHeight;  // Increment the y-coordinate for the second line of text

  // Display the second line of text on the screen
  tft.drawString("esp32AP for setup", x, y);
}


void setup() {
  pinMode(PIN_POWER_ON, OUTPUT);
  digitalWrite(PIN_POWER_ON, HIGH);
  Serial.begin(115200);
  Serial.printf("psram size : %d kb\r\n", ESP.getPsramSize() / 1024);
  Serial.printf("FLASH size : %d kb\r\n", ESP.getFlashChipSize() / 1024);

  tft.begin();
  tft.setRotation(3);

  displayTerraVortex();  // Display the word "TerraVortex" on the TFT display
  delay(2000);
  displaySegBin();
  delay(2000);
  WiFi.disconnect(true);
  displaySetup();


  Server.on("/", rootPage);
  if (Portal.begin()) {
    Serial.println("WiFi connected: " + WiFi.localIP().toString());
    displayConnected();  // Display "Connected successfully" and "Welcome" after connecting to WiFi
    delay(2000);
    while(true) {
      displayReady();
      delay(2000);
      displayProcess();
      delay(2000);
      displayBinHatch(3);
      delay(2000);
    }
    
  }
}

void loop() {
  Portal.handleClient();
}

//the above code works
