#!/usr/bin/env python3
import copy
import json
import logging
import struct
import subprocess
import sys
from collections import OrderedDict


def send_message(msg_dict):
    message = json.dumps(msg_dict)
    sys.stdout.buffer.write(struct.pack('I', len(message)))
    sys.stdout.write(message)
    sys.stdout.flush()


def read_message():
    length = sys.stdin.buffer.raw.read(4)
    length = struct.unpack('I', length)[0]
    message = json.loads(sys.stdin.read(length))

    return message


def get_autofill(host):
    args = ['pass', 'show', 'chromepass/{}'.format(host)]

    output = subprocess.check_output(args, stderr=subprocess.STDOUT)
    output = output.decode()

    autofill_data = OrderedDict([
        ('pass', None),
        ('user', None)
    ])
    for keys, line in zip(autofill_data.keys(), output.splitlines()):
        autofill_data[keys] = line

    return autofill_data


def main():
    message = read_message()
    logging.debug('Received message: %s', message)

    if message['type'] == 'autofill_request':
        host = message['host']

        try:
            autofill_data = get_autofill(host)
            msg_obj = {'type': 'autofill_response'}
            msg_obj.update(autofill_data)
        except subprocess.CalledProcessError as e:
            msg_obj = {
                'type': 'exception',
                'message': e.output.decode()
            }

        msg_obj_log = copy.deepcopy(msg_obj)
        if msg_obj['type'] == 'autofill_response':
            msg_obj_log['pass'] = '********'
        logging.debug('Sending message: %s', msg_obj_log)

        send_message(msg_obj)


logging.basicConfig(filename='chromepass.log',
                    level=logging.DEBUG,
                    format='%(asctime)s %(message)s',
                    datefmt='%b %M %H:%M:%S')

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        logging.exception(e)
