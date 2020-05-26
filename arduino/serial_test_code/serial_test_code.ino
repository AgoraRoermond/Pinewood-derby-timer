float floatA = 1.52;
float floatB = 8.12;
float floatC = 0.13;
String stringA;
String stringB;
String stringC;
String endString;


void setup() {
  Serial.begin(115200);
  stringA = floatA;
  stringB = floatB;
  stringC = floatC;


  //creates the string bcus arduino is stupid
//  endString = '#';
//  endString = endString+stringA;
//  endString = endString+'&';
//  endString = endString+stringB; 
//  endString = endString+'&';
//  endString = endString+stringC;
//  endString = endString+'*';
  endString = String(floatA)+"&"+String(floatB)+"&"+String(floatC);
}

void loop() {
  Serial.println(endString);
  delay(1000);
}
