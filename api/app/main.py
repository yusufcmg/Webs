from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
origins = [
    "http://localhost:8080",
    "http://localhost:5173", # Vite'nin varsayılan portu
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/api/posts/", response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    return crud.create_post(db=db, post=post)


@app.get("/api/posts/", response_model=list[schemas.Post])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = crud.get_posts(db, skip=skip, limit=limit)
    return posts


@app.get("/api/posts/{post_id}", response_model=schemas.Post)

def read_post(post_id: int, db: Session = Depends(get_db)):

    db_post = crud.get_post(db, post_id=post_id)

    if db_post is None:

        raise HTTPException(status_code=404, detail="Post not found")

    return db_post



@app.post("/api/projects/", response_model=schemas.Project)

def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):

    return crud.create_project(db=db, project=project)



@app.get("/api/projects/", response_model=list[schemas.Project])

def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):

    projects = crud.get_projects(db, skip=skip, limit=limit)

    return projects



@app.get("/api/projects/{project_id}", response_model=schemas.Project)

def read_project(project_id: int, db: Session = Depends(get_db)):

    db_project = crud.get_project(db, project_id=project_id)

    if db_project is None:

        raise HTTPException(status_code=404, detail="Project not found")

    return db_project
