#include <LiquidCrystal_I2C.h>
#include <Wire.h>


#define ButtonUp 6
#define ButtonDown 4
#define ButtonPush 2
#define maxTime 60      // the DNF timer in sec
#define sensitivity 100 //how sensitive the car sensor is
#define buttonG 8   //begin button
#define Sensor0 A8  //car 1 sensor
#define Sensor1 A9  //car 2 sensor
#define Sensor2 A10 //car 3 sensor

unsigned long begintime = 0;

int sensorBegin = 0;
int sensorValue0 = 0;
int sensorValue1 = 0;
int sensorValue2 = 0;
int baseLight0;
int baseLight1;
int baseLight2;
int CarA;
int CarB;
int CarC;
int MenuState = 1;
int OldMenuState = 1;
int MenuSelect = 0;

float endTime0 = 0;
float endTime1 = 0;
float endTime2 = 0;
float DeltaTime;
float car0 = 0;
float car1 = 0;
float car2 = 0;

bool  beginTimeDone;
bool  recording;
bool OldUp = HIGH;
bool OldDown = HIGH;
bool Button;
bool OldPush;


// Setup a RoraryEncoder for pins 2 and 3 and the Screen
LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup()
{
  pinMode(buttonG, INPUT_PULLUP);
  pinMode(ButtonPush, INPUT_PULLUP);
  pinMode(ButtonUp, INPUT_PULLUP);
  pinMode(ButtonDown, INPUT_PULLUP);
  Serial.begin(115200);
  Serial3.begin(115200);
  Serial.println("Pinewood derby timer program");
  lcd.init();// initialize the lcd
  lcd.backlight();
  lcd.noCursor();
  baseLight0 = analogRead(Sensor0);
  baseLight1 = analogRead(Sensor1);
  baseLight2 = analogRead(Sensor2);
}

void loop()
{
  UpdateScreen(Buttons()); //update enconder and return Rotation
}

String Buttons(void)
{
  String Rotation;
  bool Up = digitalRead(ButtonUp);
  bool Down = digitalRead(ButtonDown);

  if (Up != OldUp && Up == HIGH) {
    Rotation = "up";
    // bSerial.println(Rotation);
  }
  else if (Down != OldDown && Down == HIGH) {
    Rotation = "down";
    //Serial.println(Rotation);
  }
  else {
    Rotation = "NULL";
  }

  OldUp = Up;
  OldDown = Down;
  return Rotation ;
}



void UpdateScreen(String Rotation) {
  if (Rotation.equals("up")) {
    MenuState = MenuState + 1;
  }
  else if (Rotation.equals("down")) {
    MenuState = MenuState - 1;
  }

  if (MenuState > 4) {
    MenuState = 1;
  }
  else if (MenuState < 1) {
    MenuState = 4;
  }

  //Serial.println(MenuState);
  bool Button = digitalRead(ButtonPush);
  bool Push = digitalRead(ButtonPush);
  if (Push != OldPush && Push == LOW) {
    bool Button = LOW;
  }
  else {
    bool Button = HIGH;
  }

  //Serial.println(Button);
  OldPush = Push;

  if (MenuState != OldMenuState or Button == LOW) {
    delay(100);
    lcd.clear();
    OldMenuState = MenuState;
  }


  switch (MenuState) {
    case 1:
      lcd.setCursor(0, 0);
      lcd.print(">");
      if (Button == LOW) {
        if (MenuSelect == 0) {
          MenuSelect = 1;
        }
      }
      break;
    case 2:
      lcd.setCursor(0, 1);
      lcd.print(">");
      if (Button == 0) {
        if (MenuSelect == 0) {
          MenuSelect = 2;
        }
        else if (MenuSelect == 1) {
          lcd.setCursor(3, 1);
          lcd.print("Recording...");
          Record();
          //FakeRecord();
          sendData();
          lcd.clear();
          lcd.setCursor(3, 1);
          lcd.print("Done");
          delay(1000);
          lcd.clear();
          lcd.setCursor(3, 1);
          lcd.print("Score's are saved");
          delay(1000);
          lcd.clear();
        }
      }
      break;
    case 3:
      lcd.setCursor(0, 2);
      lcd.print(">");
      if (Button == 0) {
        if (MenuSelect == 0) {
          MenuSelect = 3;
        }
      }
      break;
    case 4:
      lcd.setCursor(0, 3);
      lcd.print(">");
      if (Button == 0) {
        if (MenuSelect == 0) {
          baseLight0 = analogRead(Sensor0);
          baseLight1 = analogRead(Sensor1);
          baseLight2 = analogRead(Sensor2);
          lcd.clear();
          lcd.setCursor(3, 1);
          lcd.print("sensors are reset");
          delay(3000);
          lcd.clear();
        }
        if (MenuSelect == 1 or MenuSelect == 2 or MenuSelect == 3) {
          MenuSelect = 0;
          delay(100);
        }
      }
      break;
  }

  if (MenuSelect == 0) {
    lcd.setCursor(2, 0);
    lcd.print(" >Record a Race<");
    lcd.setCursor(2, 1);
    lcd.print(" >Score's Race<");
    lcd.setCursor(2, 2);
    lcd.print(" >Web adress<");
    lcd.setCursor(2, 3);
    lcd.print(" >Reset Sensors<");
  }
  else if (MenuSelect == 1) {
    lcd.setCursor(3, 1);
    lcd.print("Record");
    lcd.setCursor(3, 3);
    lcd.print("Back");
  }
  else if (MenuSelect == 2) {
    //score car 1
    lcd.setCursor(3, 0);
    lcd.print("Car 1 = ");
    lcd.setCursor(11, 0);
    lcd.print(endTime0);
    lcd.setCursor(17, 0);
    lcd.print("sec");
    //score car 2
    lcd.setCursor(3, 1);
    lcd.print("Car 2 = ");
    lcd.setCursor(11, 1);
    lcd.print(endTime1);
    lcd.setCursor(17, 1);
    lcd.print("sec");
    //score car 3
    lcd.setCursor(3, 2);
    lcd.print("Car 3 = ");
    lcd.setCursor(11, 2);
    lcd.print(endTime2);
    lcd.setCursor(17, 2);
    lcd.print("sec");
    //back
    lcd.setCursor(3, 3);
    lcd.print("Back");
  }
  else if (MenuSelect == 3) {
    lcd.setCursor(3, 0);
    lcd.print("--------------");
    lcd.setCursor(3, 1);
    lcd.print("error: 404");
    lcd.setCursor(3, 2);
    lcd.print("--------------");
    lcd.setCursor(3, 3);
    lcd.print("Back");

  }
}

