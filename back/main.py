import pickle
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union
import typing
# import sklearn
import numpy as np
import json
# from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeClassifier
from fastapi.middleware.cors import CORSMiddleware

class DatasetParameters(BaseModel):
    modelName: str
    dataset: str

class Inputs(BaseModel):
    inputs: typing.Dict

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from db.db import init_db, db_session
from db.models import Model, Database
init_db()

@app.get("/")
async def root():
    return {"message": "Hello :)"}

@app.post("/createdataset")
async def create_dataset():
    try: 
        json_serialized = json.dumps(["Object 1", "Object 2", "Object 3", "Object 4"])
        new_ds = Database(name="iris", inputs=json_serialized)
        db_session.add(new_ds)
        db_session.commit()

        return {"message": "success"}
    except Exception as e:
        return {"error": e}

@app.post("/createmodel/")
async def create_model(params: DatasetParameters):
    try: 
        if params.dataset == "iris":
            from sklearn.datasets import load_iris
            dataset = load_iris()

        clf = DecisionTreeClassifier()
        clf = clf.fit(dataset.data, dataset.target)
        
        pickled = pickle.dumps(clf, 0)

        new_model = Model(
            name=params.modelName,
            dataset=params.dataset,
            binary=pickled
        )

        db_session.add(new_model)
        db_session.commit()
  
        return {"message": "created"}
    except Exception as e:
        return {"error": e}

@app.post("/infer/{model}")
async def infer_on_model(model: str, inputs: Inputs):

    try: 

        data = Model.query.filter(Model.name == model).first()
        clf = pickle.loads(data.binary)
        arr = []

        for key, value in inputs.inputs.items():
            arr.append(int(value))

        output = clf.predict(np.array(arr).reshape(1, -1))

        return {"data": { "prediction": output.tolist()}}
    except Exception as e:
        return {"error": e} 


@app.get("/datasets/")
async def datasets():
    try:
        return {"data": Database.query.all()}
    except Exception as e:
        return {"error": e}

@app.get("/models/")
async def models():
    try:
        data = Model.query.with_entities(Model.name, Model.dataset).all()
        return {"data": data}
    except Exception as e:
        print(e)
        return {"error": e}