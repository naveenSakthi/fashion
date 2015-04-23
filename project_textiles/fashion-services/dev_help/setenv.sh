WINF=../web/WEB-INF
TOMCAT=../../tomcat
TLIB=$TOMCAT/lib
MLIB=../web/WEB-INF/lib
CLASSPATH=$TLIB/*
CLASSPATH=$CLASSPATH:$MLIB/*


export CLASSPATH



SYSP="-Dcatalina.home=../../tomcat -Draymedi.app.path=.."
export SYSP