//the recording secuence
void Record() {

  beginTimeDone = false;
  recording = true;
  endTime0 = 0;
  endTime1 = 0;
  endTime2 = 0;
  begintime = 0;
  //runs this loop only for the duration chosen or until the cars are all done

  while (recording == true) {
    // read the analog in value:
    sensorBegin = digitalRead(buttonG);
    sensorValue0 = analogRead(Sensor0);
    sensorValue1 = analogRead(Sensor1);
    sensorValue2 = analogRead(Sensor2);

    //start de timer
    if (sensorBegin == LOW and beginTimeDone == false) {
      begintime = millis();
      lcd.clear();
      lcd.setCursor(3, 1);
      lcd.print("Start");
      //Serial.println("recording...");
      beginTimeDone = true;
    }

    // here it looks for the cars if one is triggerd it records the time in Endtime
    if (sensorValue0 >= baseLight0 + sensitivity and endTime0 == 0 and beginTimeDone == true) {
      car0 = millis();
      float Laptime = car0 - begintime;
      endTime0 = Laptime / 1000;
      //Serial.print("Laptime = " );
      //Serial.println(Laptime / 1000);
    }

    if (sensorValue1 >= baseLight1 + sensitivity and endTime1 == 0 and beginTimeDone == true) {
      car1 = millis();
      float Laptime = car1 - begintime;
      endTime1 = Laptime / 1000;
      //Serial.print("Laptime = " );
      //Serial.println(Laptime / 1000);

    }

    if (sensorValue2 >= baseLight2 + sensitivity and endTime2 == 0 and beginTimeDone == true) {
      car2 = millis();
      float Laptime = car2 - begintime;
      endTime2 = Laptime / 1000;
      //Serial.print("Laptime = " );
      //Serial.println(Laptime / 1000);
      
    }

    if (beginTimeDone == true) {
      DeltaTime = millis() - begintime;
      DeltaTime = DeltaTime / 1000;
    }

    if (DeltaTime > maxTime and beginTimeDone == true or endTime0 > 0 and endTime1 > 0 and endTime2 > 0 and beginTimeDone == true) {
      recording = false;
      if (endTime0 == 0) {
        endTime0 == NULL;
      }
      if (endTime1 == 0) {
        endTime1 == NULL;
      }
      if (endTime2 == 0) {
        endTime2 == NULL;
      }

      /*    Serial.println("done");
            Serial.print(endTime0 / 1000);
            Serial.println(" sec");
            Serial.print(endTime1 / 1000);
            Serial.println(" sec");
            Serial.print(endTime2 / 1000);
            Serial.println(" sec");*/
    }
  }
}

/*void FakeRecord() {
  delay(3000);
  endTime0 = random(1000, 30000);
  endTime1 = random(1000, 30000);
  endTime2 = random(1000, 30000);
  }*/


void sendData(){
  Serial.println(String(endTime0)+"&"+String(endTime1)+"&"+String(endTime2));
}
