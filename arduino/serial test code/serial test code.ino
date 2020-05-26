float floatA = 1.52;
float floatB = 8.12;
float floatC = 0.13;
String stringA;
String stringB;
String stringC;
String endString;


void setup() {
  Serial.begin(115200);
  stringA = String(floatA);
  stringB = String(floatB);
  stringC = String(floatC);


  //creates the string bcus arduino is stupid
  endString = '#';
  endString = endString+stringA;
  endString = endString+'&';
  endString = endString+stringB; 
  endString = endString+'&';
  endString = endString+stringC;
  endString = endString+'*';  
}

void loop() {
  Serial.println(endString);
  delay(1000);
}
