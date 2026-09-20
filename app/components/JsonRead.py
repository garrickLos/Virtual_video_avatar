import json

class JsonItems:
    
    @staticmethod
    def read_json(location, list_item=None):
        try:
            with open(location, "r") as file:
                config = json.load(file)

            # specifieke data, of het is een specifieke item of alles
            data = config[list_item] if list_item else config

            #  Als het specifiek 1 item is dan geeft die alleen dat item terug
            if isinstance(data, list) and len(data) == 1:
                return data[0]  # Geef het item direct terug

            return data
        
        except FileNotFoundError:
            print(f"Error: File not found {location}")
            return {}
        
        except KeyError:
            print(f"Error: Key '{list_item}' Not found in json")
            return {}
        
        except Exception as error:
            print(f"Unnexpected error: {error}")
            return {}