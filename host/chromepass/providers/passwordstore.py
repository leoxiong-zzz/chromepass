import subprocess
from collections import OrderedDict


class PasswordStore:
    def get_autofill(self, host):
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