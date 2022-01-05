# CSCI-5409-Fall-2021-Group-5


The file test1.js works as a server on EC2 instance
Description: This code was used to send out the order placement message which was firstly sent to the AWS SQS Queue and the lambda then pulled the message from the AWS SQS and further published the message to the AWS SNS topic to which the user has been subscribed, in this manner the user gets the email of successful order placement. This whole code worked as a nodejs server on EC2 instance

Screenshot of working part 1:https://mjajaj.s3.amazonaws.com/EC2+instances+running+proof/Screenshot+2021-12-11+at+12.30.47+AM.png

Screenshot of working part 2:https://mjajaj.s3.amazonaws.com/EC2+instances+running+proof/Screenshot+2021-12-11+at+12.32.43+AM.png


The file subscribe.js worked as a server on EC2 which was used to send out the subscription conformation message to the email ids
Description: The file was deployed on EC2 instance and was used to send the subscription confirmation request to the users so that they could subscribe to the topic to recieve the emails, once subscription was made the user would now onwards be able to recieve the emails about order placements. This file firstly takes the topic arn and then creates a subscription for that particular user to the existing topic so that the user is registered after that the user just has to confirm subscription in order to get notification about order placements

Screenshot of working part 1:https://mjajaj.s3.amazonaws.com/EC2+instances+running+proof/Screenshot+2021-12-11+at+12.37.23+AM.png

Screenshot of working part 2:https://mjajaj.s3.amazonaws.com/EC2+instances+running+proof/Screenshot+2021-12-11+at+12.39.00+AM.png
