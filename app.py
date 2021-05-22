from flask import Flask
from flask import jsonify, render_template
from flask_cors import CORS, cross_origin
import requests
import pdb

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/',methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/get_table_data',methods=['GET'])
def display_board():
    data = requests.get("https://api-v3.mbta.com/schedules?filter[stop]=place-north")
    resdata = data.json()['data']
    response = { 'data' : []}
    try:
        for x in resdata:
            #pdb.set_trace()
            if (x['relationships']['route']['data']['id'].startswith('CR-') and x['attributes']['departure_time'] != None):
                print(x)
                response['data'].append(
                { 
                'destination' : x['relationships']['stop']['data']['id'],
                'arrival_time' : x['attributes']['arrival_time'].split('T')[1].split('-')[0].rsplit(':',1)[0] if x['attributes']['arrival_time'] != None else "N/A",
                'departure_time' : x['attributes']['departure_time'].split('T')[1].split('-')[0].rsplit(':',1)[0] if x['attributes']['departure_time'] != None else "N/A",
                'route' : x['relationships']['route']['data']['id']
                })
        
        response['data'] = response['data'][:15] # take only first 15 lines of the data
        response['data'] = sorted(response['data'], key=lambda x : x['departure_time'])
        
    except Exception as e:
        print(e)
        response = { "data" : []}
    #pdb.set_trace()
    print(response)
    return jsonify(response)



if __name__ == '__main__':
    app.run()