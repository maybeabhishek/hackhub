#importing libraries
import os
import re

def getPi():
    prev=0
    output = os.popen("ip neigh").read()
    coms=(re.findall("172.16.45.14", output))
    return(len(coms))