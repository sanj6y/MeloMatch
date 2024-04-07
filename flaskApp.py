from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
# app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)


@app.route('/')
def hello():
    return '<h1> Hello World </h1>'


@app.route('/get_string', methods=['GET'])
def get_string():
    # Logic to get the string from the backend
    print(request.data)
    return {"response": "ok"}

@app.route('/post_string', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def post_string():
    # Logic to receive the string from the frontend
    data = request.get_data()
    print(data)
    
    # Logic to process the string
    
    return jsonify({'message': 'String received and processed successfully'})



if __name__ == '__main__':
    app.run(debug=True)