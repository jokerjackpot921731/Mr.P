import csv
import json
import os
import pandas as pd

from feature_columns import custom_column_utils


def preprocessing_csv(raw_data_path, cleaned_data_path):
    data_df = pd.read_csv(raw_data_path, usecols=custom_column_utils._USE_CSV_COLUMNS)
    data_df.to_csv(
        cleaned_data_path,
        index=False,
        sep=',',
        columns=custom_column_utils._USE_CSV_COLUMNS)


def convert_csv_to_json(data_path):
    json_path = os.path.join(data_path, 'json/json_file.txt')
    raw_data_path = os.path.join(data_path, 'items-Sheet1.csv')
    cleaned_data_path = os.path.join(data_path, 'processed/cleaned_sheet.csv')

    json_file = open(json_path, 'w+')
    fieldnames = custom_column_utils._USE_CSV_COLUMNS

    # processing data csv
    try:
        preprocessing_csv(raw_data_path, cleaned_data_path)
    except Exception as e:
        print("Could not clean raw data", e)
        return None

    # convert to json
    try:
        with open(cleaned_data_path, 'r') as data:
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
    except Exception as e:
        print("Could not convert file", e)
        return None
    print("Json file is already.")

def main():
    convert_csv_to_json(data_path='./data/')

if __name__ == "__main__":
    main()
