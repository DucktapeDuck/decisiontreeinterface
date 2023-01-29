from sqlalchemy import Column, Integer, String, BLOB
from db.db import Base

class Model(Base):
    __tablename__ = 'model'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    dataset = Column(String)
    binary = Column(BLOB)

    def __init__(self, name=None, dataset=None, binary=None):
        self.name = name
        self.dataset = dataset
        self.binary = binary

    def __repr__(self):
        return f'<Model {self.name!r}>'

class Database(Base):
    __tablename__ = 'database'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    inputs = Column(String)

    def __init__(self, name=None, inputs=None):
        self.name = name
        self.inputs = inputs

    def __repr__(self):
        return f'<Database {self.name!r}>'