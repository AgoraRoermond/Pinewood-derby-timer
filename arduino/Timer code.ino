#define maxTime 60
#define sensitivity 50

const int buttonG = 8;
const int Sensor0 = A0;
const int Sensor1 = A1;
const int Sensor2 = A2;

unsigned long begintime = 0;

int sensorBegin = 0;
int sensorValue0 = 0;
int sensorValue1 = 0;
int sensorValue2 = 0;
int baseLight0;
int baseLight1;
int baseLight2;

float endTime0;
float endTime1;
float endTime2;
float DeltaTime;
float car0 = 0;
float car1 = 0;
float car2 = 0;

bool  beginTimeDone;
bool  recording;

void setup() {
  // initialize the pushbutton pin as an input:
  pinMode(buttonG, INPUT_PULLUP);
  baseLight0 = analogRead(Sensor0);
  baseLight1 = analogRead(Sensor1);
  baseLight2 = analogRead(Sensor2);
  Serial.begin(9600);


}

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
      beginTimeDone = true;
    }

    // here it looks for the cars if one is triggerd it records the time in Endtime
    if (sensorValue0 >= baseLight0 + sensitivity and endTime0 == 0 and beginTimeDone == true) {
      car0 = millis();
      float Laptime = car0 - begintime;
      endTime0 = Laptime;
      Serial.print("Laptime = " );
      Serial.println(Laptime / 1000);
    }

    if (sensorValue1 >= baseLight1 + sensitivity and endTime1 == 0 and beginTimeDone == true) {
      car1 = millis();
      float Laptime = car1 - begintime;
      endTime1 = Laptime;
      Serial.print("Laptime = " );
      Serial.println(Laptime / 1000);

    }

    if (sensorValue2 >= baseLight2 + sensitivity and endTime2 == 0 and beginTimeDone == true) {
      car2 = millis();
      float Laptime = car2 - begintime;
      endTime2 = Laptime;
      Serial.print("Laptime = " );
      Serial.println(Laptime / 1000);

    }

    if (beginTimeDone == true) {
      DeltaTime = millis() - begintime;
      DeltaTime = DeltaTime / 1000;
    }

    if (DeltaTime > maxTime and beginTimeDone == true or endTime0 > 0 and endTime1 > 0 and endTime2 > 0 and beginTimeDone == true) {
      recording = false;
      Serial.println("done");
      Serial.print(endTime0 / 1000);
      Serial.println(" sec");
      Serial.print(endTime1 / 1000);
      Serial.println(" sec");
      Serial.print(endTime2 / 1000);
      Serial.println(" sec");
    }
  }
}
