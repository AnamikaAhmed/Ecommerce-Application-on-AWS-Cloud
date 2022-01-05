import json
import boto3


def lambda_handler(event, context):
    # TODO implement

    sqs = boto3.client('sqs')

    queue_url = 'https://sqs.us-east-1.amazonaws.com/996517636031/hello'

    # Receive message from SQS queue
    response = sqs.receive_message(
        QueueUrl=queue_url,
        AttributeNames=[
            'SentTimestamp'
        ],
        MaxNumberOfMessages=10,
        MessageAttributeNames=[
            'All'
        ],
        VisibilityTimeout=0,
        WaitTimeSeconds=0
    )
    sns = boto3.client('sns')

    topics = sns.list_topics().get('Topics')

    vararn = topics[0]["TopicArn"]

    # message = response['Messages'][0]
    for record in event['Records']:
        print("test")
        payload = record["body"]
        message = {"foo": "bar"}
        client2 = boto3.client('sns')
        response = client2.publish(
            TargetArn=vararn,
            Message=json.dumps({'default': json.dumps(str(payload))}),
            MessageStructure='json'

        )
        print(json.dumps({'default': json.dumps(str(payload))}), )



#Reference: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-subscribe-queue-sns-topic.html
#https://stackoverflow.com/questions/34029251/aws-publish-sns-message-for-lambda-function-via-boto3-python2
# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/sqs-example-sending-receiving-msgs.html
