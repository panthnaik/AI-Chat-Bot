// lcd.js
const five = require("johnny-five");
const board = new five.Board();

board.on("ready", () => {
  // Create LCD object for I2C interface
  const lcd = new five.LCD({
    controller: "PCF8574" // Most common I2C LCD backpack driver
  });

  lcd.print("Hello Noothan!");
  lcd.cursor(1, 0).print("LCD via JS!");

  // Optional: Blink backlight after 3s
  setTimeout(() => {
    lcd.noBacklight();
  }, 3000);
});
