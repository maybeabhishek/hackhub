#importing libraries
import os
import re

def devCount():
    output = os.popen("ls /dev").read()
    coms=(re.findall("ttyACM[0-9]", output))
    num=len(coms)
    return num

