from flask import Flask, request, jsonify, Response

app = Flask(__name__)


@app.route('/')
def hello():
    return '<h1> Hello World </h1>'


@app.route('/get_string', methods=['GET'])
def get_string():
    # Logic to get the string from the backend
    print(request.data)

@app.route('/post_string', methods=['POST'])
def post_string():
    # Logic to receive the string from the frontend
    data = request.get_json()
    string = data['string']
    
    # Logic to process the string
    
    return jsonify({'message': 'String received and processed successfully'})



if __name__ == '__main__':
    app.run(debug=True)