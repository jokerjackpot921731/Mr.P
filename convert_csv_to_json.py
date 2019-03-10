import csv
import json
import os
# import pandas as pd

from feature_columns.custom_column_utils import _USE_CSV_COlUMNS

# def csv_preprocessing(data_path):
#     data_df = pd.read_csv(os.path.join(data_path, 'sheet1.csv'), usecols=_USE_CSV_COLUMNS)
#     data_df.to_csv(os.path.join(data_path, 'sheet1.csv'), index=False, sep=',', columns=_USE_CSV_COLUMNS)

def convert_csv_to_json(data_path):
    json_file = open(os.path.join(data_path, 'json_file.json'), 'w+')
    fieldnames = _USE_CSV_COlUMNS
    with open(os.path.join(data_path, 'sheet1.csv'), 'r') as data:
        next(data, None)
        reader = csv.DictReader(data, fieldnames=fieldnames)
        rows = list(reader)

        # write file .txt
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
    convert_csv_to_json(data_path='./data/')

if __name__ == "__main__":
    main()
