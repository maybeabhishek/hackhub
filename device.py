class Device():
    def __init__(self,id,status):
        self.id = id
        self.status = status
        self.desc = None
        self.curr = None
        self.mv = None

    def setSensorValue(self, curr, mv):
        self.curr = curr
        self.mv = mv

        
    


    