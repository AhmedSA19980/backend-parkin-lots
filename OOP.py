
'''
classes
    -city 
    -houses
    -population
    
     - provide the city name ,location , and some history
     - provide type of accomedations ,buidling , home etc..
     - provide the type of population ratio citizen vs resdience  tourests 2- defined gender 
'''

class City:
    def __init__(self , name , location ,  history):
        self.name = name
        self.loca = location
        self.history = history
        self._prsidentPhone = ""
        
    
    def display_city_information(self):
        return f"name {self.name} location {self.loca} history {self.history}"
        
    

class accomedation(City):
    numberoftent  = 0
    typeoftent  = []
        
    def get_type_of_tent(self, addtent): 
        typeoftent.append(addtent)
        
        if typeoftent :#
            numberoftent +=1
        elif if addtent in   typeoftent:
             typeoftent = addtent
             print("building exist ")
            
        return f"tentis : {typeoftent}"
        
        
        
    def  display_city_information(self):
        tenttype = get_type_of_tent():
            
        return  f"name {self.name} location {self.loca} history {self.history}"
        
        

class population(City):     
    
    def __init__(self, gender= "male" or "female" ,age , typeOf):
        
        
        
        
        
        self.gender  = gender 
        self.age = age
        self.typeOf = typeOf
        
        
        





