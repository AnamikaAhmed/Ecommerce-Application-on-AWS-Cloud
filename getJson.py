import json


def lambda_handler(event, context):
    # TODO implement

    val = {
        'message': "Users retrieved",
        'status': '200'
    }
    print(val["message"])

    return {
        'message': "Users retrieved",
        'status': '200',
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'data': [
            {
                'id': "1",
                'lastName': "Blue T-Shirt",
                'firstName': "",
                'picture': "https://getprodimgsrc.s3.amazonaws.com/download+(1).jpeg"
            }
            ,
            {
                'id': "2",
                'picture': "https://getprodimgsrc.s3.amazonaws.com/download+(2).jpeg",
                'lastName': "Grey Joggers",

                'firstName': ""
            },
            {
                'id': "3",

                'lastName': "Cream Joggers",

                'picture': "https://getprodimgsrc.s3.amazonaws.com/download+(3).jpeg",

            },
            {
                'id': "4",
                'picture': "https://getprodimgsrc.s3.amazonaws.com/download.jpeg",
                'lastName': "Navy blue T-Shirt",
                'email': "dylan.vasquez@example.com"

            },
            {
                'id': "5",
                'lastName': "Skin Color Joggers",

                'firstName': "",

                'picture': "https://getprodimgsrc.s3.amazonaws.com/images+(1).jpeg"
            },

            {
                'id': "6",
                'lastName': "Dalhousie Hoodies-Yellow",
                'firstName': "",

                'picture': "https://getprodimgsrc.s3.amazonaws.com/0001.jpg"
            },

            {
                'id': "7",
                'lastName': "DALHOUSIE Hoodie-Black",
                'firstName': "",

                'picture': "https://getprodimgsrc.s3.amazonaws.com/0001+(1).jpg"
            }
            ,
            {
                'id': "8",
                'lastName': "Dalhousie Hoodie White",
                'firstName': "",

                'picture': "https://getprodimgsrc.s3.amazonaws.com/0001+(2).jpg"
            },

            {
                'id': "9",
                'lastName': "Dalhousie Intramural hoodie",
                'firstName': "",

                'picture': "https://getprodimgsrc.s3.amazonaws.com/image_Dalhousie_hoodie.jpg"
            },
            {
                'id': "10",
                'lastName': "Nova Scotia Hoodie",
                'firstName': "",

                'picture': "https://getprodimgsrc.s3.amazonaws.com/s-l300.jpg"
            }
        ]
    }