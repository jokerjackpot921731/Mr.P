import csv
import json
import os


def convert_csv_to_jason(data_path):
    json_file = open(os.path.join(data_path, 'json_file.txt'), 'w+')
    fieldnames = ['linkProduct',
                  'note',
                  'address',
                  'paid',
                  'costSite',
                  'orderBy']
    with open(os.path.join(data_path, 'sheet1.csv'), 'r') as data:
        next(data, None)
        reader = csv.DictReader(data,
                                fieldnames=fieldnames)
        rows = list(reader)
        json_file.write('[\n')
        for idx, row in enumerate(rows):
            for fieldname in fieldnames:
                row[fieldname] = row[fieldname].\
                    replace('\"\"', '').\
                    replace('\"', '').\
                    replace('\n', ', ')
            if idx != len(rows) - 1:
                json.dump(row, json_file)
                json_file.write(',\n')
            else:
                json.dump(row, json_file)
                json_file.write('\n')
        json_file.write(']')

def main():
    convert_csv_to_jason(data_path='./data/')
    print('csv is converted!')
    print('='*80)
    with open('./data/json_file.txt') as f:
        data = json.load(f)
    print(data)
    return data


if __name__ == "__main__":
    main()