from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

import pymongo

#Create connection variable
conn='mongodb://localhost:27017'

# Initialize mongo connection
client=pymongo.MongoClient(conn)

#Connect to database us_energy_db
db=client.US_Energy_db

#Initialize app
app=Flask(__name__)

cors=CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#Setup routes   
@app.route("/api")
@cross_origin()
def home():
    energy_info = [doc for doc in db.US_Yearly_Energy_Production_by_Source.find({}, {'_id': False})]
    #cs_info_format = {"data": cs_info[0]}
    # print(cs_info)
    return jsonify(energy_info)


if __name__=="__main__":
    app.run(debug=True)
