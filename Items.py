import json


def lambda_handler(event, context):
    # TODO implement
    # print(event["queryStringParameters"]["user"])
    # print("*****",event["queryStringParameters"]["user"])
    x = event["params"]["querystring"]["user"]
    arr_of_prod_id = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    positi = arr_of_prod_id.index(x)

    arr_of_name = ["Blue Tshirt", "Grey Joggers", "Cream Joggers", "Navy Blue Tshirt", "Skin Color Joggers",
                   "Dalhousie Yellow Hoodies", "Dalhousie black Hoodie", "Dalhousie White Hoodie",
                   "Dalhousie Intramural Hoodie", "Nova Scotia Hoodie"]
    arr_of_imgsrc = ["https://getprodimgsrc.s3.amazonaws.com/download+(1).jpeg",
                     "https://getprodimgsrc.s3.amazonaws.com/download+(2).jpeg",
                     "https://getprodimgsrc.s3.amazonaws.com/download+(3).jpeg",
                     "https://getprodimgsrc.s3.amazonaws.com/download.jpeg",
                     "ttps://getprodimgsrc.s3.amazonaws.com/images+(1).jpeg",
                     "https://getprodimgsrc.s3.amazonaws.com/0001.jpg",
                     "https://getprodimgsrc.s3.amazonaws.com/0001+(1).jpg",
                     "https://getprodimgsrc.s3.amazonaws.com/0001+(2).jpg",
                     "https://getprodimgsrc.s3.amazonaws.com/image_Dalhousie_hoodie.jpg",
                     "https://getprodimgsrc.s3.amazonaws.com/s-l300.jpg"]
    print(event["params"]["querystring"]["user"])
    return {"message": "User found",
            'status': '200',
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }, "status": "true", "data": {"id": x, "lastName": "", "firstName": arr_of_name[positi],
                                          "email": "heinz-georg.fiedler@example.com", "title": "",
                                          "picture": arr_of_imgsrc[positi]}}