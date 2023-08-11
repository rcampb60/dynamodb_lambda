import boto3
import uuid
from datetime import datetime
import json
import os

dynamo_db = boto3.resource('dynamodb')
table = dynamo_db.Table(os.environ['PAYMENT_TABLE_NAME'])

def handler(event, context):
    payment_id = str(1)
    p_status = 'Failed'
    c_timestamp = str(datetime.now())
    u_timestamp = str(datetime.now())

    table.put_item(Item = {
        'Payment ID': payment_id,
        'Status': p_status,
        'Created Time': c_timestamp,
        'Updated Time': u_timestamp,
    })

