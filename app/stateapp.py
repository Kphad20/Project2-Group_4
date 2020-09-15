from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

import pymongo

#Create connection variable
conn='mongodb://localhost:27017'

# Initialize mongo connection
client=pymongo.MongoClient(conn)

#Connect to database us_energy_db
db=client.us_energy_db

#Initialize app
app=Flask(__name__)

cors=CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#Setup routes   
@app.route("/api")
@cross_origin()
def home():
    energy_info = [doc for doc in db.State_EnergyData_2018.find({}, {'_id': False})]
    #cs_info_format = {"data": cs_info[0]}
    # print(cs_info)
    return jsonify(energy_info)

@app.route("/api/Wyoming")
@cross_origin()
def state():
    state_info = db.State_EnergyData_2018.find({"State Name": "Wyoming"})
    return jsonify(state_info)

if __name__=="__main__":
    app.run(debug=True)
