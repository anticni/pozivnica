from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = 'postgresql://pozivnica:Pozivnica123!@pozivnica-0.cywn7vjw8rx6.eu-central-1.rds.amazonaws.com:5432/pozivnica'
# SQLALCHEMY_DATABASE_URL = 'sqlite:///sqlite.db'

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
