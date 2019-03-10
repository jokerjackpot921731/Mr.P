import os
import yaml

class Configs:
    __instance = None

    @staticmethod
    def get():
        if Configs.__instance is None:
            Configs()
        return Configs.__instance

    def __init__(self):
        if Configs.__instance is not None:
            raise Exception("This class is a singleton!")
        else:
            Configs.__instance = self

        dir_path = os.path.dirname(os.path.realpath(__file__))

        with open(os.path.join(dir_path, "data_path.yaml"), "r") as cfg:
            self.config = yaml.load(cfg)

    def __getitem__(self, item):
        return self.config[item]