from flask import Flask,request
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
new_df = pickle.load(open('rooms.pkl','rb'))
combined_similarity = pickle.load(open('similarity.pkl','rb'))

@app.route('/recommend_rooms',methods=['post'])
def recommend():
 
    rooms = request.json["room_id"]
    room_index = new_df[new_df['_id'] == rooms].index[0]
    simdistances = combined_similarity[room_index]
    room_list = sorted(list(enumerate(simdistances)), reverse=True, key=lambda x: x[1])[1:5]
    data = []
    for i in room_list:
        data.append(new_df.iloc[i[0]]['_id'])
    return data


if __name__ == '__main__':
    app.run(port=9800)