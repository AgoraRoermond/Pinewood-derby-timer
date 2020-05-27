float floatA = 1.52;
float floatB = 8.12;
float floatC = 0.13;
String endString;


void setup() {
  Serial.begin(115200);
  endString = String(floatA)+"&"+String(floatB)+"&"+String(floatC);
}

void loop() {
  Serial.println(endString);
  delay(1000);
}
