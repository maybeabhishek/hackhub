import time
import random
import time
import serial


ser=serial.Serial("/dev/ttyACM0",9600)  #change ACM number as found from ls /dev/tty/ACM*
ser.baudrate=9600

def motser():
    read_ser=ser.readline()
    read_ser = read_ser.decode('UTF-8').rstrip()
    read_ser=read_ser.split(" ")
    return(read_ser)
